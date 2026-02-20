import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import useBodyStore from '../stores/useBodyStore'

/**
 * Name-matching patterns for anatomical systems.
 * Each pattern array is tested against node names (case-insensitive).
 */
const SYSTEM_PATTERNS = {
    integumentary: [
        'skin', 'integ', 'dermis', 'epidermis', 'tegument', 'body_mesh',
        'body', 'surface', 'flesh'
    ],
    skeletal: [
        'bone', 'skel', 'skeleton', 'skull', 'spine', 'rib', 'pelvis',
        'femur', 'tibia', 'fibula', 'humerus', 'radius', 'ulna',
        'vertebr', 'clavicle', 'scapula', 'patella', 'sternum',
        'mandible', 'maxilla', 'joint', 'cartilage'
    ],
    muscular: [
        'muscle', 'musc', 'bicep', 'tricep', 'quad', 'hamstring',
        'deltoid', 'pectoral', 'abdomin', 'gluteal', 'calf',
        'tendon', 'ligament', 'fascia', 'diaphragm'
    ],
    cardiovascular: [
        'heart', 'cardio', 'vein', 'artery', 'aorta', 'vascular',
        'blood', 'capillar', 'ventricle', 'atrium', 'coronary',
        'pulmonary', 'circulat', 'cardiov'
    ],
    nervous: [
        'nerve', 'neural', 'brain', 'cerebr', 'spinal_cord',
        'neuron', 'gangli', 'plexus', 'cortex', 'cerebellum',
        'thalamus', 'hypothalamus', 'synapse'
    ],
    organs: [
        'organ', 'liver', 'kidney', 'lung', 'stomach', 'intestin',
        'pancreas', 'spleen', 'bladder', 'esophagus', 'trachea',
        'thyroid', 'adrenal', 'gallbladder', 'appendix', 'colon',
        'rectum', 'uterus', 'prostate', 'ovary'
    ],
}

/**
 * Determine which system a node belongs to based on its name.
 * Returns the system key or null if unclassified.
 */
function classifyNode(name) {
    const lowerName = name.toLowerCase()
    for (const [system, patterns] of Object.entries(SYSTEM_PATTERNS)) {
        for (const pattern of patterns) {
            if (lowerName.includes(pattern)) {
                return system
            }
        }
    }
    return null
}

/**
 * HumanModel — loads and renders the GLB model, applies visibility
 * toggles and heartbeat animation.
 */
export default function HumanModel() {
    const { scene } = useGLTF('/human_body.glb')
    const modelRef = useRef()
    const heartMeshes = useRef([])
    const systems = useBodyStore((s) => s.systems)
    const heartRate = useBodyStore((s) => s.heartRate)
    const setModelLoaded = useBodyStore((s) => s.setModelLoaded)

    // Classify all nodes once on load
    const nodeClassification = useMemo(() => {
        const map = new Map()
        scene.traverse((node) => {
            if (node.name) {
                const system = classifyNode(node.name)
                if (system) {
                    map.set(node, system)
                }
            }
        })
        return map
    }, [scene])

    // Collect heart meshes for animation
    useEffect(() => {
        const hearts = []
        scene.traverse((node) => {
            if (node.name) {
                const lowerName = node.name.toLowerCase()
                if (lowerName.includes('heart') || lowerName.includes('cardio')) {
                    if (node.isMesh || node.isGroup) {
                        hearts.push({
                            obj: node,
                            baseScale: node.scale.clone(),
                        })
                    }
                }
            }
        })
        heartMeshes.current = hearts
        setModelLoaded(true)
    }, [scene, setModelLoaded])

    // Apply visibility toggles
    useEffect(() => {
        nodeClassification.forEach((system, node) => {
            const systemData = systems[system]
            if (systemData) {
                node.visible = systemData.visible
            }
        })
    }, [systems, nodeClassification])

    // Heartbeat animation: systole/diastole pulsation
    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        const bpm = heartRate
        const freq = bpm / 60 // beats per second
        const phase = (time * freq * Math.PI * 2) % (Math.PI * 2)

        // Simulate a more realistic heartbeat curve:
        // two quick contractions (lub-dub) followed by a rest phase
        let pulse = 0
        const normalizedPhase = phase / (Math.PI * 2) // 0 to 1

        if (normalizedPhase < 0.1) {
            // Systole 1 (lub) — quick contraction
            pulse = Math.sin(normalizedPhase / 0.1 * Math.PI) * 0.08
        } else if (normalizedPhase < 0.15) {
            // Brief pause
            pulse = 0
        } else if (normalizedPhase < 0.25) {
            // Systole 2 (dub) — smaller contraction
            pulse = Math.sin((normalizedPhase - 0.15) / 0.1 * Math.PI) * 0.04
        } else {
            // Diastole — rest
            pulse = 0
        }

        heartMeshes.current.forEach(({ obj, baseScale }) => {
            const s = 1 + pulse
            obj.scale.set(
                baseScale.x * s,
                baseScale.y * s,
                baseScale.z * s
            )
        })
    })

    return (
        <primitive
            ref={modelRef}
            object={scene}
            dispose={null}
            position={[0, -1, 0]}
            scale={1}
        />
    )
}

useGLTF.preload('/human_body.glb')
