import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import common from './modules/common'
import form from './modules/form'
import permission from './modules/permission'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    common,
    form,
    permission
  },
  getters
})

export default store
