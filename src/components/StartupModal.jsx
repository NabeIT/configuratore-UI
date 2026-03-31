import largePreset from '../data/presets/large';
import mediumPreset from '../data/presets/medium';
import smallPreset from '../data/presets/small';

const presets = [smallPreset, mediumPreset, largePreset];

export default function StartupModal({ onSelect }) {
    return (
        <div className="fixed inset-0 z-200 flex flex-col bg-gray-100 overflow-y-auto sm:overflow-hidden">
            <div className="w-full max-w-4xl mx-auto px-5 py-8 sm:py-0 flex flex-col items-center flex-1 sm:justify-center">
                <h1 className="text-xl sm:text-2xl font-extrabold text-black mb-1 text-center">
                    Da dove vuoi partire?
                </h1>
                <p className="text-xs sm:text-sm text-gray-400 mb-6 sm:mb-8 text-center">
                    Scegli una configurazione di partenza, potrai personalizzarla liberamente
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full">
                    {presets.map((preset) => (
                        <button
                            key={preset.id}
                            onClick={() => onSelect(preset)}
                            className="group flex flex-row sm:flex-col items-center bg-white rounded-2xl hover:bg-gray-50 border-2 border-white  hover:-translate-y-1 hover:shadow-2xl active:shadow-lg   transition-all p-3 sm:p-5 cursor-pointer gap-3 sm:gap-0 text-left sm:text-center"
                        >
                            <div className="w-20 h-20 sm:w-full sm:h-auto sm:aspect-square rounded-xl bg-gray-100 overflow-hidden sm:mb-4 flex-shrink-0">
                                <img
                                    src={preset.image}
                                    alt={preset.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        e.currentTarget.parentElement.innerHTML =
                                            '<div class="w-full h-full flex items-center justify-center text-gray-300"><svg class="w-10 h-10 sm:w-16 sm:h-16 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>';
                                    }}
                                />
                            </div>
                            <div className="flex-1 min-w-0 sm:contents">
                                <h3 className="text-sm font-semibold text-gray-700 group-hover:text-teal-600 transition-colors">
                                    {preset.name}
                                </h3>
                                <p className="text-xs text-gray-400 mt-0.5 sm:mt-1.5 sm:text-center leading-relaxed">
                                    {preset.description}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>

                <span onClick={() => onSelect({})} className='mt-8 underline cursor-pointer text-sm opacity-50 hover:opacity-100'>Configura da zero</span>
            </div>
        </div>
    );
}
