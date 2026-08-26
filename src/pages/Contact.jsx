import React, { useState } from 'react'
import { useFlash } from '../context/FlashContext.jsx'
import Reveal from '../components/Reveal.jsx'

const INITIAL = { nom: '', email: '', sujet: '', message: '' }

export default function Contact() {
    const [form, setForm] = useState(INITIAL)
    const { showFlash } = useFlash()

    const handleChange = (e) => {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        showFlash('Votre message a bien été envoyé. Nous vous répondrons rapidement.', 'success')
        setForm(INITIAL)
    }

    return (
        <>
            <section className="contact-hero">
                <div className="container">
                    <h1>Contactez-nous</h1>
                    <p>Nous sommes à votre écoute pour tous vos besoins de transport</p>
                </div>
            </section>

            <section className="contact-section">
                <div className="container contact-grid">
                    <Reveal as="div" className="contact-info reveal-left">
                        <h2>Nos coordonnées</h2>

                        <p className="info-subtitle">
                            Nous sommes disponibles pour répondre à toutes vos demandes et vous accompagner 7j/7.
                        </p>

                        <div className="info-grid">
                            <div className="info-card">
                                <i className="fa-solid fa-location-dot"></i>
                                <h4>Adresse</h4>
                                <span>Lomé, Togo</span>
                            </div>

                            <div className="info-card">
                                <i className="fa-solid fa-phone"></i>
                                <h4>Téléphone</h4>
                                <span>+228 90 79 34 34</span>
                            </div>

                            <div className="info-card">
                                <i className="fa-solid fa-envelope"></i>
                                <h4>Email</h4>
                                <span>contact@trfs.com</span>
                            </div>

                            <div className="info-card">
                                <i className="fa-solid fa-headset"></i>
                                <h4>Support</h4>
                                <span>Réponse rapide 24h</span>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal as="div" className="contact-form reveal-right" delay={150}>
                        <div className="form-header">
                            <span className="mini-badge">CONTACT</span>

                            <h2>Envoyer un message</h2>

                            <p>
                                Notre équipe vous répond rapidement pour
                                tous vos besoins de transport.
                            </p>
                        </div>

                        <form className="premium-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Nom complet</label>
                                <input
                                    type="text"
                                    name="nom"
                                    placeholder="Votre nom"
                                    required
                                    value={form.nom}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Votre email"
                                    required
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Sujet</label>
                                <input
                                    type="text"
                                    name="sujet"
                                    placeholder="Sujet"
                                    value={form.sujet}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Message</label>
                                <textarea
                                    name="message"
                                    placeholder="Votre message"
                                    required
                                    value={form.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <button type="submit" className="btn-primary btn-send">
                                <i className="fa-solid fa-paper-plane"></i>
                                Envoyer le message
                            </button>
                        </form>
                    </Reveal>
                </div>
            </section>
        </>
    )
}
