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
              fetchURL: 'http://localhost/api/PurchaseOrder/fetch'
            },
            PurchaseReturn: {
              fetchURL: 'http://localhost/api/PurchaseReturn/fetch'
            }
          },
          Order: {
            PurchaseOrder: {
              fetchURL: 'http://localhost/api/PurchaseOrder/fetch'
            },
            SalesOrder: {
              fetchURL: 'http://localhost:3000/SalesOrder'
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
