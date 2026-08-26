import React from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import Testimonials from '../components/Testimonials.jsx'

export default function Home() {
    return (
        <>
            {/* HERO */}
            <section className="hero">
                <div className="hero-video">
                    <video autoPlay muted loop playsInline>
                        <source src="/videos/hero.mp4" type="video/mp4" />
                    </video>
                </div>

                <div className="hero-overlay"></div>

                <div className="hero-content">
                    <h1>
                        <span className="light">Transport</span>
                        <span className="highlight">sécurisé</span><br />

                        <span className="light">et</span>
                        <span className="bold">rapide</span>
                        <span className="light">de vos</span><br />

                        <span className="bold">marchandises</span>
                    </h1>

                    <p>
                        TRFS vous accompagne dans le transport de vos colis avec un suivi en temps réel,
                        une sécurité optimale et une livraison fiable.
                    </p>

                    <Link to="/services" className="btn-white">Voir nos Services</Link>
                </div>
            </section>

            {/* FEATURES */}
            <section className="features">
                <div className="features-box">
                    <Reveal as="div" className="feature" delay={0}>
                        <div className="circle"><i className="fas fa-cogs"></i></div>
                        <p>Expertise</p>
                    </Reveal>

                    <Reveal as="div" className="feature" delay={100}>
                        <div className="circle"><i className="fas fa-bolt"></i></div>
                        <p>Rapidité</p>
                    </Reveal>

                    <Reveal as="div" className="feature" delay={200}>
                        <div className="circle"><i className="fas fa-globe"></i></div>
                        <p>Fiabilité</p>
                    </Reveal>

                    <Reveal as="div" className="feature" delay={300}>
                        <div className="circle"><i className="fas fa-briefcase"></i></div>
                        <p>Professionnalisme</p>
                    </Reveal>
                </div>
            </section>

            {/* SERVICES */}
            <section className="services">
                <div className="services-top">
                    <div className="services-title">
                        <h2>Nos Services</h2>
                    </div>
                </div>

                <div className="services-cards">
                    <Reveal as="div" className="card" delay={0}>
                        <img src="/images/service1.jpg" alt="" />
                        <div className="card-body">
                            <div className="card-icon"><i className="fas fa-truck"></i></div>
                            <h3>Transport<br />national</h3>
                            <p>Livraison rapide sur tout le territoire</p>
                        </div>
                    </Reveal>

                    <Reveal as="div" className="card" delay={150}>
                        <img src="/images/service2.jpg" alt="" />
                        <div className="card-body">
                            <div className="card-icon"><i className="fas fa-ship"></i></div>
                            <h3>Transport<br />international</h3>
                            <p>Expédition sécurisée à l'international</p>
                        </div>
                    </Reveal>

                    <Reveal as="div" className="card" delay={300}>
                        <img src="/images/service3.jpg" alt="" />
                        <div className="card-body">
                            <div className="card-icon"><i className="fas fa-location-dot"></i></div>
                            <h3>Suivi en temps<br />réel</h3>
                            <p>Suivez vos marchandises à chaque étape</p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* WHY */}
            <section className="why">
                <div className="overlay"></div>

                <h2>Pourquoi choisir TRFS</h2>

                <div className="why-items">
                    <Reveal as="div" className="why-box" delay={0}>
                        <div className="icon"><i className="fa-solid fa-bolt"></i></div>
                        <h3>Rapidité</h3>
                        <p>Livraison dans les meilleurs délais</p>
                    </Reveal>

                    <Reveal as="div" className="why-box" delay={150}>
                        <div className="icon"><i className="fa-solid fa-shield-halved"></i></div>
                        <h3>Sécurité</h3>
                        <p>Protection optimale des marchandises</p>
                    </Reveal>

                    <Reveal as="div" className="why-box" delay={300}>
                        <div className="icon"><i className="fa-solid fa-circle-check"></i></div>
                        <h3>Fiabilité</h3>
                        <p>Service professionnel et ponctuel</p>
                    </Reveal>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <Testimonials />

            {/* PARTNERS */}
            <section className="partners">
                <div className="partners-blur blur-left"></div>
                <div className="partners-blur blur-right"></div>

                <div className="container">
                    <Reveal as="div" className="section-header">
                        <span className="mini-title">PARTENAIRES</span>

                        <h2>Nos partenaires</h2>

                        <p>
                            Des entreprises et organisations qui nous font confiance
                            pour assurer un transport moderne, rapide et sécurisé.
                        </p>
                    </Reveal>

                    <div className="partners-slider">
                        <div className="partners-track">
                            {['partner1.jpg', 'partner2.png', 'partner1.jpg', 'partner2.png', 'partner1.jpg', 'partner2.png', 'partner1.jpg', 'partner2.png'].map((img, i) => (
                                <div className="partner-card" key={i}>
                                    <img src={`/images/${img}`} alt="" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta">
                <Reveal as="div" className="cta-text" delay={0}>
                    <h2>TRFS transporte vos marchandises en toute sécurité et fiabilité. </h2>
                    <Link to="/services" className="btn-blue">Voir nos Services</Link>
                </Reveal>

                <img src="/images/camion.png" className="cta-img" alt="camion" />
            </section>
        </>
    )
}
