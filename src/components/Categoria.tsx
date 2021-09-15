import React, { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import i18n from '../i18n'
import Emoji from './Emoji'
import TextButton from './TextButton'

interface Props {
  tipo: 'sentimentos' | 'habitos' | 'anotacoes'
  onPress: () => void
  conteudo?: ReactNode
}

const Categoria = ({ tipo, conteudo, onPress }: Props) => {
  const BotaoPreencher = () => {
    return (
      <>
        <View style={styles.emoji}>
          <Emoji nome="lapis" />
        </View>
        <TextButton texto={t(`diario.${tipo}`)} onPress={onPress} />
      </>
    )
  }

  const { t } = i18n

  return (
    <View style={styles.linha}>
      <Text style={styles.itens}>{t(`comum.${tipo}`)}:</Text>
      <View style={styles.conteudo}>
        {conteudo ? conteudo : <BotaoPreencher />}
      </View>
    </View>
  )
}

export default Categoria

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    paddingVertical: 12
  },
  itens: {
    fontFamily: 'NunitoSans_600SemiBold',
    fontSize: 14
  },
  emoji: { paddingEnd: 8 },
  conteudo: { paddingStart: 8, flexDirection: 'row', flex: 1 }
})
