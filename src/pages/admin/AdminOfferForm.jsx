import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthError, createOffer, fetchAdminOffer, updateOffer } from '../../api/admin.js'
import { useAdminAuth } from '../../context/AdminAuthContext.jsx'
import './Admin.css'

const CONTRACT_TYPES = [
    { value: 'cdi', label: 'CDI' },
    { value: 'cdd', label: 'CDD' },
    { value: 'stage', label: 'Stage' },
    { value: 'alternance', label: 'Alternance' },
    { value: 'interim', label: 'Intérim' },
]

const INITIAL = {
    title: '',
    department: '',
    location: 'Lomé, Togo',
    contract_type: 'cdi',
    description: '',
    requirements: '',
    is_published: true,
    deadline: '',
}

export default function AdminOfferForm() {
    const { id } = useParams()
    const isEdit = Boolean(id)
    const { token, logout } = useAdminAuth()
    const navigate = useNavigate()

    const [form, setForm] = useState(INITIAL)
    const [loading, setLoading] = useState(isEdit)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!isEdit) return

        fetchAdminOffer(token, id)
            .then((offer) => setForm({
                title: offer.title,
                department: offer.department,
                location: offer.location,
                contract_type: offer.contract_type,
                description: offer.description,
                requirements: offer.requirements,
                is_published: offer.is_published,
                deadline: offer.deadline || '',
            }))
            .catch((err) => {
                if (err instanceof AuthError) {
                    logout()
                    navigate('/admin/login')
                } else {
                    setError(err.message)
                }
            })
            .finally(() => setLoading(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target
        setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSaving(true)

        const payload = { ...form, deadline: form.deadline || null }

        try {
            if (isEdit) {
                await updateOffer(token, id, payload)
            } else {
                await createOffer(token, payload)
            }
            navigate('/admin/offres')
        } catch (err) {
            if (err instanceof AuthError) {
                logout()
                navigate('/admin/login')
            } else {
                setError(err.message)
            }
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <>
                <div className="admin-topbar"><h1>Offre d'emploi</h1></div>
                <div className="admin-table-empty">Chargement...</div>
            </>
        )
    }

    return (
        <>
            <div className="admin-topbar">
                <h1>{isEdit ? "Modifier l'offre" : 'Nouvelle offre'}</h1>
            </div>

            <div className="admin-form-card">
                {error && <div className="admin-form-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="admin-form-grid">
                        <div className="admin-form-group full">
                            <label>Titre du poste</label>
                            <input type="text" name="title" required value={form.title} onChange={handleChange} />
                        </div>

                        <div className="admin-form-group">
                            <label>Département</label>
                            <input type="text" name="department" value={form.department} onChange={handleChange} placeholder="Ex : Transport, Logistique..." />
                        </div>

                        <div className="admin-form-group">
                            <label>Lieu</label>
                            <input type="text" name="location" required value={form.location} onChange={handleChange} />
                        </div>

                        <div className="admin-form-group">
                            <label>Type de contrat</label>
                            <select name="contract_type" value={form.contract_type} onChange={handleChange}>
                                {CONTRACT_TYPES.map((c) => (
                                    <option key={c.value} value={c.value}>{c.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="admin-form-group">
                            <label>Date limite (optionnel)</label>
                            <input type="date" name="deadline" value={form.deadline} onChange={handleChange} />
                        </div>

                        <div className="admin-form-group full">
                            <label>Description du poste</label>
                            <textarea name="description" required value={form.description} onChange={handleChange} />
                        </div>

                        <div className="admin-form-group full">
                            <label>Profil recherché</label>
                            <textarea name="requirements" value={form.requirements} onChange={handleChange} />
                        </div>

                        <div className="admin-form-group full">
                            <div className="admin-checkbox-row">
                                <input
                                    type="checkbox"
                                    id="is_published"
                                    name="is_published"
                                    checked={form.is_published}
                                    onChange={handleChange}
                                />
                                <label htmlFor="is_published" style={{ marginBottom: 0 }}>
                                    Publiée sur le site
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="admin-actions">
                        <button type="submit" className="admin-btn primary" disabled={saving}>
                            {saving ? 'Enregistrement...' : 'Enregistrer'}
                        </button>
                        <button type="button" className="admin-btn outline" onClick={() => navigate('/admin/offres')}>
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
