import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import useBodyStore from '../stores/useBodyStore'

/**
 * Material-based classification for anatomical systems.
 * Maps material name patterns → system key.
 */
const MATERIAL_TO_SYSTEM = {
    // ===== SKELETAL =====
    'Bone': 'skeletal',
    'Bone-1': 'skeletal',
    'Bone-2': 'skeletal',
    'Bone-3': 'skeletal',
    'Bone-4': 'skeletal',
    'Bone-5': 'skeletal',
    'Bone-6': 'skeletal',
    'Bone-7': 'skeletal',
    'Bone-8': 'skeletal',
    'Teeth': 'skeletal',
    'Teeth-roots': 'skeletal',
    'Dentine': 'skeletal',
    'Suture': 'skeletal',
    'Suture-1': 'skeletal',
    'Suture-2': 'skeletal',
    'Suture-3': 'skeletal',
    'Suture-4': 'skeletal',
    'Suture-5': 'skeletal',
    'Suture-6': 'skeletal',
    'Suture-7': 'skeletal',
    'Suture-8': 'skeletal',

    // ===== MUSCULAR (classified by function/movement) =====
    'Abductor': 'muscular',
    'Adductor': 'muscular',
    'Biarticular': 'muscular',
    'Depressor': 'muscular',
    'Diaphragm': 'muscular',
    'Extension': 'muscular',
    'Extension hand/foot': 'muscular',
    'Extensor extremities': 'muscular',
    'External rotation': 'muscular',
    'Flexion': 'muscular',
    'Flexion fingers': 'muscular',
    'Flexion hand/foot': 'muscular',
    'Ingestion': 'muscular',
    'Internal rotator': 'muscular',
    'Levator': 'muscular',
    'Masticator': 'muscular',
    'Orbicularis/Constrictor': 'muscular',
    'Phonation': 'muscular',
    'Superficial': 'muscular',
    'Trapezius': 'muscular',
    'Muscular origin': 'muscular',
    // Muscle origin/end materials
    'Origin-Abduction': 'muscular',
    'Origin-Adduction': 'muscular',
    'Origin-Biarticular': 'muscular',
    'Origin-Depressor': 'muscular',
    'Origin-Diaphragm': 'muscular',
    'Origin-Extension': 'muscular',
    'Origin-Extension fingers': 'muscular',
    'Origin-Extension hand/foot': 'muscular',
    'Origin-External rotation': 'muscular',
    'Origin-Flexion': 'muscular',
    'Origin-Flexion fingers': 'muscular',
    'Origin-Flexion hand/foot': 'muscular',
    'Origin-Internal rotation': 'muscular',
    'Origin-Levator': 'muscular',
    'Origin-Ligament': 'muscular',
    'Origin-Orbicular/Constrictor': 'muscular',
    'Origin-Superficial': 'muscular',
    'Origin mastication': 'muscular',
    'End-Abduction': 'muscular',
    'End-Adduction': 'muscular',
    'End-Biarticular': 'muscular',
    'End-Depressor': 'muscular',
    'End-Extension': 'muscular',
    'End-Extension fingers': 'muscular',
    'End-Extension hand-foot': 'muscular',
    'End-External rotation': 'muscular',
    'End-Flexion': 'muscular',
    'End-Flexion fingers': 'muscular',
    'End-Flexion hand/foot': 'muscular',
    'End-Internal rotation': 'muscular',
    'End-Levator': 'muscular',
    'End-Mastication': 'muscular',

    // ===== CARDIOVASCULAR =====
    'Artery': 'cardiovascular',
    'Pulmonary artery': 'cardiovascular',
    'Vein': 'cardiovascular',
    'Pulmonary vein': 'cardiovascular',

    // ===== NERVOUS =====
    'Nerve': 'nervous',
    'Nerve-1': 'nervous',
    'Nerve-2': 'nervous',
    'Nerve-3': 'nervous',
    'Nerve-4': 'nervous',
    'Nerve-5': 'nervous',
    'Nerve-6': 'nervous',
    'Nerve-8': 'nervous',
    'Brain': 'nervous',
    'Brain-Inner': 'nervous',
    'Cerebellum': 'nervous',
    'Frontal lobe': 'nervous',
    'Insula': 'nervous',
    'Interlobar sulci': 'nervous',
    'Limbic lobe': 'nervous',
    'Nucleus': 'nervous',
    'Nucleus (afferent fibers)': 'nervous',
    'Nucleus (efferent fibers)': 'nervous',
    'Occipital lobe': 'nervous',
    'Parietal lobe': 'nervous',
    'Temporal lobe': 'nervous',
    'White matter': 'nervous',
    'LCR': 'nervous',

    // ===== INTEGUMENTARY (Skin) =====
    'Skin-1': 'integumentary',
    'Skin-2': 'integumentary',
    'Skin-3': 'integumentary',
    'Skin-4': 'integumentary',
    'Skin-5': 'integumentary',
    'Skin-5\'': 'integumentary',
    'Skin-5\'\'': 'integumentary',
    'Skin-6': 'integumentary',
    'Skin-7': 'integumentary',
    'Skin-8': 'integumentary',
    'Skin-in': 'integumentary',
    'Nail': 'integumentary',
    'Black': 'integumentary', // eyelashes, eyebrows, hair

    // ===== CONNECTIVE TISSUE =====
    'Ligament': 'connective',
    'Cartilage': 'connective',
    'Tendon': 'connective',
    'Articular capsule': 'connective',
    'Fascia': 'connective',
    'Bursa': 'connective',
    'Fat': 'connective',

    // ===== ORGANS / SPECIAL =====
    'Eye': 'organs',
    'Cornea': 'organs',
    'Iris': 'organs',
    'Gland': 'organs',
    'Mucosa': 'organs',
}

/**
 * Build a Map<THREE.Object3D, string> classifying each mesh node
 * by the material of its first primitive.
 */
function classifyByMaterial(scene) {
    const map = new Map()

    scene.traverse((node) => {
        if (!node.isMesh) return

        const mat = node.material
        if (!mat) return

        // Handle arrays of materials (multi-material meshes)
        const materials = Array.isArray(mat) ? mat : [mat]

        for (const m of materials) {
            const matName = m.name || ''
            const system = MATERIAL_TO_SYSTEM[matName]
            if (system) {
                map.set(node, system)
                break
            }
        }
    })

    return map
}

/**
 * Find nodes that represent the heart region for heartbeat animation.
 * Uses name matching since there's no "Heart" material.
 */
function findHeartNodes(scene) {
    const heartPatterns = [
        'heart', 'ventricle', 'atrium', 'aorta',
        'coronary', 'pulmonary trunk', 'cardiac'
    ]
    const results = []

    scene.traverse((node) => {
        if (!node.name) return
        const lower = node.name.toLowerCase()
        for (const pattern of heartPatterns) {
            if (lower.includes(pattern)) {
                results.push({
                    obj: node,
                    baseScale: node.scale.clone(),
                })
                break
            }
        }
    })

    return results
}

/**
 * HumanModel — loads GLB, classifies by material, binds toggles, animates heartbeat.
 */
export default function HumanModel() {
    const { scene } = useGLTF('/human_body.glb')
    const modelRef = useRef()
    const heartMeshes = useRef([])
    const systems = useBodyStore((s) => s.systems)
    const heartRate = useBodyStore((s) => s.heartRate)
    const setModelLoaded = useBodyStore((s) => s.setModelLoaded)

    // Classify all mesh nodes by material (once on load)
    const nodeClassification = useMemo(() => {
        return classifyByMaterial(scene)
    }, [scene])

    // Find heart nodes for animation
    useEffect(() => {
        heartMeshes.current = findHeartNodes(scene)
        setModelLoaded(true)

        // Log classification stats for debugging
        const stats = {}
        nodeClassification.forEach((system) => {
            stats[system] = (stats[system] || 0) + 1
        })
        console.log('🧬 Model classification:', stats)
        console.log(`📊 Total classified: ${nodeClassification.size} / nodes in scene`)
    }, [scene, setModelLoaded, nodeClassification])

    // Apply visibility toggles based on material classification
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
        if (heartMeshes.current.length === 0) return

        const time = state.clock.getElapsedTime()
        const bpm = heartRate
        const freq = bpm / 60
        const phase = (time * freq * Math.PI * 2) % (Math.PI * 2)

        const normalizedPhase = phase / (Math.PI * 2)
        let pulse = 0

        if (normalizedPhase < 0.1) {
            pulse = Math.sin(normalizedPhase / 0.1 * Math.PI) * 0.06
        } else if (normalizedPhase < 0.15) {
            pulse = 0
        } else if (normalizedPhase < 0.25) {
            pulse = Math.sin((normalizedPhase - 0.15) / 0.1 * Math.PI) * 0.03
        }

        heartMeshes.current.forEach(({ obj, baseScale }) => {
            const s = 1 + pulse
            obj.scale.set(baseScale.x * s, baseScale.y * s, baseScale.z * s)
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
