import { X, Search, Activity } from 'lucide-react'
import useBodyStore from '../stores/useBodyStore'
import useTypewriter from '../hooks/useTypewriter'

export default function InfoPanel() {
    const selectedPart = useBodyStore((s) => s.selectedPart)
    const setSelectedPart = useBodyStore((s) => s.setSelectedPart)
    const systems = useBodyStore((s) => s.systems)

    // Construct the description string to be typed out
    const descriptionText = selectedPart && systems[selectedPart.system]
        ? `Struttura anatomica appartenente al sistema ${systems[selectedPart.system].label.toLowerCase()}. Nel Digital Twin, questo elemento è isolabile e analizzabile nel contesto spaziale 3D.`
        : ''

    const typedDescription = useTypewriter(descriptionText, 20)

    if (!selectedPart) return null

    const systemData = systems[selectedPart.system]

    return (
        <div className="absolute top-6 left-6 w-[360px] z-20 animate-in fade-in slide-in-from-left-4 duration-500">
            {/* Glassmorphism Premium Panel */}
            <div
                className="bg-[#0a0c14]/80 backdrop-blur-2xl border-y border-r border-white/10 rounded-2xl shadow-2xl overflow-hidden relative"
                style={{ borderLeft: `4px solid ${systemData.color}` }}
            >
                {/* Subtle scanline overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]" />

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
                        <p className="text-sm font-mono text-cyan-400 bg-black/40 border border-cyan-900/30 px-2 py-1.5 rounded inline-flex items-center gap-2">
                            <Activity size={14} className="animate-pulse" />
                            {selectedPart.originalName}
                        </p>
                    </div>

                    <div className="space-y-1 relative">
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: systemData.color }} />
                            Analisi in Corso
                        </h3>
                        <div className="min-h-[80px] bg-black/20 p-3 rounded-lg border border-white/5">
                            <p className="text-[13px] text-slate-300 leading-relaxed font-mono">
                                {typedDescription}
                                <span className="inline-block w-1.5 h-3 ml-1 bg-cyan-400 animate-pulse" />
                            </p>
                        </div>
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
