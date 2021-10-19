import { ICanalDeNotificacao } from '../entities/CanalDeNotificacao'
import { firestore } from '../firebase/firebase.config'

export interface ICanalDeNotificacaoRepository {
  getCanais(): Promise<Array<ICanalDeNotificacao>>
}

export default class CanalDeNotificacaoRepository
  implements ICanalDeNotificacaoRepository
{
  private collection

  constructor() {
    this.collection = firestore.collection('canaisDeNotificacao')
  }
  async getCanais(): Promise<ICanalDeNotificacao[]> {
    try {
      const snapshot = await this.collection.get()

      const canais: ICanalDeNotificacao[] = []

      snapshot.forEach(canal => {
        canais.push({ id: canal.id, nome: canal.data().nome })
      })

      return canais
    } catch (error) {
      throw new Error(
        'Ocorreu um erro inesperado ao buscar os canais de notificação: ' +
          error
      )
    }
  }
}
