<template>
  <a-card>
    <div :class="advanced ? 'search' : null">

    </div>
  </a-card>
</template>

<script>

  export default {
    name: 'QueryList',
    data() {
      return {
        advanced: true,
      }
    },
    created() {
    },
    methods: {
    }
  }
</script>

<style lang="less" scoped>

</style>
