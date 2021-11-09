import {
  addMonths,
  compareDesc,
  eachDayOfInterval,
  isEqual,
  isThisMonth,
  lastDayOfMonth,
  startOfDay,
  startOfMonth
} from 'date-fns'
import React, { useState } from 'react'
import { useContext } from 'react'
import { StyleSheet, View, Dimensions, Pressable } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'
import { theme } from '../../../theme'
import CardRegistroDoDia from '../../components/CardRegistroDoDia'
import DateNavigator from '../../components/DateNavigator'
import Loading from '../../components/Loading'
import Saudacao from '../../components/Saudacao'
import AuthContext from '../../context/AuthContext'
import useRegistrosByMonth from '../../hooks/useRegistrosByMonth'
import { t } from 'i18n-js'
import { AppNavigationProps } from '../../routes/App.routes'
import getFaseDaLua from '../../utils/getFaseDaLua'
import getSigno from '../../utils/getSigno'
import { useFocusEffect } from '@react-navigation/core'
import Novidade from '../../components/Novidade'
import Telas from '../../enums/Telas'
import RegistrarAcesso from '../../services/user/RegistrarAcesso'

const Diario = ({ navigation }: AppNavigationProps) => {
  const { userName, userId, user } = useContext(AuthContext)

  const [isFocused, setIsFocused] = useState(true)
  const [mes, setMes] = useState(new Date())
  const dias = eachDayOfInterval({
    start: startOfMonth(mes),
    end: isThisMonth(mes) ? new Date() : lastDayOfMonth(mes)
  })

  const signo = getSigno(new Date())
  const faseDaLua = getFaseDaLua(new Date())

  const { loading, diarios } = useRegistrosByMonth({
    userId,
    mes,
    focus: isFocused
  })

  useFocusEffect(
    React.useCallback(() => {
      new RegistrarAcesso().call(user)
      setIsFocused(true)
      return () => setIsFocused(false)
    }, [])
  )

  const handleChangeMes = (novoMes: Date) => {
    setMes(novoMes)
  }

  const registros = dias.sort(compareDesc).map((dia, index) => {
    let diario = diarios?.find(diario =>
      isEqual(startOfDay(diario.date), startOfDay(dia))
    )

    if (!diario) {
      diario = {
        id: `diario-${index}`,
        date: dia,
        sentimentos: null,
        gruposDeHabitos: null,
        anotacoes: null
      }
    }
    return (
      <CardRegistroDoDia navigation={navigation} diario={diario} key={index} />
    )
  })

  return (
    <ScrollView>
      <View style={styles.conteudo}>
        <View style={styles.topo}>
          <Saudacao nome={userName} />
          <Text style={styles.textoPreto}>
            {t('diario.mensagem.inicio')}
            <Text style={styles.negrito}>{t('diario.mensagem.sol')}</Text>{' '}
            {t('diario.mensagem.final', { signo, faseDaLua })}
          </Text>
          <View style={styles.oval}></View>
        </View>
        <View style={styles.monthNavigator}>
          <DateNavigator
            date={mes}
            onChange={handleChangeMes}
            alteraData={addMonths}
            isUltimoPasso={isThisMonth}
            formatoData="MMMM, yyyy"
          />
        </View>
        <Novidade path={Telas.Diario} isFocused={isFocused} />

        {loading ? <Loading /> : registros}
      </View>
    </ScrollView>
  )
}

export default Diario

const tela = Dimensions.get('screen').width
const corPreta = theme.colors.secondary
const styles = StyleSheet.create({
  topo: {
    position: 'relative'
  },
  oval: {
    backgroundColor: theme.colors.primary,
    width: tela,
    height: tela,
    borderBottomLeftRadius: tela,
    borderBottomRightRadius: tela,
    alignSelf: 'center',
    position: 'absolute',
    zIndex: -1,
    bottom: -25,
    transform: [{ scaleX: 1.5 }]
  },
  conteudo: {
    width: '90%',
    alignSelf: 'center'
  },
  textoPreto: {
    color: corPreta,
    textAlign: 'center',
    marginVertical: 14,
    fontSize: 16
  },
  negrito: {
    color: corPreta,
    fontWeight: 'bold'
  },
  monthNavigator: {
    paddingTop: 40,
    paddingBottom: 20
  }
})
