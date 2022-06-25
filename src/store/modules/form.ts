import { getField, updateField } from '@/utils'

export default {
  namespaced: true,
  state: {
    arr: [{ name: 1 }, { name: 2 }],
    info: {
      name: '',
      address: '',
      company: {
        name: 'apple'
      }
    },
    id: ''
  },
  getters: {
    getField
  },
  mutations: {
    updateField,
    SET_FORM(state, payload) {
      state.id = payload.id
      state.info = payload.info
    }
  },
  actions: {}
}
