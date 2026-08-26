import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFlash } from '../context/FlashContext.jsx'

export default function Footer() {
    const [email, setEmail] = useState('')
    const { showFlash } = useFlash()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email) return
        showFlash('Merci pour votre inscription à la newsletter !', 'success')
        setEmail('')
    }

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-col">
                    <img src="/images/logo.png" alt="logo" />

                    <p className="footer-text">
                        TRFS vous accompagne dans le transport de vos colis avec un suivi en temps réel,
                        une sécurité optimale et une livraison fiable.
                    </p>

                    <div className="socials">
                        <a href="#" className="social-icon"><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="#" className="social-icon"><i className="fa-brands fa-tiktok"></i></a>
                        <a href="#" className="social-icon"><i className="fa-brands fa-youtube"></i></a>
                        <a href="#" className="social-icon"><i className="fa-brands fa-linkedin-in"></i></a>
                    </div>
                </div>

                <div className="footer-col">
                    <h4>Liens utiles</h4>
                    <ul className="footer-links">
                        <li><Link to="/" className="active">Accueil</Link></li>
                        <li><Link to="/about">À propos</Link></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Souscrire à la newsletter</h4>

                    <form className="newsletter-form" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Votre email"
                            className="newsletter-input"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <button type="submit" className="newsletter-btn">
                            S'inscrire
                        </button>
                    </form>
                </div>
            </div>

            <div className="footer-bottom">
                <hr />
                <p>Copyright © 2026 TRFS. Tous droits réservés.</p>
            </div>
        </footer>
    )
}
