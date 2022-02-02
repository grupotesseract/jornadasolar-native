import { firestore } from '../firebase/firebase.config'
import { IHabito } from '../entities/Habito'

interface ICreateParameters {
  nome: string
  emojiUnicode: Array<string>
}

export interface IUserHabitosRepository {
  add(params: ICreateParameters): Promise<IHabito>
  update(Habito: IHabito): Promise<void>
}
export default class UserHabitosRepository implements IUserHabitosRepository {
  private collection

  constructor(userId: string, idGrupo: string) {
    this.collection = firestore.collection(
      `user/${userId}/gruposDeHabitos/${idGrupo}/habitos`
    )
  }

  add(params: ICreateParameters): Promise<IHabito> {
    const { nome, emojiUnicode } = params
    return this.collection
      .add({
        nome,
        emojiUnicode
      })
      .catch(error => {
        throw new Error('Ocorreu um erro inesperado ao criar o Hábito' + error)
      })
  }

  async update(Habito: IHabito): Promise<void> {
    const { id } = Habito
    const { nome, emojiUnicode } = Habito
    await this.collection
      .doc(id)
      .update({ nome, emojiUnicode })
      .catch(error => {
        throw new Error(
          'Ocorreu um erro inesperado ao atualizar o Hábito' + error
        )
      })
  }
}
