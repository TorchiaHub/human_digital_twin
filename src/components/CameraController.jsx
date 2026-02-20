import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import useBodyStore from '../stores/useBodyStore'

export default function CameraController() {
    const { camera, controls } = useThree()
    const focusedPartId = useBodyStore((s) => s.focusedPartId)
    const searchableParts = useBodyStore((s) => s.searchableParts)

    // Default resting positions (from Canvas3D defaults)
    const targetPosition = useRef(new THREE.Vector3(0, 0.5, 3))
    const targetLookAt = useRef(new THREE.Vector3(0, 0.5, 0))
    const isAnimating = useRef(false)

    useEffect(() => {
        if (!focusedPartId) return

        const part = searchableParts.find(p => p.id === focusedPartId)
        if (part && part.cameraTarget) {
            const center = new THREE.Vector3(...part.cameraTarget)
            // Distance calculation based on bounding box size
            const distance = Math.max(part.cameraDistance * 3, 0.4)

            // Set new look-at target to the exact center of the organ/mesh
            targetLookAt.current.copy(center)

            // Set new optimal camera position (slightly offset Z and Y for 3/4 view)
            const offset = new THREE.Vector3(0, 0, distance)
            targetPosition.current.copy(center).add(offset)

            isAnimating.current = true
        }
    }, [focusedPartId, searchableParts])

    useFrame((state, delta) => {
        if (!isAnimating.current || !controls) return

        // Smoothly interpolate (lerp) camera and target controls
        // Using a factor like 0.06 creates a natural easing effect
        camera.position.lerp(targetPosition.current, 0.06)
        controls.target.lerp(targetLookAt.current, 0.06)
        controls.update()

        // Disable animation loop when reaching destination to save GPU cycles
        if (
            camera.position.distanceTo(targetPosition.current) < 0.01 &&
            controls.target.distanceTo(targetLookAt.current) < 0.01
        ) {
            isAnimating.current = false
        }
    })

    return null
}
