import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from '../../theme'
import Background from '../components/Background'
import Login from '../screens/Login'
import Home from '../screens/Home'
import EsqueciSenha from '../screens/EsqueciSenha'
import Identificacao from '../screens/cadastro/Identificacao'

const { Navigator, Screen } = createStackNavigator()

export function Routes() {
  return (
    <Background>
      <NavigationContainer theme={theme}>
        <Navigator screenOptions={{ headerShown: false }}>
          <Screen name="Home" component={Home} />
          <Screen name="Login" component={Login} />
          <Screen name="EsqueciSenha" component={EsqueciSenha} />
          <Screen name="Identificacao" component={Identificacao} />
        </Navigator>
      </NavigationContainer>
    </Background>
  )
}
