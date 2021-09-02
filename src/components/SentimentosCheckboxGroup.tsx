import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import Sentimento, { ISentimento } from '../entities/Sentimento'
import getSentimentosIniciais from '../utils/getSentimentosIniciais'
import SentimentoCheckbox from './SentimentoCheckbox'

interface Props {
  onChange: (selecionados: string[]) => void
}

const SentimentosCheckboxGroup = ({ onChange }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [idsSelecionados, setIdsSelecionados] = useState<string[]>([])
  const [opcoes, setOpcoes] = useState<Sentimento[]>([])

  useEffect(() => {
    const getSentimentos = async () => {
      setIsLoading(true)
      setOpcoes(await getSentimentosIniciais())
      setIsLoading(false)
    }
    getSentimentos()
  }, [])

  const handleChangeSelected = (item: ISentimento) => {
    if (idsSelecionados.some(selecionado => selecionado === item.id)) {
      const novosSelecionados = idsSelecionados.filter(i => i !== item.id)
      setIdsSelecionados(novosSelecionados)
    } else {
      setIdsSelecionados([...idsSelecionados, item.id])
    }
  }

  useEffect(() => {
    onChange(idsSelecionados)
  }, [idsSelecionados])

  return (
    <View style={styles.sentimentos}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        opcoes.map(opcao => (
          <SentimentoCheckbox
            key={opcao.nome}
            sentimento={opcao}
            onPress={handleChangeSelected}
          />
        ))
      )}
    </View>
  )
}

export default SentimentosCheckboxGroup

const styles = StyleSheet.create({
  sentimentos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
})
