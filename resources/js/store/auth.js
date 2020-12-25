// ステート・ゲッター・ミューテーション・アクションを定義してストアオブジェクトとしてエクスポート
// これが認証したユーザのデータが入るストアになる

const state = {}

const getters = {}

const mutations = {}

const actions = {}

export default {
  // モジュールに分けたときにステートやミューテーションの名前が被ってもモジュール名で区別できるように namespaced: true を指定
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}