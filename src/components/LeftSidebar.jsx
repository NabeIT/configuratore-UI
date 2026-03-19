import CatalogItem from './CatalogItem';

export default function LeftSidebar({ items, onDragStart, onQuickAdd }) {
    return (
        <aside className="w-full md:w-82 flex-shrink-0 md:bg-gray-50 border-r border-gray-200 flex-row flex md:flex-col fixed bottom-16 left-0 right-0 z-50 md:relative md:top-auto md:left-auto md:right-auto md:bottom-auto">
            <div className="px-4 py-3 border-b border-gray-200 hidden md:block">
                <h2 className="text-sm font-semibold text-gray-700">Catalogo</h2>
                <p className="text-xs text-gray-400 mt-0.5">Trascina gli elementi nel configuratore</p>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2 flex-row flex md:flex-col gap-3 w-full overflow-x-auto">
                {items.map((item) => (
                    <CatalogItem key={item.id} item={item} onDragStart={onDragStart} onQuickAdd={onQuickAdd} />
                ))}
            </div>
        </aside>
    );
}
