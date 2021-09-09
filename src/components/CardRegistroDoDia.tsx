import { format } from 'date-fns'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Caption, Card, Text } from 'react-native-paper'
import { IRegistro } from '../entities/Registro'
import Categorias from '../enums/Categorias'
import i18n, { dateLocale } from '../i18n'
import Categoria from './Categoria'
import EmojiComNome from './EmojiComNome'
import TextButton from './TextButton'

interface Props {
  navigation: any
  diario: IRegistro
}

const CardRegistroDoDia = ({ diario, navigation }: Props) => {
  const { t } = i18n

  const sentimentos = diario.sentimentos?.length ? diario.sentimentos : null
  const habitos = diario.gruposDeHabitos?.some(grupo => grupo.habitos.length)
    ? diario.gruposDeHabitos?.map(grupo => grupo.habitos).flat()
    : null

  const handleVerMais = () => {
    navigation.navigate('Dia', { data: diario.date.toDateString() })
  }

  const handleSentimentos = () => {
    navigation.navigate('Sentimentos')
  }
  const handleHabitos = () => {
    navigation.navigate('Habitos')
  }
  const handleAnotacoes = () => {
    navigation.navigate('Anotacoes')
  }

  const ConteudoSentimentos = sentimentos ? (
    <Text numberOfLines={1}>
      {sentimentos?.map((sentimento, index) => (
        <Text key={`sentimento-${index}`}>
          <EmojiComNome nome={sentimento.nome} emoji={sentimento.emoji} />
          {index === sentimentos.length - 1 ? null : ', '}
        </Text>
      ))}
    </Text>
  ) : null

  const ConteudoHabitos = habitos ? (
    <Text numberOfLines={1}>
      {habitos?.map((habito, index) => (
        <Text key={`habito-${index}`}>
          <EmojiComNome nome={habito.nome} emoji={habito.emoji} />
          {index === habitos.length - 1 ? null : ', '}
        </Text>
      ))}
    </Text>
  ) : null

  const ConteudoAnotacoes = diario.anotacoes ? (
    <Text numberOfLines={1}>{diario.anotacoes}</Text>
  ) : null

  return (
    <View>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.header}>
            <Caption style={styles.data}>
              {format(diario.date, t('comum.formatoDataExtenso'), {
                locale: dateLocale
              })}
            </Caption>
            <TextButton texto={t('diario.verMais')} onPress={handleVerMais} />
          </View>
          <Categoria
            categoria={Categorias.Sentimentos}
            conteudo={ConteudoSentimentos}
            onPress={handleSentimentos}
          />
          <Categoria
            categoria={Categorias.Habitos}
            conteudo={ConteudoHabitos}
            onPress={handleHabitos}
          />
          <Categoria
            categoria={Categorias.Anotacoes}
            conteudo={ConteudoAnotacoes}
            onPress={handleAnotacoes}
          />
        </Card.Content>
      </Card>
    </View>
  )
}

export default CardRegistroDoDia

const styles = StyleSheet.create({
  data: {
    textTransform: 'uppercase'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  card: {
    marginVertical: 10
  },
  itens: {
    fontWeight: 'bold'
  }
})
