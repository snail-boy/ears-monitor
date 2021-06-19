export default {
  namespaced: true,
  state: {
    videoEvents: null,
  },
  getters: {
    videoEvents: state => {
      return state.videoEvents
    },
  },
  mutations: {
    setVideoEvents (state, videoEvents) {
      state.videoEvents = videoEvents
    }
  }
}
