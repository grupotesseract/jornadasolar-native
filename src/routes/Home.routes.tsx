import React from 'react'
import {
  createNativeStackNavigator,
  NativeStackScreenProps
} from '@react-navigation/native-stack'
import Login from '../screens/Login'
import Home from '../screens/Home'
import EsqueciSenha from '../screens/EsqueciSenha'
import Identificacao from '../screens/cadastro/Identificacao'
import Objetivos from '../screens/cadastro/Objetivos'
import Sentimentos from '../screens/cadastro/Sentimentos'
import Habitos from '../screens/cadastro/Habitos'
import DadosAutenticacao from '../screens/cadastro/DadosAutenticacao'

type HomeStackParams = {
  Home: undefined
  Login: undefined
  EsqueciSenha: undefined
  Identificacao: undefined
  Objetivos: undefined
  CadastroSentimentos: undefined
  CadastroHabitos: undefined
  DadosAutenticacao: undefined
}

type HomeNavigationProps = NativeStackScreenProps<HomeStackParams, 'Home'>

const { Navigator, Screen } = createNativeStackNavigator<HomeStackParams>()

function HomeRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="Login" component={Login} />
      <Screen name="EsqueciSenha" component={EsqueciSenha} />
      <Screen name="Identificacao" component={Identificacao} />
      <Screen name="Objetivos" component={Objetivos} />
      <Screen name="CadastroSentimentos" component={Sentimentos} />
      <Screen name="CadastroHabitos" component={Habitos} />
      <Screen name="DadosAutenticacao" component={DadosAutenticacao} />
    </Navigator>
  )
}

export { HomeRoutes, HomeNavigationProps }
