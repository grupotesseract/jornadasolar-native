import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ISentimento } from '../entities/Sentimento'
import getSentimentosIniciais from '../utils/getSentimentosIniciais'
import SentimentoCheckbox from './SentimentoCheckbox'

interface Props {
  onChange: (selecionados: ISentimento[]) => void
}

const SentimentosCheckboxGroup = ({ onChange }: Props) => {
  const opcoes = getSentimentosIniciais()
  const [itensSelecionados, setItensSelecionados] = useState<ISentimento[]>([])

  const handleChangeSelected = (item: ISentimento) => {
    if (itensSelecionados.some(selecionado => selecionado.nome === item.nome)) {
      const novosSelecionados = itensSelecionados.filter(
        i => i.nome !== item.nome
      )
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
          sentimento={opcao}
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
