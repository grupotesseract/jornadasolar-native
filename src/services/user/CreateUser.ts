import UsersRepository, {
  IUsersRepository
} from '../../repositories/UsersRepository'
import { IGrupoDeHabitos } from '../../entities/GrupoDeHabitos'
import { IUser } from '../../entities/User'

type Parameters = {
  nome: string
  email: string
  senha: string
  objetivos: Array<string>
  temLivro: string
  sentimentos: Array<string>
  gruposDeHabitos: Array<IGrupoDeHabitos>
  idioma: string
}

interface ICreate {
  call(params: Parameters): Promise<IUser>
}

export default class CreateUser implements ICreate {
  private usersRepository: IUsersRepository

  constructor() {
    this.usersRepository = new UsersRepository()
  }

  async call(params: Parameters): Promise<IUser> {
    const user = await this.usersRepository.add(params)
    return user
  }
}
