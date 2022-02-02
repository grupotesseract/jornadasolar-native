import React, { FC } from 'react'
import { IRegistro } from '../../entities/Registro'
import GraficoBase from './GraficoBase'
import { t } from 'i18n-js'

interface IProps {
  diarios: Array<IRegistro>
  mesAtual: Date
}

const GraficoHabitos: FC<IProps> = ({ diarios, mesAtual }) => {
  const habitosDoMes = diarios
    ?.map(diario => diario?.gruposDeHabitos)
    .flat()
    .map(grupo => grupo?.habitos)
    .flat()
    .filter(habito => Boolean(habito))

  const listaDeHabitosComEmojis = habitosDoMes
    .map(habito => ({ nome: habito.nome, emoji: habito.emoji }))
    .flat()

  const habitosDoMesAsStrings = habitosDoMes.map(habito => habito.nome)

  return (
    <GraficoBase
      registrosDoMes={habitosDoMesAsStrings}
      mesAtual={mesAtual}
      listaComEmojis={listaDeHabitosComEmojis}
      titulo={t('graficos.textoHabitos')}
    />
  )
}

export default GraficoHabitos
