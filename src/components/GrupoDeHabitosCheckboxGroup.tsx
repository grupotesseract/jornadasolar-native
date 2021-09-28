import React, { useState } from 'react'
import { useEffect } from 'react'
import { View } from 'react-native'
import { IGrupoDeHabitos } from '../entities/GrupoDeHabitos'
import GetAllGruposDeHabitosModelos from '../services/gruposDeHabitos/GetAllGruposDeHabitosModelos'
import { getGruposDeHabitosTemplate } from '../utils/getGruposDeHabitos'
import GrupoDeHabitosCheckbox from './GrupoDeHabitosCheckbox'
import Loading from './Loading'

interface Props {
  onChangeSelection: (selecionados: IGrupoDeHabitos[]) => void
  userId?: string
}

const GrupoDeHabitosCheckboxGroup = ({ onChangeSelection, userId }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [gruposDeHabitos, setGruposDeHabitos] = useState<IGrupoDeHabitos[]>([])
  const [gruposSelecionados, setGruposSelecionados] = useState<
    IGrupoDeHabitos[]
  >([])
  const isCadastro = !userId

  useEffect(() => {
    const tiraGrupoPersonalizado = (grupos: IGrupoDeHabitos[]) => {
      return grupos.filter(grupo => grupo.nome != 'Personalizados')
    }

    const getGrupos = async () => {
      setIsLoading(true)

      let template = await getGruposDeHabitosTemplate()
      let gruposModelo = await new GetAllGruposDeHabitosModelos().call()
      if (isCadastro) {
        template = tiraGrupoPersonalizado(template)
        gruposModelo = tiraGrupoPersonalizado(gruposModelo)
      }
      setGruposSelecionados(template)
      setGruposDeHabitos(gruposModelo)
      setIsLoading(false)
    }
    getGrupos()
  }, [])

  useEffect(() => {
    onChangeSelection(gruposSelecionados)
  }, [gruposSelecionados])

  const handleChangeGrupo = (grupoAlterado: IGrupoDeHabitos) => {
    const novosSelecionados = gruposSelecionados.map(grupo => {
      if (grupo.id === grupoAlterado.id) {
        return grupoAlterado
      } else {
        return grupo
      }
    })
    setGruposSelecionados(novosSelecionados)
  }

  return (
    <View>
      {isLoading ? (
        <Loading />
      ) : (
        gruposDeHabitos.map(grupo => (
          <GrupoDeHabitosCheckbox
            key={grupo.nome}
            grupoDeHabitos={grupo}
            onChange={handleChangeGrupo}
          />
        ))
      )}
    </View>
  )
}

export default GrupoDeHabitosCheckboxGroup
