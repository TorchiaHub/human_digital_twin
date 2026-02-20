import useBodyStore from '../stores/useBodyStore'

export default function VitalSigns() {
    const heartRate = useBodyStore((s) => s.heartRate)

    return (
        <div className="vital-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="heart-indicator">♥</span>
                <div>
                    <div>
                        <span className="vital-value">{heartRate}</span>
                        <span className="vital-unit">BPM</span>
                    </div>
                    <div className="vital-label">Frequenza Cardiaca</div>
                </div>
            </div>
        </div>
    )
}
