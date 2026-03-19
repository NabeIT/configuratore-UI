import { actions, useActionContext } from "./ActionContext";

import { Trash2 } from "lucide-react";

export const ItemActions = ({ item }) => {


    const { action, performAction } = useActionContext();

    console.log(action);

    return (
        <div className="fixed bottom-5 left-90 p-4 rounded flex space-x-4 flex-col">
            {/* <span className="text-xs text-gray-600">Hai selezionato:</span> */}
            <span className="rounded bg-teal-600 text-white p-1 mb-2">{item.title || item.name}</span>
            <div>
                <button className="p-3 bg-white rounded-xl" onClick={() => {
                    performAction(actions.REMOVE_ITEM, { id: item.id });

                }}><Trash2 size={20} strokeWidth={1} /></button>

            </div>
        </div>
    );
}