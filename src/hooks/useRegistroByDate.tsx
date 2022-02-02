import { useEffect, useState } from 'react'
import { IRegistro } from '../entities/Registro'
import GetRegistroByDate from '../services/registros/GetRegistroByDate'

interface IParameters {
  userId: string
  date: Date
  focus: boolean
}

export interface IResult {
  registroDoDia: IRegistro
  loading: boolean
}

const useRegistroByDate = ({ userId, date, focus }: IParameters): IResult => {
  const initialData = { loading: true, registroDoDia: null }
  const [data, setData] = useState(initialData)

  const buscar = async () => {
    await setData(initialData)
    const registroDoDia = await new GetRegistroByDate().call(userId, date)
    setData({ loading: false, registroDoDia })
  }

  useEffect(() => {
    if (focus) {
      buscar()
    }
  }, [userId, date.toString(), focus])

  return data
}

export default useRegistroByDate
