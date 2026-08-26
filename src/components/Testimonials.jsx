import React, { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal.jsx'
import './Testimonials.css'

const TESTIMONIALS = [
    {
        text: "Service rapide et fiable. Mon colis est arrivé en parfait état. L'équipe TRFS est très professionnelle et toujours disponible.",
        name: 'Jean K.',
        role: 'Entrepreneur',
    },
    {
        text: 'Très satisfait du suivi en temps réel. Le processus a été simple, rapide et parfaitement organisé du début à la fin.',
        name: 'Amina S.',
        role: 'Commerçante',
    },
    {
        text: 'Livraison rapide et service client très professionnel. Je recommande fortement TRFS pour le transport international.',
        name: 'Kossi M.',
        role: 'Importateur',
    },
    {
        text: "Une collaboration exceptionnelle. L'équipe est sérieuse, efficace et très attentive aux besoins des clients.",
        name: 'Sarah A.',
        role: 'Responsable Logistique',
    },
]

const LAST_INDEX = TESTIMONIALS.length - 1
const AUTO_DELAY = 4000

export default function Testimonials() {
    const trackRef = useRef(null)
    const pausedRef = useRef(false)
    const scrollEndTimer = useRef(null)
    const [active, setActive] = useState(0)

    // Cards can peek past the visible edge on wide screens, so the track's real
    // scrollable range is often smaller than "one card width per step". Indices are
    // mapped proportionally across whatever range actually exists instead of trying
    // to snap each card flush to the edge — that stays correct at any viewport width.
    const getMaxScroll = () => {
        const track = trackRef.current
        if (!track) return 0
        return Math.max(track.scrollWidth - track.clientWidth, 0)
    }

    const scrollToIndex = (index) => {
        const track = trackRef.current
        if (!track) return

        const maxScroll = getMaxScroll()
        const ratio = LAST_INDEX > 0 ? index / LAST_INDEX : 0

        track.scrollTo({ left: maxScroll * ratio, behavior: 'smooth' })
        setActive(index)
    }

    const next = () => scrollToIndex(active === LAST_INDEX ? 0 : active + 1)
    const prev = () => scrollToIndex(active === 0 ? LAST_INDEX : active - 1)

    useEffect(() => {
        const id = setInterval(() => {
            if (!pausedRef.current) next()
        }, AUTO_DELAY)
        return () => clearInterval(id)
    }, [active])

    const pause = () => { pausedRef.current = true }
    const resume = () => { pausedRef.current = false }

    // Only recompute the active index once scrolling has settled — recalculating on
    // every scroll event (fired continuously during the programmatic smooth-scroll
    // animation) fights the auto-advance timer and desyncs the active index.
    const handleScroll = () => {
        if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current)

        scrollEndTimer.current = setTimeout(() => {
            const track = trackRef.current
            if (!track) return

            const maxScroll = getMaxScroll()
            const ratio = maxScroll > 0 ? track.scrollLeft / maxScroll : 0
            setActive(Math.round(ratio * LAST_INDEX))
        }, 120)
    }

    useEffect(() => () => {
        if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current)
    }, [])

    return (
        <section className="ts-section">
            <div className="ts-blur ts-blur-1"></div>
            <div className="ts-blur ts-blur-2"></div>

            <div className="container">
                <Reveal as="div" className="section-header">
                    <span className="mini-title">TÉMOIGNAGES</span>

                    <h2>Ce que disent nos clients</h2>

                    <p>
                        Ils nous font confiance pour transporter leurs marchandises
                        partout dans le monde avec sécurité et professionnalisme.
                    </p>
                </Reveal>

                <Reveal
                    as="div"
                    className="ts-slider"
                    delay={150}
                    onMouseEnter={pause}
                    onMouseLeave={resume}
                    onTouchStart={pause}
                    onTouchEnd={resume}
                >
                    <button type="button" className="ts-arrow ts-prev" onClick={prev} aria-label="Témoignage précédent">
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>

                    <div className="ts-track" ref={trackRef} onScroll={handleScroll}>
                        {TESTIMONIALS.map((t) => (
                            <div className="ts-card" key={t.name}>
                                <div className="ts-quote"><i className="fa-solid fa-quote-right"></i></div>

                                <div className="ts-stars">★★★★★</div>

                                <p className="ts-text">{t.text}</p>

                                <div className="ts-user">
                                    <h4>{t.name}</h4>
                                    <span>{t.role}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button type="button" className="ts-arrow ts-next" onClick={next} aria-label="Témoignage suivant">
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                </Reveal>

                <div className="ts-dots">
                    {TESTIMONIALS.map((t, i) => (
                        <button
                            key={t.name}
                            type="button"
                            className={`ts-dot${i === active ? ' active' : ''}`}
                            onClick={() => scrollToIndex(i)}
                            aria-label={`Aller au témoignage ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
