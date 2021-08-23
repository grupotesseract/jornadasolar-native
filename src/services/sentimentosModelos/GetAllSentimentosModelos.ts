import Sentimento from '../../entities/Sentimento'
import SentimentosModelosRepository, {
  ISentimentosModelosRepository
} from '../../repositories/SentimentosModelosRepository'

interface IGetAll {
  call(): Promise<Array<Sentimento>>
}
export default class GetAllSentimentosModelos implements IGetAll {
  private sentimentosModelosRepository: ISentimentosModelosRepository

  constructor() {
    this.sentimentosModelosRepository = new SentimentosModelosRepository()
  }

  async call(): Promise<Array<Sentimento>> {
    const Sentimentos = await this.sentimentosModelosRepository.getAll()
    return Sentimentos
  }
}
