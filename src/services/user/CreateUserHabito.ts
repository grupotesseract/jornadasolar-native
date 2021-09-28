import { IHabito } from '../../entities/Habito'
import HabitosRepository from '../../repositories/UserHabitosRepository'

interface ICreateParameters {
  nome: string
  emojiUnicode: Array<string>
}

interface ICreateUserHabitos {
  call(params: ICreateParameters): Promise<IHabito>
}

export default class CreateUserHabitos implements ICreateUserHabitos {
  private HabitosRepository

  constructor(userId: string, idGrupo: string) {
    this.HabitosRepository = new HabitosRepository(userId, idGrupo)
  }

  async call(params: ICreateParameters): Promise<IHabito> {
    return await this.HabitosRepository.add(params)
  }
}
