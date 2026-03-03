import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/clientes')({
  component: ClientesPage,
})

function ClientesPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold uppercase tracking-wide text-accent">
        Clientes
      </h1>
      <p className="mt-2 text-text-muted">Gestión de clientes registrados.</p>
      {/* TODO: montar <Clientes /> feature */}
    </div>
  )
}
