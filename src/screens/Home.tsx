import React from 'react'
import { StyleSheet, View } from 'react-native'
import Constants from 'expo-constants'
import { FAB } from 'react-native-paper'
import Titulo from '../components/Titulo'
import i18n from '../i18n'

export default function Home() {
  const { t } = i18n
  return (
    <View style={styles.container}>
      <Titulo texto={`${t('saudacao')}  😃`} />
      <FAB
        style={styles.fab}
        icon=""
        label={t('entrar')}
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
