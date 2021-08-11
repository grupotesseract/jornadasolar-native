import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import i18n from '../i18n'
import Layout from '../components/Layout'
import Titulo from '../components/Titulo'
import Emoji from '../components/Emoji'
import TextInput from '../components/TextInput'
import PasswordInput from '../components/PasswordInput'
import ButtonEsqueciSenha from '../components/ButtonEsqueciSenha'

const Login = () => {
  const { t } = i18n
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erros, setErros] = useState({ email: '', senha: '' })

  const handleLogin = () => {
    if (!email.length) {
      setErros({ ...erros, email: t('login.erroEmailVazio') })
      return
    }
    if (!senha.length) {
      setErros({ ...erros, senha: t('login.erroSenhaVazia') })
      return
    }
    navigation.navigate('Home')
  }

  const handleChangeEmail = (input: string) => {
    setEmail(input.trim().toLowerCase())
    setErros({ ...erros, email: '' })
  }

  const handleChangeSenha = (input: string) => {
    setSenha(input)
    setErros({ ...erros, senha: '' })
  }

  return (
    <Layout
      exibirBotao
      textoBotao={t('login.entrar')}
      onButtonClick={handleLogin}
    >
      <ScrollView>
        <Titulo>
          {t('login.saudacao')} <Emoji nome="alegre" />
        </Titulo>

        <View style={styles.container}>
          <TextInput
            label={t('login.email')}
            value={email}
            erro={erros.email}
            onChangeText={handleChangeEmail}
            keyboardType="email-address"
          />
          <PasswordInput
            label={t('login.senha')}
            value={senha}
            erro={erros.senha}
            onChangeText={handleChangeSenha}
          />
          <ButtonEsqueciSenha />
        </View>
      </ScrollView>
    </Layout>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    marginTop: 16
  }
})
