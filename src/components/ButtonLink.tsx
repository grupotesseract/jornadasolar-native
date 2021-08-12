import React from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import { Text } from 'react-native-paper'

interface Props {
  texto: string
  onPress: () => void
}

const ButtonLink = ({ texto, onPress }: Props) => {
  return (
    <View>
      <Pressable style={styles.botao} onPress={onPress}>
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
