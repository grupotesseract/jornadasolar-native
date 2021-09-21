import React, { useState } from 'react'
import { useEffect } from 'react'
import { View } from 'react-native'
import { IGrupoDeHabitos } from '../entities/GrupoDeHabitos'
import { getGruposDeHabitosIniciais } from '../utils/getGruposDeHabitos'
import GrupoDeHabitosCheckbox from './GrupoDeHabitosCheckbox'
import Loading from './Loading'
import { IItemEdicao } from './ModalEdicao'

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

  const getGrupos = async () => {
    const gruposModelo = await getGruposDeHabitosIniciais(userId)
    setOpcoes(gruposModelo)
  }

  useEffect(() => {
    setIsLoading(true)
    getGrupos()
    setIsLoading(false)
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

  const atualizaHabito = (novosDados: IItemEdicao) => {
    const grupoAtualizado = opcoes.map(grupo => {
      if (grupo.id !== novosDados.idGrupo) {
        return grupo
      }
      const habitosAtualizados = grupo.habitos.map(habito => {
        if (habito.id !== novosDados.id) {
          return habito
        }
        return {
          ...habito,
          nome: novosDados.nome,
          emojiUnicode: novosDados.emojiUnicode,
          emoji: novosDados.emoji
        }
      })
      return { ...grupo, habitos: habitosAtualizados }
    })
    setOpcoes(grupoAtualizado)
  }

  const handleEdicaoHabito = async (novosDados: IItemEdicao) => {
    if (novosDados.id) {
      atualizaHabito(novosDados)
    } else {
      await getGrupos()
    }
  }

  return (
    <View>
      {isLoading ? (
        <Loading />
      ) : (
        opcoes.map(grupo => (
          <GrupoDeHabitosCheckbox
            userId={userId}
            key={grupo.nome}
            grupoDeHabitos={grupo}
            onChange={handleChangeGrupo}
            grupoHabitosSelecionados={gruposSelecionados.find(
              grupoSelecionado => grupoSelecionado.id === grupo.id
            )}
            onHabitoAtualizado={handleEdicaoHabito}
          />
        ))
      )}
    </View>
  )
}

export default GrupoDeHabitosCheckboxGroup
