import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import useBodyStore from '../stores/useBodyStore'

/**
 * Material-based classification for anatomical systems.
 * Maps material name → system key.
 */
const MATERIAL_TO_SYSTEM = {
    // ===== SKELETAL =====
    'Bone': 'skeletal', 'Bone-1': 'skeletal', 'Bone-2': 'skeletal',
    'Bone-3': 'skeletal', 'Bone-4': 'skeletal', 'Bone-5': 'skeletal',
    'Bone-6': 'skeletal', 'Bone-7': 'skeletal', 'Bone-8': 'skeletal',
    'Teeth': 'skeletal', 'Teeth-roots': 'skeletal', 'Dentine': 'skeletal',
    'Suture': 'skeletal', 'Suture-1': 'skeletal', 'Suture-2': 'skeletal',
    'Suture-3': 'skeletal', 'Suture-4': 'skeletal', 'Suture-5': 'skeletal',
    'Suture-6': 'skeletal', 'Suture-7': 'skeletal', 'Suture-8': 'skeletal',

    // ===== MUSCULAR =====
    'Abductor': 'muscular', 'Adductor': 'muscular', 'Biarticular': 'muscular',
    'Depressor': 'muscular', 'Diaphragm': 'muscular', 'Extension': 'muscular',
    'Extension hand/foot': 'muscular', 'Extensor extremities': 'muscular',
    'External rotation': 'muscular', 'Flexion': 'muscular',
    'Flexion fingers': 'muscular', 'Flexion hand/foot': 'muscular',
    'Ingestion': 'muscular', 'Internal rotator': 'muscular',
    'Levator': 'muscular', 'Masticator': 'muscular',
    'Orbicularis/Constrictor': 'muscular', 'Phonation': 'muscular',
    'Superficial': 'muscular', 'Trapezius': 'muscular', 'Muscular origin': 'muscular',
    'Origin-Abduction': 'muscular', 'Origin-Adduction': 'muscular',
    'Origin-Biarticular': 'muscular', 'Origin-Depressor': 'muscular',
    'Origin-Diaphragm': 'muscular', 'Origin-Extension': 'muscular',
    'Origin-Extension fingers': 'muscular', 'Origin-Extension hand/foot': 'muscular',
    'Origin-External rotation': 'muscular', 'Origin-Flexion': 'muscular',
    'Origin-Flexion fingers': 'muscular', 'Origin-Flexion hand/foot': 'muscular',
    'Origin-Internal rotation': 'muscular', 'Origin-Levator': 'muscular',
    'Origin-Ligament': 'muscular', 'Origin-Orbicular/Constrictor': 'muscular',
    'Origin-Superficial': 'muscular', 'Origin mastication': 'muscular',
    'End-Abduction': 'muscular', 'End-Adduction': 'muscular',
    'End-Biarticular': 'muscular', 'End-Depressor': 'muscular',
    'End-Extension': 'muscular', 'End-Extension fingers': 'muscular',
    'End-Extension hand-foot': 'muscular', 'End-External rotation': 'muscular',
    'End-Flexion': 'muscular', 'End-Flexion fingers': 'muscular',
    'End-Flexion hand/foot': 'muscular', 'End-Internal rotation': 'muscular',
    'End-Levator': 'muscular', 'End-Mastication': 'muscular',

    // ===== CARDIOVASCULAR =====
    'Artery': 'cardiovascular', 'Pulmonary artery': 'cardiovascular',
    'Vein': 'cardiovascular', 'Pulmonary vein': 'cardiovascular',

    // ===== NERVOUS =====
    'Nerve': 'nervous', 'Nerve-1': 'nervous', 'Nerve-2': 'nervous',
    'Nerve-3': 'nervous', 'Nerve-4': 'nervous', 'Nerve-5': 'nervous',
    'Nerve-6': 'nervous', 'Nerve-8': 'nervous',
    'Brain': 'nervous', 'Brain-Inner': 'nervous', 'Cerebellum': 'nervous',
    'Frontal lobe': 'nervous', 'Insula': 'nervous', 'Interlobar sulci': 'nervous',
    'Limbic lobe': 'nervous', 'Nucleus': 'nervous',
    'Nucleus (afferent fibers)': 'nervous', 'Nucleus (efferent fibers)': 'nervous',
    'Occipital lobe': 'nervous', 'Parietal lobe': 'nervous',
    'Temporal lobe': 'nervous', 'White matter': 'nervous', 'LCR': 'nervous',

    // ===== INTEGUMENTARY =====
    'Skin-1': 'integumentary', 'Skin-2': 'integumentary', 'Skin-3': 'integumentary',
    'Skin-4': 'integumentary', 'Skin-5': 'integumentary',
    "Skin-5'": 'integumentary', "Skin-5''": 'integumentary',
    'Skin-6': 'integumentary', 'Skin-7': 'integumentary', 'Skin-8': 'integumentary',
    'Skin-in': 'integumentary', 'Nail': 'integumentary', 'Black': 'integumentary',

    // ===== CONNECTIVE =====
    'Ligament': 'connective', 'Cartilage': 'connective', 'Tendon': 'connective',
    'Articular capsule': 'connective', 'Fascia': 'connective',
    'Bursa': 'connective', 'Fat': 'connective',

    // ===== RESPIRATORY =====
    'Lung-1': 'respiratory', 'Lung-2': 'respiratory', 'Lung-3': 'respiratory',
    'Lung-4': 'respiratory', 'Lung-5': 'respiratory', 'Lung-6': 'respiratory',
    'Lung-7': 'respiratory', 'Lung-8': 'respiratory', 'Lung-9': 'respiratory',
    'Lung-base': 'respiratory', 'Diaphragm': 'respiratory',
    'Bronchi': 'respiratory', 'Bronchi-1': 'respiratory', 'Bronchi-2': 'respiratory',
    'Bronchi-3': 'respiratory', 'Bronchi-4': 'respiratory', 'Bronchi-5': 'respiratory',
    'Bronchi-6': 'respiratory', 'Bronchi-7': 'respiratory', 'Bronchi-8': 'respiratory',

    // ===== DIGESTIVE =====
    'Intestine': 'digestive', 'Mucosa of stomach': 'digestive', 'Gallbladder': 'digestive',

    // ===== LYMPHATIC =====
    'Lymph-1': 'lymphatic', 'Lymph-2': 'lymphatic', 'Lymph-3': 'lymphatic',
    'Lymph-4': 'lymphatic', 'Lymph-5': 'lymphatic', 'Lymph-6': 'lymphatic',
    'Lymph-7': 'lymphatic', 'Lymph-8': 'lymphatic',

    // ===== ORGANS (Misc) =====
    'Eye': 'organs', 'Cornea': 'organs', 'Iris': 'organs',
    'Gland': 'organs', 'Mucosa': 'organs', 'Organ': 'organs',
    'Organ-1': 'organs', 'Organ-2': 'organs', 'Organ-3': 'organs', 'Organ-4': 'organs',
    'Organ-5': 'organs', 'Organ-6': 'organs', 'Organ-7': 'organs', 'Organ-8': 'organs',
}

/**
 * Anatomical color palette — realistic colors per material name.
 * Only materials that are white (1,1,1) need overrides.
 * Materials that already have good colors are preserved.
 */
const MATERIAL_COLORS = {
    // === BONES — warm ivory/cream tones ===
    'Bone': '#e8dcc8',
    'Bone-1': '#ddd0b8',
    'Bone-2': '#d5c8ae',
    'Bone-3': '#e2d6c0',
    'Bone-4': '#d8cbb3',
    'Bone-5': '#e0d4be',
    'Bone-6': '#d3c6ac',
    'Bone-7': '#dbd0ba',
    'Bone-8': '#cfc2a8',
    'Teeth': '#f5f0e0',
    'Teeth-roots': '#e8d8b0',
    'Dentine': '#f0e8c8',
    'Suture': null, // keep original grey
    'Suture-1': null, 'Suture-2': null, 'Suture-3': null,
    'Suture-4': null, 'Suture-5': null, 'Suture-6': null,
    'Suture-7': null, 'Suture-8': null,

    // === MUSCLES — red to dark red tones ===
    'Abductor': '#b83a3a', 'Adductor': '#a83333', 'Biarticular': '#c04040',
    'Depressor': '#9e2d2d', 'Diaphragm': '#c44848', 'Extension': '#b53636',
    'Extension hand/foot': '#af3434', 'Extensor extremities': '#b23535',
    'External rotation': '#a53131', 'Flexion': '#c04444', 'Flexion fingers': '#b83c3c',
    'Flexion hand/foot': '#be4242', 'Ingestion': '#c94d4d', 'Internal rotator': '#a22f2f',
    'Levator': '#b43838', 'Masticator': '#bb3e3e', 'Orbicularis/Constrictor': '#ae3333',
    'Phonation': '#c74c4c', 'Superficial': '#c54a4a', 'Trapezius': '#ba3d3d',
    'Muscular origin': '#9a2a2a',
    // Muscle origins — slightly darker
    'Origin-Abduction': '#8a2222', 'Origin-Adduction': '#8a2222',
    'Origin-Biarticular': '#8a2222', 'Origin-Depressor': '#8a2222',
    'Origin-Diaphragm': '#8a2222', 'Origin-Extension': '#8a2222',
    'Origin-Extension fingers': '#8a2222', 'Origin-Extension hand/foot': '#8a2222',
    'Origin-External rotation': '#8a2222', 'Origin-Flexion': '#8a2222',
    'Origin-Flexion fingers': '#8a2222', 'Origin-Flexion hand/foot': '#8a2222',
    'Origin-Internal rotation': '#8a2222', 'Origin-Levator': '#8a2222',
    'Origin-Ligament': '#8a2222', 'Origin-Orbicular/Constrictor': '#8a2222',
    'Origin-Superficial': '#8a2222', 'Origin mastication': '#8a2222',
    // Muscle endpoints — slightly brighter
    'End-Abduction': '#d45050', 'End-Adduction': '#d45050',
    'End-Biarticular': '#d45050', 'End-Depressor': '#d45050',
    'End-Extension': '#d45050', 'End-Extension fingers': '#d45050',
    'End-Extension hand-foot': '#d45050', 'End-External rotation': '#d45050',
    'End-Flexion': '#d45050', 'End-Flexion fingers': '#d45050',
    'End-Flexion hand/foot': '#d45050', 'End-Internal rotation': '#d45050',
    'End-Levator': '#d45050', 'End-Mastication': '#d45050',

    // === CARDIOVASCULAR ===
    'Artery': '#d42020', // bright red
    'Pulmonary artery': null,     // keep original purple
    'Vein': '#3a4fad', // blue
    'Pulmonary vein': null,      // keep original

    // === NERVOUS ===
    'Nerve': '#f0d040', 'Nerve-1': '#e8c838', 'Nerve-2': '#e0c030',
    'Nerve-3': '#d8b828', 'Nerve-4': '#f2d448', 'Nerve-5': '#eacc40',
    'Nerve-6': '#e2c438', 'Nerve-8': '#dabc30',
    'Brain': null, // keep original
    'Brain-Inner': null,
    'Cerebellum': null,
    'Frontal lobe': '#e8a898', 'Insula': '#d09888', 'Interlobar sulci': '#c89080',
    'Limbic lobe': '#d8a090', 'Nucleus': null, 'Nucleus (afferent fibers)': null,
    'Nucleus (efferent fibers)': null,
    'Occipital lobe': '#e0a898', 'Parietal lobe': '#d8a090', 'Temporal lobe': '#e0a898',
    'White matter': null, 'LCR': null,

    // === INTEGUMENTARY ===
    'Skin-1': '#e6b898', 'Skin-2': '#deb090', 'Skin-3': '#d6a888',
    'Skin-4': '#cea080', 'Skin-5': '#c69878', "Skin-5'": '#c69878', "Skin-5''": '#c69878',
    'Skin-6': '#e0b090', 'Skin-7': '#d8a888', 'Skin-8': '#d0a080',
    'Skin-in': null, // keep original pinkish
    'Nail': '#d8b8a0',
    'Black': '#1a1a1a', // hair, eyelashes

    // === CONNECTIVE ===
    'Ligament': '#c8d8c0', // pale green
    'Cartilage': '#a8c8d8', // light blue
    'Tendon': '#d0d8c8', // pale green-grey
    'Articular capsule': '#b0c8c0', // teal-grey
    'Fascia': null,      // keep original blue
    'Bursa': null,      // keep original blue with alpha
    'Fat': null,      // keep original brown

    // === RESPIRATORY ===
    'Lung-1': '#e6a8aa', 'Lung-2': '#e3a2a4', 'Lung-3': '#df9b9e',
    'Lung-4': '#dc9598', 'Lung-5': '#d88e92', 'Lung-6': '#d5888c',
    'Lung-7': '#d28286', 'Lung-8': '#ce7b80', 'Lung-9': '#cb757a',
    'Lung-base': '#d5888c', 'Diaphragm': '#c44848',
    'Bronchi': '#d8e4e8', 'Bronchi-1': '#d8e4e8', 'Bronchi-2': '#d8e4e8',
    'Bronchi-3': '#d8e4e8', 'Bronchi-4': '#d8e4e8', 'Bronchi-5': '#d8e4e8',
    'Bronchi-6': '#d8e4e8', 'Bronchi-7': '#d8e4e8', 'Bronchi-8': '#d8e4e8',

    // === DIGESTIVE ===
    'Intestine': '#dca398',
    'Mucosa of stomach': '#d88a90',
    'Gallbladder': '#7caf68', // Greenish

    // === LYMPHATIC ===
    'Lymph-1': '#88c890', 'Lymph-2': '#88c890', 'Lymph-3': '#88c890',
    'Lymph-4': '#88c890', 'Lymph-5': '#88c890', 'Lymph-6': '#88c890',
    'Lymph-7': '#88c890', 'Lymph-8': '#88c890',

    // === ORGANS ===
    'Eye': null, // keep original
    'Cornea': null, 'Iris': null,
    'Gland': '#d4b4cc', // lavender/pinkish
    'Mucosa': '#e0a0a0', // pink
    'Organ': '#c87070', // generic liver/spleen colors
    'Organ-1': '#c87070', 'Organ-2': '#b06060', 'Organ-3': '#a05050',
    'Organ-4': '#d08080', 'Organ-5': '#e09090', 'Organ-6': '#c87070',
    'Organ-7': '#b06060', 'Organ-8': null,

    // === UI / MISC (hide these) ===
    'Text': '#ffffff',
    'Movement': null,
    'Lines': null,
    'Planes': null,
    'Directions': null,
}

/**
 * Apply anatomical colors to model materials, replacing the default white.
 * Modifies materials in-place (not cloning) so all meshes sharing a material
 * are updated consistently. Also clears PBR texture maps that override color.
 */
function applyAnatomicalColors(scene) {
    const processed = new Set()

    scene.traverse((node) => {
        if (!node.isMesh) return

        const materials = Array.isArray(node.material) ? node.material : [node.material]

        materials.forEach((mat) => {
            if (!mat || processed.has(mat.uuid)) return
            processed.add(mat.uuid)

            const matName = mat.name || ''
            const colorHex = MATERIAL_COLORS[matName]

            if (colorHex === null) {
                // Explicitly preserve original color + textures
                return
            }

            if (colorHex) {
                // Set the flat color
                mat.color.set(colorHex)
                // Clear texture maps so flat color is visible
                if (mat.map) { mat.map = null }
                if (mat.normalMap) { mat.normalMap = null }
                if (mat.roughnessMap) { mat.roughnessMap = null }
                if (mat.metalnessMap) { mat.metalnessMap = null }
                if (mat.aoMap) { mat.aoMap = null }
                if (mat.emissiveMap) { mat.emissiveMap = null }
                // Set PBR properties for a clean anatomical look
                mat.metalness = 0.05
                mat.roughness = 0.55
                if (mat.emissive) mat.emissive.setHex(0x000000)
                mat.needsUpdate = true
            } else {
                // Unknown material — if white, tint it grey so it's not invisible
                if (mat.color && mat.color.r > 0.95 && mat.color.g > 0.95 && mat.color.b > 0.95) {
                    mat.color.set('#b0b0b0')
                    if (mat.map) { mat.map = null }
                    mat.metalness = 0.05
                    mat.roughness = 0.7
                    mat.needsUpdate = true
                }
            }
        })
    })

    console.log(`🎨 Processed ${processed.size} unique materials`)
}

/**
 * Hide non-anatomical UI nodes (movement arrows, planes, text labels, etc.)
 */
function hideUINodes(scene) {
    const uiPatterns = [
        'HOW TO', 'Take a picture', 'Cross Section',
        'Abduction', 'Adduction', 'Circumduction',
        'Dorsiflexion', 'Eversion', 'Inversion',
        'Lateral rotation', 'Medial rotation',
        'Plantar flexion', 'Pronation', 'Supination',
        'Anterior', 'Posterior', 'Cranial', 'Caudal',
        'Dorsal', 'Fibular', 'Frontal', 'Occipital',
        'Palmar', 'Plantar', 'Proximal', 'Distal',
        'Radial', 'Tibial', 'Ulnar',
    ]

    scene.traverse((node) => {
        if (!node.name) return
        for (const pat of uiPatterns) {
            if (node.name === pat || node.name.startsWith(pat + ' ')) {
                node.visible = false
                break
            }
        }
    })
}

/**
 * Build a Map<THREE.Object3D, string> classifying each mesh node by material.
 */
function classifyByMaterial(scene) {
    const map = new Map()

    scene.traverse((node) => {
        if (!node.isMesh) return
        const mat = node.material
        if (!mat) return

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
 * Find heart nodes for heartbeat animation.
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
                results.push({ obj: node, baseScale: node.scale.clone() })
                break
            }
        }
    })

    return results
}

/**
 * Extracts nodes representing the respiratory system (lungs, chest, diaphragm).
 */
function findRespiratoryNodes(scene) {
    const results = []
    const respiratoryPatterns = [
        'lung', 'diaphragm', 'pleura', 'pectoralis', 'intercostal', 'rib', 'bronchi'
    ]

    scene.traverse((node) => {
        if (!node.name) return
        const lower = node.name.toLowerCase()
        for (const pattern of respiratoryPatterns) {
            if (lower.includes(pattern)) {
                // Ribs are many, we want the whole chest to expand slightly
                results.push({ obj: node, baseScale: node.scale.clone() })
                break
            }
        }
    })

    return results
}

/**
 * HumanModel — loads GLB, applies colors, classifies by material, binds toggles.
 */
export default function HumanModel() {
    const { scene } = useGLTF('/human_body.glb')
    const modelRef = useRef()
    const heartMeshes = useRef([])
    const respiratoryMeshes = useRef([])
    const colorsApplied = useRef(false)

    // Store values
    const systems = useBodyStore((s) => s.systems)
    const heartRate = useBodyStore((s) => s.heartRate)
    const respirationRate = useBodyStore((s) => s.respirationRate)
    const setModelLoaded = useBodyStore((s) => s.setModelLoaded)

    // Apply anatomical colors ONCE on load
    useEffect(() => {
        if (colorsApplied.current) return
        colorsApplied.current = true

        hideUINodes(scene)
        applyAnatomicalColors(scene)
        console.log('🎨 Anatomical colors applied')
    }, [scene])

    // Classify nodes by material
    const nodeClassification = useMemo(() => {
        return classifyByMaterial(scene)
    }, [scene])

    // Find animated nodes + log stats
    useEffect(() => {
        heartMeshes.current = findHeartNodes(scene)
        respiratoryMeshes.current = findRespiratoryNodes(scene)
        setModelLoaded(true)

        const stats = {}
        nodeClassification.forEach((system) => {
            stats[system] = (stats[system] || 0) + 1
        })
        console.log('🧬 Model classification:', stats)
    }, [scene, setModelLoaded, nodeClassification])

    // Apply visibility toggles
    useEffect(() => {
        nodeClassification.forEach((system, node) => {
            const systemData = systems[system]
            if (systemData) {
                node.visible = systemData.visible
            }
        })
    }, [systems, nodeClassification])

    // Heartbeat & Breathing animations
    useFrame((state) => {
        const time = state.clock.getElapsedTime()

        // --- HEARTBEAT ---
        if (heartMeshes.current.length > 0) {
            const freq = heartRate / 60
            const phase = (time * freq * Math.PI * 2) % (Math.PI * 2)
            const norm = phase / (Math.PI * 2)
            let pulse = 0

            if (norm < 0.1) {
                pulse = Math.sin(norm / 0.1 * Math.PI) * 0.06
            } else if (norm < 0.15) {
                pulse = 0
            } else if (norm < 0.25) {
                pulse = Math.sin((norm - 0.15) / 0.1 * Math.PI) * 0.03
            }

            heartMeshes.current.forEach(({ obj, baseScale }) => {
                const s = 1 + pulse
                obj.scale.set(baseScale.x * s, baseScale.y * s, baseScale.z * s)
            })
        }

        // --- BREATHING EXCURSION ---
        if (respiratoryMeshes.current.length > 0) {
            // Sine wave for smooth breathing: 1 full cycle = 1 breath
            const respFreq = respirationRate / 60

            // Map sine [-1, 1] to [0, 1] for inspiration/expiration
            const breathCycle = (Math.sin(time * respFreq * Math.PI * 2) + 1) / 2

            // Max expansion 3% on Z (chest depth), 1.5% on X (chest width), 0% on Y
            const expandZ = 1 + (breathCycle * 0.03)
            const expandX = 1 + (breathCycle * 0.015)

            // Calculate diaphragm pull (moves down slightly during inspiration)
            // Lungs expand down, so Y scales slightly 
            const expandY = 1 + (breathCycle * 0.02)

            respiratoryMeshes.current.forEach(({ obj, baseScale }) => {
                // Apply subtle expansion
                if (obj.name.toLowerCase().includes('diaphragm')) {
                    // Diaphragm mostly scales Y (pulls down)
                    obj.scale.set(baseScale.x, baseScale.y * expandY, baseScale.z)
                } else {
                    // Chest/lungs expand outward
                    obj.scale.set(baseScale.x * expandX, baseScale.y, baseScale.z * expandZ)
                }
            })
        }
    })

    const setHoveredPart = useBodyStore((s) => s.setHoveredPart)
    const setSelectedPart = useBodyStore((s) => s.setSelectedPart)
    const hoveredPart = useBodyStore((s) => s.hoveredPart)
    const hoveredMaterialRef = useRef(null)
    const origEmissiveRef = useRef(null)

    // Handle hover effects
    const handlePointerOver = (e) => {
        // Stop raycasting through the model — only get the nearest mesh
        e.stopPropagation()

        const mesh = e.object
        if (!mesh || !mesh.material || !mesh.visible) return

        // Skip non-anatomical nodes
        if (mesh.name && mesh.name.toLowerCase().includes('text')) return

        // Get system from our classification map
        const system = nodeClassification.get(mesh)
        if (!system) return

        // Update global state
        setHoveredPart({
            name: mesh.name.replace(/\.[lro]$/, '').replace(/\.e[lr]$/, ''), // Clean up suffixes
            system: system,
            id: mesh.uuid
        })

        // Add glow effect by modifying emissive color temporarily
        const mat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material
        if (mat) {
            // Restore previous hovered material if any
            if (hoveredMaterialRef.current && hoveredMaterialRef.current !== mat) {
                hoveredMaterialRef.current.emissive.setHex(origEmissiveRef.current)
            }

            // Save original and set new glow
            if (hoveredMaterialRef.current !== mat) {
                hoveredMaterialRef.current = mat
                origEmissiveRef.current = mat.emissive ? mat.emissive.getHex() : 0x000000
                mat.emissive.setHex(0x333333) // Subtle white glow
                mat.needsUpdate = true
            }
        }
    }

    const handlePointerOut = (e) => {
        setHoveredPart(null)

        // Reset glow
        if (hoveredMaterialRef.current) {
            hoveredMaterialRef.current.emissive.setHex(origEmissiveRef.current)
            hoveredMaterialRef.current.needsUpdate = true
            hoveredMaterialRef.current = null
        }
    }

    const handleClick = (e) => {
        e.stopPropagation()
        const mesh = e.object
        if (!mesh || !mesh.visible) return

        const system = nodeClassification.get(mesh)
        if (!system) return

        // Clean up the name for display (remove .l, .r, .ol, .or, .el, .er postfixes)
        let displayName = mesh.name
        // Common 3D naming postfixes for left/right/origin/endpoint
        displayName = displayName.replace(/\.([lro]|ol|or|el|er)$/, '')

        setSelectedPart({
            name: displayName,
            originalName: mesh.name,
            system: system,
            id: mesh.uuid
        })
    }

    return (
        <primitive
            ref={modelRef}
            object={scene}
            dispose={null}
            position={[0, -1, 0]}
            scale={1}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            onClick={handleClick}
        />
    )
}

useGLTF.preload('/human_body.glb')
