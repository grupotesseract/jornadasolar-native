import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/AuthContext'
import useRegistroByDate from '../../hooks/useRegistroByDate'
import CreateOrUpdateRegistro from '../../services/registros/CreateOrUpdateRegistro'
import { DiaNavigationProps } from '../../routes/App.routes'
import { logEvent } from 'expo-firebase-analytics'
import Loading from '../../components/Loading'
import EdicaoDiario from '../../components/EdicaoDiario'
import SentimentosCheckboxGroup from '../../components/SentimentosCheckboxGroup'
import TextButton from '../../components/TextButton'
import { t } from 'i18n-js'
import Novidade from '../../components/Novidade'
import Telas from '../../enums/Telas'

const Sentimentos = ({ navigation, route }: DiaNavigationProps) => {
  const dia = new Date(route.params.data)
  const { userId } = useContext(AuthContext)
  const { loading, registroDoDia } = useRegistroByDate({
    userId,
    date: dia,
    focus: true
  })
  const [itensSelecionados, setItensSelecionados] = useState<string[]>([])
  const [isEmEdicao, setIsEmEdicao] = useState(false)

  const handleChangeSelected = (selecionados: string[]) => {
    setItensSelecionados(selecionados)
  }

  useEffect(() => {
    const sentimentosAnteriores = registroDoDia?.sentimentos?.map(
      sentimento => sentimento.id
    )
    setItensSelecionados(sentimentosAnteriores || [])
  }, [registroDoDia])

  const toggleEmEdicao = () => {
    setIsEmEdicao(!isEmEdicao)
  }

  const botaoEditar = (
    <TextButton
      texto={isEmEdicao ? t('comum.concluir') : t('comum.editar')}
      onPress={toggleEmEdicao}
    />
  )

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
    <EdicaoDiario
      botaoSecundario={botaoEditar}
      navigation={navigation}
      data={dia}
      onSalvar={onSalvarClick}
    >
      <Novidade path={Telas.Sentimentos} isFocused />
      {loading ? (
        <Loading />
      ) : (
        <SentimentosCheckboxGroup
          idsSelecionados={itensSelecionados}
          userId={userId}
          onChange={handleChangeSelected}
          isEmEdicao={isEmEdicao}
        />
      )}
    </EdicaoDiario>
  )
}

export default Sentimentos
