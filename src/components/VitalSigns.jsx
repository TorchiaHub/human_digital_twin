import { useEffect, useRef } from 'react'
import { Activity, Wind, Droplets, Heart, Footprints, Play, Square, Zap } from 'lucide-react'
import useBodyStore from '../stores/useBodyStore'

export default function VitalSigns() {
    const heartRate = useBodyStore((s) => s.heartRate)
    const setHeartRate = useBodyStore((s) => s.setHeartRate)
    const respirationRate = useBodyStore((s) => s.respirationRate)
    const setRespirationRate = useBodyStore((s) => s.setRespirationRate)
    const spO2 = useBodyStore((s) => s.spO2)
    const setSpO2 = useBodyStore((s) => s.setSpO2)
    const bp = useBodyStore((s) => s.bloodPressure)
    const setBloodPressure = useBodyStore((s) => s.setBloodPressure)

    // Milestone 5: Running State
    const isRunning = useBodyStore((s) => s.isRunning)
    const setIsRunning = useBodyStore((s) => s.setIsRunning)
    const stamina = useBodyStore((s) => s.stamina)
    const distance = useBodyStore((s) => s.distance)
    const speed = useBodyStore((s) => s.speed)

    // Algorithmic physiological response to heart rate
    const handleHeartRateChange = (newBpm) => {
        setHeartRate(newBpm)

        // Baseline stress intensity
        const intensity = Math.max(0, newBpm - 70)

        // Respiration increases with BPM
        const newResp = Math.round(16 + (intensity * 0.25))
        setRespirationRate(newResp)

        // SpO2 drops slightly if BPM is very high (simulating extreme stress)
        const newSpO2 = newBpm > 120 ? Math.max(90, 98 - Math.floor((newBpm - 120) * 0.15)) : 98
        setSpO2(newSpO2)

        // Blood pressure increases with BPM
        const newSys = Math.round(120 + (intensity * 0.4))
        const newDia = Math.round(80 + (intensity * 0.15))
        setBloodPressure(newSys, newDia)
    }

    // Capture handleHeartRateChange in a ref so the interval can use it without triggering re-renders
    const hrHandlerRef = useRef(handleHeartRateChange)
    useEffect(() => { hrHandlerRef.current = handleHeartRateChange }, [heartRate, isRunning, stamina])

    // Running Engine Loop (1 second tick)
    useEffect(() => {
        const interval = setInterval(() => {
            const state = useBodyStore.getState()

            if (state.isRunning) {
                // Calculate speed based on current simulated effort (BPM slider)
                let currentSpeed = Math.max(0, (state.heartRate - 75) * 0.18)
                if (currentSpeed < 5) currentSpeed = 5 // Minimum jogging speed

                state.setSpeed(currentSpeed)
                // Distance in km (speed km/h divided by 3600 seconds)
                state.setDistance(state.distance + (currentSpeed / 3600))

                // Deplete stamina based on effort
                const exhaustionRate = currentSpeed * 0.08 // At 15km/h = drops 1.2% per sec
                const newStamina = Math.max(0, state.stamina - exhaustionRate)
                state.setStamina(newStamina)

                // Exhaustion force stop
                if (newStamina <= 0) {
                    state.setIsRunning(false)
                    hrHandlerRef.current(110) // Drop heart rate to a recovery state
                }
            } else {
                state.setSpeed(0)
                // Recover stamina when resting
                if (state.stamina < 100) {
                    state.setStamina(Math.min(100, state.stamina + 2.5)) // Recover 2.5% per sec
                }
            }
        }, 1000)
        return () => clearInterval(interval)
    }, [])

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

                {/* Simulated Stress Control */}
                <div className="col-span-2 bg-slate-900/40 border border-white/5 rounded-xl p-4 mt-2 mb-2">
                    <div className="flex justify-between items-center text-xs text-slate-400 mb-3">
                        <span className="uppercase font-semibold tracking-wider flex items-center gap-1">
                            <Activity size={12} /> Controllo Sforzo
                        </span>
                        <span>{heartRate > 100 ? 'Sotto Sforzo' : 'Riposo'}</span>
                    </div>
                    <input
                        type="range"
                        min="60"
                        max="180"
                        value={heartRate}
                        onChange={(e) => handleHeartRateChange(Number(e.target.value))}
                        className="w-full accent-pink-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer hover:accent-pink-400 transition-colors"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-2">
                        <span>60 BPM</span>
                        <span>180 BPM</span>
                    </div>
                </div>

                {/* MILESTONE 5: Treadmill Simulator */}
                <div className="col-span-2 bg-slate-900/40 border border-white/5 rounded-xl p-4 mt-2 mb-2">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                            <Footprints size={14} className={isRunning ? 'text-green-400 animate-bounce' : 'text-slate-500'} />
                            Simulatore Corsa
                        </h4>
                        <button
                            onClick={() => setIsRunning(!isRunning)}
                            disabled={stamina === 0}
                            className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1 transition-colors border ${isRunning
                                    ? 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20'
                                    : stamina === 0
                                        ? 'bg-slate-800 text-slate-600 border-slate-700 cursor-not-allowed'
                                        : 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20'
                                }`}
                        >
                            {isRunning ? <><Square size={12} fill="currentColor" /> Ferma</> : <><Play size={12} fill="currentColor" /> Inizia Corsa</>}
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-black/30 rounded p-2 text-center border border-white/5">
                            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Distanza</div>
                            <div className="text-xl font-bold text-white font-mono">{distance.toFixed(3)} <span className="text-xs text-slate-400">km</span></div>
                        </div>
                        <div className="bg-black/30 rounded p-2 text-center border border-white/5">
                            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Velocità</div>
                            <div className="text-xl font-bold text-white font-mono">{speed.toFixed(1)} <span className="text-xs text-slate-400">km/h</span></div>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                            <span className="flex items-center gap-1 text-yellow-500"><Zap size={10} fill="currentColor" /> Stamina</span>
                            <span className="text-slate-300">{Math.round(stamina)}%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden shadow-inner border border-white/5">
                            <div
                                className={`h-full transition-all duration-300 ${stamina > 50 ? 'bg-green-400' : stamina > 20 ? 'bg-yellow-400' : 'bg-red-500'}`}
                                style={{ width: `${stamina}%` }}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
