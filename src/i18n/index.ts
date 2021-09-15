import pt from './translations/pt'
import en from './translations/en'
import { locale } from 'expo-localization'
import i18n from 'i18n-js'
import { enUS, ptBR } from 'date-fns/locale'

i18n.translations = {
  en,
  pt
}
i18n.defaultLocale = 'pt-BR'

// Acessa o idioma do sistema
i18n.locale = locale

// Quando uma chave não estiver presente em um idioma, usa o idioma padrão
i18n.fallbacks = true

export const dateLocale = locale.startsWith('pt') ? ptBR : enUS

export default i18n
