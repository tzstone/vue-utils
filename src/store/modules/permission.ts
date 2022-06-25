export default {
  state: {
    hasPermission: true
  },
  mutations: {
    togglePermission(state) {
      state.hasPermission = !state.hasPermission
    }
  },
  actions: {}
}
