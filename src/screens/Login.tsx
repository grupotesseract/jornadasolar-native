import React from 'react'
import { View } from 'react-native'
import { FAB, Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import Titulo from '../components/Titulo'
import i18n from '../i18n'

const Login = () => {
  const { t } = i18n
  const navigation = useNavigation()

  const handleLogin = () => {
    navigation.navigate('Home')
  }
  return (
    <View>
      <Titulo texto={`${t('login.saudacao')}  😃`} />
      <Text>{t('login.email')}</Text>
      <Text>{t('login.senha')}</Text>
      <FAB icon="" label={t('login.entrar')} onPress={handleLogin} />
    </View>
  )
}

export default Login
