<template>
  <a-card>
    <div :class="advanced ? 'search' : null">
      <div id="playerId"></div>
    </div>
  </a-card>
</template>

<script>
  export default {
    name: 'QueryList',
    data() {
      return {
        advanced: true,
        videoEvents: []
      }
    },
    created() {
      this.videoEvents = this.$store.getters['content/videoEvents']
      this.getVideo(this.videoEvents)
    },
    methods: {
      getVideo(events) {
        console.log(events, 'events')
        setTimeout(() => {
          /* eslint-disable */
          new rrwebPlayer({
            target: document.getElementById('playerId'), // 可以自定义 DOhtM 元素
            data: {
              events,
              width: 1020,
              unpackFn: rrweb.unpack
            }
          })
        }, 100)
      }
    }
  }
</script>

<style lang="less" scoped>
  #playerId {
    width: 90%;
    height: 90%;
    min-height: 800px;
  }
</style>
