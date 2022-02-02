import React, { FC } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import ImagemSol from '../../../assets/icon.png'
import { t } from 'i18n-js'

const EmptyState: FC = () => {
  return (
    <View style={styles.container}>
      <Image source={ImagemSol} style={styles.imagem} />

      <Text style={styles.texto}>{t('graficos.textoVazio')}</Text>
    </View>
  )
}

export default EmptyState

const styles = StyleSheet.create({
  container: {
    marginTop: 36,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  texto: {
    maxWidth: 300,
    marginTop: 30,
    fontSize: 16,
    textAlign: 'center'
  },
  imagem: {
    height: 136,
    width: 136
  }
})
