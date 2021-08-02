import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

interface Props {
  texto: string
}

const Titulo = ({ texto }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{texto}</Text>
    </View>
  )
}

export default Titulo

const styles = StyleSheet.create({
  container: { padding: 36 },
  text: {
    fontFamily: 'NunitoSans_800ExtraBold',
    fontSize: 32,
    paddingTop: 36
  }
})
