import React, { useState } from 'react'
import { HomeNavigationProps } from '../../routes'
import { ScrollView } from 'react-native-gesture-handler'
import { StyleSheet, View } from 'react-native'
import { RadioButton, Text } from 'react-native-paper'
import i18n from '../../i18n'
import Layout from '../../components/Layout'
import Titulo from '../../components/Titulo'
import Emoji from '../../components/Emoji'
import TextInput from '../../components/TextInput'
import PasswordInput from '../../components/PasswordInput'

const DadosAutenticacao = ({ navigation }: HomeNavigationProps) => {
  const { t } = i18n
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erros, setErros] = useState({ email: '', senha: '' })
  const [temLivro, setTemLivro] = React.useState('TemLivro')

  const opcoesLivro = [
    { value: 'TemLivro', label: t('cadastro.opcoesLivro.TemLivro') },
    { value: 'NaoTemLivro', label: t('cadastro.opcoesLivro.NaoTemLivro') },
    { value: 'QueroSaberMais', label: t('cadastro.opcoesLivro.QueroSaberMais') }
  ]

  const handlePronto = () => {
    if (!email.length) {
      setErros({ ...erros, email: t('errosAuth.erroEmailVazio') })
      return
    }
    if (!senha.length) {
      setErros({ ...erros, senha: t('errosAuth.erroSenhaVazia') })
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
      textoBotao={t('cadastro.pronto')}
      onButtonClick={handlePronto}
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
    lineHeight: 24,
    textAlign: 'left'
  },
  radio: {
    paddingStart: 0
  }
})
