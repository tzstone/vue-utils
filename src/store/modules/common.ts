export default {
  state: {
    count: 0,
    cachePageNames: []
  },
  mutations: {
    ADD(state) {
      state.count++
    },
    addCachePageName(state, name) {
      state.cachePageNames.push(name)
    },
    deleteCachePageName(state, name) {
      state.cachePageNames = state.cachePageNames.filter(t => t != name)
    }
  },
  actions: {}
}
