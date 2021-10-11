import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useRef } from 'react'
import { Provider as PaperProvider, configureFonts } from 'react-native-paper'
import { useFonts } from 'expo-font'
import {
  NunitoSans_300Light,
  NunitoSans_400Regular,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
  NunitoSans_800ExtraBold,
  NunitoSans_900Black
} from '@expo-google-fonts/nunito-sans'
import AppLoading from 'expo-app-loading'
import { theme, fontConfig } from './theme'
import './src/i18n'
import { Routes } from './src/routes'
import { AuthProvider } from './src/context/AuthContext'
import * as Notifications from 'expo-notifications'
import { Subscription } from '@unimodules/react-native-adapter'

export default function App() {
  const [fontsLoaded, error] = useFonts({
    NunitoSans_300Light,
    NunitoSans_400Regular,
    NunitoSans_600SemiBold,
    NunitoSans_700Bold,
    NunitoSans_800ExtraBold,
    NunitoSans_900Black
  })
  const notificacaoAbertaListener = useRef<Subscription>()

  useEffect(() => {
    notificacaoAbertaListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        // esse evento se ativa quando o usuário clica na notificação
        console.log('clicou na notificacao', response.notification)
      })

    return () => {
      Notifications.removeNotificationSubscription(
        notificacaoAbertaListener.current
      )
    }
  }, [])

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    const themeWithFonts = { ...theme, fonts: configureFonts(fontConfig) }

    return (
      <PaperProvider theme={themeWithFonts}>
        <StatusBar style="inverted" />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </PaperProvider>
    )
  }
}
