import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Loading from './Loading'
import Sentimento, { ISentimento } from '../entities/Sentimento'
import getSentimentosIniciais from '../utils/getSentimentosIniciais'
import SentimentoCheckbox from './SentimentoCheckbox'
import { t } from 'i18n-js'
import ModalEdicao, { IItemEdicao } from './ModalEdicao'
import UpdateUserSentimentos from '../services/user/UpdateUserSentimento'
import AlertContext from '../context/AlertContext'
import CreateUserSentimentos from '../services/user/CreateUserSentimentos'
import {
  atualizacaoFalha,
  atualizacaoSucesso,
  criacaoFalha
} from '../utils/mensagensAlerta'

interface Props {
  onChange: (selecionados: string[]) => void
  userId?: string
  idsSelecionados: string[]
  isEmEdicao?: boolean
}

const SentimentosCheckboxGroup = ({
  onChange,
  userId = null,
  idsSelecionados = [],
  isEmEdicao = false
}: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [opcoes, setOpcoes] = useState<Sentimento[]>([])
  const [isModalAberto, setIsModalAberto] = useState(false)
  const [sentimentoEdicao, setSentimentoEdicao] = useState(null)
  const { displayAlert } = useContext(AlertContext)
  const isCadastro = !userId

  const getSentimentos = async () => {
    setIsLoading(true)
    setOpcoes(await getSentimentosIniciais(userId))
    setIsLoading(false)
  }

  useEffect(() => {
    getSentimentos()
  }, [])

  const handleChangeSelected = (item?: ISentimento) => {
    if (isEmEdicao || !item) {
      setSentimentoEdicao(item)
      toggleModal()
    } else {
      if (idsSelecionados.some(selecionado => selecionado === item.id)) {
        const novosSelecionados = idsSelecionados.filter(i => i !== item.id)
        onChange(novosSelecionados)
      } else {
        onChange([...idsSelecionados, item.id])
      }
    }
  }

  const atualizaNaTela = (item: IItemEdicao) => {
    const sentimentosAtualizados = opcoes.map(sentimento => {
      if (sentimento.id === sentimentoEdicao.id) {
        return {
          ...sentimento,
          nome: item.nome,
          emojiUnicode: item.emojiUnicode,
          emoji: item.emoji
        }
      } else {
        return sentimento
      }
    })
    setOpcoes(sentimentosAtualizados)
  }

  const handleConfirmarEdicao = (item: IItemEdicao) => {
    if (sentimentoEdicao) {
      atualizaNaTela(item)
      const sentimentoAtualizado = {
        ...sentimentoEdicao,
        nome: item.nome,
        emojiUnicode: item.emojiUnicode
      }
      new UpdateUserSentimentos(userId)
        .call(sentimentoAtualizado)
        .then(() => {
          displayAlert(atualizacaoSucesso(t('edicao.sentimento')))
        })
        .catch(() => {
          displayAlert(atualizacaoFalha(t('edicao.sentimento')))
        })
    } else {
      new CreateUserSentimentos(userId)
        .call({
          nome: item.nome,
          emojiUnicode: item.emojiUnicode
        })
        .then(() => {
          getSentimentos()
        })
        .catch(() => {
          displayAlert(criacaoFalha(t('edicao.sentimento')))
        })
    }
  }

  const toggleModal = () => {
    setIsModalAberto(!isModalAberto)
  }

  return (
    <View style={styles.sentimentos}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {opcoes.map(opcao => (
            <SentimentoCheckbox
              key={opcao.nome}
              isEmEdicao={isEmEdicao}
              sentimento={opcao}
              onPress={handleChangeSelected}
              testID={"botaoSentimento"+opcao.nome}
              checked={idsSelecionados.includes(opcao.id) && !isEmEdicao}
            />
          ))}
          {isCadastro || (
            <SentimentoCheckbox
              key="novo"
              isEmEdicao={isEmEdicao}
              onPress={handleChangeSelected}
              testID="botaoNovoSentimento"
              checked={false}
            />
          )}
        </>
      )}
      <ModalEdicao
        isOpen={isModalAberto}
        itemEdicao={sentimentoEdicao}
        onFecha={toggleModal}
        onConfirma={handleConfirmarEdicao}
        labelNome={t('edicao.sentimento')}
      />
    </View>
  )
}

export default SentimentosCheckboxGroup

const styles = StyleSheet.create({
  sentimentos: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})
