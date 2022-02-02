export type IToken = {
  userId: string
  expoToken: string
}

interface ICanalAttributes {
  id: string
  nome: string
}

export type ICanalDeNotificacao = ICanalAttributes

export default class CanalNotificacao implements ICanalDeNotificacao {
  public id: string
  public nome: string

  constructor({ id, nome }: ICanalAttributes) {
    this.id = id
    this.nome = nome
  }
}
