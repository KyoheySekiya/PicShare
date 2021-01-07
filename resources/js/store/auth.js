// ステート・ゲッター・ミューテーション・アクションを定義してストアオブジェクトとしてエクスポート
// これが認証したユーザのデータが入るストアになる

// ログイン済みユーザーを保持する user を追加
const state = {
  user: null
}

const getters = {
  check: state => !! state.user,
  username: state => state.user ? state.user.name : ''
}

// user ステートの値を更新する setUser を追加
const mutations = {
  setUser (state, user) {
    state.user = user
  }
}
// 会員登録 API を呼び出す register アクションを追加
const actions = {
  async register (context, data) {
    const response = await axios.post('/api/register', data)
    context.commit('setUser', response.data)
  },
  async login (context, data) {
    const response = await axios.post('/api/login', data)
    context.commit('setUser', response.data)
  },
  async logout (context) {
    const response = await axios.post('/api/logout')
    context.commit('setUser', null)
  }
}

export default {
  // モジュールに分けたときにステートやミューテーションの名前が被ってもモジュール名で区別できるように namespaced: true を指定
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}