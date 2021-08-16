import React from 'react'
import { TextStyle } from 'react-native'
import { Text } from 'react-native-paper'
import Emoji from './Emoji'

interface Props {
  nome: string
  emoji: string
  textStyle?: TextStyle
}

const EmojiComNome = ({ nome, emoji, textStyle }: Props) => {
  return (
    <Text style={textStyle}>
      <Emoji emoji={emoji} /> {nome}
    </Text>
  )
}

export default EmojiComNome
