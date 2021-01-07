import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import error from './error'

Vue.use(Vuex)

// ストアを作成する際に、インポートした auth.js をモジュールとして登録
const store = new Vuex.Store({
  modules: {
    auth,
    error
  }
})

export default store