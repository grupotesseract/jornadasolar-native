import React, { ReactNode, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../../theme'
import i18n from '../i18n'

interface Props {
  nome: string
}

const Saudacao = ({ nome }: Props) => {
  const { t } = i18n
  const [saudacao, setSaudacao] = useState(null)

  useEffect(() => {
    const hora = new Date().getHours()
    if (hora >= 6 && hora <= 12) {
      setSaudacao('bomDia')
    } else if (hora > 12 && hora <= 18) {
      setSaudacao('boaTarde')
    } else {
      setSaudacao('boaNoite')
    }
  }, [])

  return (
    <Text style={styles.titulo}>
      {t(`diario.${saudacao}`)}, {nome}
    </Text>
  )
}

export default Saudacao

const styles = StyleSheet.create({
  titulo: {
    fontFamily: 'NunitoSans_900Black',
    color: theme.colors.secondary,
    textAlign: 'center',
    paddingTop: 22,
    fontSize: 24,
    lineHeight: 33
  }
})
