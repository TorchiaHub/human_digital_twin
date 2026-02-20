import { useState, useRef, useEffect } from 'react'
import { Search } from 'lucide-react'
import useBodyStore from '../stores/useBodyStore'

export default function SearchBar() {
    const [query, setQuery] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    // Zustand store
    const searchableParts = useBodyStore((s) => s.searchableParts)
    const setSelectedPart = useBodyStore((s) => s.setSelectedPart)
    const setFocusedPartId = useBodyStore((s) => s.setFocusedPartId)
    const systems = useBodyStore((s) => s.systems)

    const wrapperRef = useRef(null)

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Filter parts
    const filteredParts = query.trim() === ''
        ? []
        : searchableParts.filter(part =>
            part.name.toLowerCase().includes(query.toLowerCase()) ||
            (systems[part.system]?.label || '').toLowerCase().includes(query.toLowerCase())
        ).slice(0, 15) // Limit to 15 results for performance

    const handleSelect = (part) => {
        setQuery(part.name)
        setIsOpen(false)
        setSelectedPart({ name: part.name, system: part.system })
        setFocusedPartId(part.id)
    }

    return (
        <div ref={wrapperRef} className="search-container">
            <div className="search-input-wrapper">
                <Search size={18} className="search-icon" />
                <input
                    type="text"
                    placeholder="Cerca organo, osso, muscolo..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value)
                        setIsOpen(true)
                    }}
                    onFocus={() => setIsOpen(true)}
                    className="search-input"
                />
            </div>

            {isOpen && filteredParts.length > 0 && (
                <div className="search-dropdown">
                    {filteredParts.map(part => {
                        const sys = systems[part.system] || { label: part.system, icon: '❓', color: '#fff' }
                        return (
                            <button
                                key={part.id}
                                className="search-item"
                                onClick={() => handleSelect(part)}
                            >
                                <span className="search-item-icon" style={{ backgroundColor: `${sys.color}20` }}>
                                    {sys.icon}
                                </span>
                                <div className="search-item-info">
                                    <span className="search-item-name">{part.name}</span>
                                    <span className="search-item-system" style={{ color: sys.color }}>
                                        {sys.label}
                                    </span>
                                </div>
                            </button>
                        )
                    })}
                </div>
            )}

            {isOpen && query.length > 0 && filteredParts.length === 0 && (
                <div className="search-dropdown">
                    <div className="search-item-empty">Nessun risultato trovato.</div>
                </div>
            )}
        </div>
    )
}
