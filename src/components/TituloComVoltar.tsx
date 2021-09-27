import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import BotaoVoltar from './BotaoVoltar'

interface Props {
  texto: string
}

const TituloComVoltar = ({ texto }: Props) => {
  return (
    <View style={styles.container}>
      <BotaoVoltar />
      <Text style={styles.titulo}>{texto}</Text>
    </View>
  )
}

export default TituloComVoltar

const styles = StyleSheet.create({
  titulo: {
    textTransform: 'uppercase',
    textAlign: 'center',
    flexGrow: 1,
    fontWeight: 'bold'
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
    marginBottom: 48,
    marginHorizontal: 15
  }
})
