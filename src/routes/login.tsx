import { createFileRoute, redirect } from '@tanstack/react-router'
import { Login } from '@/app/features/auth/Login'
import { useAuthStore } from '@/app/store/auth/authStore'

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    if (useAuthStore.getState().isLogged()) {
      throw redirect({ to: '/' })
    }
  },
  component: Login,
})
