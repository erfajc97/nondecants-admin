import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react'

interface Column {
  key: string
  name: string
}

interface CustomTableProps<T extends { id: string | number }> {
  items: Array<T>
  columns: Array<Column>
  renderCell: (item: T, columnKey: string) => React.ReactNode
  isLoading?: boolean
  emptyContent?: string
}

export function CustomTableNextUi<T extends { id: string | number }>({
  items,
  columns,
  renderCell,
  isLoading = false,
  emptyContent = 'No hay datos disponibles',
}: CustomTableProps<T>) {
  return (
    <div className="flex h-full flex-col gap-4 rounded-xl bg-surface p-4 sm:rounded-2xl sm:p-6">
      <Table
        isStriped
        color="primary"
        classNames={{
          wrapper: 'table-report h-full rounded-none p-0 shadow-none',
          th: 'h-9 bg-table-header text-text',
          tr: '!rounded-full',
        }}
      >
        <TableHeader columns={columns}>
          {(col) => <TableColumn key={col.key}>{col.name}</TableColumn>}
        </TableHeader>
        <TableBody
          items={items}
          isLoading={isLoading}
          loadingContent={<Spinner color="primary" />}
          emptyContent={emptyContent}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, String(columnKey))}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
