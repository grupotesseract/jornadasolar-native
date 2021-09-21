import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { IGrupoDeHabitos } from '../entities/GrupoDeHabitos'
import { IHabito } from '../entities/Habito'
import { Card, Text } from 'react-native-paper'
import HabitoCheckbox from './HabitoCheckbox'
import TextButton from './TextButton'
import { t } from 'i18n-js'
import ModalEdicao, { IItemEdicao } from './ModalEdicao'
import CreateUserHabitos from '../services/user/CreateUserHabito'
import UpdateUserHabitos from '../services/user/UpdateUserHabito'
import {
  atualizacaoSucesso,
  atualizacaoFalha,
  criacaoFalha
} from '../utils/mensagensAlerta'
import AlertContext from '../context/AlertContext'
import BotaoNovoHabito from './BotaoNovoHabito'

interface Props {
  grupoDeHabitos: IGrupoDeHabitos
  onChange: (selecao: IGrupoDeHabitos) => void
  grupoHabitosSelecionados?: IGrupoDeHabitos
  onHabitoAtualizado?: (IItemEdicao) => Promise<void>
  userId?: string
}

const GrupoDeHabitosCheckbox = ({
  grupoDeHabitos,
  onChange,
  grupoHabitosSelecionados,
  onHabitoAtualizado,
  userId
}: Props) => {
  const [habitosSelecionados, setHabitosSelecionados] = useState<IHabito[]>([])
  const [isEmEdicao, setIsEmEdicao] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [habitoEdicao, setHabitoEdicao] = useState<IItemEdicao>(null)

  const { displayAlert } = useContext(AlertContext)
  useEffect(() => {
    setHabitosSelecionados(
      grupoHabitosSelecionados?.habitos || habitosSelecionados
    )
  }, [grupoHabitosSelecionados])

  const handlePressHabito = (habito: IHabito, wasChecked: boolean) => {
    let novoGrupo = { ...grupoHabitosSelecionados }
    if (wasChecked) {
      const novosSelecionados = habitosSelecionados.filter(
        selecionado => habito.id !== selecionado.id
      )
      novoGrupo.habitos = novosSelecionados
    } else {
      novoGrupo.habitos = [...habitosSelecionados, habito]
    }

    onChange(novoGrupo)
  }

  const toggleEmEdicao = () => {
    setIsEmEdicao(!isEmEdicao)
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }
  const handleStartEdit = (habito?: IHabito) => {
    const item: IItemEdicao = {
      ...habito,
      emoji: habito?.emoji,
      idGrupo: grupoDeHabitos.id
    }
    setHabitoEdicao(item)
    toggleModal()
  }

  const handleConfirmarEdicao = async (item: IItemEdicao) => {
    if (item.id) {
      onHabitoAtualizado(item)
      new UpdateUserHabitos(userId, item.idGrupo)
        .call(item)
        .then(() => {
          displayAlert(atualizacaoSucesso(t('edicao.habito')))
        })
        .catch(() => {
          displayAlert(atualizacaoFalha(t('edicao.habito')))
        })
    } else {
      setIsLoading(true)
      new CreateUserHabitos(userId, item.idGrupo).call(item).then(() => {
        onHabitoAtualizado(item)
          .then(() => {
            setIsLoading(false)
          })
          .catch(() => {
            displayAlert(criacaoFalha(t('edicao.habito')))
          })
      })
    }
  }

  return (
    <Card style={styles.cardGruposDeHabitos}>
      <Card.Content>
        <Text style={styles.tituloCard}>{grupoDeHabitos.nome}</Text>
        <View style={styles.botaoEditar}>
          <TextButton
            texto={isEmEdicao ? t('comum.concluir') : t('comum.editar')}
            onPress={toggleEmEdicao}
          />
        </View>
        <View style={styles.habitosDoGrupo}>
          {grupoDeHabitos.habitos.map(habito => (
            <HabitoCheckbox
              key={habito.nome}
              habito={habito}
              onPress={handlePressHabito}
              onPressLabel={handleStartEdit}
              isEmEdicao={isEmEdicao}
              isChecked={habitosSelecionados.some(
                selecionado => habito.id === selecionado.id
              )}
            />
          ))}
          {grupoDeHabitos.habitos.length < 6 && (
            <BotaoNovoHabito onPress={handleStartEdit} loading={isLoading} />
          )}
        </View>
      </Card.Content>
      <ModalEdicao
        isOpen={isModalOpen}
        itemEdicao={habitoEdicao}
        onConfirma={handleConfirmarEdicao}
        onFecha={toggleModal}
        labelNome={t('edicao.habito')}
      />
    </Card>
  )
}

export default GrupoDeHabitosCheckbox

const styles = StyleSheet.create({
  cardGruposDeHabitos: {
    marginBottom: 10
  },
  tituloCard: {
    marginBottom: 14,
    textTransform: 'capitalize',
    alignSelf: 'center'
  },
  habitosDoGrupo: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  botaoEditar: {
    position: 'absolute',
    top: 16,
    right: 12
  }
})
