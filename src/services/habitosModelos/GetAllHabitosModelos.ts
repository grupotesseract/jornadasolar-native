import { IHabito } from '../../entities/Habito'
import HabitosModelosRepository, {
  IHabitosModelosRepository
} from '../../repositories/HabitosModelosRepository'

interface IGetAll {
  call(idIdioma?: string): Promise<Array<IHabito>>
}

export default class GetAll implements IGetAll {
  private habitosModelosRepository: IHabitosModelosRepository

  constructor(gruposDeHabitosModelosId: string) {
    this.habitosModelosRepository = new HabitosModelosRepository(
      gruposDeHabitosModelosId
    )
  }

  call(idIdioma?: string): Promise<Array<IHabito>> {
    return this.habitosModelosRepository.getAll(idIdioma)
  }
}
