import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button as PaperButton, Text } from 'react-native-paper'
import { theme } from '../../../theme'

interface ButtonItem {
  textoBotao: string
  onPress: () => void
  value: string
}

interface Props {
  botoes: ButtonItem[]
  checked: string
}

const ToggleButton = ({ botoes, checked }: Props) => {
  return (
    <View style={styles.container}>
      {botoes.map(botao => (
        <PaperButton
          key={botao.value}
          mode={checked === botao.value ? 'contained' : 'text'}
          style={styles.botao}
          onPress={botao.onPress}
        >
          <Text
            style={[
              styles.texto,
              checked === botao.value && styles.textoChecked
            ]}
          >
            {botao.textoBotao}
          </Text>
        </PaperButton>
      ))}
    </View>
  )
}

export default ToggleButton

const styles = StyleSheet.create({
  botao: {
    padding: 6,
    justifyContent: 'center',
    borderRadius: 100,
    width: '50%'
  },
  texto: {
    fontSize: 16,
    color: theme.colors.disabled,
    textTransform: 'none'
  },
  textoChecked: {
    color: theme.colors.secondary,
    fontWeight: 'bold'
  },
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: 100
  }
})
