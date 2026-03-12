export default function Header({ onClose }) {
    return (
        <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-teal-600 rounded flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 22h20L12 2z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div>
                    <h1 className="text-sm font-semibold text-gray-800 leading-tight">Configuratore Nabè</h1>
                    <p className="text-xs text-gray-400">Sempre a tua disposizione</p>
                </div>
            </div>

            <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                aria-label="Chiudi"
            >
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </header>
    );
}
