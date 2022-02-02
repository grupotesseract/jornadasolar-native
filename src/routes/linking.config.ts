import { LinkingOptions } from '@react-navigation/native'
import * as Linking from 'expo-linking'
import { AppStackParams } from './App.routes'

const prefix = Linking.createURL('/')

const config = {
  screens: {
    Abas: {
      screens: {
        Diario: { path: 'diario', exact: true },
        Meditacoes: { path: 'meditacoes', exact: true },
        Graficos: { path: 'graficos', exact: true }
      }
    },
    Dia: 'dia',
    Perfil: 'perfil',
    Player: 'meditacao'
  }
}

const linking: LinkingOptions<AppStackParams> = {
  prefixes: [prefix],
  config
}

export default linking
