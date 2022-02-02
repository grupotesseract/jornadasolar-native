import UsersRepository, {
  IUsersRepository
} from '../../repositories/UsersRepository'

interface IUpdateCanaisUsuario {
  call(userId: string, canaisAtivos: string[]): Promise<void>
}

export default class UpdateCanaisUsuario implements IUpdateCanaisUsuario {
  private userRepository: IUsersRepository

  constructor() {
    this.userRepository = new UsersRepository()
  }

  async call(userId: string, canaisAtivos: string[]): Promise<void> {
    this.userRepository.update({
      id: userId,
      attributes: { canaisDeNotificacao: canaisAtivos }
    })
  }
}
