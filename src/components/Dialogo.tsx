import * as React from 'react'
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper'

interface Props {
  titulo: string
  conteudo: React.ReactNode
  textoBotaoConfirma: string
  onConfirma: () => void
  isOpen: boolean
}

const Dialogo = ({
  titulo,
  conteudo,
  textoBotaoConfirma,
  onConfirma,
  isOpen
}: Props) => {
  return (
    <Portal>
      <Dialog visible={isOpen} onDismiss={onConfirma}>
        <Dialog.Title>{titulo}</Dialog.Title>
        <Dialog.Content>{conteudo}</Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onConfirma}>{textoBotaoConfirma}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

export default Dialogo
