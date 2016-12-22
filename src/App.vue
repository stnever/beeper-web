<template>
  <div id="app">
    <navbar></navbar>
    <error-modal ref="errorModal"></error-modal>
    <div class="container-fluid main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue'
import ErrorModal from './components/ErrorModal.vue'

export default {
  name: 'app',
  components: {Navbar, ErrorModal},
  methods: {
    showErrorModal(err) {
      this.$refs.errorModal.show(err)
    }
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app > .main {
  position: absolute;
  top: 51px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  overflow-y: auto;
}
</style>
