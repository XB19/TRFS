import React, { createContext, useContext, useState } from 'react'

const AdminAuthContext = createContext(null)

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const STORAGE_KEY = 'trfs_admin_token'
const USER_KEY = 'trfs_admin_user'

function loadStoredUser() {
    try {
        const raw = localStorage.getItem(USER_KEY)
        return raw ? JSON.parse(raw) : null
    } catch {
        return null
    }
}

export function AdminAuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEY))
    const [user, setUser] = useState(loadStoredUser)

    const login = async (username, password) => {
        const res = await fetch(`${API_URL}/api/careers/auth/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })

        const data = await res.json().catch(() => ({}))

        if (!res.ok) {
            throw new Error(data.detail || 'Connexion impossible.')
        }

        const nextUser = { username: data.username, is_superuser: data.is_superuser }
        localStorage.setItem(STORAGE_KEY, data.token)
        localStorage.setItem(USER_KEY, JSON.stringify(nextUser))
        setToken(data.token)
        setUser(nextUser)
        return nextUser
    }

    const logout = () => {
        localStorage.removeItem(STORAGE_KEY)
        localStorage.removeItem(USER_KEY)
        setToken(null)
        setUser(null)
    }

    return (
        <AdminAuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AdminAuthContext.Provider>
    )
}

export function useAdminAuth() {
    return useContext(AdminAuthContext)
}
