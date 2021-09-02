import { firestore } from '../firebase/firebase.config'
import { IGrupoDeHabitos } from '../entities/GrupoDeHabitos'

export interface ICreateParameters {
  date: Date
  userId: string
  sentimentos?: Array<string>
  gruposDeHabitos?: Array<IGrupoDeHabitos>
  anotacoes?: string
}

interface IUpdateParameters extends ICreateParameters {
  id: string
  attributes: string
}

export interface IRegistrosRepository {
  add(params): boolean
  update(params): boolean
}

export default class RegistrosRepository implements IRegistrosRepository {
  private collection

  constructor() {
    this.collection = firestore.collection('diario')
  }

  add(attributes: ICreateParameters): boolean {
    try {
      this.collection.add(attributes)
      return true
    } catch (e) {
      throw new Error('Ocorreu um erro inesperado ao criar o registro do dia.')
    }
  }

  update({ id, attributes }: IUpdateParameters): boolean {
    try {
      this.collection.doc(id).update(attributes)
      return true
    } catch {
      throw new Error(
        'Ocorreu um erro inesperado ao atualizar o registro do dia.'
      )
    }
  }
}
