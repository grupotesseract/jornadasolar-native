import User, { IUser } from '../entities/User'

export interface IUserFactory {
  build(userSnapshot: any): IUser
}

export default class UserFactory {
  build(userSnapshot: any): IUser {
    const { id } = userSnapshot
    const dados = userSnapshot.data()

    if (!dados) {
      throw new Error('dados vazios, userSnapshot id:' + id)
    }
    const {
      nome,
      email,
      temLivro,
      objetivos,
      role,
      novidadesDispensadas,
      canaisDeNotificacao,
      tokens,
      aceitouPolitica
    } = dados

    const lastAccess = dados.lastAccess ? dados.lastAccess.toDate() : null
    const countAccess = dados.countAccess ? dados.countAccess : 0

    return new User({
      id,
      nome,
      email,
      temLivro,
      objetivos,
      role,
      novidadesDispensadas: novidadesDispensadas || [],
      lastAccess: lastAccess,
      countAccess: countAccess,
      canaisDeNotificacao: canaisDeNotificacao || [],
      tokens: tokens || [],
      aceitouPolitica
    })
  }
}
