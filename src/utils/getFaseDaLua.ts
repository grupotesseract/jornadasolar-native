// Baseado na lib https://github.com/omrilotan/mono/tree/master/packages/the-moon

import i18n from '../i18n'

const getFaseDaLua = (date: Date): string => {
  const { t } = i18n

  const fasesDaLua = [
    t('fasesDaLua.nova'),
    t('fasesDaLua.crescenteInicio'),
    t('fasesDaLua.crescente'),
    t('fasesDaLua.crescenteFinal'),
    t('fasesDaLua.cheia'),
    t('fasesDaLua.minguanteInicio'),
    t('fasesDaLua.minguante'),
    t('fasesDaLua.minguanteFinal')
  ]

  let ano = date.getFullYear()
  let mes = date.getMonth() + 1
  const dia = date.getDate()

  const cicloDaLua = 29.5305882
  const cicloDoAno = 365.25
  const cicloDoMes = 30.6
  const nineteenHundred = 694039.09

  if (mes < 3) {
    ano--
    mes += 12
  }

  let totalDeDiasDecorridos =
    ano * cicloDoAno + mes * cicloDoMes + dia - nineteenHundred
  totalDeDiasDecorridos /= cicloDaLua
  totalDeDiasDecorridos -= parseInt(totalDeDiasDecorridos.toString()) // subtrair parte inteira para deixar parte fracionária

  let fase = Math.round(totalDeDiasDecorridos * 8)
  fase = fase >= 8 ? 0 : fase // transforma 8 em 0

  return fasesDaLua[fase]
}

export default getFaseDaLua
