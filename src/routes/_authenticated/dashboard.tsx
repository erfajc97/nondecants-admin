import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold uppercase tracking-wide text-accent">
        Dashboard
      </h1>
      <p className="mt-2 text-text-muted">Resumen general del negocio.</p>
      {/* TODO: montar <Dashboard /> feature */}
    </div>
  )
}
