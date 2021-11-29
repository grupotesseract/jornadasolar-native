import {
  createNativeStackNavigator,
  NativeStackScreenProps
} from '@react-navigation/native-stack'
import React from 'react'
import Dia from '../screens/app/Dia'
import Sentimentos from '../screens/app/Sentimentos'
import Habitos from '../screens/app/Habitos'
import Anotacoes from '../screens/app/Anotacoes'
import Player from '../screens/app/Player'
import { BottomTabs } from './BottomTabs.routes'
import AlterarSenha from '../screens/app/perfil/AlterarSenha'
import MeusDados from '../screens/app/perfil/MeusDados'
import Notificacoes from '../screens/app/perfil/Notificacoes'
import AlterarNome from '../screens/app/perfil/AlterarNome'
import Premium from '../screens/app/perfil/Premium'

type AppStackParams = {
  Abas: undefined
  Dia: { data: string }
  Sentimentos: { data: string }
  Habitos: { data: string }
  Anotacoes: { data: string }
  Player: { id: string }
  MeusDados: undefined
  AlterarNome: undefined
  AlterarSenha: undefined
  Notificacoes: undefined
  Premium: undefined
}

type AppNavigationProps = NativeStackScreenProps<AppStackParams, 'Abas'>
type DiaNavigationProps = NativeStackScreenProps<AppStackParams, 'Dia'>
type PlayerNavigationProps = NativeStackScreenProps<AppStackParams, 'Player'>

const { Navigator, Screen } = createNativeStackNavigator<AppStackParams>()

function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Abas" component={BottomTabs} />
      <Screen name="Dia" component={Dia} />
      <Screen name="Sentimentos" component={Sentimentos} />
      <Screen name="Habitos" component={Habitos} />
      <Screen name="Anotacoes" component={Anotacoes} />
      <Screen name="Player" component={Player} />
      <Screen name="MeusDados" component={MeusDados} />
      <Screen name="AlterarNome" component={AlterarNome} />
      <Screen name="AlterarSenha" component={AlterarSenha} />
      <Screen name="Notificacoes" component={Notificacoes} />
      <Screen name="Premium" component={Premium} />
    </Navigator>
  )
}

export {
  AppRoutes,
  AppStackParams,
  AppNavigationProps,
  DiaNavigationProps,
  PlayerNavigationProps
}
