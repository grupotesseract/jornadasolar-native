import React, { createContext, useState } from 'react'
import { IGrupoDeHabitos } from '../entities/GrupoDeHabitos'

interface DadosCadastro {
  nome: string
  objetivos: string[]
  sentimentos: string[]
  gruposDeHabitos: IGrupoDeHabitos[]
}

interface CadastroContextData {
  salvaNome: (nome: string) => void
  salvaObjetivos: (objetivos: string[]) => void
  salvaSentimentos: (sentimentos: string[]) => void
  salvaGruposDeHabitos: (gruposDeHabitos: IGrupoDeHabitos[]) => void
  limparDados: () => void
  dadosCadastro: DadosCadastro
}

const CadastroContext = createContext<CadastroContextData>(
  {} as CadastroContextData
)

export const CadastroProvider: React.FC = ({ children }) => {
  const estadoInicial = {
    nome: '',
    objetivos: [],
    sentimentos: [],
    gruposDeHabitos: []
  }
  const [dadosCadastro, setDadosCadastro] =
    useState<DadosCadastro>(estadoInicial)

  const salvaNome = (nome: string) => {
    setDadosCadastro({ ...dadosCadastro, nome })
  }

  const salvaObjetivos = (objetivos: string[]) => {
    setDadosCadastro({ ...dadosCadastro, objetivos })
  }

  const salvaSentimentos = (sentimentos: string[]) => {
    setDadosCadastro({ ...dadosCadastro, sentimentos })
  }

  const salvaGruposDeHabitos = (gruposDeHabitos: IGrupoDeHabitos[]) => {
    setDadosCadastro({ ...dadosCadastro, gruposDeHabitos })
  }

  const limparDados = () => {
    setDadosCadastro(estadoInicial)
  }

  return (
    <CadastroContext.Provider
      value={{
        salvaNome,
        salvaObjetivos,
        salvaSentimentos,
        salvaGruposDeHabitos,
        limparDados,
        dadosCadastro
      }}
    >
      {children}
    </CadastroContext.Provider>
  )
}

export default CadastroContext
