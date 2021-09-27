import React, { useContext, useState } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Layout from '../../../components/Layout'
import PasswordInput from '../../../components/PasswordInput'
import TituloComVoltar from '../../../components/TituloComVoltar'
import AlertContext from '../../../context/AlertContext'
import { AppNavigationProps } from '../../../routes/App.routes'
import UpdatePassword from '../../../services/user/UpdatePassword'
import { senhaAlteradaSucesso } from '../../../utils/mensagensAlerta'
import { logEvent } from 'expo-firebase-analytics'
import { t } from 'i18n-js'

const AlterarSenha = ({ navigation }: AppNavigationProps) => {
  const [senhaAtual, setSenhaAtual] = useState('')
  const [senhaNova, setSenhaNova] = useState('')
  const [confirmaSenhaNova, setConfirmaSenhaNova] = useState('')
  const [isLoading, setisLoading] = useState(false)
  const [erros, setErros] = useState({
    senha: '',
    senhaNova: '',
    confirmacao: ''
  })

  const { displayAlert } = useContext(AlertContext)

  const handleChangeSenhaAtual = texto => {
    setErros({
      ...erros,
      senha: ''
    })
    setSenhaAtual(texto)
  }

  const handleChangeNovaSenha = texto => {
    setErros({
      ...erros,
      senhaNova: ''
    })
    setSenhaNova(texto)
  }

  const handleChangeConfirmacao = texto => {
    setErros({
      ...erros,
      confirmacao: ''
    })
    setConfirmaSenhaNova(texto)
  }

  const validaCampos = () => {
    if (
      senhaAtual.length < 6 ||
      senhaNova.length < 6 ||
      confirmaSenhaNova !== senhaNova
    ) {
      setErros({
        senha: senhaAtual.length < 6 ? t('errosAuth.senhaFraca') : '',
        senhaNova: senhaNova.length < 6 ? t('errosAuth.senhaFraca') : '',
        confirmacao:
          confirmaSenhaNova !== senhaNova ? t('perfil.erroConfirmaSenha') : ''
      })
      return false
    }
    return true
  }

  const handleSalvar = () => {
    if (validaCampos()) {
      setisLoading(true)
      new UpdatePassword()
        .call(senhaAtual, senhaNova)
        .then(() => {
          displayAlert(senhaAlteradaSucesso())
          logEvent('update_password')
          navigation.goBack()
        })
        .catch(e => {
          setErros({
            senha:
              e.code === 'auth/wrong-password'
                ? t('perfil.erroSenhaAtual')
                : '',
            senhaNova:
              e.code === 'auth/weak-password' ? t('errosAuth.senhaFraca') : '',
            confirmacao: ''
          })
          setisLoading(false)
        })
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <TituloComVoltar texto={t('perfil.alterarSenha')} />
      <Layout
        textoBotao={t('comum.salvar')}
        exibirBotao
        onButtonClick={handleSalvar}
        loading={isLoading}
      >
        <ScrollView>
          <PasswordInput
            label={t('perfil.senha')}
            value={senhaAtual}
            onChangeText={handleChangeSenhaAtual}
            erro={erros.senha}
          />
          <PasswordInput
            label={t('perfil.novaSenha')}
            value={senhaNova}
            onChangeText={handleChangeNovaSenha}
            erro={erros.senhaNova}
          />
          <PasswordInput
            label={t('perfil.confirmaSenha')}
            value={confirmaSenhaNova}
            onChangeText={handleChangeConfirmacao}
            erro={erros.confirmacao}
          />
        </ScrollView>
      </Layout>
    </View>
  )
}

export default AlterarSenha
