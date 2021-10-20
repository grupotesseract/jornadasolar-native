import { t } from 'i18n-js'
import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Switch } from 'react-native-paper'
import NavigationList from '../../../components/NavigationList'
import TituloComVoltar from '../../../components/TituloComVoltar'
import { agendaNotificacaoTeste } from '../../../utils/notificacoes'

const Notificacoes = () => {
  const [notificacaoAtiva, setNotificacaoAtiva] = useState(true)

  const toggleNotificacao = () => {
    setNotificacaoAtiva(!notificacaoAtiva)
  }

  const handleSolicitaNotificacao = async () => {
    await agendaNotificacaoTeste()
  }

  const menu = [
    {
      texto: t('perfil.notificaEventos'),
      onPress: toggleNotificacao,
      iconeSecundario: (
        <Switch value={notificacaoAtiva} onValueChange={toggleNotificacao} />
      )
    }
  ]

  return (
    <View>
      <TituloComVoltar texto={t('perfil.notificacoes')} />
      <NavigationList itens={menu} />
      <Button onPress={handleSolicitaNotificacao}>Solicita notificação</Button>
    </View>
  )
}

export default Notificacoes
