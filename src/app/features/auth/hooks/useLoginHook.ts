import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { addToast } from '@heroui/react'
import { useAuthStore } from '@/app/store/auth/authStore'
import { useLoginMutation } from '../mutations/useLoginMutation'

// DESARROLLO — Credenciales de prueba (remover cuando el backend esté disponible)
const DEV_EMAIL = 'admin@nondecants.com'
const DEV_PASSWORD = 'Admin123.'

export function useLoginHook() {
  const navigate = useNavigate()
  const { setToken, setUser } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const mutation = useLoginMutation()

  const handleSubmit = () => {
    if (!email || !password) return

    // Bypass temporal sin backend
    if (email === DEV_EMAIL && password === DEV_PASSWORD) {
      const expiration = Date.now() + 24 * 60 * 60 * 1000 // 24h
      setToken('dev-access-token', 'dev-refresh-token', expiration)
      setUser({ id: '1', name: 'Administrador', email: DEV_EMAIL, role: 'ADMIN' })
      addToast({ title: 'Bienvenido', description: 'Sesión iniciada (modo desarrollo)', color: 'success' })
      void navigate({ to: '/' })
      return
    }

    mutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          void navigate({ to: '/' })
        },
      },
    )
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    handleSubmit,
    isLoading: mutation.isPending,
  }
}
