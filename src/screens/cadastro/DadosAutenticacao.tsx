import React, { useContext, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { StyleSheet, View } from 'react-native'
import { RadioButton, Text } from 'react-native-paper'
import i18n from '../../i18n'
import Layout from '../../components/Layout'
import Titulo from '../../components/Titulo'
import Emoji from '../../components/Emoji'
import TextInput from '../../components/TextInput'
import PasswordInput from '../../components/PasswordInput'
import CadastroContext from '../../context/ContextCadastro'
import { ErrosAuth, getMessageFromCode } from '../../utils/getMessageFromCode'
import CreateUser from '../../services/user/CreateUser'
import { logEvent } from 'expo-firebase-analytics'

const DadosAutenticacao = () => {
  const { t } = i18n
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erros, setErros] = useState<ErrosAuth>({})
  const [isLoading, setIsLoading] = useState(false)
  const [temLivro, setTemLivro] = React.useState('TemLivro')
  const { dadosCadastro } = useContext(CadastroContext)
  const opcoesLivro = [
    { value: 'TemLivro', label: t('cadastro.opcoesLivro.TemLivro') },
    { value: 'NaoTemLivro', label: t('cadastro.opcoesLivro.NaoTemLivro') },
    { value: 'QueroSaberMais', label: t('cadastro.opcoesLivro.QueroSaberMais') }
  ]

  const handleClickPronto = async () => {
    if (email.length < 6) {
      setErros({ email: t('errosAuth.emailInvalido') })
      return
    }
    if (senha.length < 6) {
      setErros({ senha: t('errosAuth.senhaFraca') })
      return
    }
    setIsLoading(true)
    try {
      const createUserService = new CreateUser()
      await createUserService.call({ ...dadosCadastro, email, senha, temLivro })
      logEvent('sign_up')
    } catch (e) {
      setErros(getMessageFromCode(e.code))
    }
    setIsLoading(false)
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
      textoBotao={t('cadastro.pronto')}
      onButtonClick={handleClickPronto}
      loading={isLoading}
    >
      <ScrollView>
        <Titulo>
          {t('cadastro.crieCadastro')} <Emoji nome="wink" />
        </Titulo>

        <View style={styles.container}>
          <TextInput
            label={t('cadastro.email')}
            value={email}
            erro={erros.email}
            onChangeText={handleChangeEmail}
            keyboardType="email-address"
          />
          <PasswordInput
            label={t('cadastro.senha')}
            value={senha}
            erro={erros.senha}
            onChangeText={handleChangeSenha}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.texto}>{t('cadastro.perguntaLivro')}</Text>
          <View style={styles.container}>
            <RadioButton.Group
              onValueChange={newValue => setTemLivro(newValue)}
              value={temLivro}
            >
              {opcoesLivro.map(opcao => {
                return (
                  <RadioButton.Item
                    key={opcao.value}
                    value={opcao.value}
                    label={opcao.label}
                    position="leading"
                    labelStyle={styles.texto}
                    mode="android"
                    style={styles.radio}
                  />
                )
              })}
            </RadioButton.Group>
          </View>
        </View>
      </ScrollView>
    </Layout>
  )
}

export default DadosAutenticacao

const styles = StyleSheet.create({
  container: {
    marginVertical: 16
  },
  texto: {
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'left'
  },
  radio: {
    paddingStart: 0
  }
})
