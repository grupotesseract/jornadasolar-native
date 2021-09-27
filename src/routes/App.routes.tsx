import {
  createNativeStackNavigator,
  NativeStackScreenProps
} from '@react-navigation/native-stack'
import React from 'react'
import Dia from '../screens/app/Dia'
import Sentimentos from '../screens/app/Sentimentos'
import Habitos from '../screens/app/Habitos'
import Anotacoes from '../screens/app/Anotacoes'
import Perfil from '../screens/app/perfil/Perfil'
import { BottomTabs } from './BottomTabs.routes'
import AlterarSenha from '../screens/app/perfil/AlterarSenha'
import MeusDados from '../screens/app/perfil/MeusDados'
import Notificacoes from '../screens/app/perfil/Notificacoes'
import AlterarNome from '../screens/app/perfil/AlterarNome'

type AppStackParams = {
  Abas: undefined
  Dia: { data: string }
  Sentimentos: { data: string }
  Habitos: undefined
  Anotacoes: { data: string }
  Perfil: undefined
  MeusDados: undefined
  AlterarNome: undefined
  AlterarSenha: undefined
  Notificacoes: undefined
}

type AppNavigationProps = NativeStackScreenProps<AppStackParams, 'Abas'>
type DiaNavigationProps = NativeStackScreenProps<AppStackParams, 'Dia'>

const { Navigator, Screen } = createNativeStackNavigator<AppStackParams>()

function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Abas" component={BottomTabs} />
      <Screen name="Dia" component={Dia} />
      <Screen name="Sentimentos" component={Sentimentos} />
      <Screen name="Habitos" component={Habitos} />
      <Screen name="Anotacoes" component={Anotacoes} />
      <Screen name="Perfil" component={Perfil} />
      <Screen name="MeusDados" component={MeusDados} />
      <Screen name="AlterarNome" component={AlterarNome} />
      <Screen name="AlterarSenha" component={AlterarSenha} />
      <Screen name="Notificacoes" component={Notificacoes} />
    </Navigator>
  )
}

export { AppRoutes, AppNavigationProps, DiaNavigationProps }
