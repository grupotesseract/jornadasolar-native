import { IMeditacao } from '../../entities/Meditacao'
import MeditacoesRepository, {
  IMeditacoesRepository
} from '../../repositories/MeditacoesRepository'

interface IGetAllMeditacoes {
  call(): Promise<Array<IMeditacao>>
}

export default class GetAllMeditacoes implements IGetAllMeditacoes {
  private meditacoesRepository: IMeditacoesRepository

  constructor() {
    this.meditacoesRepository = new MeditacoesRepository()
  }

  async call(): Promise<Array<IMeditacao>> {
    return await this.meditacoesRepository.getAll()
  }
}
