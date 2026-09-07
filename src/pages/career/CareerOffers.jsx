import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchOffers } from '../../api/careers.js'
import Reveal from '../../components/Reveal.jsx'
import './Career.css'

export default function CareerOffers() {
    const [offers, setOffers] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        let cancelled = false

        fetchOffers()
            .then((data) => { if (!cancelled) setOffers(data) })
            .catch((err) => { if (!cancelled) setError(err.message) })

        return () => { cancelled = true }
    }, [])

    return (
        <>
            <section className="career-hero">
                <div className="container">
                    <h1>Offres d'emploi</h1>
                    <p>Rejoignez l'équipe TRFS et participez au transport de demain</p>
                </div>
            </section>

            <section className="career-section">
                <div className="container">
                    {error && <div className="career-state error">{error}</div>}

                    {!error && offers === null && (
                        <div className="career-state">Chargement des offres...</div>
                    )}

                    {!error && offers !== null && offers.length === 0 && (
                        <div className="career-state">
                            Aucune offre en cours pour le moment. Envoyez-nous une candidature spontanée !
                        </div>
                    )}

                    {offers && offers.length > 0 && (
                        <div className="career-grid">
                            {offers.map((offer, i) => (
                                <Reveal
                                    as={Link}
                                    to={`/carriere/offres/${offer.slug}`}
                                    className="career-card"
                                    delay={i * 80}
                                    key={offer.id}
                                >
                                    <div className="career-card-meta">
                                        <span className="career-badge contract">{offer.contract_type_display}</span>
                                        {offer.department && (
                                            <span className="career-badge department">{offer.department}</span>
                                        )}
                                    </div>

                                    <h3>{offer.title}</h3>

                                    <div className="career-card-location">
                                        <i className="fa-solid fa-location-dot"></i>
                                        {offer.location}
                                    </div>

                                    <div className="career-card-link">
                                        Voir l'offre <i className="fa-solid fa-arrow-right"></i>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className="career-cta">
                <h2>Vous ne trouvez pas le poste idéal ?</h2>
                <p>Envoyez-nous une candidature spontanée, nous étudions chaque profil.</p>
                <Link to="/carriere/candidature-spontanee" className="btn-primary">
                    Candidature spontanée
                </Link>
            </section>
        </>
    )
}
