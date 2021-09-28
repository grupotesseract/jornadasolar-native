import { firestore } from '../firebase/firebase.config'
import { IMeditacao } from '../entities/Meditacao'

export interface IMeditacoesRepository {
  getById(id: string): Promise<IMeditacao>
  getAll(): Promise<Array<IMeditacao>>
}

export default class MeditacoesRepository implements IMeditacoesRepository {
  private collection

  constructor() {
    this.collection = firestore.collection('meditacoes')
  }

  async getById(id: string): Promise<IMeditacao> {
    try {
      const documentSnapshot = await this.collection.doc(id).get()
      const meditacaoData = documentSnapshot.data()
      const meditacao = {
        id: documentSnapshot.id,
        nome: meditacaoData.nome,
        url: meditacaoData.url,
        data: meditacaoData.data.toDate()
      }

      return meditacao
    } catch {
      throw new Error('Ocorreu um erro inesperado ao buscar meditação.')
    }
  }

  async getAll(): Promise<Array<IMeditacao>> {
    try {
      const querySnapshot = await firestore
        .collection('meditacoes')
        .orderBy('data', 'desc')
        .get()
      const meditacoes = []
      querySnapshot.forEach(meditacaoSnapshot => {
        const meditacaoData = meditacaoSnapshot.data()
        const meditacao = {
          id: meditacaoSnapshot.id,
          nome: meditacaoData.nome,
          url: meditacaoData.url,
          data: meditacaoData.data.toDate()
        }

        meditacoes.push(meditacao)
      })

      return meditacoes
    } catch {
      throw new Error('Ocorreu um erro inesperado ao buscar as meditações.')
    }
  }
}
