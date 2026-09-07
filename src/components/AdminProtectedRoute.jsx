import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext.jsx'

export default function AdminProtectedRoute({ children }) {
    const { token } = useAdminAuth()

    if (!token) {
        return <Navigate to="/admin/login" replace />
    }

    return children
}
