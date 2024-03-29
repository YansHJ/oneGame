// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import vuetify from '@/plugins/vuetify'
import axios from 'axios'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'


Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  vuetify,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
