import { useFocusEffect } from '@react-navigation/core'
import { addMonths, isThisMonth } from 'date-fns'
import { t } from 'i18n-js'
import React, { useContext, useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import Container from '../../components/Container'
import DateNavigator from '../../components/DateNavigator'
import GraficoHabitos from '../../components/graficos/GraficoHabitos'
import GraficoSentimentos from '../../components/graficos/GraficoSentimentos'
import Loading from '../../components/Loading'
import ToggleButton from '../../components/graficos/ToggleButton'
import AuthContext from '../../context/AuthContext'
import useRegistrosByMonth from '../../hooks/useRegistrosByMonth'

const Graficos = () => {
  const { userId } = useContext(AuthContext)
  const [isFocused, setIsFocused] = useState(true)
  const [mes, setMes] = useState(new Date())
  const [currentTab, setCurrentTab] = useState('sentimentos')
  const handleChangeMes = (novoMes: Date) => {
    setMes(novoMes)
  }

  const { loading, diarios } = useRegistrosByMonth({
    userId,
    mes,
    focus: isFocused
  })

  useFocusEffect(
    React.useCallback(() => {
      setIsFocused(true)
      return () => setIsFocused(false)
    }, [])
  )

  const botoes = [
    {
      textoBotao: t('graficos.emocoes'),
      onPress: () => setCurrentTab('sentimentos'),
      value: 'sentimentos'
    },
    {
      textoBotao: t('graficos.habitos'),
      onPress: () => setCurrentTab('habitos'),
      value: 'habitos'
    }
  ]

  const Graficos = () => {
    if (currentTab === 'sentimentos') {
      return <GraficoSentimentos diarios={diarios} mesAtual={mes} />
    }
    return <GraficoHabitos diarios={diarios} mesAtual={mes} />
  }

  return (
    <ScrollView>
      <Container>
        <View style={styles.monthNavigator}>
          <DateNavigator
            date={mes}
            onChange={handleChangeMes}
            alteraData={addMonths}
            isUltimoPasso={isThisMonth}
            formatoData="MMMM, yyyy"
          />
        </View>
        <View style={styles.tabs}>
          <ToggleButton botoes={botoes} checked={currentTab} />
          {loading ? <Loading /> : <Graficos />}
        </View>
      </Container>
    </ScrollView>
  )
}

export default Graficos

const styles = StyleSheet.create({
  monthNavigator: {
    marginTop: 16
  },
  tabs: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 32
  }
})
