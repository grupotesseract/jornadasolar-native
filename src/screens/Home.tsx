import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Constants from 'expo-constants'
import { Button, FAB } from 'react-native-paper'
import Titulo from '../components/Titulo'

export default function Home() {
  return (
    <View style={styles.container}>
      <Titulo texto="Oi! Que bom te ver por aqui 😃" />
      <FAB
        style={styles.fab}
        icon=""
        label="Entrar"
        onPress={() => console.log('Pressed')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#000000',
    alignItems: 'center'
  },
  fab: {
    position: 'absolute',
    margin: 16,
    bottom: 0
  }
})
