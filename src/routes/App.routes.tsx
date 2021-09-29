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
import Perfil from '../screens/app/Perfil'
import { BottomTabs } from './BottomTabs.routes'

type AppStackParams = {
  Abas: undefined
  Dia: { data: string }
  Sentimentos: { data: string }
  Habitos: { data: string }
  Anotacoes: { data: string }
  Perfil: undefined
  Player: { id: string }
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
      <Screen name="Perfil" component={Perfil} />
      <Screen name="Player" component={Player} />
    </Navigator>
  )
}

export {
  AppRoutes,
  AppNavigationProps,
  DiaNavigationProps,
  PlayerNavigationProps
}
