interface IMeditacaoAttributes {
  id: string
  nome: string
  url: string
  data: Date
}

export type IMeditacao = IMeditacaoAttributes

export default class Meditacao implements IMeditacao {
  public id: string
  public nome: string
  public url: string
  public data: Date

  constructor({ id, nome, url, data }: IMeditacaoAttributes) {
    this.id = id
    this.nome = nome
    this.url = url
    this.data = data
  }
}
