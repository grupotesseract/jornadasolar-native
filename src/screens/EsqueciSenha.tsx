import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { HelperText, Text } from 'react-native-paper'
import Emoji from '../components/Emoji'
import Layout from '../components/Layout'
import TextInput from '../components/TextInput'
import Titulo from '../components/Titulo'
import i18n from '../i18n'
import SendPasswordResetEmail from '../services/user/SendPasswordResetEmail'
import { ErrosAuth, getMessageFromCode } from '../utils/getMessageFromCode'

const EsqueciSenha = (): React.ReactElement => {
  const [email, setEmail] = useState('')
  const [erro, setErro] = useState<ErrosAuth>({})
  const [sucesso, setSucesso] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const handleChangeEmail = (input: string) => {
    setEmail(input.trim())
  }

  const handleEmailPerdeFoco = () => {
    setEmail(email.toLowerCase())
  }

  const handleEnviar = async () => {
    setIsLoading(true)
    setErro({})
    setSucesso(false)

    try {
      await new SendPasswordResetEmail().call(email)
      setSucesso(true)
    } catch (e) {
      setErro(getMessageFromCode(e.code))
    }
    setIsLoading(false)
  }

  const { t } = i18n
  return (
    <Layout
      exibirBotao
      textoBotao={t('recuperarSenha.enviar')}
      onButtonClick={handleEnviar}
      loading={isLoading}
      testIdBotao="botaoEnviar"
      botaoVoltar
    >
      <ScrollView>
        <Titulo>
          {t('recuperarSenha.titulo')} <Emoji nome="wink" />
        </Titulo>
        <Text style={styles.texto}>{t('recuperarSenha.enviaremosLink')}</Text>
        <TextInput
          label={t('login.email')}
          value={email}
          erro={erro.email}
          onChangeText={handleChangeEmail}
          keyboardType="email-address"
          testID="inputEmail"
          onBlur={handleEmailPerdeFoco}
        />
        <HelperText type="info" visible={sucesso}>
          {t('recuperarSenha.linkEnviado', { email })}
        </HelperText>
      </ScrollView>
    </Layout>
  )
}

export default EsqueciSenha

const styles = StyleSheet.create({
  texto: {
    marginTop: 38,
    fontSize: 20
  }
})
