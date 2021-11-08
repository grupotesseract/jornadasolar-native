import firebase from 'firebase/app'
import { auth } from '../../firebase/firebase.config'
import { agendaNotificacaoTresDias } from '../../utils/notificacoes'
import UpdateUserTokens from './UpdateUserTokens'

interface ISignInUser {
  call(email: string, password: string): Promise<firebase.auth.UserCredential>
}

export default class SignInUser implements ISignInUser {
  async call(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    const credenciais = await auth.signInWithEmailAndPassword(email, password)
    agendaNotificacaoTresDias()
    await new UpdateUserTokens().add(credenciais.user.uid)
    return credenciais
  }
}
