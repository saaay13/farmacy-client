import { useState } from 'react'
import { useAuth as useAuthContext } from '../context/AuthContext'
import { loginUser, registerUser } from '../services/api'
import type { User } from '../services/api'


interface LoginPayload {
    email: string
    password: string
}

export function useAuth() {
    const { user, token, login, logout, isAuthenticated, role } = useAuthContext()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function doLogin(payload: LoginPayload): Promise<User> {
        setLoading(true)
        setError(null)
        try {
            const data = await loginUser(payload.email, payload.password)
            login(data.token, data.user)
            return data.user
        } catch (err: any) {
            setError(err.message)
            throw err
        } finally {
            setLoading(false)
        }
    }

    async function doRegister(nombre: string, email: string, password: string, avatarUrl?: string): Promise<void> {
        setLoading(true)
        setError(null)
        try {
            await registerUser(nombre, email, password, avatarUrl)
            // Login automático
            const data = await loginUser(email, password)
            login(data.token, data.user)
        } catch (err: any) {
            setError(err.message)
            throw err
        } finally {
            setLoading(false)
        }
    }

    function doLogout() {
        logout()
    }

    return { user, token, isAuthenticated, role, loading, error, doLogin, doRegister, doLogout }
}
