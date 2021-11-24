import { t } from 'i18n-js'
import GrupoDeHabitos from '../entities/GrupoDeHabitos'
import GetAllGruposDeHabitosModelos from '../services/gruposDeHabitos/GetAllGruposDeHabitosModelos'
import GetUserGruposDeHabitos from '../services/user/GetUserGruposDeHabitos'

const getGruposDeHabitosIniciais = async (
  userId?: string
): Promise<GrupoDeHabitos[]> => {
  const grupoDeHabitosModelos = userId
    ? await GetUserGruposDeHabitos(userId)
    : tiraGrupoPersonalizado(await new GetAllGruposDeHabitosModelos().call())
  return grupoDeHabitosModelos
}

const getGruposDeHabitosTemplate = async (
  userId?: string
): Promise<GrupoDeHabitos[]> => {
  let grupo = await getGruposDeHabitosIniciais(userId)
  grupo = grupo.map(grupo => {
    return { id: grupo.id, nome: grupo.nome, habitos: [] }
  })
  return grupo
}

const tiraGrupoPersonalizado = (grupos: GrupoDeHabitos[]) => {
  return grupos.filter(
    grupo =>
      grupo.nome !== t('comum.nomeGrupoPersonalizado') &&
      grupo.nome !== 'Personalizados'
  )
}

export { getGruposDeHabitosTemplate, getGruposDeHabitosIniciais }
