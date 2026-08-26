import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const linkClass = ({ isActive }) => (isActive ? 'active' : undefined)

    return (
        <header className={`header${scrolled ? ' scrolled' : ''}`}>
            <div className="topbar">
                <div className="topbar-item">
                    <i className="fa-solid fa-location-dot"></i>
                    <span>6185 pavés, Lomégan - Lomé</span>
                </div>

                <div className="topbar-item">
                    <i className="fa-solid fa-phone"></i>
                    <span>+228 90 79 34 34</span>
                </div>
            </div>

            <nav className="navbar">
                <div className="logo">
                    <NavLink to="/">
                        <img src="/images/logo.png" alt="logo" />
                    </NavLink>
                </div>

                <ul className={`nav-links${menuOpen ? ' active' : ''}`}>
                    <li>
                        <NavLink to="/" end className={linkClass} onClick={() => setMenuOpen(false)}>
                            Accueil
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className={linkClass} onClick={() => setMenuOpen(false)}>
                            À propos
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/services" className={linkClass} onClick={() => setMenuOpen(false)}>
                            Services
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/bon-plan" className={linkClass} onClick={() => setMenuOpen(false)}>
                            Bon plans
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" className={linkClass} onClick={() => setMenuOpen(false)}>
                            Contact
                        </NavLink>
                    </li>
                </ul>

                <div className="nav-actions">
                    <NavLink to="/contact" className="btn-primary">Nous contacter</NavLink>
                </div>

                <div className="menu-toggle" onClick={() => setMenuOpen((v) => !v)}>
                    <i className="fa-solid fa-bars"></i>
                </div>
            </nav>
        </header>
    )
}
