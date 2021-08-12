import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Titulo from '../components/Titulo'
import i18n from '../i18n'
import TextInput from '../components/TextInput'
import PasswordInput from '../components/PasswordInput'
import Layout from '../components/Layout'
import ButtonLink from '../components/ButtonLink'
import { ScrollView } from 'react-native-gesture-handler'
import Emoji from '../components/Emoji'

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

  const handleEsqueciSenha = () => {
    navigation.navigate('EsqueciSenha')
  }

  return (
    <Layout
      exibirBotao
      textoBotao={t('login.entrar')}
      onButtonClick={handleLogin}
    >
      <KeyboardAvoidingView>
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
            <ButtonLink
              texto={t('login.esqueciSenha')}
              onPress={handleEsqueciSenha}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 80
  }
})
