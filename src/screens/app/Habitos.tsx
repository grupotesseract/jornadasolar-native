import { logEvent } from 'expo-firebase-analytics'
import React, { useContext, useState, useEffect } from 'react'
import EdicaoDiario from '../../components/EdicaoDiario'
import GrupoDeHabitosCheckboxGroup from '../../components/GrupoDeHabitosCheckboxGroup'
import Loading from '../../components/Loading'
import AuthContext from '../../context/AuthContext'
import { IGrupoDeHabitos } from '../../entities/GrupoDeHabitos'
import useRegistroByDate from '../../hooks/useRegistroByDate'
import { DiaNavigationProps } from '../../routes/App.routes'
import CreateOrUpdateRegistro from '../../services/registros/CreateOrUpdateRegistro'
import { getGruposDeHabitosTemplate } from '../../utils/getGruposDeHabitos'

const Habitos = ({ navigation, route }: DiaNavigationProps) => {
  const dia = new Date(route.params.data)
  const { userId } = useContext(AuthContext)
  const [itensSelecionados, setItensSelecionados] = useState<IGrupoDeHabitos[]>(
    []
  )
  const [template, setTemplate] = useState<IGrupoDeHabitos[]>([])

  const onSalvarClick = async () => {
    await new CreateOrUpdateRegistro().call({
      id: registroDoDia?.id,
      date: dia,
      userId,
      gruposDeHabitos: itensSelecionados
    })
    logEvent('add_habitos')
  }

  const { loading, registroDoDia } = useRegistroByDate({
    userId,
    date: dia,
    focus: true
  })
  useEffect(() => {
    const getTemplate = async () => {
      const selecaoVazia = await getGruposDeHabitosTemplate(userId)
      setTemplate(selecaoVazia)
    }
    getTemplate()
  }, [])

  useEffect(() => {
    const habitosAnteriores = registroDoDia?.gruposDeHabitos.length
      ? registroDoDia?.gruposDeHabitos
      : template
    setItensSelecionados(habitosAnteriores)
  }, [registroDoDia])

  const handleChangeSelected = (selecionados: IGrupoDeHabitos[]) => {
    setItensSelecionados(selecionados)
  }

  return (
    <EdicaoDiario navigation={navigation} data={dia} onSalvar={onSalvarClick}>
      {loading ? (
        <Loading />
      ) : (
        <GrupoDeHabitosCheckboxGroup
          onChangeSelection={handleChangeSelected}
          userId={userId}
          gruposSelecionados={itensSelecionados}
        />
      )}
    </EdicaoDiario>
  )
}

export default Habitos
