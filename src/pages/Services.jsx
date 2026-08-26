import React from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'

const SERVICES = [
    { icon: 'fa-truck-fast', title: 'Transport national', text: 'Livraison de vos marchandises sur toute l’étendue du territoire.' },
    { icon: 'fa-globe', title: 'Transport international', text: 'Expédition vers plusieurs destinations avec un suivi fiable.' },
    { icon: 'fa-stopwatch', title: 'Livraison express', text: 'Service rapide pour les livraisons urgentes.' },
    { icon: 'fa-location-dot', title: 'Suivi en temps réel', text: 'Suivez vos marchandises à chaque étape du transport.' },
    { icon: 'fa-headset', title: 'Support client', text: 'Une équipe disponible pour vous accompagner à tout moment.' },
]

export default function Services() {
    return (
        <>
            <section className="services-hero">
                <div className="container">
                    <h1>Nos Services</h1>
                    <p>Des solutions adaptées pour tous vos besoins de transport de marchandises</p>
                </div>
            </section>

            <section className="services-section">
                <div className="container">
                    <Reveal as="div" className="section-header">
                        <h2>Ce que nous proposons</h2>
                        <p>Des services conçus pour la performance et la sécurité</p>
                    </Reveal>

                    <div className="services-grid">
                        {SERVICES.map((s, i) => (
                            <Reveal as="div" className="service-card" delay={i * 100} key={s.title}>
                                <div className="icon"><i className={`fa-solid ${s.icon}`}></i></div>
                                <h3>{s.title}</h3>
                                <p>{s.text}</p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="services-cta">
                <Reveal as="div" className="container reveal-scale">
                    <h2>Besoin d’un transport ?</h2>
                    <p>Créez votre demande en quelques clics</p>
                    <Link to="/" className="btn-primary">Commencer</Link>
                </Reveal>
            </section>
        </>
    )
}
