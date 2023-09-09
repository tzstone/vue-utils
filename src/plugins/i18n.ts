import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh',
  fallbackLocale: 'zh',
  messages: {
    en: {
      hello: 'hello'
    },
    zh: {
      hello: '你好'
    }
    // ...
  }
})

export default {
  vueInstanceOption: {
    i18n
  }
}
