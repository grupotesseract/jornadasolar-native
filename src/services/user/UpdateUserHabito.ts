import { IHabito } from '../../entities/Habito'
import HabitosRepository from '../../repositories/UserHabitosRepository'

interface IUpdateUserHabitos {
  call(Habito: IHabito): Promise<IHabito>
}

export default class UpdateUserHabitos implements IUpdateUserHabitos {
  private HabitosRepository

  constructor(userId: string, idGrupo: string) {
    this.HabitosRepository = new HabitosRepository(userId, idGrupo)
  }

  async call(Habito: IHabito): Promise<IHabito> {
    return await this.HabitosRepository.update(Habito)
  }
}
