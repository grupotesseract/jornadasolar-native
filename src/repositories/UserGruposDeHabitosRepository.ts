import GrupoDeHabitos, { IGrupoDeHabitos } from '../entities/GrupoDeHabitos'
import Habito from '../entities/Habito'
import { firestore } from '../firebase/firebase.config'

export interface IUserGrupoRepository {
  add(grupoDeHabitos: IGrupoDeHabitos): Promise<void>
  getAll(): Promise<IGrupoDeHabitos[]>
}

export default class UserGrupoDeHabitosRepository
  implements IUserGrupoRepository
{
  private collection
  private userId

  constructor(userId: string) {
    this.collection = firestore.collection(`user/${userId}/gruposDeHabitos`)
    this.userId = userId
  }

  async add(grupoDeHabitos: IGrupoDeHabitos): Promise<void> {
    const { id, nome, posicao, habitos } = grupoDeHabitos
    await this.collection
      .add({
        idDoGrupoModelo: id,
        nome,
        posicao
      })
      .then(docRef => {
        if (habitos.length > 0) {
          habitos.forEach(habito =>
            firestore
              .collection(
                `user/${this.userId}/gruposDeHabitos/${docRef.id}/habitos`
              )
              .add({
                idDoHabitoModelo: habito.id,
                nome: habito.nome,
                emojiUnicode: habito.emojiUnicode,
                posicao: habito.posicao
              })
          )
        }
      })
      .catch(error => {
        throw new Error(
          'Ocorreu um erro inesperado ao criar o grupo de hábitos.' + error
        )
      })
  }

  async getAll(): Promise<IGrupoDeHabitos[]> {
    try {
      const querySnapshot = await this.collection
        .orderBy('posicao', 'asc')
        .get()

      const gruposDeHabitos = []

      querySnapshot.forEach(grupoDeHabitoSnapshot => {
        const grupoDeHabitosData = grupoDeHabitoSnapshot.data()

        const grupoDeHabitos = {
          id: grupoDeHabitoSnapshot.id,
          idDoGrupoModelo: grupoDeHabitosData.idDoGrupoModelo,
          nome: grupoDeHabitosData.nome,
          posicao: grupoDeHabitosData.posicao
        }

        gruposDeHabitos.push(grupoDeHabitos)
      })

      for (let index = 0; index < gruposDeHabitos.length; index++) {
        const nomeOuPosicao =
          gruposDeHabitos[index].nome.toLowerCase() === 'personalizados'
            ? 'nome'
            : 'posicao'
        const grupoDeHabitos = gruposDeHabitos[index]
        const habitosSnapshot = await this.collection
          .doc(grupoDeHabitos.id)
          .collection('habitos')
          .orderBy(nomeOuPosicao, 'asc')
          .get()
        const habitos = []
        habitosSnapshot.forEach(habitoSnapshot => {
          const habitoData = habitoSnapshot.data()
          const habito = {
            id: habitoSnapshot.id,
            idDoHabitoModelo: habitoData.idDoHabitoModelo || null,
            nome: habitoData.nome,
            emojiUnicode: habitoData.emojiUnicode,
            posicao: habitoData.posicao
          }
          habitos.push(new Habito(habito))
        })
        grupoDeHabitos.habitos = habitos
      }

      return gruposDeHabitos.map(grupo => new GrupoDeHabitos(grupo))
    } catch (e) {
      throw new Error(
        'Ocorreu um erro inesperado ao buscar os grupos de hábitos.'
      )
    }
  }
}
