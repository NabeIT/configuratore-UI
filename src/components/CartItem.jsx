export default function CartItem({ item }) {
    return (
        <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
            <img
                src={item.image}
                alt={item.title}
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                onError={(e) => {
                    e.currentTarget.src = '/assets/img/thumbs/spalliera-base.png';
                }}
            />
            <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-800 truncate">{item.title}</h3>
                <p className="text-xs text-gray-400 truncate">{item.description}</p>
                {/* <span className="text-xs text-white truncate bg-gray-800 rounded-2xl px-2 py-0.5 mr-auto">{item.meta?.price ? `${item.meta.price} €` : 'Incluso'}</span> */}
            </div>
            <div className="flex items-center gap-1 flex-shrink-0 text-sm font-semibold text-gray-700">
                <span>x{item.quantity}</span>
            </div>
        </div>
    );
}
