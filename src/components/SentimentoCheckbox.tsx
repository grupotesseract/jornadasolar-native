import React from 'react'
import { useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { theme } from '../../theme'
import EmojiComNome from './EmojiComNome'
import Sentimento, { ISentimento } from '../entities/Sentimento'

interface ItemProps {
  sentimento: Sentimento
  onPress: (sentimento: ISentimento) => void
}

const SentimentoCheckbox = ({ sentimento, onPress }: ItemProps) => {
  const [isChecked, setIsChecked] = useState(false)

  const handlePress = () => {
    setIsChecked(!isChecked)
    onPress(sentimento)
  }

  return (
    <Pressable
      style={[styles.botao, isChecked && styles.botaoSelecionado]}
      onPress={handlePress}
    >
      <EmojiComNome
        nome={sentimento.nome}
        emoji={sentimento.emoji}
        textStyle={
          isChecked ? styles.textoCheckboxSelecionado : styles.textoCheckbox
        }
      />
    </Pressable>
  )
}

export default SentimentoCheckbox

const styles = StyleSheet.create({
  botao: {
    margin: 6,
    borderWidth: 2,
    borderRadius: 100,
    padding: 8,
    borderColor: theme.colors.placeholder,
    flexGrow: 1,
    alignItems: 'center'
  },
  botaoSelecionado: {
    borderColor: theme.colors.primary
  },
  textoCheckbox: { fontSize: 20 },
  textoCheckboxSelecionado: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})
