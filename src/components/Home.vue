<template>
  <div class="wrapper">
    <v-header :user="user" @reset="resetUser"></v-header>
    <div class="content">
      <transition name="move" mode="out-in">
        <router-view :config="config" :user="user" @resLoginUser="resLogin"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import vHeader from './Header.vue'

  export default {
    data () {
      return {
        user: {
          isLogin: false
        },
        config: {
          Staff: {
            validateURL: 'http://localhost/api/Staff/validate'
          },
          Purchase: {
            PurchaseOrder: {
              fetchURL: 'http://localhost/api/PurchaseOrder/fetch',
              detailURL: 'http://localhost/api/PurchaseOrder/detail'
            },
            PurchaseReturn: {
              fetchURL: 'http://localhost/api/PurchaseReturn/fetch'
            }
          },
          Sales: {
            SalesQuote: {
              fetchURL: 'http://localhost/api/SalesQuote/fetch'
            },
            SalesOrder: {
              fetchURL: 'http://localhost/api/SalesOrder/fetch'
            },
            SalesReturn: {
              fetchURL: 'http://localhost/api/SalesReturn/fetch'
            }
          },
          Warehouse: {
            AllocationList: {
              fetchURL: 'http://localhost/api/AllocationList/fetch'
            },
            PurchaseInbound: {
              fetchURL: 'http://localhost/api/PurchaseInbound/fetch'
            },
            SalesOutbound: {
              fetchURL: 'http://localhost/api/SalesOutbound/fetch'
            },
            OtherInbound: {
              fetchURL: 'http://localhost/api/OtherInbound/fetch'
            },
            OtherOutbound: {
              fetchURL: 'http://localhost/api/OtherOutbound/fetch'
            }
          }
        }
      }
    },
    components: {
      vHeader
    },
    created () {
      this.resetUser()
    },
    methods: {
      resLogin (resUser) {
        /**
         * resUser format: id userName name userpwd roleid status number mobile email lever rightids disable allowsms birthday commissionrate creatorId deptId description empId empType fullId leftDate parentId sex isDelete
         */
        this.user.isLogin = true
        this.user.userName = resUser.userName
        this.user.name = resUser.name
        this.user.password = resUser.userpwd
        this.user.email = resUser.email
        this.user.mobile = resUser.mobile
      },
      resetUser () {
        this.user.isLogin = false
        this.user.userName = ''
        this.user.name = ''
        this.user.password = ''
        this.user.email = ''
        this.user.mobile = ''
      }
    }
  }
</script>
