export default function CartItem({ item, onIncrement, onDecrement }) {
    return (
        <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
            <img
                src={item.image}
                alt={item.title}
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-800 truncate">{item.title}</h3>
                <p className="text-xs text-gray-400 truncate">{item.description}</p>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
                <button
                    onClick={() => onDecrement(item.id)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors text-sm font-medium"
                    aria-label="Diminuisci quantità"
                >
                    −
                </button>
                <span className="w-8 text-center text-sm font-semibold text-gray-700">
                    {item.quantity}
                </span>
                <button
                    onClick={() => onIncrement(item.id)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-colors text-sm font-medium"
                    aria-label="Aumenta quantità"
                >
                    +
                </button>
            </div>
        </div>
    );
}
