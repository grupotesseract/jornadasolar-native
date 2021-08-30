import { format } from 'date-fns'
import { enUS, ptBR } from 'date-fns/locale'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Caption, Card, Text } from 'react-native-paper'
import i18n from '../i18n'
import { AppNavigationProps } from '../routes/App.routes'
import Categoria from './Categoria'
import Emoji from './Emoji'
import TextButton from './TextButton'

interface Props {
  data: Date
  navigation: any
}

const CardRegistroDoDia = ({ data, navigation }: Props) => {
  const { t, locale } = i18n
  const dateLocale = locale.startsWith('pt') ? ptBR : enUS

  const handleVerMais = () => {
    navigation.navigate('Dia', { data: data.toLocaleDateString() })
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
  return (
    <View>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.header}>
            <Caption style={styles.data}>
              {format(data, t('comum.formatoDataExtenso'), {
                locale: dateLocale
              })}
            </Caption>
            <TextButton texto={t('diario.verMais')} onPress={handleVerMais} />
          </View>
          <Categoria tipo="sentimentos" onPress={handleSentimentos} />
          <Categoria tipo="habitos" onPress={handleHabitos} />
          <Categoria tipo="anotacoes" onPress={handleAnotacoes} />
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
