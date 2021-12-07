import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../../theme'

interface Props {
  texto: string
  onPress: () => void
  testID?: string
}

const TextButton = ({ texto, onPress, testID }: Props) => {
  return (
    <Text onPress={onPress} style={styles.texto} testID={testID} accessibilityLabel={testID} >
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
