// import the original type declarations
import 'i18next'
// import all namespaces (for the default language, only)
import HOME_EN from './locales/en/home.json'
import HOME_VI from './locales/vi/home.json'

declare module 'i18next' {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: 'home'
    // custom resources type
    resources: {
      HOME_EN: typeof HOME_EN
      HOME_VI: typeof HOME_VI
    }
    // other
  }
}
