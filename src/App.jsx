import Canvas3D from './components/Canvas3D'
import Sidebar from './components/Sidebar'
import useBodyStore from './stores/useBodyStore'

export default function App() {
  const modelLoaded = useBodyStore((s) => s.modelLoaded)

  return (
    <div className="app-container">
      {/* 3D Canvas — full screen */}
      <Canvas3D />

      {/* Sidebar — overlay on the right */}
      <Sidebar />

      {/* Loading Screen */}
      {!modelLoaded && (
        <div className="loading-screen">
          <div className="loading-spinner" />
          <div className="loading-text">Caricamento modello anatomico...</div>
        </div>
      )}
    </div>
  )
}
