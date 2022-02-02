import React from 'react'
import { Text } from 'react-native-paper'

const emojis = {
  alegre: '\u{1F603}',
  wink: '\u{1F609}',
  lapis: '\u{270F}\u{FE0F}',
  perfil: '\u{1F464}',
  sino: '\u{1F514}',
  mundo: '\u{1F30E}',
  duvida: '\u{1F914}',
  sair: '\u{1F6AA}'
}

interface Props {
  nome?: keyof typeof emojis
  emoji?: string
}

const Emoji = ({ nome, emoji }: Props) => {
  return <Text>{nome ? emojis[nome] : emoji}</Text>
}

export default Emoji
