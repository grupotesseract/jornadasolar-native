import { ISentimento } from '../../entities/Sentimento'
import SentimentosRepository from '../../repositories/UserSentimentosRepository'

interface IUpdateUserSentimentos {
  call(sentimento: ISentimento): Promise<ISentimento>
}

export default class UpdateUserSentimentos implements IUpdateUserSentimentos {
  private sentimentosRepository

  constructor(userId: string) {
    this.sentimentosRepository = new SentimentosRepository(userId)
  }

  async call(sentimento: ISentimento): Promise<ISentimento> {
    return await this.sentimentosRepository.update(sentimento)
  }
}
