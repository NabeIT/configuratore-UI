import { useCallback, useEffect, useRef, useState } from 'react';

import { useActionContext } from './ActionContext';
import { useStateContext } from './StateContext';

const MSG_PREFIX = 'configurator:';

export default function ConfiguratorView({ iframeSrc, items, onSceneState, onSceneColor, quickAddRequest, setSelectedItem, presetRequest }) {
    const iframeRef = useRef(null);
    const lastQuickAddIdRef = useRef(null);
    const lastPresetIdRef = useRef(null);
    const iframeReadyRef = useRef(false);
    const [iframeReady, setIframeReady] = useState(false);
    const [isDraggingOver, setIsDraggingOver] = useState(false);

    const { action, clearAction } = useActionContext();

    const { setSelectedItem: stateSetSelectedItem, setEditedItem, editedItem, setAvailableDropZones } = useStateContext();

    const postToIframe = useCallback((message) => {
        const iframeWindow = iframeRef.current?.contentWindow;
        if (!iframeWindow) return;
        iframeWindow.postMessage(message, '*');
    }, []);

    const sendDrop = useCallback((item, position) => {
        if (!item) return;

        postToIframe({
            type: `${MSG_PREFIX}drop`,
            item,
            position,
        });



    }, [postToIframe]);


    useEffect(() => {
        if (postToIframe && editedItem) {
            const dropZones = editedItem.dropZones.filter(d => !!d.cascade).map(dz => dz.acceptTypes).flat();
            const dropZonesUnique = [...new Set(dropZones)];
            postToIframe({
                type: `${MSG_PREFIX}getAvailableZones`,
                types: dropZonesUnique,
            });
        }
    }, [editedItem, postToIframe]);


    useEffect(() => {
        if (!action || !postToIframe) return;

        if (action.type === 'changeColor') {
            const requestedColor = action.payload?.color;
            if (typeof requestedColor === 'string') {
                onSceneColor?.(requestedColor);
            }
        }

        postToIframe({
            type: `${MSG_PREFIX}${action.type}`,
            payload: action.payload,
        });
        clearAction();

    }, [action, clearAction, onSceneColor, postToIframe]);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    }, []);

    const handleDragEnter = useCallback((e) => {
        e.preventDefault();
        setIsDraggingOver(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        if (e.currentTarget === e.target) {
            setIsDraggingOver(false);
            e.currentTarget.style.pointerEvents = 'none';
        }
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDraggingOver(false);
        e.currentTarget.style.pointerEvents = 'none';

        const iframe = iframeRef.current;
        if (!iframe) return;

        // Calcola la posizione del drop relativa all'iframe
        const rect = iframe.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        try {
            const raw = e.dataTransfer.getData('application/json');
            if (!raw) return;
            const item = JSON.parse(raw);

            sendDrop(item, { x, y });
        } catch {
            // dati drag non validi
        }
    }, [sendDrop]);



    // useEffect(() => {

    //     if (!availableItems) return;

    //     const cubo = availableItems.find(i => i.id === "cubo-scaffale");
    //     if (!cubo) return;

    //     addItem({
    //         ...cubo,
    //         ...cubo.variants ? cubo.variants[cubo.variant ?? 0] : {},
    //     });
    //     invalidate();


    //     const mensola = availableItems.find(i => i.id === "mensola-montessoriana");

    //     if (!mensola) return;
    //     setTimeout(() => {
    //         addItem({
    //             ...mensola,
    //             ...mensola.variants ? mensola.variants[mensola.variant ?? 0] : {},
    //         });
    //         invalidate();
    //     }, 1000);

    // }, []);


    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        const handleMessage = (e) => {
            console.log('Message received from iframe:', e.data);
            if (e.source !== iframe.contentWindow) return;
            const data = e.data;
            if (!data || typeof data.type !== 'string') return;
            if (!data.type.startsWith(MSG_PREFIX)) return;

            const payload = data.payload ?? data;

            if (data.type === `${MSG_PREFIX}init`) {
                postToIframe({ type: `${MSG_PREFIX}setAvailableItems`, items });
                postToIframe({ type: `${MSG_PREFIX}getSceneState` });
                return;
            }

            if (data.type === `${MSG_PREFIX}availableZones`) {
                setAvailableDropZones(payload.zones);
            }

            if (data.type === `${MSG_PREFIX}ready`) {
                iframeReadyRef.current = true;
                setIframeReady(true);
                postToIframe({ type: `${MSG_PREFIX}getSceneState` });

                setTimeout(() => {
                    postToIframe({
                        type: `${MSG_PREFIX}zoomCamera`,
                        delta: 7
                    });
                }, 100);
                return;
            }

            if (data.type === `${MSG_PREFIX}itemAdded` || data.type === `${MSG_PREFIX}itemRemoved`) {
                postToIframe({ type: `${MSG_PREFIX}getSceneState` });

                if (editedItem) {
                    const dropZones = editedItem.dropZones.filter(d => !!d.cascade).map(dz => dz.acceptTypes).flat();
                    const dropZonesUnique = [...new Set(dropZones)];
                    postToIframe({
                        type: `${MSG_PREFIX}getAvailableZones`,
                        types: dropZonesUnique,
                    });
                }
                return;
            }

            if (data.type === `${MSG_PREFIX}sceneCleared`) {
                onSceneState?.([]);
                return;
            }
            if (data.type === `${MSG_PREFIX}itemSelected`) {
                setSelectedItem(payload.item);
                stateSetSelectedItem(payload.item);
                return;
            }
            if (data.type === `${MSG_PREFIX}itemDeselected`) {
                setSelectedItem(null);
                stateSetSelectedItem(null);

                return;
            }
            if (data.type === `${MSG_PREFIX}editItemOn`) {

                setEditedItem(payload.item);
                return;
            }
            if (data.type === `${MSG_PREFIX}editItemOff`) {
                setEditedItem(null);
                return;
            }

            if (data.type === `${MSG_PREFIX}sceneState`) {
                console.log('Scene state received from iframe:', payload);
                onSceneState?.(payload);
                return;
            }

            if (data.type === `${MSG_PREFIX}changeColor`) {
                const nextColor = typeof payload?.color === 'string'
                    ? payload.color
                    : typeof data?.color === 'string'
                        ? data.color
                        : typeof payload === 'string'
                            ? payload
                            : null;

                if (nextColor) {
                    onSceneColor?.(nextColor);
                }
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [editedItem, items, onSceneColor, onSceneState, postToIframe, setAvailableDropZones, setEditedItem, setSelectedItem, stateSetSelectedItem]);

    useEffect(() => {
        if (!quickAddRequest?.item) return;
        if (quickAddRequest.id === lastQuickAddIdRef.current) return;

        lastQuickAddIdRef.current = quickAddRequest.id;

        const iframe = iframeRef.current;
        if (!iframe) return;

        const rect = iframe.getBoundingClientRect();
        sendDrop(quickAddRequest.item, {
            x: rect.width / 2,
            y: rect.height / 2,
        });
    }, [quickAddRequest, sendDrop]);

    // Load preset configuration
    useEffect(() => {
        if (!presetRequest?.preset) return;
        if (presetRequest.id === lastPresetIdRef.current) return;
        if (!iframeReadyRef.current) return;

        lastPresetIdRef.current = presetRequest.id;

        const { steps } = presetRequest.preset;

        // Clear scene first
        postToIframe({ type: `${MSG_PREFIX}clearScene` });

        const itemsToDrop = steps;
        // Drop items with configured delays
        // steps.forEach((step) => {
        //     const catalogItem = items.find((i) => i.modelId === step.modelId);
        //     if (!catalogItem) return;

        //     itemsToDrop.push(catalogItem);
        //     // setTimeout(() => {
        //     //     postToIframe({ type: `${MSG_PREFIX}drop`, item: catalogItem });
        //     // }, step.delay + 300); 
        // });

        postToIframe({
            type: `${MSG_PREFIX}batchDrop`,
            items: itemsToDrop,
        })

    }, [presetRequest, items, postToIframe, iframeReady]);


    return (
        <main className="flex-1 bg-gray-100 flex flex-col relative">
            {iframeSrc ? (
                <>
                    <iframe
                        ref={iframeRef}
                        src={iframeSrc}
                        title="Configuratore 3D"
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                    />
                    {/* Overlay trasparente che intercetta gli eventi drag sopra l'iframe */}
                    <div
                        data-drag-overlay
                        className={`absolute inset-0 z-10 transition-colors ${isDraggingOver ? 'bg-teal-500/10 ring-2 ring-inset ring-teal-400' : ''
                            }`}
                        onDragOver={handleDragOver}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        style={{ pointerEvents: 'none' }}
                    />
                </>
            ) : (
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                        <svg className="w-16 h-16 mx-auto mb-4 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <rect x="2" y="3" width="20" height="14" rx="2" />
                            <path d="M8 21h8M12 17v4" />
                        </svg>
                        <p className="text-sm font-medium">Configuratore 3D</p>
                        <p className="text-xs mt-1">Trascina qui gli elementi dal catalogo</p>
                    </div>
                </div>
            )}
        </main>
    );
}
