import { IGrupoDeHabitos } from '../entities/GrupoDeHabitos'
import GetAllGruposDeHabitosModelos from '../services/gruposDeHabitos/GetAllGruposDeHabitosModelos'

export const getGruposDeHabitosTemplate = async (): Promise<
  IGrupoDeHabitos[]
> => {
  const grupoDeHabitosModelos = await new GetAllGruposDeHabitosModelos().call()
  return grupoDeHabitosModelos.map(grupo => {
    return { id: grupo.id, nome: grupo.nome, habitos: [] }
  })
}
