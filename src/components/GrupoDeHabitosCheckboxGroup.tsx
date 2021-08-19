import React, { useState } from 'react'
import { useEffect } from 'react'
import { View } from 'react-native'
import { IGrupoDeHabitos } from '../entities/GrupoDeHabitos'
import {
  getGruposDeHabitosIniciais,
  getGruposDeHabitosTemplate
} from '../utils/getGruposDeHabitos'
import GrupoDeHabitosCheckbox from './GrupoDeHabitosCheckbox'

interface Props {
  onChangeSelection: (selecionados: IGrupoDeHabitos[]) => void
}

const GrupoDeHabitosCheckboxGroup = ({ onChangeSelection }: Props) => {
  const gruposDeHabitos = getGruposDeHabitosIniciais()
  const [gruposSelecionados, setGruposSelecionados] = useState<
    Array<IGrupoDeHabitos>
  >([])

  useEffect(() => {
    const template = getGruposDeHabitosTemplate()
    setGruposSelecionados(template)
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
      {gruposDeHabitos.map(grupo => (
        <GrupoDeHabitosCheckbox
          key={grupo.nome}
          grupoDeHabitos={grupo}
          onChange={handleChangeGrupo}
        />
      ))}
    </View>
  )
}

export default GrupoDeHabitosCheckboxGroup
