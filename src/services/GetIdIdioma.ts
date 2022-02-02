import { IdiomaRepository } from '../repositories/IdiomaRepository'

interface IGetIdIdioma {
  call(idioma: string): Promise<string>
}

export class GetIdIdioma implements IGetIdIdioma {
  private repository

  constructor() {
    this.repository = new IdiomaRepository()
  }

  async call(idioma: string): Promise<string> {
    return await this.repository.getIdByIdioma(idioma)
  }
}
