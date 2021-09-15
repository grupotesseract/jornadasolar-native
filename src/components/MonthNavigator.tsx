import { addMonths, isThisMonth } from 'date-fns'
import { format } from 'date-fns/esm'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { dateLocale } from '../i18n'

interface Props {
  mes: Date
  onChange: (Date) => void
}

const MonthNavigator = ({ mes, onChange }: Props) => {
  const handleVoltar = () => {
    const novoMes = addMonths(mes, -1)
    onChange(novoMes)
  }

  const handleProximo = () => {
    const novoMes = addMonths(mes, 1)
    onChange(novoMes)
  }

  return (
    <View style={styles.container}>
      <IconButton icon="chevron-left" onPress={handleVoltar} />
      <Text style={styles.nomeMes}>
        {format(mes, 'MMMM, yyyy', { locale: dateLocale })}
      </Text>
      <IconButton
        icon="chevron-right"
        onPress={handleProximo}
        disabled={isThisMonth(mes)}
      />
    </View>
  )
}

export default MonthNavigator

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
