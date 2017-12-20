<template>
  <div class="wrapper">
    <v-header :user="user" @reset="resetUser"></v-header>
    <div class="content">
      <transition name="move" mode="out-in">
        <router-view :config="config" :user="user" :operations="operations" @resLoginUser="resLogin"></router-view>
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
          isLogin: false,
          userName: '',
          password: '',
          name: '',
          email: '',
          mobile: ''
        },
        operations: {
          purchaseOrder: {
            getAllUrl: '/index.php/api/PurchaseOrder/getPurchaseOrders',
            createNewUrl: ''
          },
          salesOrder: {
            getAllUrl: '/index.php/api/SalesOrder/get',
            createNewUrl: ''
          }
        },
        config: {
          Staff: {
            validateURL: 'http://localhost/api/Staff/validate'
          },
          Order: {
            PurchaseOrder: {
              fetchURL: 'http://localhost:3000/PurchaseOrder'
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
    methods: {
      resLogin (resUser) {
        /**
         * resUser format: id userName name userpwd roleid status number mobile email lever rightids disable allowsms birthday commissionrate creatorId deptId description empId empType fullId leftDate parentId sex isDelete
         */
        // let tempStr = ''
        // for (let key in resUser) {
        //   tempStr += key + ' '
        // }
        // console.log(tempStr)
        this.user.isLogin = true
        this.user.userName = resUser.userName
        this.user.name = resUser.name
        this.user.userpwd = resUser.userpwd
        this.user.email = resUser.email
        this.user.mobile = resUser.mobile
      },
      resetUser () {
//        this.user = {
//          isLogin: false,
//          validateUrl: '/Staff/validate',
//          userName: '',
//          name: 'need login',
//          userpwd: '',
//          email: '',
//          mobil: ''
//        }
        this.user.isLogin = false
        this.user.userName = ''
        this.user.name = 'need login'
        this.user.userpwd = ''
        this.user.email = ''
        this.user.mobil = ''
      }
    }
  }
</script>
