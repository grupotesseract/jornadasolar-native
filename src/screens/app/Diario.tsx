import React from 'react'
import { useContext } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../../components/Button'
import AuthContext from '../../context/AuthContext'
import SignOutUser from '../../services/user/SignOutUser'

const Diario = () => {
  const { userId } = useContext(AuthContext)

  const handleSair = () => {
    new SignOutUser().call()
  }

  return (
    <View>
      <Text>Esta é a área logada 😉</Text>
      <Text>Bem vindo {userId}</Text>
      <Button onPress={handleSair}>Sair</Button>
    </View>
  )
}

export default Diario
