import { useCallback, useEffect, useRef, useState } from 'react';

import { useActionContext } from './ActionContext';
import { useStateContext } from './StateContext';
import { getCascadeZoneTypes, getPlacementOptions, getPreferredTargetZoneKey, resolveZoneType } from '../utils/dropZonePlacement';
import { EyeOff, ScanEye } from 'lucide-react';

const MSG_PREFIX = 'configurator:';

export default function ConfiguratorView({ iframeSrc, items, onSceneState, onSceneColor, quickAddRequest, setSelectedItem, presetRequest, isViewMode = false, onViewModeChange }) {
    const iframeRef = useRef(null);
    const lastQuickAddIdRef = useRef(null);
    const lastPresetIdRef = useRef(null);
    const iframeReadyRef = useRef(false);
    const pendingBatchDropRef = useRef(false);
    const availableZonesRequestSeqRef = useRef(0);
    const activeAvailableZonesRequestRef = useRef({ requestId: null, editedItemId: null });
    const previousEditedItemIdRef = useRef(null);
    const catalogItemsRef = useRef(items);
    const editedItemRef = useRef(null);
    const isViewModeRef = useRef(isViewMode);
    const onSceneStateRef = useRef(onSceneState);
    const onSceneColorRef = useRef(onSceneColor);
    const setSelectedItemRef = useRef(setSelectedItem);
    const stateSetSelectedItemRef = useRef(null);
    const setEditedItemRef = useRef(null);
    const setAvailableDropZonesRef = useRef(null);
    const [iframeReady, setIframeReady] = useState(false);
    const [isDraggingOver, setIsDraggingOver] = useState(false);

    const { action, clearAction } = useActionContext();

    const { setSelectedItem: stateSetSelectedItem, setEditedItem, editedItem, availableDropZones, setAvailableDropZones } = useStateContext();

    useEffect(() => {
        catalogItemsRef.current = items;
    }, [items]);

    useEffect(() => {
        editedItemRef.current = editedItem;
    }, [editedItem]);

    useEffect(() => {
        isViewModeRef.current = isViewMode;
    }, [isViewMode]);

    useEffect(() => {
        onSceneStateRef.current = onSceneState;
    }, [onSceneState]);

    useEffect(() => {
        onSceneColorRef.current = onSceneColor;
    }, [onSceneColor]);

    useEffect(() => {
        setSelectedItemRef.current = setSelectedItem;
    }, [setSelectedItem]);

    useEffect(() => {
        stateSetSelectedItemRef.current = stateSetSelectedItem;
    }, [stateSetSelectedItem]);

    useEffect(() => {
        setEditedItemRef.current = setEditedItem;
    }, [setEditedItem]);

    useEffect(() => {
        setAvailableDropZonesRef.current = setAvailableDropZones;
    }, [setAvailableDropZones]);

    const postToIframe = useCallback((message) => {
        const iframeWindow = iframeRef.current?.contentWindow;
        if (!iframeWindow) return;
        iframeWindow.postMessage(message, '*');
    }, []);

    const sendOrbitCommand = useCallback((payload) => {
        postToIframe({
            type: `${MSG_PREFIX}orbitCamera`,
            payload,
        });
    }, [postToIframe]);

    const enterViewMode = useCallback(() => {
        onViewModeChange?.(true);
        sendOrbitCommand({ phase: 'start', restore: true });
    }, [onViewModeChange, sendOrbitCommand]);

    const exitViewMode = useCallback(() => {
        onViewModeChange?.(false);
        sendOrbitCommand({ phase: 'end', restore: true });
    }, [onViewModeChange, sendOrbitCommand]);

    const toggleViewMode = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isViewMode) {
            exitViewMode();
            return;
        }

        enterViewMode();
    }, [enterViewMode, exitViewMode, isViewMode]);

    useEffect(() => {
        return () => {
            if (isViewModeRef.current) {
                sendOrbitCommand({ phase: 'cancel', restore: true });
            }
        };
    }, [sendOrbitCommand]);

    useEffect(() => {
        if (!isViewMode) return;

        const handleKeyDown = (e) => {
            if (e.key !== 'Escape') return;
            e.preventDefault();
            exitViewMode();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [exitViewMode, isViewMode]);

    const sendDrop = useCallback((item, position) => {
        if (!item) return;

        postToIframe({
            type: `${MSG_PREFIX}drop`,
            item,
            position,
        });



    }, [postToIframe]);


    const requestAvailableZones = useCallback((item) => {
        const types = getCascadeZoneTypes(item);
        if (types.length === 0) {
            activeAvailableZonesRequestRef.current = { requestId: null, editedItemId: item?.id ?? null };
            return null;
        }

        const requestId = `${item?.id ?? "scene"}:${++availableZonesRequestSeqRef.current}`;
        activeAvailableZonesRequestRef.current = {
            requestId,
            editedItemId: item?.id ?? null,
        };

        postToIframe({
            type: `${MSG_PREFIX}getAvailableZones`,
            types,
            requestId,
        });
        return requestId;
    }, [postToIframe]);

    const requestSceneStateRefresh = useCallback(() => {
        postToIframe({ type: `${MSG_PREFIX}getSceneState` });
        window.setTimeout(() => {
            postToIframe({ type: `${MSG_PREFIX}getSceneState` });
        }, 120);
        window.setTimeout(() => {
            postToIframe({ type: `${MSG_PREFIX}getSceneState` });
        }, 350);
    }, [postToIframe]);

    useEffect(() => {
        const previousEditedItemId = previousEditedItemIdRef.current;
        const nextEditedItemId = editedItem?.id ?? null;
        previousEditedItemIdRef.current = nextEditedItemId;

        if (!editedItem) {
            activeAvailableZonesRequestRef.current = { requestId: null, editedItemId: null };
            setAvailableDropZones?.({});
            return;
        }

        if (previousEditedItemId !== nextEditedItemId) {
            setAvailableDropZones?.({});
        }
        requestAvailableZones(editedItem);
    }, [editedItem, requestAvailableZones, setAvailableDropZones]);


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
            if (e.source !== iframe.contentWindow) return;
            const data = e.data;
            if (!data || typeof data.type !== 'string') return;
            if (!data.type.startsWith(MSG_PREFIX)) return;

            const payload = data.payload ?? data;
            const activeEditedItem = editedItemRef.current;

            if (data.type === `${MSG_PREFIX}init`) {
                postToIframe({ type: `${MSG_PREFIX}setAvailableItems`, items: catalogItemsRef.current });
                requestSceneStateRefresh();
                return;
            }

            if (data.type === `${MSG_PREFIX}availableZones`) {
                const responseRequestId =
                    payload?.requestId
                    ?? data?.requestId
                    ?? null;
                const activeRequest = activeAvailableZonesRequestRef.current;

                if (responseRequestId && activeRequest.requestId && responseRequestId !== activeRequest.requestId) {
                    return;
                }

                if (activeRequest.editedItemId && editedItemRef.current?.id && activeRequest.editedItemId !== editedItemRef.current.id) {
                    return;
                }

                setAvailableDropZonesRef.current?.(payload.zones);
                return;
            }

            if (data.type === `${MSG_PREFIX}ready`) {
                iframeReadyRef.current = true;
                setIframeReady(true);
                requestSceneStateRefresh();

                setTimeout(() => {
                    postToIframe({
                        type: `${MSG_PREFIX}zoomCamera`,
                        delta: 7
                    });
                }, 100);
                return;
            }

            if (data.type === `${MSG_PREFIX}viewModeExit`) {
                onViewModeChange?.(false);
                return;
            }

            if (data.type === `${MSG_PREFIX}itemAdded` || data.type === `${MSG_PREFIX}itemRemoved`) {
                if (data.type === `${MSG_PREFIX}itemAdded`) {
                    pendingBatchDropRef.current = false;
                }
                requestSceneStateRefresh();
                if (editedItemRef.current) {
                    requestAvailableZones(editedItemRef.current);
                }
                return;
            }

            if (data.type === `${MSG_PREFIX}itemMoved` || data.type === `${MSG_PREFIX}batchDropComplete`) {
                pendingBatchDropRef.current = false;
                requestSceneStateRefresh();
                if (editedItemRef.current) {
                    requestAvailableZones(editedItemRef.current);
                }
                return;
            }

            if (data.type === `${MSG_PREFIX}sceneCleared`) {
                setAvailableDropZonesRef.current?.({});
                onSceneStateRef.current?.([]);
                return;
            }
            if (data.type === `${MSG_PREFIX}itemSelected`) {
                setSelectedItemRef.current?.(payload.item);
                stateSetSelectedItemRef.current?.(payload.item);
                return;
            }
            if (data.type === `${MSG_PREFIX}itemDeselected`) {
                setSelectedItemRef.current?.(null);
                stateSetSelectedItemRef.current?.(null);

                return;
            }
            if (data.type === `${MSG_PREFIX}editItemOn`) {

                setEditedItemRef.current?.(payload.item);
                return;
            }
            if (data.type === `${MSG_PREFIX}editItemOff`) {
                activeAvailableZonesRequestRef.current = { requestId: null, editedItemId: null };
                setEditedItemRef.current?.(null);
                setAvailableDropZonesRef.current?.({});
                return;
            }

            if (data.type === `${MSG_PREFIX}sceneState`) {
                onSceneStateRef.current?.(payload);

                if (pendingBatchDropRef.current) {
                    return;
                }

                if (activeEditedItem?.id && Array.isArray(payload?.items)) {
                    const nextEditedItem = payload.items.find((item) => item?.id === activeEditedItem.id) ?? null;

                    if (nextEditedItem) {
                        setEditedItemRef.current?.(nextEditedItem);
                    } else {
                        activeAvailableZonesRequestRef.current = { requestId: null, editedItemId: null };
                        setEditedItemRef.current?.(null);
                        setAvailableDropZonesRef.current?.({});
                    }
                }
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
                    onSceneColorRef.current?.(nextColor);
                }
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [onViewModeChange, postToIframe, requestAvailableZones, requestSceneStateRefresh]);

    useEffect(() => {
        if (!quickAddRequest?.item) return;
        if (quickAddRequest.id === lastQuickAddIdRef.current) return;

        const zoneType = resolveZoneType(quickAddRequest.item);
        const { hasLoadedZoneType, zones } = getPlacementOptions(
            quickAddRequest.item,
            editedItem,
            availableDropZones
        );

        if (editedItem && zoneType && !hasLoadedZoneType) {
            requestAvailableZones(editedItem);
            return;
        }

        const targetZoneKey = zones[0]?.zoneKey
            ?? getPreferredTargetZoneKey(
                quickAddRequest.item,
                editedItem,
                availableDropZones
            );

        if (targetZoneKey) {
            lastQuickAddIdRef.current = quickAddRequest.id;
            pendingBatchDropRef.current = true;
            activeAvailableZonesRequestRef.current = { requestId: null, editedItemId: editedItem?.id ?? null };
            postToIframe({
                type: `${MSG_PREFIX}drop`,
                item: { ...quickAddRequest.item, targetZoneKey },
            });
            return;
        }

        if (editedItem && zoneType) {
            requestAvailableZones(editedItem);
            return;
        }

        lastQuickAddIdRef.current = quickAddRequest.id;

        const iframe = iframeRef.current;
        if (!iframe) return;

        const rect = iframe.getBoundingClientRect();
        sendDrop(quickAddRequest.item, {
            x: rect.width / 2,
            y: rect.height / 2,
        });
    }, [availableDropZones, editedItem, postToIframe, quickAddRequest, requestAvailableZones, sendDrop]);

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

        pendingBatchDropRef.current = true;
        postToIframe({
            type: `${MSG_PREFIX}batchDrop`,
            items: itemsToDrop,
        })

    }, [presetRequest, items, postToIframe, iframeReady]);


    return (
        <main className={`flex-1 bg-gray-100 flex flex-col relative ${isViewMode ? 'fixed inset-0 z-[60]' : ''}`}>
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
                    <button
                        type="button"
                        aria-label={isViewMode ? 'Esci dalla modalità visualizzazione' : 'Entra in modalità visualizzazione'}
                        title={isViewMode ? 'Esci dalla modalità visualizzazione' : 'Modalità visualizzazione'}
                        className={`absolute right-4 ${isViewMode ? 'top-4' : 'top-16 md:top-4'} z-[80] flex h-12 w-12 items-center justify-center rounded-full border shadow-2xl backdrop-blur transition-colors ${isViewMode
                            ? 'border-brand bg-brand text-white'
                            : 'border-white/80 bg-white/85 text-gray-700 hover:border-brand hover:text-brand'
                            }`}
                        style={{ touchAction: 'none' }}
                        onClick={toggleViewMode}
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        {isViewMode ? <EyeOff size={22} strokeWidth={1.8} /> : <ScanEye size={22} strokeWidth={1.8} />}
                    </button>
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
