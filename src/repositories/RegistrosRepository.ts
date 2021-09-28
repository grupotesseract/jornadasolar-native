import { firestore } from '../firebase/firebase.config'
import GrupoDeHabitos, { IGrupoDeHabitos } from '../entities/GrupoDeHabitos'
import Registro, { IRegistro } from '../entities/Registro'
import GetUserSentimentos from '../services/user/GetUserSentimentos'
import { endOfDay, startOfDay } from 'date-fns'
import GetGrupoDeHabitosTemplateByUserId from '../services/gruposDeHabitos/GetGrupoDeHabitosTemplateByUserId'

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
  getByDate(userId, date): Promise<IRegistro>
  getByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Array<IRegistro>>
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

  async getByDate(userId: string, date: Date): Promise<IRegistro> {
    const Registros = await this.getByDateRange(
      userId,
      startOfDay(date),
      endOfDay(date)
    )
    if (Registros) {
      return Registros[0]
    } else {
      return null
    }
  }

  async getByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Array<IRegistro>> {
    const registrosDoDia = []
    if (!userId) {
      return null
    }
    try {
      const gruposdeHabitosTemplate =
        await new GetGrupoDeHabitosTemplateByUserId().call({ userId })

      const sentimentosTemplate = await new GetUserSentimentos(userId).call()

      const querySnapshot = await this.collection
        .where('userId', '==', userId)
        .where('date', '>=', startDate)
        .where('date', '<=', endDate)
        .get()

      querySnapshot.forEach(RegistroSnapshot => {
        const registrosData = RegistroSnapshot.data()

        const gruposDeHabitosDoRegistro = (
          registrosData.gruposDeHabitos || []
        ).map(grupoDehabito => {
          const grupoDeHabitoDoUsuario = gruposdeHabitosTemplate.find(
            grupoDehabitoDoTemplate =>
              grupoDehabitoDoTemplate.nome.toLowerCase() ===
                grupoDehabito.nome.toLowerCase() ||
              grupoDehabitoDoTemplate.id === grupoDehabito.id
          )
          const habitos =
            grupoDehabito.habitos?.map(habito => {
              return grupoDeHabitoDoUsuario.habitos.find(
                habitoDoUsuario =>
                  habitoDoUsuario.id === habito ||
                  habitoDoUsuario.nome.toLowerCase() === habito.toLowerCase()
              )
            }) || []
          return new GrupoDeHabitos({
            id: grupoDeHabitoDoUsuario.id || '',
            nome: grupoDehabito.nome,
            habitos: habitos
          })
        })

        const sentimentosDoRegistro = (registrosData.sentimentos || []).map(
          sentimento => {
            const sentimentoDoUsuario = sentimentosTemplate.find(
              template =>
                template.nome === sentimento || template.id === sentimento
            )
            return sentimentoDoUsuario
          }
        )

        const registros = new Registro({
          id: RegistroSnapshot.id,
          date: registrosData.date.toDate(),
          sentimentos: sentimentosDoRegistro,
          gruposDeHabitos: gruposDeHabitosDoRegistro,
          anotacoes: registrosData.anotacoes
        })

        registrosDoDia.push(registros)
      })
      return registrosDoDia
    } catch {
      throw new Error(
        'Ocorreu um erro inesperado ao buscar os registros do dia.'
      )
    }
  }
}
