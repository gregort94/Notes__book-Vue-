import Vue from 'vue'
import App from './App.vue'
import './scss/main.scss'

Vue.config.productionTip = false

import { store } from './store/'
import { router } from './routes'
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
