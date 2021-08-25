import { ISentimento } from '../../entities/Sentimento'
import SentimentosRepository from '../../repositories/UserSentimentosRepository'

interface ICreateParameters {
  idSentimentoModelo?: string
  nome: string
  emojiUnicode: Array<string>
}

interface ICreateUserSentimentos {
  call(params: ICreateParameters): Promise<ISentimento>
}

export default class CreateUserSentimentos implements ICreateUserSentimentos {
  private sentimentosRepository

  constructor(userId: string) {
    this.sentimentosRepository = new SentimentosRepository(userId)
  }

  async call(params: ICreateParameters): Promise<ISentimento> {
    console.log('parametros ', params)

    return await this.sentimentosRepository.add(params)
  }
}
