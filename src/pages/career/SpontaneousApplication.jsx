import React from 'react'
import ApplicationForm from '../../components/ApplicationForm.jsx'
import Reveal from '../../components/Reveal.jsx'
import './Career.css'

export default function SpontaneousApplication() {
    return (
        <>
            <section className="career-hero">
                <div className="container">
                    <h1>Candidature spontanée</h1>
                    <p>Aucune offre ne correspond exactement à votre profil ? Parlez-nous de vous.</p>
                </div>
            </section>

            <section className="career-section">
                <div className="container" style={{ maxWidth: '700px' }}>
                    <Reveal>
                        <ApplicationForm
                            title="Envoyer ma candidature"
                            subtitle="Notre équipe RH étudie chaque profil et vous recontactera si une opportunité correspond."
                        />
                    </Reveal>
                </div>
            </section>
        </>
    )
}
