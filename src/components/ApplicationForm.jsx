import React, { useState } from 'react'
import { submitApplication } from '../api/careers.js'

const INITIAL = { full_name: '', email: '', phone: '', message: '' }

export default function ApplicationForm({ jobOfferSlug, title, subtitle }) {
    const [form, setForm] = useState(INITIAL)
    const [cv, setCv] = useState(null)
    const [status, setStatus] = useState('idle') // idle | sending | done
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setStatus('sending')

        try {
            const data = new FormData()
            data.append('full_name', form.full_name)
            data.append('email', form.email)
            data.append('phone', form.phone)
            data.append('message', form.message)
            if (jobOfferSlug) data.append('job_offer', jobOfferSlug)
            if (cv) data.append('cv', cv)

            await submitApplication(data)
            setStatus('done')
        } catch (err) {
            setError(err.message)
            setStatus('idle')
        }
    }

    if (status === 'done') {
        return (
            <div className="career-apply-card">
                <div className="career-form-success">
                    <i className="fa-solid fa-circle-check"></i>
                    <h3>Candidature envoyée !</h3>
                    <p>Merci, notre équipe RH examinera votre dossier et vous recontactera si votre profil correspond.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="career-apply-card">
            <h2>{title || 'Postuler'}</h2>
            {subtitle && <div className="subtitle">{subtitle}</div>}

            {error && <div className="career-form-error">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        name="full_name"
                        placeholder="Nom complet"
                        required
                        value={form.full_name}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        value={form.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Téléphone"
                        value={form.phone}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <textarea
                        name="message"
                        placeholder="Message / lettre de motivation (optionnel)"
                        value={form.message}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="form-group">
                    <label className="career-file-label" htmlFor="cv">CV (PDF ou Word, 5 Mo max)</label>
                    <input
                        id="cv"
                        className="career-file-input"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setCv(e.target.files?.[0] || null)}
                    />
                </div>

                <button type="submit" className="btn-primary" disabled={status === 'sending'} style={{ width: '100%' }}>
                    {status === 'sending' ? 'Envoi en cours...' : 'Envoyer ma candidature'}
                </button>
            </form>
        </div>
    )
}
