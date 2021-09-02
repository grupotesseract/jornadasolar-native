import i18n from '../i18n'

export interface ErrosAuth {
  email?: string
  senha?: string
}

const { t } = i18n

export const getMessageFromCode = (code: string): ErrosAuth => {
  switch (code) {
    case 'auth/email-already-in-use':
      return { email: t('errosAuth.emailJaCadastrado') }
    case 'auth/invalid-email':
      return { email: t('errosAuth.emailInvalido') }
    case 'auth/weak-password':
      return { senha: t('errosAuth.senhaFraca') }
    case 'auth/wrong-password':
      return {
        senha: t('errosAuth.senhaErrada')
      }
    case 'auth/user-not-found':
      return { email: t('errosAuth.emailNaoEncontrado') }
    case 'auth/invalid-action-code':
      return {
        senha: t('errosAuth.linkExpirado')
      }
    default:
      return {}
  }
}
