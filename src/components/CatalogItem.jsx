import { useMemo, useState } from 'react';

import { CircleSlash } from 'lucide-react';
import { Plus } from 'lucide-react';
import { useActionContext } from './ActionContext';
import { useEffect } from 'react';
import { useStateContext } from './StateContext';

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

    const { editedItem } = useStateContext();

    const { availableDropZones } = useStateContext();


    const modeEdit = editedItem && editedItem?.modelId === item.modelId;


    const dropZonesUnique = useMemo(() => {
        if (editedItem?.type === "object") {
            const dropZones = editedItem.dropZones.filter(d => !!d.cascade).map(dz => dz.acceptTypes).flat();
            return [...new Set(dropZones)];
            // console.log("Drop zones unique for edited item:", dropZonesUnique);
        }
        return [];

    }, [editedItem]);

    useEffect(() => {
        console.log("Available drop zones updated:", availableDropZones);
    }, [availableDropZones]);



    const canBePlaced = (variant) => {
        const zoneType = variant ? variant.zoneType : item.zoneType;
        if (!zoneType) return true;

        console.log(zoneType, availableDropZones[zoneType])

        return availableDropZones && availableDropZones[zoneType] && availableDropZones[zoneType].length > 0;
    }


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

            onClick={item.variants ? null : (e) => {

                e.stopPropagation();
                onQuickAdd?.({
                    ...item,
                });
            }}
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
                {item.variants && item.variantLocked && !modeEdit && (
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
                                    className={`cursor-grab active:cursor-grabbing p-1 flex justify-center pl-2 rounded-full gap-2 font-bold border border-gray-300 text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-colors text-xs font-serif ml-1 items-center
                                        
                                        ${!editedItem || dropZonesUnique.includes(variant.zoneType) ? '' : 'pointer-events-none opacity-30'}
                                        
                                        `}
                                    aria-label={`Aggiungi variante ${variant.title} di ${item.title}`}
                                >
                                    <span>{variant.name}</span>


                                    {canBePlaced(variant) || item.type == "object" ? (
                                        <div className='bg-teal-600 p-1 rounded-full ml-auto'>
                                            <Plus size={12} strokeWidth={4} color='#fff' />  </div>
                                    ) : <CircleSlash size={20} strokeWidth={2} color='#f00' />}

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
