import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Login from '@/components/Login'
import Index from '@/components/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Home'
    },
    {
      name: 'Home',
      path: '/Home',
      component: Home,
      children: [
        {
          name: 'Login',
          path: '/',
          component: Login
        },
        {
          name: 'Index',
          path: '/Index',
          component: Index
        },
        {
          path: '*',
          redirect: '/'
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
