import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false
// axios发送请求携带cookie
axios.defaults.withCredentials = true

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
