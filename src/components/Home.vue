<template>
  <div class="wrapper">
    <v-header :user="user"></v-header>
    <div class="content">
      <transition name="move" mode="out-in">
        <router-view :user="user" @resLoginUser="resLogin"></router-view>
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
          validateUrl: '/staff/validate',
          userName: '',
          name: 'need login',
          userPassword: '',
          email: '',
          mobil: ''
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
        this.user.userPassword = resUser.userPassword
        this.user.email = resUser.email
        this.user.mobile = resUser.mobile
      }
    }
  }
</script>
