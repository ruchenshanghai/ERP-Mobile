import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Login from '@/components/Login'
import Index from '@/components/Index'
import PurchaseOrderList from '@/components/PurchaseOrder/PurchaseOrderList'

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
          path: '/',
          redirect: '/Login'
        },
        {
          name: 'Login',
          path: '/Login',
          component: Login
        },
        {
          name: 'Index',
          path: '/Index',
          component: Index
        },
        {
          name: 'PurchaseOrderList',
          path: '/PurchaseOrderList',
          component: PurchaseOrderList
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
