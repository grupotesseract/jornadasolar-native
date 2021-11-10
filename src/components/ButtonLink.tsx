import React from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import { Text } from 'react-native-paper'

interface Props {
  texto: string
  onPress: () => void
  testID?: string
}

const ButtonLink = ({ texto, onPress, testID }: Props) => {
  return (
    <View>
      <Pressable style={styles.botao} onPress={onPress} testID={testID}>
        <Text style={styles.textoBotao}>{texto}</Text>
      </Pressable>
    </View>
  )
}

export default ButtonLink

const styles = StyleSheet.create({
  textoBotao: {
    textTransform: 'none',
    textDecorationLine: 'underline',
    fontSize: 18
  },
  botao: {
    paddingTop: 16
  }
})
