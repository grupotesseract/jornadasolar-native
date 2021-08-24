import { auth, firestore } from '../firebase/firebase.config'
import firebase from 'firebase/app'
import User, { IUser } from '../entities/User'
import { IGrupoDeHabitos } from '../entities/GrupoDeHabitos'

interface ICreateParameters {
  nome: string
  email: string
  senha: string
  objetivos: Array<string>
  temLivro: string
  sentimentos: Array<string>
  gruposDeHabitos: Array<IGrupoDeHabitos>
}

export interface IUsersRepository {
  add(params): Promise<IUser>
}

export default class UsersRepository implements IUsersRepository {
  private collection

  constructor() {
    this.collection = firestore.collection('user')
  }

  async add({
    nome,
    email,
    senha,
    objetivos,
    temLivro,
    sentimentos,
    gruposDeHabitos
  }: ICreateParameters): Promise<IUser> {
    const now = firebase.firestore.FieldValue.serverTimestamp()

    // Cria usuário no firebase auth
    const { user } = await auth.createUserWithEmailAndPassword(email, senha)
    await user.updateProfile({
      displayName: nome
    })

    // Cria usuário na collection user
    const data = {
      nome,
      email,
      objetivos,
      temLivro,
      created_at: now,
      updated_at: now,
      lastAccess: now,
      countAccess: 1
    }
    await this.collection.doc(user.uid).set(data)

    /*  
    // Cria subcollection de gruposDeHabitos com subcollection de habitos na collection user 

    // Busca grupos de hábitos do usuário e atualiza o gruposDeHabitos que vão pro registro com os ids 

    // Cria subcollection de sentimentos na collection user

    // Busca sentimentos do usuário e atualiza o sentimentos que vão pro registro com os ids  

    // Cria o primeiro registro do usuário no diário */

    return new User({
      id: user.uid,
      nome,
      email,
      senha,
      temLivro,
      objetivos
    })
  }
}
