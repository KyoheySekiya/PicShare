import { OK, UNPROCESSABLE_ENTITY } from '../util'

// ステート・ゲッター・ミューテーション・アクションを定義してストアオブジェクトとしてエクスポート
// これが認証したユーザのデータが入るストアになる

const state = {
  // ログイン済みユーザーを保持する user ステート
  user: null,
  // API 呼び出しが成功したか失敗したかを表す apiStatus ステート
  apiStatus: null,
  // エラーメッセージを入れる loginErrorMessages ステート
  loginErrorMessages: null
}

const getters = {
  check: state => !! state.user,
  username: state => state.user ? state.user.name : ''
}

  // 各ステートの値を更新するミューテーションをセット
const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setApiStatus (state, status) {
    state.apiStatus = status
  },
  setLoginErrorMessages (state, messages) {
    state.loginErrorMessages = messages
  }
}

const actions = {
  // 会員登録APIを呼び出す registerアクション
  async register (context, data) {
    const response = await axios.post('/api/register', data)
    context.commit('setUser', response.data)
  },
  // ログインAPIを呼び出す loginアクション
  async login (context, data) {
    // 最初はnull
    context.commit('setApiStatus', null)
    const response = await axios.post('/api/login', data)
      .catch(err => err.response || err)

    if (response.status === OK) {
      // 成功したらtrue
      context.commit('setApiStatus', true)
      context.commit('setUser', response.data)
      return false
    }
    // 失敗だったらfalse
    context.commit('setApiStatus', false)
    // ステータスコードが UNPROCESSABLE_ENTITY の場合の分岐
    if (response.status === UNPROCESSABLE_ENTITY) {
      context.commit('setLoginErrorMessages', response.data.errors)
    } else {
      context.commit('error/setCode', response.status, { root: true })
    }
  },

  // ログアウトAPIを呼び出す logoutアクション
  async logout (context) {
    const response = await axios.post('/api/logout')
    context.commit('setUser', null)
  },
  // ログインユーザーAPIを呼び出す currentUserアクション
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