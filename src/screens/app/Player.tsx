import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { PlayerNavigationProps } from '../../routes/App.routes'

const Player = ({ navigation, route }: PlayerNavigationProps) => {
  const { id } = route.params
  return (
    <View>
      <Text>Player</Text>
      <Text>id: {id}</Text>
    </View>
  )
}

export default Player
