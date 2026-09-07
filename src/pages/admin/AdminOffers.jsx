import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthError, deleteOffer, fetchAdminOffers } from '../../api/admin.js'
import { useAdminAuth } from '../../context/AdminAuthContext.jsx'
import './Admin.css'

export default function AdminOffers() {
    const { token, logout } = useAdminAuth()
    const navigate = useNavigate()
    const [offers, setOffers] = useState(null)
    const [error, setError] = useState('')

    const load = () => {
        fetchAdminOffers(token)
            .then((data) => setOffers(data.results ?? data))
            .catch((err) => {
                if (err instanceof AuthError) {
                    logout()
                    navigate('/admin/login')
                } else {
                    setError(err.message)
                }
            })
    }

    useEffect(load, []) // eslint-disable-line react-hooks/exhaustive-deps

    const handleDelete = async (offer) => {
        if (!window.confirm(`Supprimer l'offre "${offer.title}" ? Cette action est irréversible.`)) return

        try {
            await deleteOffer(token, offer.id)
            setOffers((prev) => prev.filter((o) => o.id !== offer.id))
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <>
            <div className="admin-topbar">
                <h1>Offres d'emploi</h1>
                <Link to="/admin/offres/nouvelle" className="admin-btn primary">
                    <i className="fa-solid fa-plus"></i> Nouvelle offre
                </Link>
            </div>

            {error && <div className="admin-form-error">{error}</div>}

            <div className="admin-table-box">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Titre</th>
                            <th>Département</th>
                            <th>Contrat</th>
                            <th>Statut</th>
                            <th>Candidatures</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {offers === null && (
                            <tr><td colSpan={6} className="admin-table-empty">Chargement...</td></tr>
                        )}

                        {offers && offers.length === 0 && (
                            <tr><td colSpan={6} className="admin-table-empty">Aucune offre pour le moment.</td></tr>
                        )}

                        {offers && offers.map((offer) => (
                            <tr key={offer.id}>
                                <td>{offer.title}</td>
                                <td>{offer.department || '—'}</td>
                                <td>{offer.contract_type_display}</td>
                                <td>
                                    <span className={`admin-badge ${offer.is_published ? 'published' : 'unpublished'}`}>
                                        {offer.is_published ? 'Publiée' : 'Non publiée'}
                                    </span>
                                </td>
                                <td>{offer.applications_count}</td>
                                <td>
                                    <div className="admin-row-actions">
                                        <Link
                                            to={`/admin/offres/${offer.id}`}
                                            className="admin-icon-btn"
                                            title="Modifier"
                                        >
                                            <i className="fa-solid fa-pen"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="admin-icon-btn danger"
                                            title="Supprimer"
                                            onClick={() => handleDelete(offer)}
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
