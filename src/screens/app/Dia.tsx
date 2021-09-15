import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { DiaNavigationProps } from '../../routes/App.routes'

const Dia = ({ route }: DiaNavigationProps) => {
  const { data } = route.params
  return (
    <View>
      <Text>Dia {data}</Text>
    </View>
  )
}

export default Dia
