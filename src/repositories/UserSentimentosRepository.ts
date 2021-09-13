import { firestore } from '../firebase/firebase.config'
import Sentimento, { ISentimento } from '../entities/Sentimento'

interface ICreateParameters {
  idSentimentoModelo?: string
  nome: string
  emojiUnicode: Array<string>
}

export interface IUserSentimentosRepository {
  add(params: ICreateParameters): Promise<ISentimento>
  getAll(): Promise<Array<Sentimento>>
}
export default class UserSentimentosRepository
  implements IUserSentimentosRepository
{
  private collection

  constructor(userId: string) {
    this.collection = firestore.collection(`user/${userId}/sentimentos`)
  }

  add(params: ICreateParameters): Promise<ISentimento> {
    const { nome, emojiUnicode, idSentimentoModelo } = params
    return this.collection.add({
      idSentimentoModelo,
      nome,
      emojiUnicode
    })
  }

  async getAll(): Promise<Array<Sentimento>> {
    try {
      const querySnapshot = await this.collection.get()
      const sentimentos = []
      querySnapshot.forEach(sentimento => {
        const dados = sentimento.data()
        sentimentos.push({ id: sentimento.id, ...dados })
      })

      return sentimentos.map(sentimento => new Sentimento(sentimento))
    } catch (e) {
      throw new Error(
        'Ocorreu um erro inesperado ao buscar os sentimentos do usuário.' + e
      )
    }
  }
}
