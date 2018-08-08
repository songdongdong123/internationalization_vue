import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Chinese from './chinese'
import English from './english'
import Spanish from './spanish'

Vue.use(VueI18n)

// let language = localStorage.getItem('ELEMENT_LANGUAGE') ? localStorage.getItem('ELEMENT_LANGUAGE') : 'mx'
const language = 'mx'
// if (navigator.language && navigator.language === 'zh-CN') {
//   language = 'zh'
// } else {
//   language = 'mx'
// }
export default new VueI18n({
  locale: language,
  fallbackLocale: language,
  messages: {
    zh: Chinese,
    en: English,
    mx: Spanish
  }
})
