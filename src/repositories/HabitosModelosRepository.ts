import { IHabito } from '../entities/Habito'
import { firestore } from '../firebase/firebase.config'

export interface IHabitosModelosRepository {
  getAll(): Promise<Array<IHabito>>
}

export default class HabitosModelosRepository
  implements IHabitosModelosRepository
{
  private collection

  constructor(grupoDeHabitoModeloId: string) {
    this.collection = firestore.collection(
      `gruposDeHabitosModelos/${grupoDeHabitoModeloId}/habitosModelos`
    )
  }

  async getAll(): Promise<Array<IHabito>> {
    try {
      const habitosModelosSnapshot = await this.collection
        .orderBy('posicao', 'asc')
        .get()
      const habitos = []
      habitosModelosSnapshot.forEach(habitoModelo => {
        const habitoModeloData = habitoModelo.data()
        const habito = {
          id: habitoModelo.id,
          nome: habitoModeloData.nome,
          emojiUnicode: habitoModeloData.emojiUnicode,
          posicao: habitoModeloData.posicao
        }

        habitos.push(habito)
      })

      return habitos
    } catch (e) {
      throw new Error(
        'Ocorreu um erro inesperado ao buscar os hábitos modelos' + e
      )
    }
  }
}
