import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [careerOpen, setCareerOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()
    const dropdownRef = useRef(null)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Close the dropdown whenever the route changes (link click, back/forward...).
    useEffect(() => {
        setCareerOpen(false)
    }, [location.pathname])

    // Click-to-toggle (not hover — a hover-open immediately undone by the
    // click that follows it is a real trap on both mouse and touch), closed
    // by clicking anywhere outside the dropdown.
    useEffect(() => {
        if (!careerOpen) return

        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setCareerOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [careerOpen])

    const linkClass = ({ isActive }) => (isActive ? 'active' : undefined)
    const isCareerActive = location.pathname.startsWith('/carriere')

    const closeAll = () => {
        setMenuOpen(false)
        setCareerOpen(false)
    }

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
                        <NavLink to="/" end className={linkClass} onClick={closeAll}>
                            Accueil
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className={linkClass} onClick={closeAll}>
                            À propos
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/services" className={linkClass} onClick={closeAll}>
                            Services
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/bon-plan" className={linkClass} onClick={closeAll}>
                            Bon plans
                        </NavLink>
                    </li>

                    <li
                        className={`nav-dropdown${careerOpen ? ' open' : ''}`}
                        ref={dropdownRef}
                    >
                        <button
                            type="button"
                            className={`nav-dropdown-trigger${isCareerActive ? ' active' : ''}`}
                            onClick={() => setCareerOpen((v) => !v)}
                            aria-expanded={careerOpen}
                        >
                            Carrière
                            <i className="fa-solid fa-chevron-down"></i>
                        </button>

                        <ul className="nav-dropdown-menu">
                            <li>
                                <NavLink to="/carriere/offres" className={linkClass} onClick={closeAll}>
                                    Offres d'emploi
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/carriere/candidature-spontanee" className={linkClass} onClick={closeAll}>
                                    Candidature spontanée
                                </NavLink>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <NavLink to="/contact" className={linkClass} onClick={closeAll}>
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
