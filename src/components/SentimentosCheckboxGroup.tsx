import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import getSentimentosIniciais from '../utils/getSentimentosIniciais'
import SentimentoCheckbox from './SentimentoCheckbox'

interface Props {
  onChange: (selecionados: string[]) => void
}

const SentimentosCheckboxGroup = ({ onChange }: Props) => {
  const opcoes = getSentimentosIniciais()
  const [itensSelecionados, setItensSelecionados] = useState<string[]>([])

  const handleChangeSelected = (item: string) => {
    if (itensSelecionados.includes(item)) {
      const novosSelecionados = itensSelecionados.filter(i => i !== item)
      setItensSelecionados(novosSelecionados)
    } else {
      setItensSelecionados([...itensSelecionados, item])
    }
  }

  useEffect(() => {
    onChange(itensSelecionados)
  }, [itensSelecionados])

  return (
    <View style={styles.sentimentos}>
      {opcoes.map(opcao => (
        <SentimentoCheckbox
          key={opcao.nome}
          nome={opcao.nome}
          emojiUnicode={opcao.emoji}
          onPress={handleChangeSelected}
        />
      ))}
    </View>
  )
}

export default SentimentosCheckboxGroup

const styles = StyleSheet.create({
  sentimentos: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})
