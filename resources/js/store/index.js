import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'

Vue.use(Vuex)

// ストアを作成する際に、インポートした auth.js をモジュールとして登録
const store = new Vuex.Store({
  modules: {
    auth
  }
})

export default store