import { useEffect, useState } from 'react'
import { IRegistro } from '../entities/Registro'
import { lastDayOfMonth, startOfMonth } from 'date-fns'
import GetRegistrosByMonth from '../services/registros/GetRegistrosByMonth'

interface IParameters {
  userId: string
  mes: Date
  focus: boolean
}

interface IResult {
  diarios: Array<IRegistro>
  loading: boolean
}

const useRegistrosByMonth = ({ userId, mes, focus }: IParameters): IResult => {
  const initialData = { loading: true, diarios: null }
  const [data, setData] = useState(initialData)
  const startDate = startOfMonth(mes)
  const endDate = lastDayOfMonth(mes)

  const buscar = async () => {
    await setData(initialData)
    const diarios = await new GetRegistrosByMonth().call(
      userId,
      startDate,
      endDate
    )

    setData({ loading: false, diarios })
  }

  useEffect(() => {
    if (focus) {
      buscar()
    }
  }, [userId, mes.toString(), focus])

  return data
}

export default useRegistrosByMonth
