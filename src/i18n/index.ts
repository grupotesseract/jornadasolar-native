import pt from './translations/pt'
import en from './translations/en'
import * as Localization from 'expo-localization'
import i18n from 'i18n-js'

i18n.translations = {
  en,
  pt
}
i18n.defaultLocale = 'pt-BR'

// Acessa o idioma do sistema
i18n.locale = Localization.locale

// Quando uma chave não estiver presente em um idioma, usa o idioma padrão
i18n.fallbacks = true

export default i18n
