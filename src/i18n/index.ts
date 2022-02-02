import pt from './translations/pt'
import en from './translations/en'
import es from './translations/es'
import { locale } from 'expo-localization'
import i18n from 'i18n-js'
import { enUS, ptBR, es as esDate } from 'date-fns/locale'

i18n.translations = {
  en,
  pt,
  es
}
i18n.defaultLocale = 'pt-BR'

// Quando uma chave não estiver presente em um idioma, usa o idioma padrão
i18n.fallbacks = true

const idiomaDispositivo = locale.slice(0, 2)

const idiomasSuportados = ['pt', 'en', 'es']

// exporta o idioma que a internacionalização está usando
let idiomaAtual = idiomasSuportados.includes(idiomaDispositivo)
  ? idiomaDispositivo
  : 'pt'

i18n.locale = idiomaAtual

const dateFnsLocaleMap = {
  pt: ptBR,
  en: enUS,
  es: esDate
}

let dateLocale = dateFnsLocaleMap[idiomaAtual]

const setLocale = (localeCode: string) => {
  if (idiomasSuportados.includes(localeCode)) {
    i18n.locale = localeCode
    idiomaAtual = localeCode
    dateLocale = dateFnsLocaleMap[idiomaAtual]
  }
}

export default i18n

export { idiomasSuportados, idiomaAtual, dateLocale, setLocale }
