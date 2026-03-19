import { useRef, useState, useCallback, useEffect } from 'react';
import { Minimize2 } from 'lucide-react';
import CatalogItem from './CatalogItem';

export default function LeftSidebar({ items, onDragStart, onQuickAdd, catalogExpanded, setCatalogExpanded }) {
    const [expandedIndex, setExpandedIndex] = useState(null);
    const scrollRef = useRef(null);

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

    return (
        <aside className="w-full md:w-82 flex-shrink-0 md:bg-gray-50 border-r border-gray-200 flex-row flex md:flex-col fixed bottom-16 left-0 right-0 z-50 md:relative md:top-auto md:left-auto md:right-auto md:bottom-auto">
            <div className="px-4 py-3 border-b border-gray-200 hidden md:block">
                <h2 className="text-sm font-semibold text-gray-700">Catalogo</h2>
                <p className="text-xs text-gray-400 mt-0.5">Trascina gli elementi nel configuratore</p>
            </div>

            {/* Desktop: vertical list */}
            <div className="hidden md:flex flex-1 overflow-y-auto p-3 space-y-2 flex-col gap-3 w-full">
                {items.map((item) => (
                    <CatalogItem key={item.id} item={item} onDragStart={onDragStart} onQuickAdd={onQuickAdd} />
                ))}
            </div>

            {/* Mobile: round dots (collapsed) */}
            {!isExpanded && (
                <div className="flex md:hidden flex-1 overflow-x-auto p-3 flex-row gap-3 w-full">
                    {items.map((item, index) => (
                        <CatalogItem
                            key={item.id}
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
                        {items.map((item, index) => (
                            <CatalogItem
                                key={item.id}
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
    );
}
