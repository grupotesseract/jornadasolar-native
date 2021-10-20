import { IUser } from '../../entities/User'
import UsersRepository, {
  IUsersRepository
} from '../../repositories/UsersRepository'
import {
  agendaNotificacaoTresDias,
  cancelaNotificacoesAgendadas
} from '../../utils/notificacoes'

interface IRegistrarAccesso {
  call(user: IUser): Promise<void>
}

export default class RegistrarAccesso implements IRegistrarAccesso {
  private usersRepository: IUsersRepository

  constructor() {
    this.usersRepository = new UsersRepository()
  }

  async call(user: IUser): Promise<void> {
    const accessFlagsUpdated = this.usersRepository.updateAccessFlags(user)
    if (accessFlagsUpdated) {
      await cancelaNotificacoesAgendadas()
      await agendaNotificacaoTresDias()
    }
  }
}
