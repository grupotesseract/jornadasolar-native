import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { format } from 'date-fns'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, Text } from 'react-native-paper'
import { IRegistro } from '../entities/Registro'
import Categorias from '../enums/Categorias'
import i18n from '../i18n'
import { AppStackParams } from '../routes/App.routes'
import Categoria from './Categoria'
import EmojiComNome from './EmojiComNome'
import TextButton from './TextButton'

interface Props {
  navigation: NativeStackNavigationProp<AppStackParams, 'Abas'>
  diario: IRegistro
  loading?: boolean
}

const CardRegistroDoDia = ({
  diario,
  navigation,
  loading = false
}: Props): React.ReactElement => {
  const { t } = i18n
  const data = format(diario.date, 'd-M-yyyy')
  const sentimentos = diario.sentimentos?.length ? diario.sentimentos : null
  const habitos = diario.gruposDeHabitos?.some(grupo => grupo.habitos.length)
    ? diario.gruposDeHabitos?.map(grupo => grupo.habitos).flat()
    : null

  const handleVerMais = () => {
    navigation.navigate('Dia', { data })
  }

  const handleSentimentos = () => {
    navigation.navigate('Sentimentos', { data })
  }
  const handleHabitos = () => {
    navigation.navigate('Habitos', { data })
  }
  const handleAnotacoes = () => {
    navigation.navigate('Anotacoes', { data })
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
          <Categoria
            categoria={Categorias.Sentimentos}
            conteudo={ConteudoSentimentos}
            onPress={handleSentimentos}
            loading={loading}
            testID="preencheSentimentos"
          />
          <Categoria
            categoria={Categorias.Habitos}
            conteudo={ConteudoHabitos}
            onPress={handleHabitos}
            loading={loading}
            testID="preencheHabitos"
          />
          <Categoria
            categoria={Categorias.Anotacoes}
            conteudo={ConteudoAnotacoes}
            onPress={handleAnotacoes}
            loading={loading}
            testID="preencheAnotacoes"
          />
        </Card.Content>
        <View style={styles.footer}>
          <TextButton texto={t('diario.verMais')} onPress={handleVerMais} />
        </View>
      </Card>
    </View>
  )
}

export default CardRegistroDoDia

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    marginVertical: 12
  },
  card: {
    marginVertical: 10
  }
})
