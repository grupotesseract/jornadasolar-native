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
import UserFactory, { IUserFactory } from '../factories/UserFactory'
import { isSameDay } from 'date-fns'
import GetAllCanais from '../services/notificacoes/getAllCanais'

interface ICreateParameters {
  nome: string
  email: string
  senha: string
  objetivos: Array<string>
  temLivro: string
  sentimentos: Array<string>
  gruposDeHabitos: Array<IGrupoDeHabitos>
  idioma: string
}

interface IUpdateParameters {
  id: string
  attributes: Record<string, unknown>
}
export interface IUsersRepository {
  add(params): Promise<IUser>
  getById(id: string): Promise<IUser>
  update(params: IUpdateParameters): boolean
  updateAccessFlags(user: IUser): boolean
}

export default class UsersRepository implements IUsersRepository {
  private collection
  private factory: IUserFactory

  constructor() {
    this.collection = firestore.collection('user')
    this.factory = new UserFactory()
  }

  async add({
    nome,
    email,
    senha,
    objetivos,
    temLivro,
    sentimentos,
    gruposDeHabitos,
    idioma
  }: ICreateParameters): Promise<IUser> {
    const now = firebase.firestore.FieldValue.serverTimestamp()

    // Cria usuário no firebase auth
    const { user } = await auth.createUserWithEmailAndPassword(email, senha)
    await auth.signOut()
    await user.updateProfile({
      displayName: nome
    })

    // Inscreve o usuário em todos os canais de notificação
    const canais = await new GetAllCanais().call()
    const idsCanais = canais.map(canal => canal.id)

    // Cria usuário na collection user
    const data = {
      nome,
      email,
      objetivos,
      temLivro,
      created_at: now,
      updated_at: now,
      lastAccess: now,
      countAccess: 1,
      canaisDeNotificacao: idsCanais,
      idioma
    }
    await this.collection.doc(user.uid).set(data)

    // Cria subcollection de gruposDeHabitos com subcollection de habitos
    // na collection user
    const gruposDeHabitosModelos =
      await new GetAllGruposDeHabitosModelos().call()
    gruposDeHabitosModelos.forEach(async grupoDeHabitoModelo => {
      await CreateUserGrupoDeHabitos({
        userId: user.uid,
        grupoDeHabitos: grupoDeHabitoModelo
      })
    })

    // Busca grupos de hábitos do usuário e atualiza os gruposDeHabitos que vão
    // pro registro com os ids
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
    const serviceCreateSentimento = new CreateUserSentimentos(user.uid)

    sentimentosModelos.forEach(async sentimento => {
      const { id, nome, emojiUnicode } = sentimento
      await serviceCreateSentimento.call({
        idSentimentoModelo: id,
        nome,
        emojiUnicode
      })
    })

    // Busca sentimentos do usuário e atualiza os sentimentos que vão pro
    // registro com os ids
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

    await auth.signInWithEmailAndPassword(email, senha)
    return new User({
      id: user.uid,
      nome,
      email,
      temLivro,
      objetivos
    })
  }

  async getById(id: string): Promise<IUser> {
    try {
      const userSnapshot = await this.collection.doc(id).get()
      const user = this.factory.build(userSnapshot)

      return user
    } catch (e) {
      throw new Error('Ocorreu um erro inesperado ao buscar o usuário:' + e)
    }
  }

  update({ id, attributes }: IUpdateParameters): boolean {
    try {
      const now = firebase.firestore.FieldValue.serverTimestamp()
      attributes.updated_at = now

      this.collection.doc(id).update(attributes)

      if (attributes.nome) {
        const user = auth.currentUser
        user.updateProfile({
          displayName: attributes.nome as string
        })
      }
      return true
    } catch (e) {
      throw new Error('Ocorreu um erro inesperado ao atualizar usuário.' + e)
    }
  }

  updateAccessFlags(user: IUser): boolean {
    const hoje = new Date()
    const mesmoDia = isSameDay(hoje, user.lastAccess)

    if (!mesmoDia) {
      try {
        const acessos = user.countAccess + 1
        if (!user.lastAccess) {
          this.collection
            .doc(user.id)
            .set({ lastAccess: hoje, countAccess: acessos }, { merge: true })
        } else {
          this.update({
            id: user.id,
            attributes: { lastAccess: hoje, countAccess: acessos }
          })
        }
      } catch (e) {
        throw new Error('Ocorreu um erro inesperado ao atualizar usuário.' + e)
      }
    }
    return !mesmoDia
  }
}
