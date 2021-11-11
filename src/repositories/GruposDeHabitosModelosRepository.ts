import { IGrupoDeHabitos } from '../entities/GrupoDeHabitos'
import GelAllHabitosModelos from '../services/habitosModelos/GetAllHabitosModelos'
import { firestore } from '../firebase/firebase.config'
import Habito from '../entities/Habito'

export interface IGruposDeHabitosModelosRepository {
  getAll(idIdioma?: string): Promise<Array<IGrupoDeHabitos>>
}

export default class GruposDeHabitosModelosRepository
  implements IGruposDeHabitosModelosRepository
{
  private collection

  constructor() {
    this.collection = firestore.collection('gruposDeHabitosModelos')
  }

  async getAll(idIdioma?: string): Promise<Array<IGrupoDeHabitos>> {
    try {
      if (idIdioma) {
        this.collection = firestore.collection(
          `modelos/${idIdioma}/gruposDeHabitosModelos`
        )
      }

      const querySnapshot = await this.collection
        .orderBy('posicao', 'asc')
        .get()

      const gruposDeHabitosModelos = []

      querySnapshot.forEach(grupoDeHabitoModelo => {
        const grupoDeHabitosModeloData = grupoDeHabitoModelo.data()

        const grupoDeHabitosModelo = {
          id: grupoDeHabitoModelo.id,
          nome: grupoDeHabitosModeloData.nome,
          posicao: grupoDeHabitosModeloData.posicao,
          habitos: []
        }

        gruposDeHabitosModelos.push(grupoDeHabitosModelo)
      })

      for (let index = 0; index < gruposDeHabitosModelos.length; index++) {
        const grupoDeHabitosModelo = gruposDeHabitosModelos[index]

        const habitos = await new GelAllHabitosModelos(
          grupoDeHabitosModelo.id
        ).call(idIdioma)
        grupoDeHabitosModelo.habitos = habitos.map(
          habitos => new Habito(habitos)
        )
      }

      return gruposDeHabitosModelos
    } catch (e) {
      throw new Error(
        'Ocorreu um erro inesperado ao buscar os grupos de hábitos modelos.' + e
      )
    }
  }
}
