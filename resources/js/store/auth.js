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
const actions = {
  // 会員登録APIを呼び出す registerアクションを追加
  async register (context, data) {
    const response = await axios.post('/api/register', data)
    context.commit('setUser', response.data)
  },
  // ログインAPIを呼び出す loginアクションを追加
  async login (context, data) {
    const response = await axios.post('/api/login', data)
    context.commit('setUser', response.data)
  },
  // ログアウトAPIを呼び出す logoutアクションを追加
  async logout (context) {
    const response = await axios.post('/api/logout')
    context.commit('setUser', null)
  },
  // ログインユーザーAPIを呼び出す currentUserアクションを追加
  async currentUser (context) {
    const response = await axios.get('/api/user')
    const user = response.data || null
    context.commit('setUser', user)
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