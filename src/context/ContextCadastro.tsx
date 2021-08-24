import React from 'react'
import { createContext, useState } from 'react'
import { IGrupoDeHabitos } from '../entities/GrupoDeHabitos'
import { ISentimento } from '../entities/Sentimento'

interface DadosCadastro {
  nome: string
  objetivos: string[]
  sentimentos: ISentimento[]
  gruposDeHabitos: IGrupoDeHabitos[]
}

interface CadastroContextData {
  AvancoParaEtapa2: (nome: string) => void
  AvancoParaEtapa3: (objetivos: string[]) => void
  AvancoParaEtapa4: (sentimentos: ISentimento[]) => void
  AvancoParaEtapa5: (gruposDeHabitos: IGrupoDeHabitos[]) => void
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

  const AvancoParaEtapa2 = (nome: string) => {
    setDadosCadastro({ ...dadosCadastro, nome })
  }

  const AvancoParaEtapa3 = (objetivos: string[]) => {
    setDadosCadastro({ ...dadosCadastro, objetivos })
  }

  const AvancoParaEtapa4 = (sentimentos: ISentimento[]) => {
    setDadosCadastro({ ...dadosCadastro, sentimentos })
  }

  const AvancoParaEtapa5 = (gruposDeHabitos: IGrupoDeHabitos[]) => {
    setDadosCadastro({ ...dadosCadastro, gruposDeHabitos })
  }

  return (
    <CadastroContext.Provider
      value={{
        AvancoParaEtapa2,
        AvancoParaEtapa3,
        AvancoParaEtapa4,
        AvancoParaEtapa5,
        dadosCadastro
      }}
    >
      {children}
    </CadastroContext.Provider>
  )
}

export default CadastroContext
