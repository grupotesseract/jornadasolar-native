import { auth } from '../../firebase/firebase.config'
import { cancelaNotificacoesAgendadas } from '../../utils/notificacoes'

interface ISignOutUser {
  call(): Promise<void>
}

export default class SignOutUser implements ISignOutUser {
  async call(): Promise<void> {
    await cancelaNotificacoesAgendadas()
    return auth.signOut()
  }
}
