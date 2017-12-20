import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Login from '@/components/Login'
import Index from '@/components/Index'
import PurchaseOrderQuery from '@/components/Purchase/PurchaseOrderQuery'
import PurchaseReturnQuery from '@/components/Purchase/PurchaseReturnQuery'

import SalesOrderList from '@/components/SalesOrder/SalesOrderList'

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
          name: 'PurchaseOrderQuery',
          path: '/PurchaseOrderQuery',
          component: PurchaseOrderQuery
        },
        {
          name: 'PurchaseReturnQuery',
          path: '/PurchaseReturnQuery',
          component: PurchaseReturnQuery
        },
        {
          name: 'SalesOrderList',
          path: '/SalesOrderList/:salesOrderType',
          component: SalesOrderList
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
