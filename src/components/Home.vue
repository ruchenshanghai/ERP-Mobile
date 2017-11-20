<template>
  <div class="wrapper">
    <v-header :user="user" @reset="resetUser"></v-header>
    <div class="content">
      <transition name="move" mode="out-in">
        <router-view :user="user" :operations="operations" @resLoginUser="resLogin"></router-view>
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
          validateUrl: '/index.php/Staff/validate',
          userName: '',
          name: 'need login',
          userpwd: '',
          email: '',
          mobil: ''
        },
        operations: {
          purchaseOrder: {
            getAllUrl: '/index.php/PurchaseOrder/getAllList',
            createNewUrl: ''
          }
        }
      }
    },
    components: {
      vHeader
    },
    methods: {
      resLogin (resUser) {
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
