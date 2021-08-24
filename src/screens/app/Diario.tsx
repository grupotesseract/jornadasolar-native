import React from 'react'
import { useContext } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import AuthContext from '../../context/AuthContext'

const Diario = () => {
  const { userId } = useContext(AuthContext)

  return (
    <View>
      <Text>Esta é a área logada 😉</Text>
      <Text>Bem vindo {userId}</Text>
    </View>
  )
}

export default Diario
