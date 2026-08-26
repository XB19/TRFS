import React from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'

export default function About() {
    return (
        <>
            <section className="about-hero">
                <div className="container">
                    <h1>À propos de TRFS</h1>
                    <p>Une solution moderne pour le transport sécurisé et rapide de vos marchandises</p>
                </div>
            </section>

            <section className="about-section">
                <div className="container about-grid">
                    <Reveal as="div" className="about-text reveal-left">
                        <h2>Qui sommes-nous ?</h2>

                        <p>
                            Créée en <strong>2004</strong>, <strong>T.R.F.S SA</strong> est une société spécialisée dans le transport routier de
                            marchandises diverses (conteneurs et casiers) ainsi que dans le transport de produits pétroliers
                            au Togo et dans la sous-région.
                        </p>

                        <p>
                            Grâce à un parc d’attelages conformes aux normes de transport sous-régionales,
                            l’entreprise s’impose aujourd’hui comme une <strong>référence du transport routier au Togo</strong>.
                        </p>

                        <p>
                            Elle assure l’acheminement des marchandises des principaux affréteurs et des industries,
                            aussi bien sur le plan national que dans l’hinterland.
                        </p>

                        <p>
                            Animée par le <strong>dynamisme</strong> et le <strong>professionnalisme</strong> de son équipe,
                            T.R.F.S SA ambitionne de révolutionner le transport de conteneurs à travers le respect strict
                            des normes sécuritaires de conduite.
                        </p>

                        <p>
                            Depuis sa création, la société met en place une politique annuelle de formation à la
                            conduite défensive pour ses chauffeurs, ainsi que le renforcement des capacités de ses mécaniciens.
                        </p>

                        <p>
                            Située au <strong>61851 pavés Lomégan</strong>, T.R.F.S SA est dirigée par
                            <strong> Madame Eliane JOHNSON</strong>.
                        </p>
                    </Reveal>

                    <Reveal as="div" className="about-image reveal-right" delay={150}>
                        <img src="/images/about.jpg" alt="Camions T.R.F.S SA transport routier Togo" />
                    </Reveal>
                </div>
            </section>

            <section className="about-values">
                <div className="container">
                    <Reveal as="div" className="section-header">
                        <h2>Nos valeurs</h2>
                        <p>Ce qui fait la force de TRFS</p>
                    </Reveal>

                    <div className="values-grid">
                        <Reveal as="div" className="value-card" delay={0}>
                            <div className="icon"><i className="fas fa-bolt"></i></div>
                            <h3>Rapidité</h3>
                            <p>Nous assurons des livraisons rapides avec respect strict des délais.</p>
                        </Reveal>

                        <Reveal as="div" className="value-card" delay={150}>
                            <div className="icon"><i className="fas fa-shield-alt"></i></div>
                            <h3>Sécurité</h3>
                            <p>Vos marchandises sont protégées tout au long du transport.</p>
                        </Reveal>

                        <Reveal as="div" className="value-card" delay={300}>
                            <div className="icon"><i className="fas fa-check-circle"></i></div>
                            <h3>Fiabilité</h3>
                            <p>Un service constant et digne de confiance.</p>
                        </Reveal>
                    </div>
                </div>
            </section>

            <section className="about-cta">
                <Reveal as="div" className="container reveal-scale">
                    <h2>Prêt à expédier vos marchandises ?</h2>
                    <p>Faites confiance à TRFS pour un transport rapide et sécurisé.</p>
                    <Link to="/services" className="btn-primary">Voir nos services</Link>
                </Reveal>
            </section>
        </>
    )
}
