import { firestore } from '../firebase/firebase.config'
import Novidade, { INovidade } from '../entities/Novidade'
import NovidadeFactory from '../factories/NovidadeFactory'

export interface INovidadesRepository {
  getByDateAndPath(date: Date, path: string): Promise<Array<INovidade>>
}

export default class NovidadesRepository implements INovidadesRepository {
  private collection
  private factory

  constructor() {
    this.collection = firestore.collection('novidades')
    this.factory = new NovidadeFactory()
  }

  async getByDateAndPath(date: Date, path: string): Promise<Array<INovidade>> {
    const novidadesNoPeriodo = []
    try {
      const novidadeSnapshot = await this.collection
        .where('path', '==', path)
        .where('dataInicio', '<=', date)
        .orderBy('dataInicio', 'desc')
        .get()
      novidadeSnapshot.forEach(registroSnapshot => {
        novidadesNoPeriodo.push(this.factory.build(registroSnapshot))
      })
      return novidadesNoPeriodo.filter(novidade => novidade.dataFinal >= date)
    } catch (error) {
      throw new Error(
        'Ocorreu um erro inesperado ao buscar as novidades: ' + error
      )
    }
  }
  S
}
