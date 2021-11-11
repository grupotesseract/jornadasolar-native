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

const idiomaDispositivo = locale.slice(0, 2)

const idiomasSuportados = ['pt', 'en']

// exporta o idioma que a internacionalização está usando
// pode ser diferente do idioma do dispositivo no caso de o dispositivo não estar em um idioma suportado
const idiomaAtual = idiomasSuportados.includes(idiomaDispositivo)
  ? idiomaDispositivo
  : 'pt'

const dateLocale = locale.startsWith('en') ? enUS : ptBR

export default i18n

export { idiomaAtual, dateLocale }
