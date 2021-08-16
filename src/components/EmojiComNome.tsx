import React from 'react'
import { TextStyle } from 'react-native'
import { Text } from 'react-native-paper'
import Emoji from './Emoji'

interface Props {
  nome: string
  unicode: string
  textStyle?: TextStyle
}

const EmojiComNome = ({ nome, unicode, textStyle }: Props) => {
  return (
    <Text style={textStyle}>
      <Emoji unicode={unicode} /> {nome}
    </Text>
  )
}

export default EmojiComNome
