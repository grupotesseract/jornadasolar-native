import Sentimento from '../../entities/Sentimento'
import { idiomaAtual } from '../../i18n'
import SentimentosModelosRepository, {
  ISentimentosModelosRepository
} from '../../repositories/SentimentosModelosRepository'
import { GetIdIdioma } from '../GetIdIdioma'

interface IGetAll {
  call(): Promise<Array<Sentimento>>
}
export default class GetAllSentimentosModelos implements IGetAll {
  private sentimentosModelosRepository: ISentimentosModelosRepository

  constructor() {
    this.sentimentosModelosRepository = new SentimentosModelosRepository()
  }

  async call(): Promise<Array<Sentimento>> {
    const idIdioma = await new GetIdIdioma().call(idiomaAtual)
    const Sentimentos = await this.sentimentosModelosRepository.getAll(idIdioma)
    return Sentimentos
  }
}
