import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/')({
  component: AdminHome,
})

function AdminHome() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold uppercase tracking-wide text-accent">
        Home
      </h1>
      <p className="mt-2 text-text-muted">Bienvenido al panel de administración NönDecants.</p>
      {/* TODO: montar feature home */}
    </div>
  )
}
