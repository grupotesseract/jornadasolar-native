import React, { ReactNode } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'
import Categorias from '../enums/Categorias'
import i18n from '../i18n'
import Emoji from './Emoji'
import TextButton from './TextButton'

interface Props {
  categoria: Categorias
  onPress: () => void
  conteudo?: ReactNode
  loading?: boolean
  testID?: string
}

const Categoria = ({
  categoria,
  conteudo,
  onPress,
  loading = false,
  testID
}: Props): React.ReactElement => {
  const tipo = categoria.toLowerCase()
  const BotaoPreencher = () => {
    return (
      <Text testID={testID} accessibilityLabel={testID}>
        <TextButton texto={t(`diario.${tipo}`)} onPress={onPress} />
      </Text>
    )
  }

  const { t } = i18n

  return (
    <View style={styles.linha}>
      <Text style={styles.itens}>{t(`comum.${tipo}`)}:</Text>
      <View style={styles.conteudo}>
        {(loading && <ActivityIndicator size={16} />) || conteudo || (
          <BotaoPreencher />
        )}
        <Pressable
          onPress={onPress}
          testID={testID}
          accessibilityLabel={testID}
        >
          <Emoji nome="lapis" />
        </Pressable>
      </View>
    </View>
  )
}

export default Categoria

const styles = StyleSheet.create({
  linha: {
    paddingVertical: 6
  },
  itens: {
    fontFamily: 'NunitoSans_600SemiBold'
  },
  emoji: { paddingEnd: 8 },
  conteudo: {
    paddingStart: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1
  }
})
