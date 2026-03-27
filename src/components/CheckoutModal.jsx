import { ArrowLeft, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

export default function CheckoutModal({ cartItems, onClose, onAddToCart }) {
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
        return visibleItems.reduce((sum, item) => {
            const owned = ownedQuantities[item.id] || 0;
            const toBuy = Math.max(item.quantity - owned, 0);
            return sum + toBuy * (item.meta?.price || 0);
        }, 0);
    }, [visibleItems, ownedQuantities]);

    const totalItems = useMemo(() => {
        return visibleItems.reduce((sum, item) => {
            const owned = ownedQuantities[item.id] || 0;
            return sum + Math.max(item.quantity - owned, 0);
        }, 0);
    }, [visibleItems, ownedQuantities]);

    const handleAddToCart = () => {
        const itemsToAdd = visibleItems
            .map((item) => {
                const owned = ownedQuantities[item.id] || 0;
                const toBuy = Math.max(item.quantity - owned, 0);
                return {
                    id: item.id,
                    model: item.model,
                    title: item.title,
                    quantity: toBuy,
                    ownedQuantity: owned,
                    totalQuantity: item.quantity,
                    meta: item.meta,
                    itemIds: item.itemIds,
                };
            })
            .filter((item) => item.quantity > 0);

        onAddToCart({
            items: itemsToAdd,
            totalPrice,
            totalItems,
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-lg mx-4 max-h-[90dvh] bg-gray-50 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
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
                                className="bg-white rounded-xl border border-gray-100 shadow-sm p-3"
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                                        onError={(e) => {
                                            e.currentTarget.src = '/assets/img/thumbs/spalliera-base.png';
                                        }}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-medium text-gray-800 truncate">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs text-gray-400 truncate">
                                            {item.description}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs text-white bg-gray-800 rounded-2xl px-2 py-0.5">
                                                {item.meta?.price ? `${item.meta.price} \u20ac` : 'Incluso'}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                x{item.quantity} nella configurazione
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Owned quantity controls */}
                                <div className="mt-3 flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                                    <span className="text-xs text-gray-500">
                                        Gi&agrave; in mio possesso
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => decrementOwned(item.id)}
                                            disabled={owned === 0}
                                            className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-teal-400 hover:text-teal-600 disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-colors"
                                        >
                                            <Minus className="w-3 h-3" />
                                        </button>
                                        <span className="text-sm font-semibold text-gray-700 w-6 text-center">
                                            {owned}
                                        </span>
                                        <button
                                            onClick={() => incrementOwned(item.id, item.quantity)}
                                            disabled={owned >= item.quantity}
                                            className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-teal-400 hover:text-teal-600 disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-colors"
                                        >
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>

                                {/* Per-item summary */}
                                {toBuy > 0 && item.meta?.price ? (
                                    <div className="mt-2 flex justify-between items-center px-1">
                                        <span className="text-xs text-gray-400">
                                            {toBuy} da acquistare
                                        </span>
                                        <span className="text-sm font-semibold text-gray-700">
                                            {itemPrice.toFixed(2)} &euro;
                                        </span>
                                    </div>
                                ) : toBuy === 0 ? (
                                    <div className="mt-2 px-1">
                                        <span className="text-xs text-teal-600 font-medium">
                                            Gi&agrave; in tuo possesso
                                        </span>
                                    </div>
                                ) : null}
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
                            className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Continua a configurare
                        </button>
                        <button
                            onClick={handleAddToCart}
                            disabled={totalItems === 0}
                            className="flex-1 px-4 py-3 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2"
                        >
                            <ShoppingCart className="w-4 h-4" />
                            Aggiungi al carrello
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
