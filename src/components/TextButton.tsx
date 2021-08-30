import React from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { theme } from '../../theme'

interface Props {
  texto: string
  onPress: () => void
}

const TextButton = ({ texto, onPress }: Props) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.texto}>{texto}</Text>
    </Pressable>
  )
}

export default TextButton

const styles = StyleSheet.create({
  texto: {
    color: theme.colors.primary,
    fontFamily: 'NunitoSans_600SemiBold'
  }
})
