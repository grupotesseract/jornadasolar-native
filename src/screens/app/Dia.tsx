import React, { useContext, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { addDays, isToday, parse } from 'date-fns'
import { DiaNavigationProps } from '../../routes/App.routes'
import BotaoVoltar from '../../components/BotaoVoltar'
import CardDetalheCategoria from '../../components/CardDetalheCategoria'
import Container from '../../components/Container'
import DateNavigator from '../../components/DateNavigator'
import Loading from '../../components/Loading'
import AuthContext from '../../context/AuthContext'
import Categorias from '../../enums/Categorias'
import useRegistroByDate from '../../hooks/useRegistroByDate'
import { useFocusEffect } from '@react-navigation/native'
import { t } from 'i18n-js'
import { View } from 'react-native'
import Novidade from '../../components/Novidade'
import Telas from '../../enums/Telas'

const Dia = ({ navigation, route }: DiaNavigationProps) => {
  const { data } = route.params
  const { userId } = useContext(AuthContext)
  const [dia, setDia] = useState(parse(data, 'd-M-yyyy', new Date()))
  const [isFocused, setIsFocused] = useState(true)

  const { loading, registroDoDia } = useRegistroByDate({
    userId,
    date: dia,
    focus: isFocused
  })

  useFocusEffect(
    React.useCallback(() => {
      setIsFocused(true)
      return () => setIsFocused(false)
    }, [])
  )
  const habitos = registroDoDia?.gruposDeHabitos
    ?.map(grupo => grupo.habitos)
    .flat()

  const handleChangeDia = (novoDia: Date) => {
    setDia(novoDia)
  }

  return (
    <Container>
      <ScrollView>
        <BotaoVoltar destino="Diario" />
        <View style={{ marginTop: 24 }}>
          <DateNavigator
            date={dia}
            onChange={handleChangeDia}
            alteraData={addDays}
            isUltimoPasso={isToday}
            formatoData={t('comum.formatoDataExtenso')}
          />
        </View>
        <Novidade path={Telas.Dia} isFocused={isFocused} />

        {loading ? (
          <Loading />
        ) : (
          <>
            <CardDetalheCategoria
              navigation={navigation}
              categoria={Categorias.Sentimentos}
              conteudo={registroDoDia?.sentimentos}
              data={dia}
            />
            <CardDetalheCategoria
              navigation={navigation}
              categoria={Categorias.Habitos}
              conteudo={habitos}
              data={dia}
            />
            <CardDetalheCategoria
              navigation={navigation}
              categoria={Categorias.Anotacoes}
              conteudo={registroDoDia?.anotacoes}
              data={dia}
            />
          </>
        )}
      </ScrollView>
    </Container>
  )
}

export default Dia
