import { INovidade } from '../../entities/Novidade'
import { IUser } from '../../entities/User'
import NovidadesRepository, {
  INovidadesRepository
} from '../../repositories/NovidadesRepository'

interface IGetNovidadeValida {
  call(user: IUser, path: string): Promise<INovidade>
}

export default class GetNovidadeValida implements IGetNovidadeValida {
  private novidadesRepository: INovidadesRepository
  constructor() {
    this.novidadesRepository = new NovidadesRepository()
  }

  async call(user: IUser, path: string): Promise<INovidade> {
    const date = new Date()
    const novidadesHoje = await this.novidadesRepository.getByDateAndPath(
      date,
      path
    )
    console.log(user)
    const novidadeValida = novidadesHoje.find(
      novidade => !user.novidadeDispensada(novidade.id)
    )
    return novidadeValida
  }
}
