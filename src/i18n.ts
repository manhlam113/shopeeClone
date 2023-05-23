import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HOME_VI from './locales/vi/home.json'
import HOME_EN from './locales/en/home.json'
export const currentLanguageObj = {
  vi: 'Tiếng Việt',
  en: 'English'
}
const resources = {
  en: {
    translation: HOME_EN
  },
  vi: {
    translation: HOME_VI
  }
}

// eslint-disable-next-line import/no-named-as-default-member
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'vi',

    // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export default i18n
