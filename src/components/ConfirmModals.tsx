import { Delete } from "lucide-react";
import { Trash } from "lucide-react";

export const ModalConfirmDelete = ({ onConfirm, onClose }: { onConfirm: () => void, onClose: () => void }) => {


    return (
        <Modal>
            <div className="bg-white rounded-2xl p-6">
                <div className="modal-content">
                    <div className="flex flex-col gap-1 mb-10">
                        <h2 className="font-bold">Confermi?</h2>
                        <p>Sei sicuro di voler eliminare questo elemento?</p>
                    </div>
                    <div className="flex flex-row justify-between gap-4">

                        <button className="cursor-pointer border border-gray-300 px-3 rounded-lg hover:shadow-lg" onClick={onClose}>No</button>
                        <button
                            onClick={onConfirm}

                            className="cursor-pointer flex md:flex-1 px-3 py-3 gap-3 bg-brand hover:bg-teal-600 disabled:bg-gray-400 text-white rounded-lg transition-colors text-sm font-medium flex-row items-center justify-center hover:shadow-lg"
                        >
                            <span className='hidden md:block'>Elimina</span>
                            <Trash className='w-4 h-4' />
                        </button>

                    </div>
                </div>
            </div>
        </Modal>
    );
}
const Modal = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="fixed bg-black/50 w-screen h-screen top-0 left-0 flex items-center justify-center z-50">
            {children}
        </div>
    )
}