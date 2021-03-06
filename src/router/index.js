import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Login from '@/components/Login'
import Index from '@/components/Index'
import PurchaseOrderQuery from '@/components/Purchase/PurchaseOrderQuery'
import PurchaseOrderDetail from '@/components/Purchase/PurchaseOrderDetail'
import PurchaseReturnQuery from '@/components/Purchase/PurchaseReturnQuery'

import SalesQuoteQuery from '@/components/Sales/SalesQuoteQuery'
import SalesQuoteDetail from '@/components/Sales/SalesQuoteDetail'
import SalesOrderQuery from '@/components/Sales/SalesOrderQuery'
import SalesOrderDetail from '@/components/Sales/SalesOrderDetail'
import SalesReturnQuery from '@/components/Sales/SalesReturnQuery'

import AllocationListQuery from '@/components/Warehouse/AllocationListQuery'
import PurchaseInboundQuery from '@/components/Warehouse/PurchaseInboundQuery'
import PurchaseInboundDetail from '@/components/Warehouse/PurchaseInboundDetail'
import SalesOutboundQuery from '@/components/Warehouse/SalesOutboundQuery'
import SalesOutboundDetail from '@/components/Warehouse/SalesOutboundDetail'
import OtherInboundQuery from '@/components/Warehouse/OtherInboundQuery'
import OtherInboundDetail from '@/components/Warehouse/OtherInboundDetail'
import OtherOutboundQuery from '@/components/Warehouse/OtherOutboundQuery'
import OtherOutboundDetail from '@/components/Warehouse/OtherOutboundDetail'

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
          name: 'PurchaseOrderDetail',
          path: '/PurchaseOrderDetail/:ID',
          component: PurchaseOrderDetail
        },
        {
          name: 'PurchaseReturnQuery',
          path: '/PurchaseReturnQuery',
          component: PurchaseReturnQuery
        },
        {
          name: 'SalesQuoteQuery',
          path: '/SalesQuoteQuery',
          component: SalesQuoteQuery
        },
        {
          name: 'SalesQuoteDetail',
          path: '/SalesQuoteDetail/:ID',
          component: SalesQuoteDetail
        },
        {
          name: 'SalesOrderQuery',
          path: '/SalesOrderQuery',
          component: SalesOrderQuery
        },
        {
          name: 'SalesOrderDetail',
          path: '/SalesOrderDetail/:ID',
          component: SalesOrderDetail
        },
        {
          name: 'SalesReturnQuery',
          path: '/SalesReturnQuery',
          component: SalesReturnQuery
        },
        {
          name: 'AllocationListQuery',
          path: '/AllocationListQuery',
          component: AllocationListQuery
        },
        {
          name: 'PurchaseInboundQuery',
          path: '/PurchaseInboundQuery',
          component: PurchaseInboundQuery
        },
        {
          name: 'PurchaseInboundDetail',
          path: '/PurchaseInboundDetail/:ID',
          component: PurchaseInboundDetail
        },
        {
          name: 'SalesOutboundQuery',
          path: '/SalesOutboundQuery',
          component: SalesOutboundQuery
        },
        {
          name: 'SalesOutboundDetail',
          path: '/SalesOutboundDetail/:ID',
          component: SalesOutboundDetail
        },
        {
          name: 'OtherInboundQuery',
          path: '/OtherInboundQuery',
          component: OtherInboundQuery
        },
        {
          name: 'OtherInboundDetail',
          path: '/OtherInboundDetail/:ID',
          component: OtherInboundDetail
        },
        {
          name: 'OtherOutboundQuery',
          path: '/OtherOutboundQuery',
          component: OtherOutboundQuery
        },
        {
          name: 'OtherOutboundDetail',
          path: '/OtherOutboundDetail/:ID',
          component: OtherOutboundDetail
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
