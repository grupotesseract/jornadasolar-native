import firebase from 'firebase/app'
import { auth } from '../../firebase/firebase.config'

interface ISignInUser {
  call(email: string, password: string): Promise<firebase.auth.UserCredential>
}

export default class SignInUser implements ISignInUser {
  async call(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return await auth.signInWithEmailAndPassword(email, password)
  }
}
