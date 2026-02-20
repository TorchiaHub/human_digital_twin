import { Activity, Wind, Droplets, Heart } from 'lucide-react'
import useBodyStore from '../stores/useBodyStore'

export default function VitalSigns() {
    const heartRate = useBodyStore((s) => s.heartRate)
    const respirationRate = useBodyStore((s) => s.respirationRate)
    const spO2 = useBodyStore((s) => s.spO2)
    const bp = useBodyStore((s) => s.bloodPressure)

    return (
        <div className="mt-8">
            <h3 className="text-xs font-bold tracking-widest text-slate-400 mb-4 uppercase flex items-center gap-2">
                <Activity size={14} className="text-blue-400" />
                Dati Vitali
            </h3>

            <div className="grid grid-cols-2 gap-3">

                {/* Heart Rate */}
                <div className="bg-slate-900/50 border border-white/5 rounded-xl p-4 flex flex-col justify-between overflow-hidden relative group">
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-pink-500/0 via-pink-500/50 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center gap-2 text-slate-400 mb-2">
                        <Heart className="text-pink-500 animate-pulse" size={14} fill="currentColor" />
                        <span className="text-[10px] uppercase font-bold tracking-wider">Frequenza Cardiaca</span>
                    </div>
                    <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-3xl font-bold text-white tracking-tight">{heartRate}</span>
                        <span className="text-xs font-medium text-slate-500 mb-1">BPM</span>
                    </div>
                    {/* Mini ECG Decorative Line */}
                    <div className="absolute right-3 bottom-4 flex items-center w-12 opacity-20">
                        <svg viewBox="0 0 100 30" className="w-full text-pink-500 stroke-current stroke-2 fill-none stroke-linecap-round stroke-linejoin-round">
                            <polyline points="0,15 20,15 30,0 40,30 50,15 100,15" />
                        </svg>
                    </div>
                </div>

                {/* SpO2 */}
                <div className="bg-slate-900/50 border border-white/5 rounded-xl p-4 flex flex-col justify-between relative group">
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-sky-400/0 via-sky-400/50 to-sky-400/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center gap-2 text-slate-400 mb-2">
                        <Droplets className="text-sky-400" size={14} />
                        <span className="text-[10px] uppercase font-bold tracking-wider">Ossigenazione</span>
                    </div>
                    <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-3xl font-bold text-white tracking-tight">{spO2}</span>
                        <span className="text-xs font-medium text-slate-500 mb-1">%</span>
                    </div>
                </div>

                {/* Respiration */}
                <div className="bg-slate-900/50 border border-white/5 rounded-xl p-4 flex flex-col justify-between relative group">
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-teal-400/0 via-teal-400/50 to-teal-400/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center gap-2 text-slate-400 mb-2">
                        <Wind className="text-teal-400" size={14} />
                        <span className="text-[10px] uppercase font-bold tracking-wider">Respirazione</span>
                    </div>
                    <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-3xl font-bold text-white tracking-tight">{respirationRate}</span>
                        <span className="text-xs font-medium text-slate-500 mb-1">rpm</span>
                    </div>
                </div>

                {/* Blood Pressure */}
                <div className="bg-slate-900/50 border border-white/5 rounded-xl p-4 flex flex-col justify-between relative group">
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-purple-400/0 via-purple-400/50 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center gap-2 text-slate-400 mb-2">
                        <Activity className="text-purple-400" size={14} />
                        <span className="text-[10px] uppercase font-bold tracking-wider">Pressione Art.</span>
                    </div>
                    <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-2xl font-bold text-white tracking-tight">{bp.sys}</span>
                        <span className="text-lg font-medium text-slate-500">/{bp.dia}</span>
                    </div>
                </div>

            </div>
        </div>
    )
}
