import { actions, useActionContext } from "./ActionContext";

import { Trash2 } from "lucide-react";

export const ItemActions = ({ item }) => {


    const { action, performAction } = useActionContext();

    console.log(action);

    return (
        <div className="fixed bottom-0 h-16 md:bottom-5 left-0 md:left-90  p-2 rounded flex space-x-4 flex-row items-center w-full z-50 bg-white md:bg-transparent">
            {/* <span className="text-xs text-gray-600">Hai selezionato:</span> */}
            <span className="rounded bg-teal-600 text-white p-2 px-4">{item.title || item.name}</span>
            <div>
                <button className="p-3 md:bg-white bg-gray-100 rounded" onClick={() => {
                    performAction(actions.REMOVE_ITEM, { id: item.id });

                }}><Trash2 size={16} strokeWidth={1} /></button>
            </div>
        </div>
    );
}