import { eachDayOfInterval, addDays } from 'date-fns'
import React, { useState, useContext, useRef, useEffect } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import CardRegistroDoDia from './CardRegistroDoDia'
import AuthContext from '../context/AuthContext'
import { AppStackParams } from '../routes/App.routes'
import useRegistroByDate from '../hooks/useRegistroByDate'
import DateListItem from './DateListItem'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Title } from 'react-native-paper'
import { t } from 'i18n-js'

interface Props {
  isFocused: boolean
  navigation: NativeStackNavigationProp<AppStackParams, 'Abas'>
}

const Registros = ({ isFocused, navigation }: Props): React.ReactElement => {
  const { userId } = useContext(AuthContext)
  const today = new Date()
  const [SelectedDate, setSelectedDate] = useState<Date>(today)
  const intervaloInicial = eachDayOfInterval({
    start: addDays(today, -30),
    end: addDays(today, 3)
  }).reverse()

  const [dias, setDias] = useState(intervaloInicial)

  const flatlistRef = useRef<FlatList<any>>()

  const { registroDoDia, loading } = useRegistroByDate({
    userId,
    date: SelectedDate,
    focus: isFocused
  })

  useEffect(() => {
    setSelectedDate(dias[3])
  }, [])

  useEffect(() => {
    flatlistRef.current.scrollToItem({ item: SelectedDate, viewPosition: 0.5 })
  }, [SelectedDate])

  const handleLoadDias = () => {
    const ultimoDia = dias[dias.length - 1]
    const novoIntervalo = eachDayOfInterval({
      start: addDays(ultimoDia, -31),
      end: addDays(ultimoDia, -1)
    }).reverse()

    setDias([...dias, ...novoIntervalo])
  }

  const Registro = () => {
    const diario = registroDoDia || {
      id: `diario-vazio`,
      date: SelectedDate,
      sentimentos: null,
      gruposDeHabitos: null,
      anotacoes: null
    }
    return (
      <CardRegistroDoDia
        loading={loading}
        navigation={navigation}
        diario={diario}
      />
    )
  }

  const handleSelectData = (data: Date) => {
    flatlistRef.current.scrollToItem({ item: data, viewPosition: 0.5 })
    setSelectedDate(data)
  }

  const renderItem = ({ item }) => (
    <DateListItem
      data={item}
      onPress={handleSelectData}
      selected={item === SelectedDate}
      disabled={item > today}
    />
  )

  return (
    <ScrollView>
      <View>
        <Title style={{ textAlign: 'center', marginTop: 50 }}>
          {t('diario.seusRegistros')}
        </Title>
      </View>
      <View style={styles.dateNavigator}>
        <FlatList
          data={dias}
          horizontal
          inverted
          onEndReached={handleLoadDias}
          onEndReachedThreshold={0.5}
          keyExtractor={({ index }) => index}
          ref={flatlistRef}
          renderItem={renderItem}
          onScrollToIndexFailed={error => {
            flatlistRef.current.scrollToOffset({
              offset: error.averageItemLength * error.index,
              animated: true
            })
            setTimeout(() => {
              if (dias.length !== 0 && flatlistRef.current !== null) {
                flatlistRef.current.scrollToIndex({
                  index: error.index,
                  animated: true,
                  viewPosition: 0.5
                })
              }
            }, 100)
          }}
        />
      </View>
      <View style={styles.conteudo}>
        <Registro />
      </View>
    </ScrollView>
  )
}

export default Registros

const styles = StyleSheet.create({
  conteudo: {
    width: '90%',
    alignSelf: 'center'
  },
  dateNavigator: {
    marginVertical: 16
  }
})
