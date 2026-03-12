import CartItem from './CartItem';
import { useState } from 'react';

export default function RightSidebar({ cartItems, onIncrement, onDecrement }) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <aside className={` fixed right-6 bottom-6 rounded-2xl w-72 flex-shrink-0 bg-gray-50 border-l border-gray-200 flex flex-col shadow-2xl pb-12`}>

                <div className='flex flex-row border-b border-gray-200 items-end'>
                    <div className="px-4 py-3 flex-1">
                        <h2 className="text-sm font-semibold text-gray-700">Configurazione</h2>
                        <p className="text-xs text-gray-400 mt-0.5">
                            {/* {cartItems.length === 0
                            ? 'Nessun elemento aggiunto'
                            : `${cartItems.length} element${cartItems.length === 1 ? 'o' : 'i'}`} */}

                            2 elementi aggiunti

                        </p>

                    </div>
                    <div className='flex px-3 py-3 text-sm font-bold text-gray-700 mr-4 items-center'>
                        <span className='text-2xl'>1.200€</span>
                    </div>
                </div>
                <div className={`${open ? 'h-80' : 'h-0'}  overflow-y-auto p-3 space-y-2 transition-all duration-300`}>
                    {cartItems.length === 0 && open ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-300">
                            <svg className="w-12 h-12 mb-2 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className="text-xs">Gli elementi appariranno qui</p>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onIncrement={onIncrement}
                                onDecrement={onDecrement}
                            />
                        ))
                    )}
                </div>

            </aside>

            <aside className="w-72 flex-shrink-0 bg-gray-50 border-l border-gray-200 flex flex-col fixed right-6 bottom-6 rounded-2xl flex-row items-center p-3 gap-3">
                <div onClick={() => {
                    setOpen((v) => !v);
                }} className='w-10 h-10 rounded-full bg-amber-200'>

                </div>
                <button
                    onClick={() => alert('Funzionalità di acquisto non implementata')}
                    disabled={cartItems.length === 0}
                    className="flex-1 py-3 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white rounded-lg transition-colors text-sm font-medium"
                >
                    Continua
                </button>
            </aside>

        </>
    );
}
