import { format } from 'date-fns'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { dateLocale } from '../i18n'

interface Props {
  date: Date
  onChange: (Date) => void
  alteraData: (Date, number) => void
  isUltimoPasso: (Date) => boolean
  formatoData: string
}

const DateNavigator = ({
  date,
  onChange,
  alteraData,
  isUltimoPasso,
  formatoData
}: Props) => {
  const handleVoltar = () => {
    const novaData = alteraData(date, -1)
    onChange(novaData)
  }

  const handleProximo = () => {
    const novaData = alteraData(date, 1)
    onChange(novaData)
  }

  return (
    <View style={styles.container}>
      <IconButton icon="chevron-left" onPress={handleVoltar} testID="botaoVoltar" accessibilityLabel="botaoVoltar" />
      <Text style={styles.nomeMes}>
        {format(date, formatoData, { locale: dateLocale })}
      </Text>
      <IconButton
        icon="chevron-right"
        onPress={handleProximo}
        testID="botaoProximo"
        accessibilityLabel="botaoProximo"
        disabled={isUltimoPasso(date)}
      />
    </View>
  )
}

export default DateNavigator

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  nomeMes: {
    textTransform: 'lowercase'
  }
})
