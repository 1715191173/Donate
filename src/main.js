import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs';
import globalVar from './store/global_var.js'

import $ from 'jquery'

Vue.prototype.$axios = axios
Vue.prototype.Global = globalVar
Vue.config.productionTip = false
// axios.defaults.baseURL = "http://ec.cauc.edu.cn:8088/axjz/"
axios.defaults.baseURL = "http://localhost:5050"
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  render: h => h(App)
})
