import { actions, useActionContext } from './ActionContext';
import { useCallback, useEffect, useRef, useState } from 'react';

import { ArrowBigDown } from 'lucide-react';
import CatalogItem from './CatalogItem';
import { Minimize2 } from 'lucide-react';
import { ModalConfirmDelete } from './ConfirmModals';
import { Trash2 } from 'lucide-react';
import { X } from 'lucide-react';
import { getCascadeZoneTypes } from '../utils/dropZonePlacement';
import { useMemo } from 'react';
import { useStateContext } from './StateContext';

export default function LeftSidebar({ items, onDragStart, onQuickAdd, catalogExpanded, setCatalogExpanded }) {
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
    const scrollRef = useRef(null);


    const { selectedItem, editedItem } = useStateContext();


    const { performAction, clearAction } = useActionContext();

    // Sync with parent: when parent says collapse, reset local index
    useEffect(() => {
        if (!catalogExpanded) {
            setExpandedIndex(null);
        }
    }, [catalogExpanded]);

    const handleExpand = useCallback((index) => {
        setExpandedIndex(index);
        setCatalogExpanded(true);
        // Scroll to the clicked item after render (instant, no animation)
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const container = scrollRef.current;
                if (!container) return;
                const cards = container.querySelectorAll('[data-carousel-card]');
                if (cards[index]) {
                    cards[index].scrollIntoView({ behavior: 'instant', inline: 'center', block: 'nearest' });
                }
            });
        });
    }, [setCatalogExpanded]);

    const handleCollapse = useCallback(() => {
        setExpandedIndex(null);
        setCatalogExpanded(false);
    }, [setCatalogExpanded]);

    const isExpanded = expandedIndex !== null;

    const closeEditMode = () => {
        performAction(actions.EDI_ITEM_OFF, { modelId: editedItem.modelId });
    }

    const removeEditedModule = () => {
        if (!editedItem?.id) return;
        performAction(actions.REMOVE_ITEM, { id: editedItem.id });
        setShowRemoveConfirm(false);
    }

    const baseItems = useMemo(() => {
        return items.filter(i => i.type === "object");
    }, [items]);



    const itemsFiltered = useMemo(() => {
        if (editedItem?.type === "object") {
            const dropZonesUnique = getCascadeZoneTypes(editedItem);
            return items.filter(i => dropZonesUnique.includes(i.zoneType) || i.variants?.some(v => dropZonesUnique.includes(v.zoneType)));
        }
        return [];

    }, [editedItem, items]);

    const availableColors = useMemo(() => {
        return ["wood", "white"]
    }, []);
    const availableColorsLabels = useMemo(() => {
        return ["Legno naturale", "Bio paint bianco 9010"]
    }, []);

    const getCatalogKey = (item, index) => `${item.modelId || item.id || item.name || item.title}-${index}`;

    const changeColor = (color) => {
        performAction(actions.CHANGE_COLOR, { color });
    }

    return (
        <>
            {!editedItem && (


                <aside className="
        w-full border-gray-200  flex fixed top-14 left-0 right-0 z-50 
        h-auto
        bottom-auto
                bg-white
        flex-col
    md:bg-gray-50  md:w-90
        md:top-20 md:left-6 md:right-auto 
        md:rounded-2xl
        md:shadow-2xl
        ">
                    {availableColors.length > 0 && (
                        <div className="px-4 md:py-3 md:border-b border-gray-200  md:block">
                            <h2 className="text-xs text-center md:text-left md:text-sm font-semibold text-gray-700">Colori disponibili</h2>
                            <p className="hidden md:block text-xs text-gray-400 mt-0.5">Scegli il colore per i tuoi moduli</p>
                        </div>
                    )}
                    {availableColors.length > 0 && (
                        <div className="flex flex-row items-center gap-3 px-4 py-1  md:py-3 justify-center md:ml-0">
                            {availableColors.map(color => (
                                <div key={color} onClick={() => changeColor(color)} className='flex flex-row items-center gap-1 border-1 border-brand rounded-lg cursor-pointer p-1 pr-2'>
                                    <div className={`w-6 h-6 rounded-full border ${color === "wood" ? "bg-[url('https://cdn.shopify.com/s/files/1/0659/2708/6299/files/legno.webp?v=1731412759')]" : "bg-gray-50"} cursor-pointer border-gray-400`} />
                                    <span className='text-xs font-semibold'>{availableColorsLabels[availableColors.indexOf(color)]}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </aside>
            )}
            <aside className="
        
        w-full   border-r border-gray-200 flex-row flex fixed bottom-16 left-0 right-0 z-50 
        
        
        md:bg-gray-50 md:flex-col md:w-82
        md:fixed md:top-auto md:left-6 md:right-auto md:bottom-6
        md:rounded-2xl
        md:shadow-2xl
    
        ">
                <div className="px-4 py-3 border-b border-gray-200 hidden md:block">
                    <h2 className="text-sm font-semibold text-gray-700">{editedItem ? "Configura oggetto" : "Inizia da qui!"}</h2>
                    <p className="text-xs text-gray-400 mt-0.5">{editedItem ? "Personalizza l'oggetto selezionato" : "Inserisci i moduli base da configurare"}</p>
                </div>

                {/* Desktop: vertical list */}
                <div className="hidden md:flex flex-1  p-3 space-y-2 flex-col w-full ">
                    {baseItems.map((item, index) => (
                        <div key={getCatalogKey(item, index)} className={`  ${editedItem && editedItem?.modelId === item.modelId && itemsFiltered.length > 0 ? "  bg-brand/75 bg-linear-to-r from-brand/80 to-brand shadow-2xl/60 p-4 w-90 -ml-6 -mt-3" : ""}  transition-all rounded-xl ${!editedItem || editedItem?.modelId === item.modelId ? "" : "opacity-30 pointer-events-none hidden"} `}>

                            {editedItem && editedItem?.modelId === item.modelId && itemsFiltered.length > 0 && (
                                <div onClick={closeEditMode} className='absolute bottom-full left-full z-50 bg-white shadow-2xl/100 rounded-full p-2 text-xs -translate-x-1/2 translate-y-1/2 cursor-pointer'>
                                    <X size={20} />
                                </div>
                            )}

                            <CatalogItem item={item} onDragStart={onDragStart} onQuickAdd={onQuickAdd} />
                            {editedItem && editedItem?.modelId === item.modelId && itemsFiltered.length > 0 && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => setShowRemoveConfirm(true)}
                                        className="mt-3 w-full cursor-pointer rounded-lg border border-white/50 bg-white/95 px-3 py-2 text-xs font-semibold text-red-700 shadow-sm transition-colors hover:bg-red-50 flex items-center justify-center gap-2"
                                    >
                                        <Trash2 size={15} strokeWidth={1.8} />
                                        Rimuovi modulo
                                    </button>
                                    <div className="p-2  gap-2 flex flex-col">
                                        <span className='font-bold text-xs text-center text-white'>Aggiungi pezzi all'oggetto</span>
                                        <ArrowBigDown size={20} className="mx-auto opacity-50" color='white' />
                                        {itemsFiltered.map((variant, variantIndex) => (
                                            <CatalogItem key={getCatalogKey(variant, variantIndex)} item={variant} onDragStart={onDragStart} onQuickAdd={onQuickAdd} />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                {/* Mobile: round dots (collapsed) */}
                {!isExpanded && (
                    <div className="flex md:hidden flex-1 overflow-x-auto p-3 flex-row gap-3 w-full">
                        {[...(itemsFiltered.length > 0 ? itemsFiltered : baseItems)].map((item, index) => (
                            <CatalogItem
                                key={getCatalogKey(item, index)}
                                item={item}
                                onDragStart={onDragStart}
                                onQuickAdd={onQuickAdd}
                                mobileMode="collapsed"
                                onMobileExpand={() => handleExpand(index)}
                            />
                        ))}
                    </div>
                )}

                {/* Mobile: carousel of expanded cards */}
                {isExpanded && (
                    <div className="md:hidden fixed inset-x-0 bottom-16 z-50">
                        <button
                            onClick={handleCollapse}
                            className="absolute top-0 right-3 z-10 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md border border-gray-200"
                        >
                            <Minimize2 size={14} strokeWidth={2} />
                        </button>
                        <div
                            ref={scrollRef}
                            className="flex overflow-x-auto snap-x snap-mandatory gap-3 px-[7.5vw] py-3 scrollbar-hide"
                        >
                            {[...(itemsFiltered.length > 0 ? itemsFiltered : baseItems)].map((item, index) => (
                                <CatalogItem
                                    key={getCatalogKey(item, index)}
                                    item={item}
                                    onDragStart={onDragStart}
                                    onQuickAdd={onQuickAdd}
                                    mobileMode="expanded"
                                    onMobileCollapse={handleCollapse}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </aside>
            {showRemoveConfirm && (
                <ModalConfirmDelete
                    onConfirm={removeEditedModule}
                    onClose={() => setShowRemoveConfirm(false)}
                />
            )}
        </>
    );
    // return (
    //     <aside className="w-full md:w-82 flex-shrink-0 md:bg-gray-50 border-r border-gray-200 flex-row flex md:flex-col fixed bottom-16 left-0 right-0 z-50 md:relative md:top-auto md:left-auto md:right-auto md:bottom-auto">
    //         <div className="px-4 py-3 border-b border-gray-200 hidden md:block">
    //             <h2 className="text-sm font-semibold text-gray-700">Moduli base</h2>
    //             <p className="text-xs text-gray-400 mt-0.5">Trascina gli elementi nel configuratore</p>
    //         </div>

    //         {/* Desktop: vertical list */}
    //         <div className="hidden md:flex flex-1  p-3 space-y-2 flex-col w-full">
    //             {baseItems.map((item) => (
    //                 <div className={`relative  ${editedItem && editedItem?.modelId === item.modelId && itemsFiltered.length > 0 ? "  bg-teal-600/75 bg-linear-to-r from-teal-600/20 to-teal-600 shadow-2xl/60 p-4 w-90 ml-6" : ""}  transition-all  rounded-xl ${!editedItem || editedItem?.modelId === item.modelId ? "" : "opacity-30 pointer-events-none"} `}>

    //                     {editedItem && editedItem?.modelId === item.modelId && itemsFiltered.length > 0 && (
    //                         <div onClick={closeEditMode} className='absolute bottom-full left-full z-50 bg-white shadow-2xl/90 rounded-full p-2 text-xs -translate-x-1/2 translate-y-1/2 cursor-pointer'>
    //                             <X size={20} />
    //                         </div>
    //                     )}

    //                     <CatalogItem key={item.id} item={item} onDragStart={onDragStart} onQuickAdd={onQuickAdd} />
    //                     {editedItem && editedItem?.modelId === item.modelId && itemsFiltered.length > 0 && (
    //                         <>
    //                             <div className="p-2  gap-2 flex flex-col">
    //                                 <span className='font-bold text-xs text-center text-white'>Aggiungi pezzi all'oggetto</span>
    //                                 <ArrowBigDown size={20} className="mx-auto opacity-50" color='white' />
    //                                 {itemsFiltered.map(variant => (
    //                                     <CatalogItem key={variant.id} item={variant} onDragStart={onDragStart} onQuickAdd={onQuickAdd} />
    //                                 ))}
    //                             </div>
    //                         </>
    //                     )}
    //                 </div>
    //             ))}
    //         </div>

    //         {/* Mobile: round dots (collapsed) */}
    //         {!isExpanded && (
    //             <div className="flex md:hidden flex-1 overflow-x-auto p-3 flex-row gap-3 w-full">
    //                 {[...(itemsFiltered.length > 0 ? itemsFiltered : baseItems)].map((item, index) => (
    //                     <CatalogItem
    //                         key={item.id}
    //                         item={item}
    //                         onDragStart={onDragStart}
    //                         onQuickAdd={onQuickAdd}
    //                         mobileMode="collapsed"
    //                         onMobileExpand={() => handleExpand(index)}
    //                     />
    //                 ))}
    //             </div>
    //         )}

    //         {/* Mobile: carousel of expanded cards */}
    //         {isExpanded && (
    //             <div className="md:hidden fixed inset-x-0 bottom-16 z-50">
    //                 <button
    //                     onClick={handleCollapse}
    //                     className="absolute top-0 right-3 z-10 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md border border-gray-200"
    //                 >
    //                     <Minimize2 size={14} strokeWidth={2} />
    //                 </button>
    //                 <div
    //                     ref={scrollRef}
    //                     className="flex overflow-x-auto snap-x snap-mandatory gap-3 px-[7.5vw] py-3 scrollbar-hide"
    //                 >
    //                     {[...(itemsFiltered.length > 0 ? itemsFiltered : baseItems)].map((item, index) => (
    //                         <CatalogItem
    //                             key={item.id}
    //                             item={item}
    //                             onDragStart={onDragStart}
    //                             onQuickAdd={onQuickAdd}
    //                             mobileMode="expanded"
    //                             onMobileCollapse={handleCollapse}
    //                         />
    //                     ))}
    //                 </div>
    //             </div>
    //         )}
    //     </aside>
    // );
}
