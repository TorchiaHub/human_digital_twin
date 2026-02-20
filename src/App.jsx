import Canvas3D from './components/Canvas3D'
import Sidebar from './components/Sidebar'
import InfoPanel from './components/InfoPanel'
import useBodyStore from './stores/useBodyStore'

export default function App() {
  const modelLoaded = useBodyStore((s) => s.modelLoaded)

  return (
    <div className="app-container relative w-screen h-screen overflow-hidden">
      {/* 3D Canvas — full screen */}
      <Canvas3D />

      {/* Overlay UI Layer */}
      <div className="absolute inset-0 pointer-events-none z-10 flex justify-between p-6">
        {/* Left side: Info Panel */}
        <div className="pointer-events-auto">
          <InfoPanel />
        </div>

        {/* Right side: Sidebar */}
        <div className="pointer-events-auto flex items-start">
          <Sidebar />
        </div>
      </div>

      {/* Loading Screen */}
      {!modelLoaded && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050510]">
          <div className="w-12 h-12 border-4 border-white/20 border-t-blue-500 rounded-full animate-spin mb-4" />
          <div className="text-white/80 font-medium">Caricamento modello anatomico...</div>
        </div>
      )}
    </div>
  )
}
