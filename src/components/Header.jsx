import { X } from 'lucide-react';

export default function Header({ onClose }) {
    return (
        <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
            <div className="flex items-center gap-3">

                <img src="https://nabecreation.com/cdn/shop/files/logo_def_998c1978-d649-48b3-b326-afa18edf32ed.png?v=1710718770&width=200" alt="Logo Nabè" className="h-8" />

                {/* <div>
                    <h1 className="text-sm font-semibold text-gray-800 leading-tight">Configuratore Nabè</h1>
                    <p className="text-xs text-gray-400">Sempre a tua disposizione</p>
                </div> */}
            </div>
            <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors text-white"
                aria-label="Chiudi"
                title="Chiudi"
            >
                <X className="w-4 h-4" strokeWidth={2.5} />
            </button>
        </header>
    );
}
