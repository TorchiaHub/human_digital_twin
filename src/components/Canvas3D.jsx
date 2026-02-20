import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import HumanModel from './HumanModel'
import CameraController from './CameraController'

export default function Canvas3D() {
    return (
        <div className="canvas-container">
            <Canvas
                camera={{
                    position: [0, 0.5, 3],
                    fov: 50,
                    near: 0.1,
                    far: 100,
                }}
                gl={{
                    antialias: true,
                    toneMapping: 3, // ACESFilmic
                    toneMappingExposure: 1.2,
                }}
                dpr={[1, 2]}
            >
                {/* Lighting */}
                <ambientLight intensity={0.4} color="#c8d8ff" />
                <directionalLight
                    position={[5, 8, 5]}
                    intensity={1.5}
                    color="#ffffff"
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                />
                <directionalLight
                    position={[-3, 4, -4]}
                    intensity={0.5}
                    color="#8bb8ff"
                />
                <directionalLight
                    position={[0, -2, 3]}
                    intensity={0.2}
                    color="#ff8866"
                />

                {/* Environment for reflections */}
                <Environment preset="city" background={false} />

                {/* Contact shadows beneath the model */}
                <ContactShadows
                    position={[0, -1.01, 0]}
                    opacity={0.4}
                    scale={4}
                    blur={2.5}
                    far={2}
                    color="#000020"
                />

                {/* Human Model */}
                <Suspense fallback={null}>
                    <HumanModel />
                </Suspense>

                {/* Orbit Controls */}
                <OrbitControls
                    makeDefault
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    minDistance={1}
                    maxDistance={10}
                    target={[0, 0.5, 0]}
                    autoRotate={false}
                    enableDamping={true}
                    dampingFactor={0.05}
                />

                {/* Camera Controller for Auto-Zoom */}
                <CameraController />
            </Canvas>
        </div>
    )
}
