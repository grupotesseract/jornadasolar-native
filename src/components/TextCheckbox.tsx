import React, { useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { Text, Title } from 'react-native-paper'
import { theme } from '../../theme'

interface ItemProps {
  texto: string
  onPress: (value: any) => void
  isChecked: boolean
  value: any
}

const TextCheckbox = ({ value, texto, isChecked, onPress }: ItemProps) => {
  const TextWrapper = isChecked ? Title : Text

  const handlePress = () => {
    onPress(value)
  }

  return (
    <Pressable
      style={[styles.botao, isChecked && styles.botaoSelecionado]}
      onPress={handlePress}
      testID={texto}
      accessibilityLabel={texto}
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
