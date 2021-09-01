import React from 'react'
import {
  BottomTabScreenProps,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Diario from '../screens/app/Diario'
import Graficos from '../screens/app/Graficos'
import Meditacoes from '../screens/app/Meditacoes'
import IconeRegistros from '../components/svg/IconeRegistros'
import IconeGraficos from '../components/svg/IconeGraficos'

type BottomTabsParams = {
  Diario: undefined
  Meditacoes: undefined
  Graficos: undefined
}

type TabsNavigationProps = BottomTabScreenProps<BottomTabsParams, 'Diario'>

const { Navigator, Screen } = createBottomTabNavigator<BottomTabsParams>()

function BottomTabs() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { paddingBottom: 9, paddingTop: 12, height: 62 }
      }}
    >
      <Screen
        name="Diario"
        component={Diario}
        options={{
          tabBarLabel: 'Registros',
          tabBarIcon: ({ color }) => <IconeRegistros color={color} />
        }}
      />
      <Screen
        name="Graficos"
        component={Graficos}
        options={{
          tabBarLabel: 'Gráficos',
          tabBarIcon: ({ color }) => <IconeGraficos color={color} />
        }}
      />
      <Screen
        name="Meditacoes"
        component={Meditacoes}
        options={{
          tabBarLabel: 'Meditações',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="spa" size={24} color={color} />
          )
        }}
      />
    </Navigator>
  )
}

export { BottomTabs, TabsNavigationProps }
