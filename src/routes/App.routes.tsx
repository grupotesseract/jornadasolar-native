import {
  createNativeStackNavigator,
  NativeStackScreenProps
} from '@react-navigation/native-stack'
import React from 'react'
import Diario from '../screens/app/Diario'

type AppStackParams = {
  Diario: undefined
}

type AppNavigationProps = NativeStackScreenProps<AppStackParams, 'Diario'>

const { Navigator, Screen } = createNativeStackNavigator<AppStackParams>()

function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Diario" component={Diario} />
    </Navigator>
  )
}

export { AppRoutes, AppNavigationProps }
