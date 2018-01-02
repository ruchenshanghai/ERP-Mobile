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
          AssistData: {
            fetchURL: '/index.php/api/AssistData/fetch'
          },
          Staff: {
            validateURL: '/index.php/api/Staff/validate'
          },
          Purchase: {
            PurchaseOrder: {
              fetchURL: '/index.php/api/PurchaseOrder/fetch',
              detailURL: '/index.php/api/PurchaseOrder/detail'
            },
            PurchaseReturn: {
              fetchURL: '/index.php/api/PurchaseReturn/fetch'
            }
          },
          Sales: {
            SalesQuote: {
              fetchURL: '/index.php/api/SalesQuote/fetch',
              detailURL: '/index.php/api/SalesQuote/detail'
            },
            SalesOrder: {
              fetchURL: '/index.php/api/SalesOrder/fetch',
              detailURL: '/index.php/api/SalesOrder/detail'
            },
            SalesReturn: {
              fetchURL: '/index.php/api/SalesReturn/fetch'
            }
          },
          Warehouse: {
            AllocationList: {
              fetchURL: '/index.php/api/AllocationList/fetch'
            },
            PurchaseInbound: {
              fetchURL: '/index.php/api/PurchaseInbound/fetch'
            },
            SalesOutbound: {
              fetchURL: '/index.php/api/SalesOutbound/fetch'
            },
            OtherInbound: {
              fetchURL: '/index.php/api/OtherInbound/fetch'
            },
            OtherOutbound: {
              fetchURL: '/index.php/api/OtherOutbound/fetch'
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
