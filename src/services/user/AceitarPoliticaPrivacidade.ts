import UsersRepository, {
  IUsersRepository
} from '../../repositories/UsersRepository'

interface IAceitarPoliticaPrivacidade {
  call(userId: string): boolean
}

export default class AceitarPoliticaPrivacidade
  implements IAceitarPoliticaPrivacidade
{
  private usersRepository: IUsersRepository

  constructor() {
    this.usersRepository = new UsersRepository()
  }

  call(userId: string): boolean {
    return this.usersRepository.update({
      id: userId,
      attributes: { aceitouPolitica: true }
    })
  }
}
