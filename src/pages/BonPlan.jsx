import React, { useState } from 'react'
import Reveal from '../components/Reveal.jsx'
import './BonPlan.css'

const CARDS = [
    { img: 'zencard_pub2.jpg', title: 'ZenCard — Offre Spéciale' },
    { img: 'zencard_pub3.jpg', title: 'ZenCard — Promotion Exclusive' },
    { img: 'zencard_pub5.jpg', title: 'ZenCard — Bon Plan #5' },
    { img: 'zencard_pub5b.jpg', title: 'ZenCard — Édition Spéciale' },
    { img: 'zencard_pub6.jpg', title: 'ZenCard — Bon Plan #6' },
    { img: 'zencard_pub6b.jpg', title: 'ZenCard — Offre Limitée' },
    { img: 'zencard_pub7.jpg', title: 'ZenCard — Bon Plan #7' },
    { img: 'zencard_product.jpg', title: 'ZenCard — Le Produit' },
]

export default function BonPlan() {
    const [lightbox, setLightbox] = useState({ open: false, img: '', title: '' })
    const [zencardOpen, setZencardOpen] = useState(false)

    const openAffiche = (img, title) => setLightbox({ open: true, img, title })
    const closeLb = () => setLightbox({ open: false, img: '', title: '' })

    return (
        <div className="bonplan-page">
            <div className="anniv-banner">
                <div className="container">
                    <div className="anniv-inner">
                        <div className="anniv-badge">20 ANS</div>

                        <div className="anniv-text">
                            Kapi Consult célèbre ses <strong>20 ans d'excellence</strong> au service des organisations.
                        </div>
                    </div>
                </div>
            </div>

            <main>
                <section className="hero-section">
                    <div className="container">
                        <div className="hero-tag">Kapi Consult</div>

                        <h1 className="hero-title">
                            Bons Plans <span>&amp;</span> ZenCard
                        </h1>

                        <p className="hero-text">
                            Offres spéciales, promotions et avantages exclusifs sélectionnés pour vous.
                        </p>

                        <button className="hero-btn" onClick={() => setZencardOpen(true)}>
                            💳 Recharger ma ZenCard
                        </button>
                    </div>
                </section>

                <section className="bonsplans-section">
                    <div className="container">
                        <div className="section-head">
                            <span className="section-tag">Offres &amp; Promotions</span>
                            <h2 className="section-title">Nos bons plans du moment</h2>
                        </div>

                        <div className="bp-grid">
                            {CARDS.map((c, i) => (
                                <Reveal
                                    as="div"
                                    className="bp-card"
                                    delay={i * 80}
                                    key={c.img}
                                    onClick={() => openAffiche(`/images/${c.img}`, c.title)}
                                >
                                    <span className="bp-badge">ZenCard</span>

                                    <img src={`/images/${c.img}`} className="bp-img" alt={c.title} />

                                    <div className="bp-overlay">
                                        <span style={{ color: 'white', fontSize: '13px', fontWeight: 600 }}>
                                            🔍 Agrandir
                                        </span>
                                    </div>

                                    <div className="bp-footer">
                                        <span className="bp-name">{c.title}</span>
                                    </div>
                                </Reveal>
                            ))}

                            <Reveal as="div" className="bp-text-card" delay={CARDS.length * 80}>
                                <div className="bp-icon">💡</div>

                                <span className="bp-mini-badge">Bon Plan</span>

                                <h3 className="bp-text-title">Formation Gratuite : Excel RH</h3>

                                <p className="bp-text">
                                    Kapi Consult vous offre un accès gratuit à sa formation Excel RH.
                                </p>

                                <a href="#" className="bp-link">Voir le détail →</a>
                            </Reveal>
                        </div>
                    </div>
                </section>
            </main>

            <div className={`lb-bg${lightbox.open ? ' open' : ''}`} onClick={closeLb}>
                <div className="lb-content" onClick={(e) => e.stopPropagation()}>
                    <button className="lb-close" onClick={closeLb}>✕</button>

                    <img src={lightbox.img} alt={lightbox.title} className="lb-img" />

                    <div className="lb-title">{lightbox.title}</div>
                </div>
            </div>

            <div className={`zc-modal-bg${zencardOpen ? ' open' : ''}`}>
                <div className="zc-modal-box">
                    <button className="zc-close" onClick={() => setZencardOpen(false)}>✕</button>

                    <div className="zc-icon">💳</div>

                    <h2 className="zc-title">Recharge ZenCard</h2>

                    <p className="zc-text">Le système de recharge sera bientôt disponible.</p>
                </div>
            </div>
        </div>
    )
}
