import {
  createNativeStackNavigator,
  NativeStackScreenProps
} from '@react-navigation/native-stack'
import React from 'react'
import Dia from '../screens/app/Dia'
import Sentimentos from '../screens/app/Sentimentos'
import Habitos from '../screens/app/Habitos'
import Anotacoes from '../screens/app/Anotacoes'
import Perfil from '../screens/app/Perfil'
import { BottomTabs } from './BottomTabs.routes'

type AppStackParams = {
  Abas: undefined
  Dia: { data: string }
  Sentimentos: undefined
  Habitos: undefined
  Anotacoes: { data: string }
  Perfil: undefined
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
    </Navigator>
  )
}

export { AppRoutes, AppNavigationProps, DiaNavigationProps }
