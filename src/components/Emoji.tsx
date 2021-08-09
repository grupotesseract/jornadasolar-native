import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

const emojis = {
  alegre: '\u{1F603}',
  wink: '\u{1F609}'
}

interface Props {
  nome?: keyof typeof emojis
  unicode?: string
}

const Emoji = ({ nome, unicode }: Props) => {
  const emojis = {
    alegre: '\u{1F603}',
    wink: '\u{1F609}'
  }
  return <Text>{nome ? emojis[nome] : unicode}</Text>
}

export default Emoji
