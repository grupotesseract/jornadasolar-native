import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'
import { FAB } from 'react-native-paper'
import i18n from '../i18n'
import { Text } from 'react-native-paper'

export default function Home() {
  const { t } = i18n
  const navigation = useNavigation()

  const handleCadastro = () => {
    navigation.navigate('Login')
  }

  const handleLogin = () => {
    navigation.navigate('Login')
  }

  return (
    <View>
      <View>
        <Text>{t('nomeApp')}</Text>
        <Text>{t('home.versao')} 0.8.6</Text>
      </View>
      <Text>{t('home.frase')}</Text>
      <View>
        <FAB
          icon=""
          label={t('home.comecarJornada')}
          onPress={handleCadastro}
        />
        <FAB icon="" label={t('home.tenhoCadastro')} onPress={handleLogin} />
      </View>
    </View>
  )
}
