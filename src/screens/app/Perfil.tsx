import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../../components/Button'
import SignOutUser from '../../services/user/SignOutUser'

const Perfil = () => {
  const handleSair = () => {
    new SignOutUser().call()
  }
  return (
    <View>
      <Text>Perfil</Text>
      <Button onPress={handleSair}>Sair</Button>
    </View>
  )
}

export default Perfil
