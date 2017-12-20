<template>
  <div>
    <x-header :left-options="header.leftOptions" :title="header.title" @on-click-back="headerLeftClick">
      <a slot="right" @click="headerRightClick">{{propUser.name}}
      </a></x-header>
    <div v-transfer-dom>
      <actionsheet :menus="arragneMenus" v-model="header.showMenus" show-cancel cancel-text="确定"
                   @on-click-menu-logout="menuLogoutClick"></actionsheet>
    </div>
  </div>

</template>

<script>
  import { XHeader, Actionsheet, TransferDom } from 'vux'

  export default {
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      Actionsheet
    },
    name: 'header',
    data () {
      return {
        propUser: this.user,
        header: {
          leftOptions: {
            showBack: true,
            backText: '主页',
            preventGoBack: true
          },
          rightOptions: {
            showMore: true
          },
          showMenus: false,
          title: ''
        }
      }
    },
    created () {
//      if (!this.propUser.isLogin) {
//        this.$router.push('/')
//      }
    },
    methods: {
      headerLeftClick () {
        this.$router.push('/Index')
      },
      headerRightClick () {
        this.header.showMenus = true
      },
//      menuClick (menuKey, menuItem) {
//        console.log(menuKey)
//        console.log(JSON.stringify(menuItem))
//      },
      menuLogoutClick () {
        console.log('log out')

        this.$emit('reset')
        this.$router.push('/Home')
      },
      arrangeTitle () {
        switch (this.$route.path) {
          case '/Login':
            this.header.title = '登录'
            break
          case '/Index':
            this.header.title = '主页'
            break
          case '/PurchaseOrderQuery':
            this.header.title = '查询采购订单'
            break
          case '/PurchaseReturnQuery':
            this.header.title = '查询退货单'
            break
          case '/CreatePurchaseOrder':
            this.header.title = '新增采购订单'
            break
          case '/SalesOrderList/SalesOrders':
            this.header.title = '查询销售订单'
            break
          case '/SalesOrderList/SalesQuotes':
            this.header.title = '查询销售报价单'
            break
          case '/SalesOrderList/SalesReturns':
            this.header.title = '查询销售退货单'
            break
        }
      }
    },
    computed: {
      arragneMenus () {
        if (this.propUser.isLogin) {
          return {
            userName: 'UserName: ' + this.propUser.userName,
            name: 'Name: ' + this.propUser.name,
            email: 'Email: ' + this.propUser.email,
            mobile: 'Mobile: ' + this.propUser.mobile,
            logout: '退出登录/Logout'
          }
        } else {
          return null
        }
      }
    },
    watch: {
      $route (to, from) {
        this.arrangeTitle()
      }
    },
    props: ['user']
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .logo-div {
    text-align: center;
    font-weight: bolder;
    font-size: xx-large;
    color: black;
  }

  .logo-png {
    margin: auto;
    padding: 10px;
    display: block;
  }
</style>
