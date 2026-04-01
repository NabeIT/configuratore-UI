import { ArrowBigRight, ChevronDown, ShoppingBasket } from 'lucide-react';

import CartItem from './CartItem';
import CheckoutModal from './CheckoutModal';
import { useMemo, useState } from 'react';
import { calculateRealtimeCartTotal } from '../utils/orderPricing';

export default function RightSidebar({ cartItems, rawSceneItems, sceneColor, onAddToCart }) {
    const [open, setOpen] = useState(false);
    const [checkoutOpen, setCheckoutOpen] = useState(false);
    const totalItems = cartItems.reduce((sum, item) => item.meta?.inCart !== false ? sum + item.quantity : sum, 0);
    const totalPrice = useMemo(
        () => calculateRealtimeCartTotal(cartItems, {}, sceneColor),
        [cartItems, sceneColor]
    );

    return (
        <>
            <aside className={`fixed left-0 md:left-auto right-0 bottom-0 rounded-t-xl transition-all ${open ? "right-4 left-4 bottom-4 rounded-2xl shadow-2xl" : "delay-200"}  md:right-6 md:bottom-6 md:rounded-2xl md:w-80 flex-shrink-0 bg-gray-50 border-l border-gray-200 flex flex-col shadow-2xl z-50`}>

                <div className='overflow-hidden h-0 md:h-auto md:flex flex-row  items-end'>
                    <div className="px-4 py-3 flex-1">
                        <h2 className="text-sm font-semibold text-gray-700">Configurazione</h2>
                        <p className="text-xs text-gray-400">
                            {totalItems === 0
                                ? 'Nessun elemento aggiunto'
                                : `${totalItems} ${totalItems === 1 ? 'elemento aggiunto' : 'elementi aggiunti'}`}
                        </p>

                    </div>
                    {/* <div className='flex px-3 py-3 text-sm font-bold text-gray-700 mr-4 items-center'>
                        <span className='text-2xl'>{totalItems}</span>
                        <span className='ml-1 text-xs uppercase tracking-wide text-gray-400'>pz</span>
                    </div> */}
                    <div className='flex px-3 py-3 text-sm font-bold text-gray-700 mr-4 items-center'>
                        <span className='text-2xl'>{totalPrice.toFixed(2)}</span>
                        <span className='ml-1 text-xs uppercase tracking-wide text-gray-400'>€</span>
                    </div>
                </div>
                <div className={`  overflow-y-auto    space-y-2 transition-all duration-300 ${open ? 'max-h-dvh h-80 p-3' : 'h-0 p-0'}`}>
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
                            />
                        ))
                    )}
                </div>


                <aside className="md:w-80 h-16 flex-shrink-0 bg-gray-50  flex flex-col rounded-2xl flex-row items-center p-3 gap-3">
                    <div onClick={() => {
                        setOpen((v) => !v);
                    }} className='w-10 h-10 rounded-full border flex-shrink-0 flex items-center justify-center cursor-pointer text-gray-700 border-teal-300 hover:border-teal-600 transition-colors'>
                        {!open && <ShoppingBasket className='w-5 h-5' />}
                        {open && <ChevronDown className='w-5 h-5' />}
                    </div>


                    <div className='flex-1 flex-row flex items-center md:hidden'>
                        <div className=" flex-1">
                            <h2 className="text-sm font-semibold text-gray-700">Configurazione</h2>
                            <p className="text-xs text-gray-400">
                                {totalItems === 0
                                    ? 'Nessun elemento aggiunto'
                                    : `${totalItems} ${totalItems === 1 ? 'elemento aggiunto' : 'elementi'}`}
                            </p>

                        </div>
                        <div className='flex text-sm font-bold text-gray-700 items-center'>
                            <span className='text-2xl'>{totalPrice.toFixed(2)}</span>
                            <span className='ml-0.5 text-xs uppercase tracking-wide text-gray-400'>€</span>
                        </div>
                    </div>

                    <button
                        onClick={() => setCheckoutOpen(true)}
                        disabled={totalItems === 0}
                        className="flex md:flex-1 px-3 py-3 gap-3 bg-brand  hover:bg-teal-700 disabled:bg-gray-400 text-white rounded-lg transition-colors text-sm font-medium flex-row items-center justify-center"
                    >
                        <span className='hidden md:block'>Continua</span>
                        <ArrowBigRight className='w-4 h-4' />
                    </button>
                </aside>

            </aside>

            {checkoutOpen && (
                <CheckoutModal
                    rawSceneItems={rawSceneItems}
                    sceneColor={sceneColor}
                    cartItems={cartItems}
                    onClose={() => setCheckoutOpen(false)}
                    onAddToCart={(data) => {
                        setCheckoutOpen(false);
                        if (onAddToCart) onAddToCart(data);
                    }}
                />
            )}

        </>
    );
}
