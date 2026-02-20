import { X, Search } from 'lucide-react'
import useBodyStore from '../stores/useBodyStore'

export default function InfoPanel() {
    const selectedPart = useBodyStore((s) => s.selectedPart)
    const setSelectedPart = useBodyStore((s) => s.setSelectedPart)
    const systems = useBodyStore((s) => s.systems)

    if (!selectedPart) return null

    const systemData = systems[selectedPart.system]

    return (
        <div className="absolute top-6 left-6 w-80 z-20 animate-in fade-in slide-in-from-left-4 duration-300">
            {/* Glassmorphism Panel */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">

                {/* Header */}
                <div className="relative p-5 border-b border-white/5">
                    <button
                        onClick={() => setSelectedPart(null)}
                        className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-1.5 rounded-full"
                    >
                        <X size={16} />
                    </button>

                    <div
                        className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium mb-3 border border-white/10"
                        style={{ backgroundColor: `${systemData.color}20`, color: systemData.color }}
                    >
                        <span>{systemData.icon}</span>
                        Sistema {systemData.label}
                    </div>

                    <h2 className="text-xl font-bold text-white capitalize leading-tight">
                        {selectedPart.name}
                    </h2>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                    <div className="space-y-1">
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Identificativo Modello</h3>
                        <p className="text-sm font-mono text-slate-300 bg-black/30 px-2 py-1 rounded">{selectedPart.originalName}</p>
                    </div>

                    <div className="space-y-1">
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Note Anatomiche</h3>
                        <p className="text-sm text-slate-300 leading-relaxed">
                            Struttura anatomica appartenente al sistema {systemData.label.toLowerCase()}.
                            Nel Digital Twin, questo elemento è isolabile e analizzabile nel contesto spaziale 3D.
                        </p>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-2 flex gap-2">
                        <button className="flex-1 bg-white/10 hover:bg-white/15 text-white text-sm font-medium py-2 px-3 flex items-center justify-center gap-2 rounded-lg transition-colors border border-white/5">
                            <Search size={14} />
                            Fissa Vista
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
