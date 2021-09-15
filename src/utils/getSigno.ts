import i18n from '../i18n'

const getSigno = (date: Date): string => {
  const dia = date.getDate()
  const mes = date.getMonth() + 1
  const { t } = i18n

  const signos = [
    '',
    t('signos.capricornio'),
    t('signos.aquario'),
    t('signos.peixes'),
    t('signos.aries'),
    t('signos.touro'),
    t('signos.gemeos'),
    t('signos.cancer'),
    t('signos.leao'),
    t('signos.virgem'),
    t('signos.libra'),
    t('signos.escorpiao'),
    t('signos.sagitario'),
    t('signos.capricornio')
  ]

  const ultimoDia = ['', 19, 18, 20, 20, 21, 21, 22, 22, 21, 22, 21, 20, 19]

  return dia > ultimoDia[mes] ? signos[mes + 1] : signos[mes]
}

export default getSigno
