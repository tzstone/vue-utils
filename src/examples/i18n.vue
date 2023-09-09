<template>
  <div>
    组件内多语言配置
    <p>{{ $t('name') }}</p>
    <p>{{ $t('hello') }}</p>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  i18n: {
    messages: {
      en: { name: 'name' },
      zh: { name: '姓名' }
    }
  },
  mounted() {
    console.log(this)
    const messages = {
      en: { hello: '组件内 hello world' },
      zh: { hello: '组件内 你好 世界' }
    }
    setTimeout(() => {
      Object.entries(messages).forEach(([locale, message]) => {
        const curMessage = this.$i18n.getLocaleMessage(locale)
        this.$i18n.setLocaleMessage(locale, { ...curMessage, ...message })
      })
    }, 500)
  },
  methods: {}
}
</script>

<style lang="less" scoped></style>
