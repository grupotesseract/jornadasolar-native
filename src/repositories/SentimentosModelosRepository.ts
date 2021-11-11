import Sentimento from '../entities/Sentimento'
import { firestore } from '../firebase/firebase.config'

export interface ISentimentosModelosRepository {
  getAll(idIdioma?: string): Promise<Array<Sentimento>>
}

export default class SentimentosModelosRepository
  implements ISentimentosModelosRepository
{
  private collection

  constructor() {
    this.collection = firestore.collection('sentimentosModelos')
  }

  async getAll(idIdioma?: string): Promise<Array<Sentimento>> {
    try {
      if (idIdioma) {
        this.collection = firestore.collection(
          `modelos/${idIdioma}/sentimentosModelos`
        )
      }

      const querySnapshot = await this.collection.get()

      const sentimentosModelos: Sentimento[] = []

      querySnapshot.forEach(sentimento => {
        const dados = sentimento.data()

        const sentimentoModelo = {
          id: sentimento.id,
          nome: dados.nome,
          emojiUnicode: dados.emojiUnicode
        }

        sentimentosModelos.push(new Sentimento(sentimentoModelo))
      })
      return sentimentosModelos
    } catch (e) {
      throw new Error(
        'Ocorreu um erro inesperado ao buscar os sentimentos modelos.' + e
      )
    }
  }
}
