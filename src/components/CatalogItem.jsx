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

export default function CatalogItem({ item, onDragStart }) {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div

            {...(item.variants && item.variantLocked ? {} : { draggable: true, onDragStart: (e) => onDragStart(e, item) })}

            className={`flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow ${item.variants && item.variantLocked ? 'cursor-auto' : 'cursor-grab active:cursor-grabbing'}`}
        >
            <img
                src={item.image}
                alt={item.title}
                className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-800 truncate">{item.title}</h3>
                <p className="text-xs text-gray-400 truncate">{item.description}</p>
                {item.variants && item.variantLocked && (
                    <div className="mt-1 flex items-center">
                        {item.variants.map((variant, index) => {
                            return (
                                <div
                                    draggable
                                    onDragStart={(e) => onDragStart(e, {
                                        ...item,
                                        variant: index
                                    })}

                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowTooltip((v) => !v);
                                    }}
                                    className="cursor-grab active:cursor-grabbing p-2 flex items-center justify-center rounded-xl border border-gray-300 text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-colors text-xs font-serif ml-1"
                                    aria-label={`Varianti di ${item.title}`}
                                >
                                    {variant.title}
                                </div>
                            )
                        })}

                    </div>
                )}
            </div>
            <div className="relative flex-shrink-0">
                <button
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowTooltip((v) => !v);
                    }}
                    className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-colors text-xs font-serif"
                    aria-label={`Info su ${item.title}`}
                >
                    i
                </button>


                <Tooltip text={item.info} visible={showTooltip} />
            </div>
        </div>
    );
}
