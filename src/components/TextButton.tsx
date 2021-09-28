import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../../theme'

interface Props {
  texto: string
  onPress: () => void
}

const TextButton = ({ texto, onPress }: Props) => {
  return (
    <Text onPress={onPress} style={styles.texto}>
      {texto}
    </Text>
  )
}

export default TextButton

const styles = StyleSheet.create({
  texto: {
    color: theme.colors.primary,
    fontFamily: 'NunitoSans_600SemiBold'
  }
})
