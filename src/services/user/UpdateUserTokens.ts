import UsersRepository, {
  IUsersRepository
} from '../../repositories/UsersRepository'
import {
  Notifications,
  registraTokenParaNotificacoesExternas
} from '../../utils/notificacoes'

interface IUpdateUserTokens {
  add(userId: string): Promise<void>
  remove(userId: string): Promise<void>
}

export default class UpdateUserTokens implements IUpdateUserTokens {
  private userRepository: IUsersRepository
  constructor() {
    this.userRepository = new UsersRepository()
  }

  async add(userId: string): Promise<void> {
    const token = await registraTokenParaNotificacoesExternas()
    if (token) {
      const user = await this.userRepository.getById(userId)

      const novosTokens = [...user.tokens, token]
      this.userRepository.update({
        id: userId,
        attributes: { tokens: novosTokens }
      })
    }
  }

  async remove(userId: string): Promise<void> {
    try {
      const token = (await Notifications.getExpoPushTokenAsync()).data
      if (token) {
        const user = await this.userRepository.getById(userId)
        const novosTokens = user.tokens?.filter(
          userToken => userToken !== token
        )
        this.userRepository.update({
          id: userId,
          attributes: { tokens: novosTokens }
        })
      }
    } catch (e) {
      throw new Error(
        'Ocorreu um erro inesperado ao remover o token para notificações: ' + e
      )
    }
  }
}
