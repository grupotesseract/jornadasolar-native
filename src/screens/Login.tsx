import React, { useState } from 'react'
import { HomeNavigationProps } from '../routes'
import { ScrollView } from 'react-native-gesture-handler'
import Titulo from '../components/Titulo'
import { StyleSheet, View } from 'react-native'
import i18n from '../i18n'
import Layout from '../components/Layout'
import Titulo from '../components/Titulo'
import Emoji from '../components/Emoji'
import TextInput from '../components/TextInput'
import PasswordInput from '../components/PasswordInput'
import ButtonLink from '../components/ButtonLink'

const Login = ({ navigation }: HomeNavigationProps) => {
  const { t } = i18n
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
    </Layout>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    marginTop: 16
  }
})
