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

export { TiposAlerta, AlertProps, registroSucesso, registroFalha }
