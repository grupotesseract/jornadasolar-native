import { t } from 'i18n-js'
import React, { useState } from 'react'
import { View } from 'react-native'
import { Switch } from 'react-native-paper'
import NavigationList from '../../../components/NavigationList'
import TituloComVoltar from '../../../components/TituloComVoltar'

const Notificacoes = () => {
  const [notificacaoAtiva, setNotificacaoAtiva] = useState(true)

  const toggleNotificacao = () => {
    setNotificacaoAtiva(!notificacaoAtiva)
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
    </View>
  )
}

export default Notificacoes
