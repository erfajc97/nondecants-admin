import { Button } from '@heroui/react'
import { addToast } from '@heroui/react'
import { Link, useNavigate } from '@tanstack/react-router'
import { Boxes, Home, LayoutDashboard, LogOut, ShoppingCart, Users, X } from 'lucide-react'
import { useAuthStore } from '@/app/store/auth/authStore'

interface NavItem {
  label: string
  to: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  exact?: boolean
}

const NAV_ITEMS: Array<NavItem> = [
  { label: 'Home', to: '/', icon: Home, exact: true },
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Ventas', to: '/ventas', icon: ShoppingCart },
  { label: 'Stock', to: '/stock', icon: Boxes },
  { label: 'Clientes', to: '/clientes', icon: Users },
]

interface AdminSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const navigate = useNavigate()
  const { removeToken } = useAuthStore()

  const handleLogout = () => {
    removeToken()
    addToast({ title: 'Sesión cerrada', description: 'Has salido del panel.', color: 'default' })
    void navigate({ to: '/login' })
  }

  return (
    <>
      {/* Overlay móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          'fixed inset-y-0 left-0 z-30 flex w-60 flex-col bg-surface border-r border-border transition-transform duration-300',
          'lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-5">
          <span className="font-heading text-xl font-bold uppercase tracking-widest text-accent">
            NönDecants
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-sm p-1 text-text-muted transition hover:text-text lg:hidden"
            aria-label="Cerrar menú"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={item.exact ? { exact: true } : undefined}
              activeProps={{
                className:
                  'border-l-2 border-accent bg-surface-raised text-accent',
              }}
              inactiveProps={{
                className:
                  'border-l-2 border-transparent text-text-muted hover:bg-surface-raised hover:text-text',
              }}
              className="flex items-center gap-3 rounded-r-sm py-2.5 pl-3 pr-4 text-sm font-medium transition-all"
              onClick={onClose}
            >
              <item.icon size={18} className="shrink-0" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer sidebar — logout */}
        <div className="shrink-0 border-t border-border px-3 py-4">
          <Button
            fullWidth
            variant="flat"
            color="danger"
            onPress={handleLogout}
            startContent={<LogOut size={16} />}
            className="justify-start pl-3 text-sm font-medium"
          >
            Cerrar sesión
          </Button>
        </div>
      </aside>
    </>
  )
}
