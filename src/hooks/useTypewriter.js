import { useState, useEffect } from 'react'

export default function useTypewriter(text, speed = 30) {
    const [displayedText, setDisplayedText] = useState('')

    useEffect(() => {
        setDisplayedText('')
        if (!text) return

        let i = 0
        const intervalId = setInterval(() => {
            setDisplayedText(text.substring(0, i + 1))
            i++
            if (i >= text.length) {
                clearInterval(intervalId)
            }
        }, speed)

        return () => clearInterval(intervalId)
    }, [text, speed])

    return displayedText
}
