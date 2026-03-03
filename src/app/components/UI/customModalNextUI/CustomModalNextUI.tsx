import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@heroui/react'

interface CustomModalNextUIProps {
  isOpen: boolean
  onClose: () => void
  headerContent: React.ReactNode
  footerContent?: React.ReactNode
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
}

export function CustomModalNextUI({
  isOpen,
  onClose,
  headerContent,
  footerContent,
  children,
  size = 'md',
}: CustomModalNextUIProps) {
  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      classNames={{
        base: 'bg-surface border border-border',
        header: 'border-b border-border text-text font-heading',
        body: 'text-text',
        footer: 'border-t border-border',
      }}
    >
      <ModalContent>
        <ModalHeader>{headerContent}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        {footerContent && <ModalFooter>{footerContent}</ModalFooter>}
      </ModalContent>
    </Modal>
  )
}
