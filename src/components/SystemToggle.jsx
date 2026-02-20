import useBodyStore from '../stores/useBodyStore'

export default function SystemToggle({ systemKey }) {
    const system = useBodyStore((s) => s.systems[systemKey])
    const toggle = useBodyStore((s) => s.toggleSystem)

    if (!system) return null

    return (
        <div
            className="toggle-row"
            style={{ opacity: system.visible ? 1 : 0.5 }}
        >
            <div className="toggle-label">
                <div
                    className="toggle-icon"
                    style={{
                        background: system.visible
                            ? `${system.color}18`
                            : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${system.visible ? system.color + '40' : 'rgba(255,255,255,0.06)'}`,
                    }}
                >
                    {system.icon}
                </div>
                <span className="toggle-name">{system.label}</span>
            </div>

            <div
                className={`toggle-switch ${system.visible ? 'active' : ''}`}
                onClick={() => toggle(systemKey)}
                role="switch"
                aria-checked={system.visible}
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        toggle(systemKey)
                    }
                }}
            >
                <div className="toggle-knob" />
            </div>
        </div>
    )
}
