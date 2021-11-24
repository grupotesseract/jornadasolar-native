import { firestore } from '../firebase/firebase.config'

export interface IIdiomaRepository {
  getIdByIdioma(idioma: string): Promise<string>
}

export class IdiomaRepository implements IIdiomaRepository {
  private collection

  constructor() {
    this.collection = firestore.collection('modelos')
  }

  async getIdByIdioma(idioma: string): Promise<string> {
    try {
      const idiomaSnap = await this.collection
        .where('idioma', '==', idioma)
        .limit(1)
        .get()

      if (idiomaSnap.empty) {
        return ''
      } else {
        return idiomaSnap.docs[0].id
      }
    } catch (erro) {
      throw new Error('Houve um erro inesperado ao buscar os idiomas' + erro)
    }
  }
}
