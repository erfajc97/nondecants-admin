import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/ventas')({
  component: VentasPage,
})

function VentasPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold uppercase tracking-wide text-accent">
        Ventas
      </h1>
      <p className="mt-2 text-text-muted">Gestión de órdenes y ventas.</p>
      {/* TODO: montar <Ventas /> feature */}
    </div>
  )
}
