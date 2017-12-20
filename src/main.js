// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { AjaxPlugin } from 'vux'
import ElementUI from 'element-ui'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/index'
import App from './App'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(AjaxPlugin)

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
