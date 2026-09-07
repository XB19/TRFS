import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthError, deleteApplication, fetchAdminApplications, updateApplicationStatus } from '../../api/admin.js'
import { useAdminAuth } from '../../context/AdminAuthContext.jsx'
import './Admin.css'

const STATUS_OPTIONS = [
    { value: 'recue', label: 'Reçue' },
    { value: 'en_cours', label: "En cours d'examen" },
    { value: 'retenue', label: 'Retenue' },
    { value: 'refusee', label: 'Refusée' },
]

export default function AdminApplications() {
    const { token, logout } = useAdminAuth()
    const navigate = useNavigate()
    const [applications, setApplications] = useState(null)
    const [error, setError] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')

    const load = () => {
        fetchAdminApplications(token)
            .then((data) => setApplications(data.results ?? data))
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

    const handleStatusChange = async (application, status) => {
        const previous = applications
        setApplications((prev) => prev.map((a) => (a.id === application.id ? { ...a, status } : a)))

        try {
            await updateApplicationStatus(token, application.id, status)
        } catch (err) {
            setApplications(previous)
            setError(err.message)
        }
    }

    const handleDelete = async (application) => {
        if (!window.confirm(`Supprimer la candidature de ${application.full_name} ?`)) return

        try {
            await deleteApplication(token, application.id)
            setApplications((prev) => prev.filter((a) => a.id !== application.id))
        } catch (err) {
            setError(err.message)
        }
    }

    const visible = applications && (
        statusFilter === 'all' ? applications : applications.filter((a) => a.status === statusFilter)
    )

    return (
        <>
            <div className="admin-topbar">
                <h1>Candidatures</h1>

                <select
                    className="admin-status-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">Tous les statuts</option>
                    {STATUS_OPTIONS.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                </select>
            </div>

            {error && <div className="admin-form-error">{error}</div>}

            <div className="admin-table-box">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Candidat</th>
                            <th>Contact</th>
                            <th>Offre visée</th>
                            <th>CV</th>
                            <th>Statut</th>
                            <th>Reçue le</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {visible === null && (
                            <tr><td colSpan={7} className="admin-table-empty">Chargement...</td></tr>
                        )}

                        {visible && visible.length === 0 && (
                            <tr><td colSpan={7} className="admin-table-empty">Aucune candidature.</td></tr>
                        )}

                        {visible && visible.map((application) => (
                            <tr key={application.id}>
                                <td>{application.full_name}</td>
                                <td>
                                    {application.email}
                                    {application.phone && <><br />{application.phone}</>}
                                </td>
                                <td>{application.job_offer_title || 'Candidature spontanée'}</td>
                                <td>
                                    {application.cv ? (
                                        <a href={application.cv} target="_blank" rel="noreferrer" className="admin-icon-btn" title="Voir le CV">
                                            <i className="fa-solid fa-file-arrow-down"></i>
                                        </a>
                                    ) : '—'}
                                </td>
                                <td>
                                    <select
                                        className="admin-status-select"
                                        value={application.status}
                                        onChange={(e) => handleStatusChange(application, e.target.value)}
                                    >
                                        {STATUS_OPTIONS.map((s) => (
                                            <option key={s.value} value={s.value}>{s.label}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>{new Date(application.created_at).toLocaleDateString('fr-FR')}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="admin-icon-btn danger"
                                        title="Supprimer"
                                        onClick={() => handleDelete(application)}
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
