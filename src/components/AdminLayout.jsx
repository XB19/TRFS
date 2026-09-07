import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext.jsx'
import './AdminLayout.css'

export default function AdminLayout() {
    const { user, logout } = useAdminAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/admin/login')
    }

    const linkClass = ({ isActive }) => (isActive ? 'active' : undefined)

    return (
        <div className="admin-shell">
            <div className="admin-body">
                <div className="admin-sidebar">
                    <div className="admin-sidebar-logo">
                        <img src="/images/logo.png" alt="TRFS Logo" />
                        <small>Administration</small>
                    </div>

                    <ul className="admin-nav">
                        <li>
                            <NavLink to="/admin/dashboard" className={linkClass}>
                                <i className="fa-solid fa-gauge"></i> Tableau de bord
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/offres" className={linkClass}>
                                <i className="fa-solid fa-briefcase"></i> Offres d'emploi
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/candidatures" className={linkClass}>
                                <i className="fa-solid fa-inbox"></i> Candidatures
                            </NavLink>
                        </li>
                        <li>
                            <a href="/" target="_blank" rel="noreferrer">
                                <i className="fa-solid fa-arrow-up-right-from-square"></i> Voir le site
                            </a>
                        </li>
                    </ul>

                    <div className="admin-sidebar-footer">
                        {user && <div className="admin-user">Connecté : {user.username}</div>}
                        <ul className="admin-nav">
                            <li>
                                <button type="button" onClick={handleLogout}>
                                    <i className="fa-solid fa-right-from-bracket"></i> Déconnexion
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="admin-main">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
