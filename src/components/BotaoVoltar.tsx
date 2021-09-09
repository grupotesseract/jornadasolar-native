import React from 'react'
import { StyleSheet, Pressable } from 'react-native'
import { Text } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { theme } from '../../theme'
import i18n from '../i18n'

interface Props {
  navigation: any
}

const BotaoVoltar = ({ navigation }: Props) => {
  const { t } = i18n
  const handlePress = () => {
    navigation.goBack()
  }
  return (
    <Pressable onPress={handlePress} style={styles.botao}>
      <MaterialCommunityIcons
        name="arrow-left"
        size={22}
        color={theme.colors.text}
      />
      <Text style={styles.texto}>{t('comum.voltar')}</Text>
    </Pressable>
  )
}

export default BotaoVoltar

const styles = StyleSheet.create({
  texto: {
    paddingLeft: 8
  },
  botao: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    marginLeft: 6
  }
})
