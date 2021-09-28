import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/AuthContext'
import useRegistroByDate from '../../hooks/useRegistroByDate'
import CreateOrUpdateRegistro from '../../services/registros/CreateOrUpdateRegistro'
import { DiaNavigationProps } from '../../routes/App.routes'
import { logEvent } from 'expo-firebase-analytics'
import Loading from '../../components/Loading'
import EdicaoDiario from '../../components/EdicaoDiario'
import SentimentosCheckboxGroup from '../../components/SentimentosCheckboxGroup'

const Sentimentos = ({ navigation, route }: DiaNavigationProps) => {
  const dia = new Date(route.params.data)
  const { userId } = useContext(AuthContext)
  const { loading, registroDoDia } = useRegistroByDate({
    userId,
    date: dia,
    focus: true
  })
  const [itensSelecionados, setItensSelecionados] = useState<string[]>([])

  const handleChangeSelected = (selecionados: string[]) => {
    setItensSelecionados(selecionados)
  }

  useEffect(() => {
    const sentimentosAnteriores = registroDoDia?.sentimentos?.map(
      sentimento => sentimento.id
    )
    setItensSelecionados(sentimentosAnteriores || [])
  }, [registroDoDia])

  const onSalvarClick = async () => {
    await new CreateOrUpdateRegistro().call({
      id: registroDoDia?.id,
      date: dia,
      userId,
      sentimentos: itensSelecionados
    })
    logEvent('add_sentimentos')
  }

  return (
    <EdicaoDiario navigation={navigation} data={dia} onSalvar={onSalvarClick}>
      {loading ? (
        <Loading />
      ) : (
        <SentimentosCheckboxGroup
          idsSelecionados={itensSelecionados}
          userId={userId}
          onChange={handleChangeSelected}
        />
      )}
    </EdicaoDiario>
  )
}

export default Sentimentos
