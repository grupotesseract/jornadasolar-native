import React, { useState } from 'react'
import { useEffect } from 'react'
import { View } from 'react-native'
import { IGrupoDeHabitos } from '../entities/GrupoDeHabitos'
import { getGruposDeHabitosIniciais } from '../utils/getGruposDeHabitos'
import GrupoDeHabitosCheckbox from './GrupoDeHabitosCheckbox'
import Loading from './Loading'

interface Props {
  onChangeSelection: (selecionados: IGrupoDeHabitos[]) => void
  userId?: string
  gruposSelecionados: IGrupoDeHabitos[]
}

const GrupoDeHabitosCheckboxGroup = ({
  onChangeSelection,
  userId,
  gruposSelecionados
}: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [opcoes, setOpcoes] = useState<IGrupoDeHabitos[]>([])
  useEffect(() => {
    const getGrupos = async () => {
      setIsLoading(true)

      const gruposModelo = await getGruposDeHabitosIniciais(userId)

      setOpcoes(gruposModelo)
      setIsLoading(false)
    }
    getGrupos()
  }, [])

  const handleChangeGrupo = (grupoAlterado: IGrupoDeHabitos) => {
    const novosSelecionados = gruposSelecionados.map(grupo => {
      if (grupo.id === grupoAlterado.id) {
        return grupoAlterado
      } else {
        return grupo
      }
    })
    onChangeSelection(novosSelecionados)
  }

  return (
    <View>
      {isLoading ? (
        <Loading />
      ) : (
        opcoes.map(grupo => (
          <GrupoDeHabitosCheckbox
            key={grupo.nome}
            grupoDeHabitos={grupo}
            onChange={handleChangeGrupo}
            grupoHabitosSelecionados={gruposSelecionados.find(
              grupoSelecionado => grupoSelecionado.id === grupo.id
            )}
          />
        ))
      )}
    </View>
  )
}

export default GrupoDeHabitosCheckboxGroup
