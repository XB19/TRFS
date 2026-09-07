const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

async function parseJsonSafe(response) {
    try {
        return await response.json()
    } catch {
        return null
    }
}

export async function fetchOffers() {
    const res = await fetch(`${API_URL}/api/careers/offers/`)
    if (!res.ok) throw new Error("Impossible de charger les offres d'emploi.")
    const data = await parseJsonSafe(res)
    return data?.results ?? data ?? []
}

export async function fetchOffer(slug) {
    const res = await fetch(`${API_URL}/api/careers/offers/${slug}/`)
    if (res.status === 404) return null
    if (!res.ok) throw new Error("Impossible de charger cette offre.")
    return parseJsonSafe(res)
}

export async function submitApplication(formData) {
    const res = await fetch(`${API_URL}/api/careers/applications/`, {
        method: 'POST',
        body: formData,
    })

    if (!res.ok) {
        const data = await parseJsonSafe(res)
        const firstError = data && Object.values(data)?.[0]
        const message = Array.isArray(firstError) ? firstError[0] : firstError
        throw new Error(message || "Impossible d'envoyer la candidature.")
    }

    return parseJsonSafe(res)
}
