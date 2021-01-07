import './bootstrap'
import Vue from 'vue'
// ルーティングの定義をインポートする
import router from './router'
// Vuexストアをインポートする
import store from './store'
// ルートコンポーネントをインポートする
import App from './App.vue'

const createApp = async () => {
  await store.dispatch('auth/currentUser')

  new Vue({
    el: '#app',
    // ルーティングの定義を読み込む
    router,
    // Vuexストアを読み込む
    store,
    // ルートコンポーネントの使用を宣言する
    components: { App },
    // ルートコンポーネントを描画する
    template: '<App />'
  })
}

createApp()