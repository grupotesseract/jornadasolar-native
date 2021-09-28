import React, { createContext, useState } from 'react'
import Alert from '../components/Alert'
import { AlertProps, TiposAlerta } from '../utils/mensagensAlerta'

interface AlertContextData {
  displayAlert: (props: AlertProps) => void
}

const AlertContext = createContext<AlertContextData>({} as AlertContextData)

export const AlertProvider: React.FC = ({ children }) => {
  const [visible, setVisible] = useState(false)
  const [texto, setTexto] = useState<string>('')
  const [tipo, setTipo] = useState<TiposAlerta>()

  const displayAlert = ({ texto, tipo }: AlertProps) => {
    setVisible(true)
    setTexto(texto)
    setTipo(tipo)
  }

  const toggleAlert = () => {
    setVisible(!visible)
  }

  return (
    <AlertContext.Provider value={{ displayAlert }}>
      {children}
      <Alert
        visible={visible}
        texto={texto}
        tipo={tipo}
        onDismiss={toggleAlert}
      />
    </AlertContext.Provider>
  )
}

export default AlertContext
