import { ICanalDeNotificacao } from '../../entities/CanalDeNotificacao'
import CanalDeNotificacaoRepository, {
  ICanalDeNotificacaoRepository
} from '../../repositories/CanalDeNotificacaoRepository'

interface IGetAll {
  call(): Promise<Array<ICanalDeNotificacao>>
}

export default class GetAllCanais implements IGetAll {
  private canaisRepository: ICanalDeNotificacaoRepository

  constructor() {
    this.canaisRepository = new CanalDeNotificacaoRepository()
  }

  async call(): Promise<Array<ICanalDeNotificacao>> {
    const canais = await this.canaisRepository.getCanais()
    return canais
  }
}
