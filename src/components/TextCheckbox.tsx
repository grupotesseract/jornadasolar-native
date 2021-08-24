import React from 'react'
import { useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { Text, Title } from 'react-native-paper'
import { theme } from '../../theme'

interface ItemProps {
  texto: string
  onPress: (value: any) => void
  value: any
}

const TextCheckbox = ({ value, texto, onPress }: ItemProps) => {
  const [isChecked, setIsChecked] = useState(false)
  const TextWrapper = isChecked ? Title : Text

  const handlePress = () => {
    setIsChecked(!isChecked)
    onPress(value)
  }

  return (
    <Pressable
      style={[styles.botao, isChecked && styles.botaoSelecionado]}
      onPress={handlePress}
    >
      <TextWrapper style={styles.texto}>{texto}</TextWrapper>
    </Pressable>
  )
}

export default TextCheckbox

const styles = StyleSheet.create({
  botao: {
    height: 65,
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: theme.colors.placeholder,
    paddingLeft: 20,
    justifyContent: 'center'
  },
  texto: {
    fontSize: 18
  },
  botaoSelecionado: {
    borderColor: theme.colors.primary
  }
})
