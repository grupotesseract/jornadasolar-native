import i18n from '../i18n'

enum TiposAlerta {
  Sucesso = 'Sucesso',
  Falha = 'Falha'
}

interface AlertProps {
  tipo: TiposAlerta
  texto: string
}

const { t } = i18n

const registroSucesso: AlertProps = {
  tipo: TiposAlerta.Sucesso,
  texto: t('mensagensAlerta.registroSucesso')
}

const registroFalha: AlertProps = {
  tipo: TiposAlerta.Falha,
  texto: t('mensagensAlerta.registroFalha')
}

const atualizacaoSucesso = (item: string): AlertProps => {
  return {
    tipo: TiposAlerta.Sucesso,
    texto: t('mensagensAlerta.atualizacaoSucesso', { tipo: item.toLowerCase() })
  }
}
const atualizacaoFalha = (item: string): AlertProps => {
  return {
    tipo: TiposAlerta.Falha,
    texto: t('mensagensAlerta.atualizacaoFalha', { tipo: item.toLowerCase() })
  }
}
const criacaoFalha = (item: string): AlertProps => {
  return {
    tipo: TiposAlerta.Falha,
    texto: t('mensagensAlerta.criacaoFalha', { tipo: item.toLowerCase() })
  }
}
const senhaAlteradaSucesso = (): AlertProps => {
  return {
    tipo: TiposAlerta.Sucesso,
    texto: t('mensagensAlerta.alteracaoSenhaSucesso')
  }
}

export {
  TiposAlerta,
  AlertProps,
  registroSucesso,
  registroFalha,
  atualizacaoSucesso,
  atualizacaoFalha,
  criacaoFalha,
  senhaAlteradaSucesso
}
