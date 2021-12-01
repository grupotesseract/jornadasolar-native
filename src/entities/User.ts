interface IUserAttributes {
  id: string
  nome: string
  email: string
  objetivos: Array<string>
  temLivro: string
  role?: string
  novidadesDispensadas?: Array<string>
  novidadeDispensada?(slug: string): boolean
  lastAccess?: Date
  countAccess?: number
  canaisDeNotificacao?: Array<string>
  tokens?: Array<string>
  idioma?: string
  aceitouPolitica?: boolean
}

export type IUser = IUserAttributes

export default class User implements IUser {
  public id: string
  public nome: string
  public email: string
  public objetivos: Array<string>
  public temLivro: string
  public role: string
  public novidadesDispensadas: Array<string>
  public lastAccess?: Date
  public countAccess?: number
  public canaisDeNotificacao?: Array<string>
  public tokens?: Array<string>
  public idioma: string
  public aceitouPolitica?: boolean

  constructor({
    id,
    nome,
    email,
    objetivos,
    temLivro,
    role,
    novidadesDispensadas,
    lastAccess,
    countAccess,
    canaisDeNotificacao,
    tokens,
    idioma,
    aceitouPolitica
  }: IUserAttributes) {
    this.id = id
    this.nome = nome
    this.email = email
    this.objetivos = objetivos
    this.temLivro = temLivro
    this.role = role
    this.novidadesDispensadas = novidadesDispensadas
    this.lastAccess = lastAccess
    this.countAccess = countAccess
    this.canaisDeNotificacao = canaisDeNotificacao
    this.tokens = tokens
    this.idioma = idioma
    this.aceitouPolitica = aceitouPolitica
  }

  novidadeDispensada(slug: string): boolean {
    return this.novidadesDispensadas.includes(slug)
  }
}
