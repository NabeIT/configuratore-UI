import { ArrowLeft, Minus, Plus, Save, ShoppingCart } from 'lucide-react';
import { calculateOrderItems, calculateRealtimeCartTotal, getOrderVariantData } from '../utils/orderPricing';
import { useEffect, useMemo, useState } from 'react';

import { createClient } from '@supabase/supabase-js';
import { jsPDF } from 'jspdf';

function generateUUIDv4() {
    // If crypto.randomUUID is available (modern browsers)
    if (crypto.randomUUID) {
        return crypto.randomUUID();
    }

    // Fallback for older environments
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (crypto.getRandomValues(new Uint8Array(1))[0] & 0x0f) / 0x0f;
        const v = c === 'x' ? r * 16 : (r * 4) + 8;
        return Math.floor(v).toString(16);
    });
}



export default function CheckoutModal({ cartItems, rawSceneItems, sceneColor, onClose, onAddToCart }) {
    const [ownedQuantities, setOwnedQuantities] = useState({});

    // Initialize owned quantities to 0 for each item
    useEffect(() => {
        const initial = {};
        cartItems.forEach((item) => {
            if (item.meta?.inCart !== false) {
                initial[item.id] = 0;
            }
        });
        setOwnedQuantities(initial);
    }, [cartItems]);

    const visibleItems = cartItems.filter((item) => item.meta?.inCart !== false);



    const saveToSupabase = async (freshItems) => {
        const supabaseUrl = 'https://azrkvmypdhvxhaailnsv.supabase.co';
        const supabaseKey = 'sb_publishable_Tvvx1UT8dNNpu3FK2enaSA_L9lMkfJO';
        const supabase = createClient(supabaseUrl, supabaseKey);
        const guid = generateUUIDv4();


        console.log('Saving fresh scene state:', freshItems);
        const { data, error } = await supabase
            .from('Libreria').insert({
                items: freshItems,
                guid
            }).select();
        if (error) {
            console.error('Error saving configuration:', error);
        } else {
            console.log('Configuration saved with ID:', data);
        }
        return { data, error };
    }

    const setOwned = (id, value) => {
        setOwnedQuantities((prev) => ({ ...prev, [id]: value }));
    };

    const incrementOwned = (id, max) => {
        setOwnedQuantities((prev) => ({
            ...prev,
            [id]: Math.min((prev[id] || 0) + 1, max),
        }));
    };

    const decrementOwned = (id) => {
        setOwnedQuantities((prev) => ({
            ...prev,
            [id]: Math.max((prev[id] || 0) - 1, 0),
        }));
    };

    const totalPrice = useMemo(() => {
        return calculateRealtimeCartTotal(cartItems, ownedQuantities, sceneColor);
    }, [cartItems, ownedQuantities, sceneColor]);

    const totalItems = useMemo(() => {
        return visibleItems.reduce((sum, item) => {
            const owned = ownedQuantities[item.id] || 0;
            return sum + Math.max(item.quantity - owned, 0);
        }, 0);
    }, [visibleItems, ownedQuantities]);

    const handleAddToCart = () => {
        const orderItems = calculateOrderItems(cartItems, ownedQuantities, sceneColor);
        const itemsToAdd = orderItems
            .filter((item) => item.quantity > 0)
            .map((item) => {
                const variantData = getOrderVariantData(item.sku, sceneColor);
                const skuForCart = variantData?.sku || item.sku;

                return {
                    id: variantData?.variantId || skuForCart,
                    model: skuForCart,
                    title: item.title,
                    sku: skuForCart,
                    quantity: item.quantity,
                    ownedQuantity: 0,
                    totalQuantity: item.quantity,
                    meta: {
                        sku: skuForCart,
                        price: item.price || 0,
                        variantId: variantData?.variantId || null,
                        handle: variantData?.handle || null,
                    },
                    itemIds: [],
                };
            });

        const orderTotalItems = itemsToAdd.reduce((sum, item) => sum + item.quantity, 0);

        onAddToCart({
            items: itemsToAdd,
            totalPrice,
            totalItems: orderTotalItems,
        });
    };


    const requestSceneState = () => {
        return new Promise((resolve) => {
            const iframe = document.querySelector('iframe');
            if (!iframe) { resolve([]); return; }

            const handleMsg = (e) => {
                if (e.data?.type === 'configurator:sceneState') {
                    window.removeEventListener('message', handleMsg);
                    const payload = e.data.payload ?? e.data;
                    resolve(payload)
                    // resolve(Array.isArray(payload.items) ? payload.items : []);
                }
            };
            window.addEventListener('message', handleMsg);
            iframe.contentWindow.postMessage({ type: 'configurator:getSceneState' }, '*');
            setTimeout(() => {
                window.removeEventListener('message', handleMsg);
                resolve([]);
            }, 3000);
        });
    };

    const buildConfigUrl = (sceneItems) => {
        const extractSteps = (items, steps = []) => {
            if (!Array.isArray(items)) return steps;
            items.forEach((item) => {
                if (!item || !item.modelId) return;
                const step = { m: item.modelId };
                if (item.variant !== undefined && item.variant !== null) step.v = item.variant;
                if (item.targetZoneKey) step.t = item.targetZoneKey;
                if (item.id) step.i = item.id;
                if (item.position) step.p = item.position;
                steps.push(step);
                if (item.type === 'object' && Array.isArray(item.items)) {
                    extractSteps(item.items, steps);
                }
            });
            return steps;
        };

        const steps = extractSteps(sceneItems);
        if (steps.length === 0) return null;

        const json = JSON.stringify(steps);
        const baseUrl = window.location.origin + window.location.pathname;
        return `${baseUrl}?config=${encodeURIComponent(json)}`;
    };

    const saveToPdf = async () => {
        const doc = new jsPDF({ unit: 'mm', format: 'a4' });
        const pageW = doc.internal.pageSize.getWidth();
        const margin = 15;
        const contentW = pageW - margin * 2;
        let y = margin;
        const { items: freshItems, color } = await requestSceneState();

        const { data, error } = await saveToSupabase(freshItems);
        const baseUrl = "https://nabecreation.com/products/libreria-evolutiva-evergrow";
        const configurationUrl = !error ? baseUrl + "?config=" + data[0].guid : null;

        const orderItems = calculateOrderItems(cartItems, ownedQuantities, color);
        const pdfTotalItems = orderItems.reduce((sum, item) => sum + item.quantity, 0);


        const addPageIfNeeded = (needed) => {
            if (y + needed > doc.internal.pageSize.getHeight() - margin) {
                doc.addPage();
                y = margin;
            }
        };

        // --- Header ---
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.text('Riepilogo Configurazione', margin, y + 7);
        y += 12;

        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(120);
        doc.text(`Generato il ${new Date().toLocaleDateString('it-IT')}`, margin, y);
        doc.setTextColor(0);
        y += 8;

        // --- Screenshot della libreria ---
        try {
            const iframe = document.querySelector('iframe');
            if (iframe) {
                const dataUrl = await new Promise((resolve, reject) => {
                    const handleMsg = (e) => {
                        if (e.data?.type === 'configurator:screenshot') {
                            window.removeEventListener('message', handleMsg);
                            const url = e.data.dataUrl || e.data.payload?.dataUrl;
                            if (url) {
                                resolve(url);
                            } else {
                                reject(new Error('no dataUrl in response'));
                            }
                        }
                    };
                    window.addEventListener('message', handleMsg);
                    iframe.contentWindow.postMessage({ type: 'configurator:screenshot' }, '*');
                    setTimeout(() => {
                        window.removeEventListener('message', handleMsg);
                        reject(new Error('timeout'));
                    }, 5000);
                });

                // Caricare l'immagine per ottenere le dimensioni reali
                const img = await new Promise((resolve, reject) => {
                    const image = new Image();
                    image.onload = () => resolve(image);
                    image.onerror = reject;
                    image.src = dataUrl;
                });

                const imgW = contentW;
                const imgH = (img.height / img.width) * imgW;
                addPageIfNeeded(imgH + 5);
                doc.addImage(dataUrl, 'PNG', margin, y, imgW, imgH);
                y += imgH + 5;
            }
        } catch (err) {
            console.warn('Screenshot non disponibile per il PDF:', err.message);
        }

        // --- Separatore ---
        doc.setDrawColor(200);
        doc.line(margin, y, pageW - margin, y);
        y += 6;

        // --- Tabella articoli ---
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Lista componenti', margin, y);
        y += 7;

        // Header tabella
        const colX = {
            name: margin,
            qty: margin + contentW * 0.7,
            // owned: margin + contentW * 0.68,
            toBuy: margin + contentW * 0.8,
            price: margin + contentW * 0.9,
        };

        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(100);
        doc.text('Articolo', colX.name, y);
        doc.text('Totale', colX.qty, y);
        // doc.text('Posseduti', colX.owned, y);
        doc.text('Acquisto', colX.toBuy, y);
        doc.text('Prezzo', colX.price, y);
        y += 2;
        doc.setDrawColor(180);
        doc.line(margin, y, pageW - margin, y);
        y += 4;

        doc.setTextColor(0);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);

        orderItems.forEach((item) => {
            addPageIfNeeded(10);

            const toBuy = item.quantity;
            const itemPrice = toBuy * (item.price || 0);
            const sku = color == "white" ? item.sku + "W" : item.sku;

            // Nome articolo (troncato se troppo lungo)
            const maxNameW = contentW * 0.52;
            let name = item.title || item.model;
            while (doc.getTextWidth(name) > maxNameW && name.length > 3) {
                name = name.slice(0, -4) + '...';
            }

            doc.setFont('helvetica', toBuy > 0 ? 'bold' : 'normal');
            doc.setTextColor(toBuy > 0 ? 0 : 150);
            doc.text(name, colX.name, y);
            doc.text(String(item.quantity), colX.qty, y);

            // doc.text(String(owned), colX.owned, y);
            doc.text(String(toBuy), colX.toBuy, y);
            doc.text(
                item.price ? `${itemPrice.toFixed(2)} €` : '—',
                colX.price,
                y
            );
            y += 4;
            doc.setTextColor(150);
            doc.text(sku, colX.name, y);
            y += 6;
        });

        // --- Separatore finale ---
        y += 2;
        doc.setDrawColor(180);
        doc.line(margin, y, pageW - margin, y);
        y += 6;

        // --- Totale ---
        addPageIfNeeded(12);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0);
        doc.text('Totale da acquistare:', margin, y);
        doc.text(`${totalPrice.toFixed(2)} €`, pageW - margin, y, { align: 'right' });
        y += 6;
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100);
        doc.text(`${pdfTotalItems} ${pdfTotalItems === 1 ? 'prodotto' : 'prodotti'}`, margin, y);
        y += 10;

        // --- URL configurazione ---
        try {

            if (configurationUrl) {
                addPageIfNeeded(20);
                doc.setDrawColor(200);
                doc.line(margin, y, pageW - margin, y);
                y += 6;

                doc.setFontSize(10);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(0);
                doc.text('Link alla configurazione', margin, y);
                y += 5;

                doc.setFontSize(7);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(60);

                // Spezza l'URL su più righe se troppo lungo
                const urlLines = doc.splitTextToSize(configurationUrl, contentW);
                doc.textWithLink(urlLines[0], margin, y, { url: configurationUrl });
                if (urlLines.length > 1) {
                    for (let i = 1; i < urlLines.length; i++) {
                        y += 3.5;
                        doc.text(urlLines[i], margin, y);
                    }
                }
            }
        } catch (err) {
            console.warn('Impossibile generare URL configurazione:', err.message);
        }

        doc.save('configurazione-libreria.pdf');
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-2xl mx-4 max-h-[90dvh] bg-gray-50 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                {/* Header */}
                <div className="px-5 py-4 border-b border-gray-200 bg-white rounded-t-2xl">
                    <h2 className="text-lg font-semibold text-gray-700">Riepilogo configurazione</h2>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Indica quanti di questi elementi possiedi gi&agrave;
                    </p>
                </div>

                {/* Items list */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {visibleItems.map((item) => {
                        const owned = ownedQuantities[item.id] || 0;
                        const toBuy = Math.max(item.quantity - owned, 0);
                        const itemPrice = toBuy * (item.meta?.price || 0);

                        return (
                            <div
                                key={item.id}
                                className={`rounded-xl transition-all ${toBuy > 0
                                    ? 'bg-white shadow-sm p-4'
                                    : 'bg-gray-50 p-2.5 opacity-50'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className={`rounded-lg object-cover flex-shrink-0 ${toBuy > 0 ? 'w-14 h-14' : 'w-10 h-10'
                                            }`}
                                        onError={(e) => {
                                            e.currentTarget.src = '/assets/img/thumbs/spalliera-base.png';
                                        }}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h3 className={`font-medium text-gray-800 truncate ${toBuy > 0 ? 'text-sm' : 'text-xs'
                                            }`}>
                                            {item.title}
                                        </h3>
                                        {toBuy > 0 && (
                                            <p className="text-xs text-gray-400 truncate">
                                                {item.description}
                                            </p>
                                        )}
                                        {/* <div className="flex items-center gap-2 mt-1">
                                            <span className={`text-xs text-white bg-gray-800 rounded-2xl px-2 py-0.5 ${
                                                toBuy > 0 ? '' : 'text-[10px] px-1.5'
                                            }`}>
                                                {item.meta?.price ? `${item.meta.price} \u20ac` : 'Incluso'}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                x{item.quantity} nella configurazione
                                            </span>
                                        </div> */}
                                    </div>
                                </div>

                                {/* Da acquistare + Già in mio possesso stacked */}
                                <div className={`flex flex-col gap-2 ${toBuy > 0 ? 'mt-3' : 'mt-2'}`}>
                                    {/* Da acquistare row */}
                                    <div className="flex items-center justify-between px-1">
                                        <span className={`font-semibold p-1 px-2 rounded-2xl ${toBuy > 0
                                            ? 'text-sm text-white bg-brand '
                                            : 'text-xs text-gray-400'
                                            }
                                           
                                            
                                            `}>
                                            {toBuy > 0 ? (
                                                <>{toBuy} da acquistare
                                                    {/* {item.meta?.price ? (
                                                    <span className="text-gray-700 ml-1">
                                                        &middot; {itemPrice.toFixed(2)} &euro;
                                                    </span>
                                                ) : null} */}
                                                </>
                                            ) : (
                                                'Gi\u00e0 in tuo possesso'
                                            )}
                                        </span>
                                    </div>

                                    {/* Già in mio possesso controls */}
                                    <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-1.5">
                                        <span className="text-xs text-gray-500">
                                            Pezzi che ho già disponibili a casa
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => decrementOwned(item.id)}
                                                disabled={owned === 0}
                                                className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-brand hover:text-brand disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-colors"
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="text-sm font-semibold text-gray-700 w-5 text-center">
                                                {owned}
                                            </span>
                                            <button
                                                onClick={() => incrementOwned(item.id, item.quantity)}
                                                disabled={owned >= item.quantity}
                                                className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-brand hover:text-brand disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-colors"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 bg-white rounded-b-2xl px-5 py-4">
                    {/* Total */}
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-gray-500">Totale da acquistare</span>
                        <div className="flex items-center">
                            <span className="text-2xl font-bold text-gray-700">
                                {totalPrice.toFixed(2)}
                            </span>
                            <span className="ml-1 text-xs uppercase tracking-wide text-gray-400">
                                &euro;
                            </span>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="cursor-pointer px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            {/* Continua a configurare */}
                        </button>
                        <button
                            onClick={saveToPdf}
                            disabled={totalItems === 0}
                            className="cursor-pointer md:flex-1 px-4 py-3 bg-white border border-brand hover:bg-teal-600 hover:text-white disabled:bg-gray-400 text-brand rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2"
                        >
                            <Save className="w-4 h-4" />
                            <span className='hidden md:inline'>
                                Salva configurazione
                            </span>
                        </button>
                        <button
                            onClick={handleAddToCart}
                            disabled={totalItems === 0}
                            className="cursor-pointer flex-1 px-4 py-3 bg-brand hover:bg-teal-600 disabled:bg-gray-400 text-white rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2"
                        >

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="w-8 h-8" viewBox="0 0 40 40"><path fill="currentColor" fill-rule="evenodd" d="M15.75 11.8h-3.16l-.77 11.6a5 5 0 0 0 4.99 5.34h7.38a5 5 0 0 0 4.99-5.33L28.4 11.8zm0 1h-2.22l-.71 10.67a4 4 0 0 0 3.99 4.27h7.38a4 4 0 0 0 4-4.27l-.72-10.67h-2.22v.63a4.75 4.75 0 1 1-9.5 0zm8.5 0h-7.5v.63a3.75 3.75 0 1 0 7.5 0z"></path></svg>
                            {/* <ShoppingCart className="w-4 h-4" /> */}

                            Aggiungi al carrello
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
