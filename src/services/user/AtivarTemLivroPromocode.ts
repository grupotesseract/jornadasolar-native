import UsersRepository, {
  IUsersRepository
} from '../../repositories/UsersRepository'

interface IAtivarTemLivroPromocode {
  call(userId: string): boolean
}

export default class AtivarTemLivroPromocode
  implements IAtivarTemLivroPromocode
{
  private usersRepository: IUsersRepository

  constructor() {
    this.usersRepository = new UsersRepository()
  }

  call(userId: string): boolean {
    return this.usersRepository.update({
      id: userId,
      attributes: { temLivroPromocode: true }
    })
  }
}
