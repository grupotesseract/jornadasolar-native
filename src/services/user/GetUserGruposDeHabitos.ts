import { IGrupoDeHabitos } from '../../entities/GrupoDeHabitos'
import UserGrupoDeHabitosRepository from '../../repositories/UserGruposDeHabitosRepository'

const GetUserGruposDeHabitos = async (
  userId: string
): Promise<Array<IGrupoDeHabitos>> => {
  return await new UserGrupoDeHabitosRepository(userId).getAll()
}

export default GetUserGruposDeHabitos
