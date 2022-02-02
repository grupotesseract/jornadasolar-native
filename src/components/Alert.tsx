import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Snackbar, Text } from 'react-native-paper'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import { TiposAlerta } from '../utils/mensagensAlerta'

interface AlertProps {
  tipo: TiposAlerta
  texto: string
  visible: boolean
  onDismiss: () => void
}

const Alert = ({ tipo, texto, visible, onDismiss }: AlertProps) => {
  const styles = tipo === TiposAlerta.Sucesso ? sucesso : falha
  const onDismissSnackBar = () => {
    onDismiss()
  }

  const icone =
    tipo === TiposAlerta.Sucesso ? (
      <Feather name="check-circle" size={24} color="#4caf50" />
    ) : (
      <MaterialIcons name="info-outline" size={24} color="#f44336" />
    )

  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismissSnackBar}
      style={styles.snack}
      duration={5000}
    >
      <View style={styles.snack}>
        {icone}
        <Text style={styles.texto}>{texto}</Text>
      </View>
    </Snackbar>
  )
}

const falha = StyleSheet.create({
  snack: {
    backgroundColor: 'rgb(24, 6, 5)',
    alignItems: 'center',
    flexDirection: 'row'
  },
  texto: { paddingLeft: 10, color: 'rgb(250, 179, 174)' }
})

const sucesso = StyleSheet.create({
  snack: {
    backgroundColor: 'rgb(7, 17, 7)',
    alignItems: 'center',
    flexDirection: 'row'
  },
  texto: { paddingLeft: 10, color: 'rgb(183, 223, 185)' }
})

export default Alert
