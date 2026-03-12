import { useCallback, useEffect, useRef, useState } from 'react';

export default function ConfiguratorView({ iframeSrc, items }) {
    const iframeRef = useRef(null);
    const [isDraggingOver, setIsDraggingOver] = useState(false);

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

            console.log(item)
            // Invia i dati all'iframe via postMessage
            iframe.contentWindow.postMessage(
                {
                    type: 'configurator:drop',
                    item,
                    position: { x, y },
                },
                '*'
            );
        } catch {
            // dati drag non validi
        }
    }, []);




    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;
        const handleMessage = (e) => {
            // Gestisci eventuali messaggi di risposta dall'iframe se necessario
            // console.log('Messaggio ricevuto dall\'iframe:', e.data);
            if (e.data?.type === 'configurator:init') {
                iframe.contentWindow.postMessage({ type: 'configurator:setAvailableItems', items }, '*');
            }
            if (e.data?.type === 'configurator:ready') {

                // iframe.contentWindow.postMessage({ type: 'configurator:setAvailableItems', items }, '*');
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [iframeRef, items]);


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
