import SystemToggle from './SystemToggle'
import VitalSigns from './VitalSigns'

const SYSTEM_KEYS = [
    'integumentary',
    'skeletal',
    'muscular',
    'cardiovascular',
    'nervous',
    'organs',
]

export default function Sidebar() {
    return (
        <aside className="sidebar">
            {/* Header */}
            <div className="sidebar-header">
                <h1>Human Digital Twin</h1>
                <p>Esplorazione Anatomica Interattiva</p>
            </div>

            {/* Anatomical Systems */}
            <div className="sidebar-section">
                <h2>Sistemi Anatomici</h2>
                {SYSTEM_KEYS.map((key) => (
                    <SystemToggle key={key} systemKey={key} />
                ))}
            </div>

            {/* Vital Signs */}
            <div className="sidebar-section">
                <h2>Dati Vitali</h2>
                <VitalSigns />
            </div>

            {/* Footer */}
            <div
                style={{
                    marginTop: 'auto',
                    padding: '16px 24px',
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                }}
            >
                <p style={{
                    fontSize: '10px',
                    color: 'rgba(240,242,245,0.3)',
                    textAlign: 'center',
                    letterSpacing: '0.05em',
                }}>
                    HDT v1.0 · Milestone 1
                </p>
            </div>
        </aside>
    )
}
