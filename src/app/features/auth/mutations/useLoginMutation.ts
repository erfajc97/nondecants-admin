import { useMutation } from '@tanstack/react-query'
import { addToast } from '@heroui/react'
import { useAuthStore } from '@/app/store/auth/authStore'
import { authService } from '../services/authService'
import type { LoginPayload, LoginResponse } from '../types'

export function useLoginMutation() {
  const { setToken, setUser } = useAuthStore()

  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: (payload) => authService.login(payload),

    onSuccess: (data) => {
      const content = data.content ?? data.data
      if (content) {
        const decoded = JSON.parse(atob(content.access_token.split('.')[1])) as { exp: number }
        setToken(content.access_token, content.refresh_token, decoded.exp * 1000)
        setUser(content.user)
      }
      addToast({
        title: 'Bienvenido',
        description: 'Sesión iniciada correctamente',
        color: 'success',
      })
    },

    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      const message = error.response?.data?.message ?? 'Verifica tus credenciales e intenta de nuevo'
      addToast({
        title: 'Error al iniciar sesión',
        description: message,
        color: 'danger',
      })
    },
  })
}
