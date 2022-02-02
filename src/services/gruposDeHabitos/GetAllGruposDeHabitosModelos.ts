import GrupoDeHabitos from '../../entities/GrupoDeHabitos'
import { idiomaAtual } from '../../i18n'
import GruposDeHabitosModelosRepository, {
  IGruposDeHabitosModelosRepository
} from '../../repositories/GruposDeHabitosModelosRepository'
import { GetIdIdioma } from '../GetIdIdioma'

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
    const idIdioma = await new GetIdIdioma().call(idiomaAtual)
    return await this.gruposDeHabitosModelosRepository.getAll(idIdioma)
  }
}
