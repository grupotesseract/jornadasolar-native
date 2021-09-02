import React from 'react'
import { HomeNavigationProps } from '../routes/Home.routes'
import { View, StyleSheet, Image } from 'react-native'
import { Caption, Text, Title } from 'react-native-paper'
import { appVersion } from '../utils/appVersion'
import Button from '../components/Button'
import Icone from '../../assets/icon.png'
import { theme } from '../../theme'
import i18n from '../i18n'

export default function Home({ navigation }: HomeNavigationProps) {
  const { t } = i18n

  const handleCadastro = () => {
    navigation.navigate('Identificacao')
  }

  const handleLogin = () => {
    navigation.navigate('Login')
  }

  return (
    <View style={styles.container}>
      <View style={styles.centralizado}>
        <Title style={styles.cabecalho}>{t('nomeApp')}</Title>
        <Caption style={styles.cabecalho}>
          {t('home.versao')} {appVersion}
        </Caption>
      </View>
      <View style={styles.centralizado}>
        <Image source={Icone} style={styles.imagem} />
        <Text style={styles.frase}>{t('home.frase')}</Text>
      </View>
      <View style={styles.botoes}>
        <View style={styles.botao}>
          <Button onPress={handleCadastro}>{t('home.comecarJornada')}</Button>
        </View>
        <View style={styles.botao}>
          <Button mode="outlined" onPress={handleLogin}>
            {t('home.tenhoCadastro')}
          </Button>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  centralizado: {
    alignItems: 'center'
  },
  cabecalho: {
    color: theme.colors.primary
  },
  imagem: {
    width: 134,
    height: 134
  },
  frase: {
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'center',
    marginTop: 30
  },
  botao: {
    marginBottom: 16
  },
  botoes: {
    width: '90%'
  }
})
