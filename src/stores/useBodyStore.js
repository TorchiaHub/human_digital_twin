import { create } from 'zustand'

const useBodyStore = create((set) => ({
    // Anatomical system visibility toggles
    systems: {
        integumentary: { label: 'Tegumentario (Pelle)', visible: true, icon: '🧬', color: '#f0a8c4' },
        skeletal: { label: 'Scheletrico', visible: true, icon: '🦴', color: '#e8e0d0' },
        muscular: { label: 'Muscolare', visible: true, icon: '💪', color: '#d94f4f' },
        cardiovascular: { label: 'Cardiovascolare', visible: true, icon: '❤️', color: '#ff2d7b' },
        nervous: { label: 'Nervoso', visible: true, icon: '⚡', color: '#ffd700' },
        organs: { label: 'Organi Interni', visible: true, icon: '🫁', color: '#8b5cf6' },
    },

    // Toggle a specific system
    toggleSystem: (systemKey) =>
        set((state) => ({
            systems: {
                ...state.systems,
                [systemKey]: {
                    ...state.systems[systemKey],
                    visible: !state.systems[systemKey].visible,
                },
            },
        })),

    // Vital signs
    heartRate: 72,
    setHeartRate: (bpm) => set({ heartRate: bpm }),

    // Model loading state
    modelLoaded: false,
    setModelLoaded: (loaded) => set({ modelLoaded: loaded }),
}))

export default useBodyStore
