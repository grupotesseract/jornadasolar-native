import React, { useContext, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { addDays, isToday } from 'date-fns'
import { DiaNavigationProps } from '../../routes/App.routes'
import BotaoVoltar from '../../components/BotaoVoltar'
import CardDetalheCategoria from '../../components/CardDetalheCategoria'
import Container from '../../components/Container'
import DateNavigator from '../../components/DateNavigator'
import Loading from '../../components/Loading'
import AuthContext from '../../context/AuthContext'
import Categorias from '../../enums/Categorias'
import useRegistroByDate from '../../hooks/useRegistroByDate'
import i18n from '../../i18n'

const Dia = ({ navigation, route }: DiaNavigationProps) => {
  const { data } = route.params
  const { userId } = useContext(AuthContext)
  const [dia, setDia] = useState(new Date(data))
  const { t } = i18n

  const { loading, registroDoDia } = useRegistroByDate({ userId, date: dia })

  const habitos = registroDoDia?.gruposDeHabitos
    ?.map(grupo => grupo.habitos)
    .flat()

  const handleChangeDia = (novoDia: Date) => {
    setDia(novoDia)
  }

  return (
    <Container>
      <ScrollView>
        <BotaoVoltar navigation={navigation} />
        <DateNavigator
          date={dia}
          onChange={handleChangeDia}
          alteraData={addDays}
          isUltimoPasso={isToday}
          formatoData={t('comum.formatoDataExtenso')}
        />
        {loading ? (
          <Loading />
        ) : (
          <>
            <CardDetalheCategoria
              navigation={navigation}
              categoria={Categorias.Sentimentos}
              conteudo={registroDoDia?.sentimentos}
            />
            <CardDetalheCategoria
              navigation={navigation}
              categoria={Categorias.Habitos}
              conteudo={habitos}
            />
            <CardDetalheCategoria
              navigation={navigation}
              categoria={Categorias.Anotacoes}
              conteudo={registroDoDia?.anotacoes}
            />
          </>
        )}
      </ScrollView>
    </Container>
  )
}

export default Dia
