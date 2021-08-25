import { auth, firestore } from '../firebase/firebase.config'
import firebase from 'firebase/app'
import User, { IUser } from '../entities/User'
import { IGrupoDeHabitos } from '../entities/GrupoDeHabitos'
import CreateUserGrupoDeHabitos from '../services/user/CreateUserGrupoDeHabitos'
import GetAllGruposDeHabitosModelos from '../services/gruposDeHabitos/GetAllGruposDeHabitosModelos'
import GetUserGruposDeHabitos from '../services/user/GetUserGruposDeHabitos'
import GetAllSentimentosModelos from '../services/sentimentosModelos/GetAllSentimentosModelos'
import CreateUserSentimentos from '../services/user/CreateUserSentimentos'
import CreateOrUpdateRegistro from '../services/registros/CreateOrUpdateRegistro'
import GetUserSentimentos from '../services/user/GetUserSentimentos'

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

    // Cria subcollection de gruposDeHabitos com subcollection de habitos na collection user
    const gruposDeHabitosModelos =
      await new GetAllGruposDeHabitosModelos().call()
    gruposDeHabitosModelos.forEach(async grupoDeHabitoModelo => {
      await CreateUserGrupoDeHabitos({
        userId: user.uid,
        grupoDeHabitos: grupoDeHabitoModelo
      })
    })

    // Busca grupos de hábitos do usuário e atualiza o gruposDeHabitos que vão pro registro com os ids
    const gruposDeHabitosDoUsuario = await GetUserGruposDeHabitos(user.uid)
    const gruposDeHabitosAtualizados = gruposDeHabitos.map(grupoDeHabito => {
      const grupoDoUsuario = gruposDeHabitosDoUsuario.find(
        grupoDeHabitosDoUsuario =>
          grupoDeHabitosDoUsuario.nome.toLowerCase() ===
          grupoDeHabito.nome.toLowerCase()
      )
      const habitosDoUsuario = grupoDeHabito.habitos.map(habito => {
        const habitoDoUsuario = grupoDoUsuario.habitos.find(
          habitoDoUsuario =>
            habitoDoUsuario.nome.toLowerCase() === habito.nome.toLowerCase()
        )
        return {
          ...habito,
          id: habitoDoUsuario.id
        }
      })

      return {
        ...grupoDeHabito,
        id: grupoDoUsuario.id,
        habitos: habitosDoUsuario
      }
    })

    // Cria subcollection de sentimentos na collection user
    const sentimentosModelos = await new GetAllSentimentosModelos().call()
    console.log('sentimentosModelos', sentimentosModelos)

    const serviceCreateSentimento = new CreateUserSentimentos(user.uid)

    sentimentosModelos.forEach(async sentimento => {
      const { id, nome, emojiUnicode } = sentimento
      await serviceCreateSentimento.call({
        idSentimentoModelo: id,
        nome,
        emojiUnicode
      })
    })

    // Busca sentimentos do usuário e atualiza o sentimentos que vão pro registro com os ids
    const sentimentosDoUsuario = await new GetUserSentimentos(user.uid).call()
    const sentimentosAtualizado = sentimentos.map(sentimento => {
      const sentimentoUsuario = sentimentosDoUsuario.find(
        sentimentoUser => sentimentoUser.idSentimentoModelo === sentimento
      )
      return sentimentoUsuario.id
    })

    // Cria o primeiro registro do usuário no diário
    await new CreateOrUpdateRegistro().call({
      date: now,
      userId: user.uid,
      sentimentos: sentimentosAtualizado,
      gruposDeHabitos: gruposDeHabitosAtualizados
    })

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
