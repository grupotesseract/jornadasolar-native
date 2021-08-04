import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from '../../theme'
import Background from '../components/Background'
import Login from '../screens/Login'
import Home from '../screens/Home'

const { Navigator, Screen } = createStackNavigator()

export function Routes() {
  return (
    <Background>
      <NavigationContainer theme={theme}>
        <Navigator screenOptions={{ headerShown: false }}>
          <Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Screen name="Login" component={Login} />
        </Navigator>
      </NavigationContainer>
    </Background>
  )
}
