import React from 'react'
import { Text } from 'react-native-paper'

const emojis = {
  alegre: '\u{1F603}',
  wink: '\u{1F609}',
  lapis: '\u{270F}\u{FE0F}'
}

interface Props {
  nome?: keyof typeof emojis
  emoji?: string
}

const Emoji = ({ nome, emoji }: Props) => {
  return <Text>{nome ? emojis[nome] : emoji}</Text>
}

export default Emoji
