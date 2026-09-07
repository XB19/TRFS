import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchOffer } from '../../api/careers.js'
import ApplicationForm from '../../components/ApplicationForm.jsx'
import Reveal from '../../components/Reveal.jsx'
import './Career.css'

export default function CareerOfferDetail() {
    const { slug } = useParams()
    const [offer, setOffer] = useState(undefined) // undefined = loading, null = not found
    const [error, setError] = useState('')

    useEffect(() => {
        let cancelled = false
        setOffer(undefined)

        fetchOffer(slug)
            .then((data) => { if (!cancelled) setOffer(data) })
            .catch((err) => { if (!cancelled) setError(err.message) })

        return () => { cancelled = true }
    }, [slug])

    if (error) {
        return (
            <section className="career-section">
                <div className="container">
                    <div className="career-state error">{error}</div>
                </div>
            </section>
        )
    }

    if (offer === undefined) {
        return (
            <section className="career-section">
                <div className="container">
                    <div className="career-state">Chargement de l'offre...</div>
                </div>
            </section>
        )
    }

    if (offer === null) {
        return (
            <section className="career-section">
                <div className="container">
                    <div className="career-state">
                        Cette offre n'existe plus ou a été retirée.<br />
                        <Link to="/carriere/offres" className="career-back-link" style={{ marginTop: '16px' }}>
                            <i className="fa-solid fa-arrow-left"></i> Retour aux offres
                        </Link>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <>
            <section className="career-hero">
                <div className="container">
                    <h1>{offer.title}</h1>
                    <p>{offer.department} — {offer.location}</p>
                </div>
            </section>

            <section className="career-section">
                <div className="container" style={{ maxWidth: '900px' }}>
                    <Link to="/carriere/offres" className="career-back-link">
                        <i className="fa-solid fa-arrow-left"></i> Retour aux offres
                    </Link>

                    <Reveal as="div" className="career-detail-header">
                        <div className="career-card-meta">
                            <span className="career-badge contract">{offer.contract_type_display}</span>
                            {offer.department && (
                                <span className="career-badge department">{offer.department}</span>
                            )}
                        </div>

                        <h1>{offer.title}</h1>

                        <div className="career-card-location">
                            <i className="fa-solid fa-location-dot"></i>
                            {offer.location}
                            {offer.deadline && (
                                <>
                                    &nbsp;·&nbsp;<i className="fa-solid fa-calendar"></i> Date limite : {offer.deadline}
                                </>
                            )}
                        </div>
                    </Reveal>

                    <Reveal as="div" className="career-detail-block" delay={100}>
                        <h2>Description du poste</h2>
                        <p>{offer.description}</p>
                    </Reveal>

                    {offer.requirements && (
                        <Reveal as="div" className="career-detail-block" delay={150}>
                            <h2>Profil recherché</h2>
                            <p>{offer.requirements}</p>
                        </Reveal>
                    )}

                    <Reveal delay={200}>
                        <ApplicationForm
                            jobOfferSlug={offer.slug}
                            title="Postuler à cette offre"
                            subtitle="Remplissez le formulaire ci-dessous, notre équipe RH vous recontactera."
                        />
                    </Reveal>
                </div>
            </section>
        </>
    )
}
