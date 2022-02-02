import React from 'react'
import { StyleSheet } from 'react-native'
import { Paragraph } from 'react-native-paper'
import { theme } from '../../theme'

interface Props {
  texto: string
  erro?: boolean
}

const InputLabel = ({ texto, erro = false }: Props) => {
  return (
    <Paragraph style={[styles.label, erro && styles.erro]}>{texto}</Paragraph>
  )
}

export default InputLabel

const styles = StyleSheet.create({
  erro: {
    color: theme.colors.error
  },
  label: {
    fontSize: 20,
    lineHeight: 27,
    marginTop: 16,
    marginBottom: 8
  }
})
