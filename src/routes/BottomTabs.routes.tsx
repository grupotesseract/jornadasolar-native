import React from 'react'
import {
  BottomTabScreenProps,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs'
import {
  useSafeAreaInsets,
  SafeAreaProvider
} from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import Diario from '../screens/app/Diario'
import Graficos from '../screens/app/Graficos'
import Meditacoes from '../screens/app/Meditacoes'
import IconeRegistros from '../components/svg/IconeRegistros'
import IconeGraficos from '../components/svg/IconeGraficos'
import Perfil from '../screens/app/perfil/Perfil'
import i18n from '../i18n'

type BottomTabsParams = {
  Diario: undefined
  Meditacoes: undefined
  Graficos: undefined
  Perfil: undefined
}

type TabsNavigationProps = BottomTabScreenProps<BottomTabsParams, 'Diario'>

const { Navigator, Screen } = createBottomTabNavigator<BottomTabsParams>()

function BottomTabs() {
  const { t } = i18n
  const insets = useSafeAreaInsets()
  const paddingBottom = insets.bottom ? insets.bottom : 9
  return (
    <SafeAreaProvider>
      <Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            paddingBottom: paddingBottom,
            paddingTop: 12,
            height: insets.bottom + 62
          }
        }}
      >
        <Screen
          name="Diario"
          component={Diario}
          options={{
            tabBarLabel: t('menuInferior.registros'),
            tabBarIcon: ({ color }) => <IconeRegistros color={color} />
          }}
        />
        <Screen
          name="Graficos"
          component={Graficos}
          options={{
            tabBarLabel: t('menuInferior.graficos'),
            tabBarIcon: ({ color }) => <IconeGraficos color={color} />
          }}
        />
        <Screen
          name="Meditacoes"
          component={Meditacoes}
          options={{
            tabBarLabel: t('menuInferior.meditacoes'),
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="spa" size={24} color={color} />
            )
          }}
        />
        <Screen
          name="Perfil"
          component={Perfil}
          options={{
            tabBarLabel: t('menuInferior.perfil'),
            tabBarIcon: ({ color }) => (
              <Ionicons name="person-outline" size={24} color={color} />
            )
          }}
        />
      </Navigator>
    </SafeAreaProvider>
  )
}

export { BottomTabs, TabsNavigationProps }
