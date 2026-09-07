import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthError, fetchStats } from '../../api/admin.js'
import { useAdminAuth } from '../../context/AdminAuthContext.jsx'
import './Admin.css'

const STATUS_LABELS = {
    recue: 'Reçues',
    en_cours: "En cours d'examen",
    retenue: 'Retenues',
    refusee: 'Refusées',
}

export default function AdminDashboard() {
    const { token, logout } = useAdminAuth()
    const navigate = useNavigate()
    const [stats, setStats] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        fetchStats(token)
            .then(setStats)
            .catch((err) => {
                if (err instanceof AuthError) {
                    logout()
                    navigate('/admin/login')
                } else {
                    setError(err.message)
                }
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className="admin-topbar">
                <h1>Tableau de bord</h1>
            </div>

            {error && <div className="admin-form-error">{error}</div>}

            {stats && (
                <>
                    <div className="admin-stats-grid">
                        <div className="admin-stat-card">
                            <h4>Offres publiées</h4>
                            <p>{stats.offers_published}</p>
                        </div>

                        <div className="admin-stat-card">
                            <h4>Offres au total</h4>
                            <p>{stats.offers_total}</p>
                        </div>

                        <div className="admin-stat-card green">
                            <h4>Candidatures reçues</h4>
                            <p>{stats.applications_total}</p>
                        </div>
                    </div>

                    <div className="admin-stats-grid">
                        {Object.entries(stats.applications_by_status).map(([key, count]) => (
                            <div className="admin-stat-card" key={key}>
                                <h4>{STATUS_LABELS[key] || key}</h4>
                                <p>{count}</p>
                            </div>
                        ))}
                    </div>

                    <div className="admin-actions">
                        <Link to="/admin/offres/nouvelle" className="admin-btn primary">
                            <i className="fa-solid fa-plus"></i> Nouvelle offre
                        </Link>
                        <Link to="/admin/candidatures" className="admin-btn outline">
                            <i className="fa-solid fa-inbox"></i> Voir les candidatures
                        </Link>
                    </div>
                </>
            )}
        </>
    )
}
