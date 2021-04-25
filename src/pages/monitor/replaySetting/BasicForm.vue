<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
  </a-card>
</template>

<script>

export default {
  name: 'BasicForm',
  i18n: require('./i18n'),
  data () {
    return {
      value: 1
    }
  },
  computed: {
    desc() {
      return this.$t('pageDesc')
    }
  }
}
</script>

<style scoped>

</style>
