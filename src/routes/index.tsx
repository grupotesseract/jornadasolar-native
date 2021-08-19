import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
  createNativeStackNavigator,
  NativeStackScreenProps
} from '@react-navigation/native-stack'
import { theme } from '../../theme'
import Background from '../components/Background'
import Login from '../screens/Login'
import Home from '../screens/Home'
import EsqueciSenha from '../screens/EsqueciSenha'

type HomeStackParams = {
  Home: undefined
  Login: undefined
  EsqueciSenha: undefined
  Identificacao: undefined
}

type HomeNavigationProps = NativeStackScreenProps<HomeStackParams, 'Home'>

const { Navigator, Screen } = createNativeStackNavigator<HomeStackParams>()

function Routes() {
  return (
    <Background>
      <NavigationContainer theme={theme}>
        <Navigator screenOptions={{ headerShown: false }}>
          <Screen name="Home" component={Home} />
          <Screen name="Login" component={Login} />
          <Screen name="EsqueciSenha" component={EsqueciSenha} />
        </Navigator>
      </NavigationContainer>
    </Background>
  )
}

export { Routes, HomeNavigationProps }
