import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Loading from './Loading'
import Sentimento, { ISentimento } from '../entities/Sentimento'
import getSentimentosIniciais from '../utils/getSentimentosIniciais'
import SentimentoCheckbox from './SentimentoCheckbox'

interface Props {
  onChange: (selecionados: string[]) => void
  userId?: string
  idsSelecionados: string[]
}

const SentimentosCheckboxGroup = ({
  onChange,
  userId = null,
  idsSelecionados = []
}: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [opcoes, setOpcoes] = useState<Sentimento[]>([])

  useEffect(() => {
    const getSentimentos = async () => {
      setIsLoading(true)
      setOpcoes(await getSentimentosIniciais(userId))
      setIsLoading(false)
    }
    getSentimentos()
  }, [])

  const handleChangeSelected = (item: ISentimento) => {
    if (idsSelecionados.some(selecionado => selecionado === item.id)) {
      const novosSelecionados = idsSelecionados.filter(i => i !== item.id)
      onChange(novosSelecionados)
    } else {
      onChange([...idsSelecionados, item.id])
    }
  }

  return (
    <View style={styles.sentimentos}>
      {isLoading ? (
        <Loading />
      ) : (
        opcoes.map(opcao => (
          <SentimentoCheckbox
            key={opcao.nome}
            sentimento={opcao}
            onPress={handleChangeSelected}
            checked={idsSelecionados.includes(opcao.id)}
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
