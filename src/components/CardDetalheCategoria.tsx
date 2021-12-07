import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, Text } from 'react-native-paper'
import { IHabito } from '../entities/Habito'
import { ISentimento } from '../entities/Sentimento'
import Categorias from '../enums/Categorias'
import i18n from '../i18n'
import EmojiComNome from './EmojiComNome'
import TextButton from './TextButton'
import { format } from 'date-fns'

interface Props {
  navigation: any
  categoria: Categorias
  conteudo?: ISentimento[] | IHabito[] | string | null
  data: Date
}

const CardDetalheCategoria = ({
  conteudo,
  navigation,
  categoria,
  data
}: Props) => {
  const { t } = i18n

  const sentimentos =
    categoria === Categorias.Sentimentos ? (conteudo as ISentimento[]) : null
  const habitos =
    categoria === Categorias.Habitos ? (conteudo as IHabito[]) : null
  const anotacoes =
    categoria === Categorias.Anotacoes ? (conteudo as string) : null

  const handleEditar = () => {
    navigation.navigate(categoria, { data: format(data, 'd-M-yyyy') })
  }

  const ConteudoSentimentos = sentimentos ? (
    <Text>
      {sentimentos?.map((sentimento, index) => (
        <Text key={`sentimento-${index}`}>
          <EmojiComNome nome={sentimento.nome} emoji={sentimento.emoji} />
          {index === sentimentos.length - 1 ? null : ', '}
        </Text>
      ))}
    </Text>
  ) : null

  const ConteudoHabitos = habitos ? (
    <View style={styles.habitos}>
      {habitos?.map((habito, index) => (
        <View key={`habito-${index}`} style={styles.habito}>
          <EmojiComNome nome={habito.nome} emoji={habito.emoji} />
        </View>
      ))}
    </View>
  ) : null

  const ConteudoAnotacoes = anotacoes ? <Text>{anotacoes}</Text> : null

  const ConteudoCard = () => {
    if (categoria === Categorias.Sentimentos) {
      return ConteudoSentimentos
    }
    if (categoria === Categorias.Habitos) {
      return ConteudoHabitos
    }
    if (categoria === Categorias.Anotacoes) {
      return ConteudoAnotacoes
    }
  }

  return (
    <View>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.header}>
            <Text>{t(`comum.${categoria.toLowerCase()}`)}:</Text>
            <TextButton texto={t('comum.editar')} onPress={handleEditar} testID="testID" />
          </View>
          <View style={styles.conteudo}>
            <ConteudoCard />
          </View>
        </Card.Content>
      </Card>
    </View>
  )
}

export default CardDetalheCategoria

const styles = StyleSheet.create({
  habitos: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  habito: {
    width: '50%'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  card: {
    marginVertical: 10,
    minHeight: 100
  },
  conteudo: {
    paddingVertical: 16
  }
})
