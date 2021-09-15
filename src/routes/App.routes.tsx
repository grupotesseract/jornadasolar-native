import {
  createNativeStackNavigator,
  NativeStackScreenProps
} from '@react-navigation/native-stack'
import React from 'react'
import Diario from '../screens/app/Diario'
import Dia from '../screens/app/Dia'
import Sentimentos from '../screens/app/Sentimentos'
import Habitos from '../screens/app/Habitos'
import Anotacoes from '../screens/app/Anotacoes'
import Perfil from '../screens/app/Perfil'

type AppStackParams = {
  Diario: undefined
  Dia: { data: string }
  Sentimentos: undefined
  Habitos: undefined
  Anotacoes: undefined
  Perfil: undefined
}

type AppNavigationProps = NativeStackScreenProps<AppStackParams, 'Diario'>
type DiaNavigationProps = NativeStackScreenProps<AppStackParams, 'Dia'>

const { Navigator, Screen } = createNativeStackNavigator<AppStackParams>()

function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Diario" component={Diario} />
      <Screen name="Dia" component={Dia} />
      <Screen name="Sentimentos" component={Sentimentos} />
      <Screen name="Habitos" component={Habitos} />
      <Screen name="Anotacoes" component={Anotacoes} />
      <Screen name="Perfil" component={Perfil} />
    </Navigator>
  )
}

export { AppRoutes, AppNavigationProps, DiaNavigationProps }
