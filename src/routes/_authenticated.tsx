import { createFileRoute, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/app/store/auth/authStore'
import { AdminLayout } from '@/app/layout/AdminLayout'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: () => {
    const { isLogged } = useAuthStore.getState()
    if (!isLogged()) {
      throw redirect({ to: '/login' })
    }
  },
  component: AdminLayout,
})
