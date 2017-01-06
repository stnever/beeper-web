import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Modal from './components/Modal.vue'
Vue.component('Modal', Modal)

import FormGroup from './components/FormGroup.vue'
Vue.component('FormGroup', FormGroup)

Vue.component('Toggle', require('./components/Toggle.vue'))
Vue.component('Pager', require('./components/Pager.vue'))

import App from './App.vue'
import routes from './pages'

const root = new Vue({
  router: new VueRouter({routes}),
  components: {App},
  template: '<App ref="theApp"></App>'
})

function errorHandler(err) {
  if ( err.status == 401 ) {
    window.location.href = '/login.html?reason=unauthorized'
  } else {
    root.$refs.theApp.showErrorModal(err)
    throw err
  }
}

import {Model} from './models'
Model.setDefaults({
  token: localStorage.getItem('beeper_web_token'),
  base: window.location.host.match('localhost')
    ? 'http://localhost:4444'
    : '',
  errorHandler: errorHandler
})

root.$mount('#app')
