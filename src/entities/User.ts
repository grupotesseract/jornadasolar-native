interface IUserAttributes {
  id: string
  nome: string
  email: string
  senha: string
  objetivos: Array<string>
  temLivro: string
  role?: string
  novidadesDispensadas?: Array<string>
  novidadeDispensada?(slug: string): boolean
  lastAccess?: Date
  countAccess?: number
}

export type IUser = IUserAttributes

export default class User implements IUser {
  public id: string
  public nome: string
  public email: string
  public senha: string
  public objetivos: Array<string>
  public temLivro: string
  public role: string
  public novidadesDispensadas: Array<string>
  public lastAccess?: Date
  public countAccess?: number

  constructor({
    id,
    nome,
    email,
    senha,
    objetivos,
    temLivro,
    role,
    novidadesDispensadas,
    lastAccess,
    countAccess
  }: IUserAttributes) {
    this.id = id
    this.nome = nome
    this.email = email
    this.senha = senha
    this.objetivos = objetivos
    this.temLivro = temLivro
    this.role = role
    this.novidadesDispensadas = novidadesDispensadas
    this.lastAccess = lastAccess
    this.countAccess = countAccess
  }

  novidadeDispensada(slug: string): boolean {
    return this.novidadesDispensadas.includes(slug)
  }
}
