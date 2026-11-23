import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import './BonPlan.css'
import { useBonPlan } from '../api/bonplan.js'

/*
 * « Bons Plans & ZenCard » : même mise en page que la page de Kapi Consult (bandeau avec compteur,
 * affiches avec visionneuse, cartes « bon plan », fenêtre ZenCard), aux couleurs de TRFS.
 */

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

// Contenu local, affiché tant que l'API Bon Plan du groupe n'est pas configurée ou ne répond pas.
const LOCAL = {
    posters: CARDS.map((c) => ({ id: c.img, title: c.title, image: `/images/${c.img}`, badge: 'ZenCard' })),
    cards: [
        {
            id: 'excel-rh',
            title: 'Formation Gratuite : Excel RH',
            text: 'Kapi Consult vous offre un accès gratuit à sa formation Excel RH.',
            badge: 'Bon Plan',
            url: 'https://kapiconsult.tg/articles/formation-gratuite-maitrisez-excel-pour-les-rh-69b2408f8940d',
        },
    ],
}

/** Ferme sur Échap et bloque le défilement de la page tant qu'une fenêtre est ouverte. */
function useModal(onClose, onKey) {
    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'Escape') onClose()
            onKey?.(e)
        }
        window.addEventListener('keydown', handler)
        document.body.style.overflow = 'hidden'
        return () => {
            window.removeEventListener('keydown', handler)
            document.body.style.overflow = ''
        }
    }, [onClose, onKey])
}

function ZencardDialog({ onClose }) {
    useModal(onClose)
    return (
        <div className="zc-modal-bg open" role="dialog" aria-modal="true" aria-label="Recharge ZenCard"
            onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="zc-modal-box">
                <button className="zc-close" onClick={onClose} aria-label="Fermer">✕</button>
                <div className="zc-icon">💳</div>
                <h2 className="zc-title">Recharge ZenCard</h2>
                <p className="zc-text">Rechargez votre carte avantages en quelques clics.</p>
                <div className="zc-notice">
                    <span aria-hidden="true">🚧</span>
                    <div>
                        <b>Service bientôt disponible</b>
                        La recharge en ligne est en cours de déploiement. Contactez-nous pour toute urgence.
                    </div>
                </div>
                <div className="zc-actions">
                    <Link to="/contact" className="zc-btn" onClick={onClose}>📞 Nous contacter</Link>
                    <button type="button" className="zc-btn zc-btn--outline" onClick={onClose}>Fermer</button>
                </div>
            </div>
        </div>
    )
}

function Viewer({ items, index, onClose, onMove }) {
    const keys = useCallback((e) => {
        if (e.key === 'ArrowRight') onMove(1)
        if (e.key === 'ArrowLeft') onMove(-1)
    }, [onMove])
    useModal(onClose, keys)
    const item = items[index]
    return (
        <div className="lb-bg open" role="dialog" aria-modal="true" aria-label={item.title}
            onClick={(e) => e.target === e.currentTarget && onClose()}>
            <button className="lb-close" onClick={onClose} aria-label="Fermer">✕</button>
            {items.length > 1 && <button className="lb-nav lb-nav--prev" onClick={() => onMove(-1)} aria-label="Affiche précédente">‹</button>}
            <div className="lb-content">
                <img src={item.image} alt={item.title} className="lb-img" />
                <div className="lb-title">
                    {item.title}
                    <small>{index + 1} / {items.length}</small>
                </div>
            </div>
            {items.length > 1 && <button className="lb-nav lb-nav--next" onClick={() => onMove(1)} aria-label="Affiche suivante">›</button>}
        </div>
    )
}

export default function BonPlan() {
    const { posters, cards, loading } = useBonPlan(LOCAL)
    const [view, setView] = useState(null)
    const [zencardOpen, setZencardOpen] = useState(false)
    const closeView = useCallback(() => setView(null), [])
    const closeZencard = useCallback(() => setZencardOpen(false), [])
    const move = useCallback((step) => setView((i) => (i + step + posters.length) % posters.length), [posters.length])

    return (
        <div className="bonplan-page">
            <main>
                <section className="hero-section">
                    <div className="container">
                        <h1 className="hero-title">
                            Bons Plans <span>&amp;</span> ZenCard
                        </h1>

                        <p className="hero-text">
                            Offres spéciales, promotions et avantages exclusifs sélectionnés pour vous.
                        </p>

                        <button className="hero-btn" onClick={() => setZencardOpen(true)}>
                            💳 Recharger ma ZenCard
                        </button>

                        <div className="hero-stats">
                            <div>
                                <b>{loading ? '…' : posters.length + cards.length}</b>
                                <span>Offres actives</span>
                            </div>
                            <i aria-hidden="true" />
                            <div>
                                <b className="hero-stats__accent">ZenCard</b>
                                <span>Votre carte avantages</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bonsplans-section">
                    <div className="container">
                        <div className="section-head">
                            <span className="section-tag">Offres &amp; Promotions</span>
                            <h2 className="section-title">Nos bons plans du moment</h2>
                        </div>

                        <div className="bp-grid">
                            {loading
                                ? Array.from({ length: 4 }, (_, i) => <div key={i} className="bp-skeleton" />)
                                : posters.map((c, i) => (
                                    <Reveal as="div" delay={(i % 4) * 80} key={c.id}>
                                        <button type="button" className="bp-card" onClick={() => setView(i)} aria-label={`Agrandir : ${c.title}`}>
                                            <div className="bp-media">
                                                <img src={c.image} className="bp-img" alt={c.title} loading="lazy" />
                                                <span className="bp-badge">{c.badge || 'ZenCard'}</span>
                                                <span className="bp-zoom" aria-hidden="true">🔍</span>
                                            </div>
                                            <div className="bp-footer">
                                                <span className="bp-name">{c.title}</span>
                                                <span className="bp-arrow" aria-hidden="true">→</span>
                                            </div>
                                        </button>
                                    </Reveal>
                                ))}
                        </div>

                        {cards.length > 0 && (
                            <div className="bp-text-grid">
                                {cards.map((c) => (
                                    <Reveal as="div" className="bp-text-card" key={c.id}>
                                        <div className="bp-icon">💡</div>

                                        <span className="bp-mini-badge">{c.badge || 'Bon Plan'}</span>

                                        <h3 className="bp-text-title">{c.title}</h3>

                                        {c.text && <p className="bp-text">{c.text}</p>}

                                        {c.url && (
                                            <a href={c.url} className="bp-link" target="_blank" rel="noopener noreferrer">
                                                Voir le détail →
                                            </a>
                                        )}
                                    </Reveal>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {zencardOpen && <ZencardDialog onClose={closeZencard} />}
            {view !== null && posters[view] && <Viewer items={posters} index={view} onClose={closeView} onMove={move} />}
        </div>
    )
}
