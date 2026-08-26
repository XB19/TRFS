import React from 'react'
import { useReveal } from '../hooks/useReveal.js'

export default function Reveal({ as: Tag = 'div', className = '', delay = 0, style, children, ...rest }) {
    const [ref, visible] = useReveal()

    return (
        <Tag
            ref={ref}
            className={`reveal${visible ? ' in-view' : ''}${className ? ` ${className}` : ''}`}
            style={{ transitionDelay: visible ? `${delay}ms` : '0ms', ...style }}
            {...rest}
        >
            {children}
        </Tag>
    )
}
