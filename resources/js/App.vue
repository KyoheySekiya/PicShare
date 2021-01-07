<template>
  <div>
    <header>
      <Navbar />
    </header>
    <main>
      <div class="container">
        <RouterView />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navar.vue'
import Footer from './components/Footer.vue'
import { INTERNAL_SERVER_ERROR } from './util'

export default {
  components: {
    Navbar,
    Footer
  },
  // errorストアのステートを算出プロパティで参照した上で watch で監視する
  computed: {
    errorCode () {
      return this.$store.state.error.code
    }
  },
  watch: {
    errorCode: {
      handler (val) {
        if (val === INTERNAL_SERVER_ERROR) {
          this.$router.pusf('/500')
        }
      },
      immediate: true
    },
    $route () {
      this.$store.commit('error/serCode', null)
    }
  }
}
</script>

<style>

</style>