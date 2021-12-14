import { t } from 'i18n-js'
import React, { useContext, useState } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import Layout from '../../../components/Layout'
import TextInput from '../../../components/TextInput'
import TituloComVoltar from '../../../components/TituloComVoltar'
import AlertContext from '../../../context/AlertContext'
import AuthContext from '../../../context/AuthContext'
import { AppNavigationProps } from '../../../routes/App.routes'
import UpdateNome from '../../../services/user/UpdateNome'
import { atualizacaoSucesso } from '../../../utils/mensagensAlerta'

const AlterarNome = ({ navigation }: AppNavigationProps) => {
  const { userName, userId, refreshUser } = useContext(AuthContext)
  const [nome, setNome] = useState(userName)
  const exibirBotao = nome.length > 0
  const { displayAlert } = useContext(AlertContext)

  const handleChangeNome = (novoNome: string) => {
    setNome(novoNome)
  }

  const handleSalvar = () => {
    if (new UpdateNome().call(userId, nome)) {
      refreshUser()
      displayAlert(atualizacaoSucesso(t('perfil.nome')))
      navigation.goBack()
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <TituloComVoltar texto={t('perfil.alterarNome')} />
      <Layout
        textoBotao={t('comum.salvar')}
        exibirBotao={exibirBotao}
        onButtonClick={handleSalvar}
        testIdBotao="botaoSalvar"
      >
        <TextInput
          label={t('perfil.nome')}
          value={nome}
          onChangeText={handleChangeNome}
          testID="inputNome"
        />
      </Layout>
    </View>
  )
}

export default AlterarNome
