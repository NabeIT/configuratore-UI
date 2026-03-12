import CatalogItem from './CatalogItem';

export default function LeftSidebar({ items, onDragStart }) {
    return (
        <aside className="w-82 flex-shrink-0 bg-gray-50 border-r border-gray-200 flex flex-col">
            <div className="px-4 py-3 border-b border-gray-200">
                <h2 className="text-sm font-semibold text-gray-700">Catalogo</h2>
                <p className="text-xs text-gray-400 mt-0.5">Trascina gli elementi nel configuratore</p>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {items.map((item) => (
                    <CatalogItem key={item.id} item={item} onDragStart={onDragStart} />
                ))}
            </div>
        </aside>
    );
}
