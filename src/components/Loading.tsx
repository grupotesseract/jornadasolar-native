import React from 'react'
import { View, Dimensions } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

const Loading = () => {
  const tela = Dimensions.get('screen').height
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: tela / 2
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  )
}

export default Loading
