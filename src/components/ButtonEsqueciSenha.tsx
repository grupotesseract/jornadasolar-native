import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {
  StyleSheet,
  View,
  Button as Nativebutton,
  Pressable
} from 'react-native'
import { Button, Text } from 'react-native-paper'
import i18n from '../i18n'

const ButtonEsqueciSenha = () => {
  const { t } = i18n
  const navigation = useNavigation()

  const handleEsqueceuSenha = () => {
    navigation.navigate('EsqueciSenha')
  }

  return (
    <View>
      <Pressable style={styles.botao} onPress={handleEsqueceuSenha}>
        <Text style={styles.textoBotao}>{t('login.esqueciSenha')}</Text>
      </Pressable>
    </View>
  )
}

export default ButtonEsqueciSenha

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
