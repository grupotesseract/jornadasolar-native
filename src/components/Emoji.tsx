import React from 'react'
import { Text } from 'react-native-paper'

const emojis = {
  alegre: '\u{1F603}',
  wink: '\u{1F609}'
}

interface Props {
  nome?: keyof typeof emojis
  emoji?: string
}

const Emoji = ({ nome, emoji }: Props) => {
  const emojis = {
    alegre: '\u{1F603}',
    wink: '\u{1F609}'
  }
  return <Text>{nome ? emojis[nome] : emoji}</Text>
}

export default Emoji
