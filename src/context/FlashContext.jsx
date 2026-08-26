import React, { createContext, useCallback, useContext, useState } from 'react'

const FlashContext = createContext(null)

let idCounter = 0

export function FlashProvider({ children }) {
    const [messages, setMessages] = useState([])

    const showFlash = useCallback((text, tag = 'success') => {
        const id = ++idCounter
        setMessages((prev) => [...prev, { id, text, tag }])
        setTimeout(() => {
            setMessages((prev) => prev.filter((m) => m.id !== id))
        }, 4000)
    }, [])

    return (
        <FlashContext.Provider value={{ messages, showFlash }}>
            {children}
            <div className="flash-wrapper">
                {messages.map((m) => (
                    <div key={m.id} className={`flash-message ${m.tag}`}>
                        {m.text}
                    </div>
                ))}
            </div>
        </FlashContext.Provider>
    )
}

export function useFlash() {
    return useContext(FlashContext)
}
