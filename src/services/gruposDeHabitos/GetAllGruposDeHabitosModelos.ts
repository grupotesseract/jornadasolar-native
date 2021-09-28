import GrupoDeHabitos from '../../entities/GrupoDeHabitos'
import GruposDeHabitosModelosRepository, {
  IGruposDeHabitosModelosRepository
} from '../../repositories/GruposDeHabitosModelosRepository'

interface IGetAll {
  call(): Promise<Array<GrupoDeHabitos>>
}

export default class GetAllGruposDeHabitosModelos implements IGetAll {
  private gruposDeHabitosModelosRepository: IGruposDeHabitosModelosRepository

  constructor() {
    this.gruposDeHabitosModelosRepository =
      new GruposDeHabitosModelosRepository()
  }

  async call(): Promise<Array<GrupoDeHabitos>> {
    return await this.gruposDeHabitosModelosRepository.getAll()
  }
}
