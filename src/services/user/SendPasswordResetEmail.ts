import { auth } from '../../firebase/firebase.config'

interface ISendPasswordResetEmail {
  call(email: string): Promise<void>
}

export default class SendPasswordResetEmail implements ISendPasswordResetEmail {
  async call(email: string): Promise<void> {
    await auth.sendPasswordResetEmail(email)
  }
}
