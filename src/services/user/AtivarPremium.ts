import UsersRepository, {
  IUsersRepository
} from '../../repositories/UsersRepository'

interface IAtivarPremium {
  call(userId: string): boolean
}

export default class AtivarPremium implements IAtivarPremium {
  private usersRepository: IUsersRepository

  constructor() {
    this.usersRepository = new UsersRepository()
  }

  call(userId: string): boolean {
    return this.usersRepository.update({
      id: userId,
      attributes: {
        premium: true,
        inicioPromocode: new Date(),
        duracaoPromocode: 30
      }
    })
  }
}
