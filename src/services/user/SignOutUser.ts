import { auth } from '../../firebase/firebase.config'
import { cancelaNotificacoesAgendadas } from '../../utils/notificacoes'
import UpdateUserTokens from './UpdateUserTokens'

interface ISignOutUser {
  call(): Promise<void>
}

export default class SignOutUser implements ISignOutUser {
  async call(): Promise<void> {
    await cancelaNotificacoesAgendadas()
    const userId = auth.currentUser.uid
    await new UpdateUserTokens().remove(userId)
    return auth.signOut()
  }
}
