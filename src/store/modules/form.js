export default {
  state: {
    info: {
      name: '',
      address: '',
      company: {
        name: 'apple'
      }
    },
    id: ''
  },
  mutations: {
    SET_FORM(state, payload) {
      state.id = payload.id
      state.info = payload.info
    }
  },
  actions: {

  }
}
