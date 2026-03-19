import { useState } from 'react';

function Tooltip({ text, visible }) {
    if (!visible) return null;

    return (
        <div className="absolute z-50 bottom-full left-full top-1/2 -translate-y-1/2 pointer-events-none mb-2 w-56 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg">
            <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-800" />
            {text}
        </div>
    );
}

export default function CatalogItem({ item, onDragStart, onQuickAdd, mobileMode, onMobileExpand, onMobileCollapse }) {
    return (
        <>
            {/* Mobile: controlled by parent via mobileMode */}
            {mobileMode === 'collapsed' && (
                <MobileCollapsed item={item} onDragStart={onDragStart} onQuickAdd={onQuickAdd} onExpand={onMobileExpand} />
            )}
            {mobileMode === 'expanded' && (
                <MobileExpanded item={item} onDragStart={onDragStart} onQuickAdd={onQuickAdd} onCollapse={onMobileCollapse} />
            )}
            {/* Desktop: always rendered, hidden on mobile */}
            {!mobileMode && (
                <DesktopVersion item={item} onDragStart={onDragStart} onQuickAdd={onQuickAdd} />
            )}
        </>
    );
}


const DesktopVersion = ({ item, onDragStart, onQuickAdd }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div

            {...(item.variants && item.variantLocked ? {} : { draggable: true, onDragStart: (e) => onDragStart(e, item) })}

            className={`

                w-3/4 md:w-full
                flex-col
                md:flex-row
                 items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow ${item.variants && item.variantLocked ? 'cursor-auto' : 'cursor-grab active:cursor-grabbing'}

                hidden md:flex

                `}



        >
            <h3 className="md:hidden text-sm font-medium text-gray-800 truncate">{item.title}</h3>
            <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                <h3 className="hidden md:block text-sm font-medium text-gray-800 truncate">{item.title}</h3>
                <p className="hidden md:block text-xs text-gray-400 truncate">{item.description}</p>
                {item.variants && item.variantLocked && (
                    <div className="mt-1 flex items-center">
                        {item.variants.map((variant, index) => {
                            return (
                                <button
                                    type="button"
                                    draggable
                                    onDragStart={(e) => onDragStart(e, {
                                        ...item,
                                        variant: index
                                    })}

                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onQuickAdd?.({
                                            ...item,
                                            variant: index,
                                        });
                                    }}

                                    style={{
                                        borderColor: "#79aea3",
                                        color: "#79aea3",

                                    }}
                                    className="cursor-grab active:cursor-grabbing p-2 px-4 flex items-center justify-center rounded-xl border border-gray-300 text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-colors text-xs font-serif ml-1"
                                    aria-label={`Aggiungi variante ${variant.title} di ${item.title}`}
                                >
                                    {variant.name}
                                </button>
                            )
                        })}

                    </div>
                )}
            </div>
        </div>
    )

}


const MobileCollapsed = ({ item, onDragStart, onQuickAdd, onExpand }) => {
    return (
        <div
            onClick={onExpand}
            {...(item.variants && item.variantLocked ? {} : { draggable: true, onDragStart: (e) => onDragStart(e, item) })}
            className="md:hidden flex flex-shrink-0 rounded-full bg-white overflow-hidden p-3"
        >
            <img
                src={item.image}
                alt={item.title}
                className="object-contain w-10 h-10 aspect-square"
            />
        </div>
    );
};


const MobileExpanded = ({ item, onDragStart, onQuickAdd, onCollapse }) => {
    const [truncate, setTruncate] = useState(true);

    return (
        <div
            data-carousel-card
            className="flex-shrink-0 w-[85vw] snap-center"
        >
            <div
                {...(item.variants && item.variantLocked ? {} : { draggable: true, onDragStart: (e) => onDragStart(e, item) })}
                className={`
                    flex flex-col items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm
                    ${item.variants && item.variantLocked ? 'cursor-auto' : 'cursor-grab active:cursor-grabbing'}
                `}
            >
                <div className='flex flex-row w-full'>
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-18 h-18 rounded-lg object-cover flex-shrink-0 border border-gray-200"
                    />
                    <div className='ml-auto'>

                        {item.variants && item.variantLocked ? (<>
                            <h3 className="text-xs font-medium text-gray-800 truncate mr-auto flex-1 flex">Misura: </h3>
                            <div className="mt-1 flex items-center flex-row gap-1">
                                {item.variants.map((variant, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        draggable
                                        onDragStart={(e) => onDragStart(e, {
                                            ...item,
                                            variant: index
                                        })}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onQuickAdd?.({
                                                ...item,
                                                variant: index,
                                            });
                                        }}
                                        className="cursor-grab active:cursor-grabbing p-2 flex items-center justify-center rounded-xl border border-gray-300 text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-colors text-xs font-serif"
                                        aria-label={`Aggiungi variante ${variant.title} di ${item.title}`}
                                    >
                                        {variant.name}
                                    </button>
                                ))}
                            </div>
                        </>
                        ) : (
                            <div className="mt-1 flex items-center flex-row gap-1">

                                <button

                                    type="button"
                                    draggable
                                    onDragStart={(e) => onDragStart(e, {
                                        ...item
                                    })}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onQuickAdd?.({
                                            ...item,
                                        });
                                    }}
                                    className="cursor-grab active:cursor-grabbing p-2 flex items-center justify-center rounded-xl border border-gray-300 text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-colors text-xs font-serif"

                                >
                                    Aggiungi
                                </button>

                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-1 min-w-0 border-t border-t-gray-200 pt-2 mt-2 w-full" onClick={() => setTruncate(!truncate)}>
                    <h3 className="text-sm font-medium text-gray-800 truncate">{item.title}</h3>
                    <p className={`text-xs text-gray-400 ${truncate ? 'truncate' : ''}`}>{item.description}</p>
                </div>
            </div>
        </div>
    );
};
