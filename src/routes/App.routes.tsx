import {
  createNativeStackNavigator,
  NativeStackScreenProps
} from '@react-navigation/native-stack'
import React from 'react'
import Diario from '../screens/app/Diario'
import Perfil from '../screens/app/Perfil'

type AppStackParams = {
  Diario: undefined
  Perfil: undefined
}

type AppNavigationProps = NativeStackScreenProps<AppStackParams, 'Diario'>

const { Navigator, Screen } = createNativeStackNavigator<AppStackParams>()

function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Diario" component={Diario} />
      <Screen name="Perfil" component={Perfil} />
    </Navigator>
  )
}

export { AppRoutes, AppNavigationProps }
