import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { getDaysInMonth, isThisMonth } from 'date-fns'
import EmptyState from './EmptyState'
import ProgressBar from './ProgressBar'

interface IListaComEmojis {
  nome: string
  emoji: string
}

interface IProps {
  registrosDoMes: Array<string>
  mesAtual: Date
  listaComEmojis: Array<IListaComEmojis>
  titulo: string
}

const GraficoBase: FC<IProps> = ({
  registrosDoMes,
  mesAtual,
  listaComEmojis,
  titulo
}) => {
  if (registrosDoMes?.length === 0) {
    return <EmptyState />
  }

  const groupByQuantidade = registro => {
    const quantidade = registrosDoMes.reduce((quantidade, registroAtual) => {
      if (registroAtual === registro) {
        return quantidade + 1
      }
      return quantidade
    }, 0)

    return [registro, quantidade]
  }

  const sortByQuantidadeENome = (
    [nomeA, quantidadeA],
    [nomeB, quantidadeB]
  ) => {
    if (quantidadeA === quantidadeB) {
      return nomeA.localeCompare(nomeB)
    }

    return quantidadeB - quantidadeA
  }

  const registrosAgrupados = [...new Set(registrosDoMes)]
    .map(groupByQuantidade)
    .sort(sortByQuantidadeENome)

  const diasNoMes = isThisMonth(mesAtual)
    ? mesAtual.getDate()
    : getDaysInMonth(mesAtual)

  return (
    <View>
      <Text style={styles.titulo}>{titulo}</Text>
      <View style={styles.container}>
        {registrosAgrupados.map(([registro, quantidade], index) => {
          const percentual = (quantidade * 100) / diasNoMes
          const itens = listaComEmojis.find(item => {
            const nomeDoRegistro =
              typeof registro === 'string' ? registro : registro?.nome
            return item.nome.toLowerCase() === nomeDoRegistro?.toLowerCase()
          })
          return (
            <ProgressBar
              key={index}
              completed={percentual}
              label={itens.nome}
              emoji={itens.emoji}
            />
          )
        })}
      </View>
    </View>
  )
}

export default GraficoBase

const styles = StyleSheet.create({
  titulo: {
    marginTop: 36
  },
  container: {
    marginVertical: 15,
    alignItems: 'center'
  }
})
