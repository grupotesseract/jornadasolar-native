import { auth } from '../../firebase/firebase.config'

interface ISignOutUser {
  call(): Promise<void>
}

export default class SignOutUser implements ISignOutUser {
  async call(): Promise<void> {
    return auth.signOut()
  }
}
