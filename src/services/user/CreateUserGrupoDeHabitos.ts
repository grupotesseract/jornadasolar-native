import { IGrupoDeHabitos } from '../../entities/GrupoDeHabitos'
import UserGrupoDeHabitosRepository from '../../repositories/UserGruposDeHabitosRepository'

interface Parameters {
  userId: string
  grupoDeHabitos: IGrupoDeHabitos
}

const CreateUserGrupoDeHabitos = async ({
  userId,
  grupoDeHabitos
}: Parameters) => {
  await new UserGrupoDeHabitosRepository(userId).add(grupoDeHabitos)
}

export default CreateUserGrupoDeHabitos
