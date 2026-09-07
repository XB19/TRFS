const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

class AuthError extends Error {}

async function request(token, path, { method = 'GET', data, isMultipart = false } = {}) {
    const headers = { Authorization: `Token ${token}` }
    let body

    if (data !== undefined) {
        if (isMultipart) {
            body = data // caller passes a FormData instance
        } else {
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)
        }
    }

    const res = await fetch(`${API_URL}/api/careers${path}`, { method, headers, body })

    if (res.status === 401) {
        throw new AuthError('Session expirée, merci de vous reconnecter.')
    }

    if (res.status === 204) return null

    const payload = await res.json().catch(() => null)

    if (!res.ok) {
        const message = payload && (payload.detail || Object.values(payload)[0])
        throw new Error(Array.isArray(message) ? message[0] : message || "Une erreur est survenue.")
    }

    return payload
}

export { AuthError }

export const fetchStats = (token) => request(token, '/admin/stats/')

export const fetchAdminOffers = (token) => request(token, '/admin/offers/')
export const fetchAdminOffer = (token, id) => request(token, `/admin/offers/${id}/`)
export const createOffer = (token, data) => request(token, '/admin/offers/', { method: 'POST', data })
export const updateOffer = (token, id, data) => request(token, `/admin/offers/${id}/`, { method: 'PATCH', data })
export const deleteOffer = (token, id) => request(token, `/admin/offers/${id}/`, { method: 'DELETE' })

export const fetchAdminApplications = (token) => request(token, '/admin/applications/')
export const updateApplicationStatus = (token, id, status) =>
    request(token, `/admin/applications/${id}/`, { method: 'PATCH', data: { status } })
export const deleteApplication = (token, id) => request(token, `/admin/applications/${id}/`, { method: 'DELETE' })
