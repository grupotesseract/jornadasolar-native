import React from 'react'
import { useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { theme } from '../../theme'
import EmojiComNome from './EmojiComNome'

interface ItemProps {
  nome: string
  emojiUnicode: string
  onPress: (value: string) => void
}

const SentimentoCheckbox = ({ nome, emojiUnicode, onPress }: ItemProps) => {
  const [isChecked, setIsChecked] = useState(false)

  const handlePress = () => {
    setIsChecked(!isChecked)
    onPress(nome)
  }

  return (
    <Pressable
      style={[styles.botao, isChecked && styles.botaoSelecionado]}
      onPress={handlePress}
    >
      <EmojiComNome
        nome={nome}
        unicode={emojiUnicode}
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
