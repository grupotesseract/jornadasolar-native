import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { theme } from '../../theme'
import Background from '../components/Background'
import { HomeRoutes } from './Home.routes'
import AuthContext from '../context/AuthContext'
import { CadastroProvider } from '../context/ContextCadastro'
import { AppRoutes } from './App.routes'
import { SafeAreaProvider } from 'react-native-safe-area-context'

function Routes() {
  const { userId } = useContext(AuthContext)

  const AreaNaoLogada = (
    <CadastroProvider>
      <HomeRoutes />
    </CadastroProvider>
  )

  const Conteudo = userId ? <AppRoutes /> : AreaNaoLogada

  return (
    <Background>
      <NavigationContainer theme={theme}>{Conteudo}</NavigationContainer>
    </Background>
  )
}

export { Routes }
