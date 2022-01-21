import { IUser } from '../../entities/User'
import UsersRepository, {
  IUsersRepository
} from '../../repositories/UsersRepository'
import {
  agendaNotificacaoTresDias,
  agendaNotificacaoSeteDias, 
  agendaNotificacaoQuinzeDias,
  cancelaNotificacoesAgendadas
} from '../../utils/notificacoes'

interface IRegistrarAcesso {
  call(user: IUser): Promise<void>
}

export default class RegistrarAcesso implements IRegistrarAcesso {
  private usersRepository: IUsersRepository

  constructor() {
    this.usersRepository = new UsersRepository()
  }

  async call(user: IUser): Promise<void> {
    const accessFlagsUpdated = this.usersRepository.updateAccessFlags(user)
    if (accessFlagsUpdated) {
      await cancelaNotificacoesAgendadas()
      await agendaNotificacaoTresDias()
      await agendaNotificacaoSeteDias()
      await agendaNotificacaoQuinzeDias()
    }
  }
}
