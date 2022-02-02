import Sentimento from '../../entities/Sentimento'
import UserSentimentosRepository, {
  IUserSentimentosRepository
} from '../../repositories/UserSentimentosRepository'
import GetAllSentimentosModelos from '../sentimentosModelos/GetAllSentimentosModelos'

interface IGetUserSentimentos {
  call(): Promise<Array<Sentimento>>
}
export default class GetUserSentimentos implements IGetUserSentimentos {
  private repository: IUserSentimentosRepository
  constructor(userId: string) {
    this.repository = new UserSentimentosRepository(userId)
  }

  async call(): Promise<Array<Sentimento>> {
    const SentimentosDoUsuario = await this.repository.getAll()
    const usuarioTemSentimentos = SentimentosDoUsuario.length > 0

    const Sentimentos = usuarioTemSentimentos
      ? SentimentosDoUsuario
      : await new GetAllSentimentosModelos().call()

    return Sentimentos
  }
}
