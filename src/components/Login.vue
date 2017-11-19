<template>
  <div>

    <div class="logo-div">
      <img class="logo-png" src="../assets/logo.png">
      九五尊易-ERP
    </div>
    <group title="身份认证/Identity" title-color="black">
      <x-input title="账号名/Account" v-model="user.userName" type="text" required
               placeholder="请填写用户名或注册邮箱"></x-input>
      <x-input title="密码/Password" v-model="user.userPassword" type="password" required
               placeholder="请填写账号密码"></x-input>
      <x-button type="primary" :disable="loginLoading" :show-loading="loginLoading" :text="loginText"
                @click.native="loginClick"></x-button>
    </group>

  </div>

</template>

<script>
  import { XButton, AlertModule, Group, XInput } from 'vux'

  export default {
    components: {
      XButton,
      Group,
      XInput
    },
    name: 'login',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        loginText: '登录/Login',
        loginLoading: false
      }
    },
    created () {
      // load the detail main data
//            self.checkAdminRight();
//    this.$http.post('/staff/validate', {
//      userName: 'wenjin',
//      userpwd: 'w123456'
//    }).then(res => {
//      console.log(JSON.stringify(res.data))
//    })
    },
    methods: {
      loginClick () {
        if (this.user.userName === '' || this.user.userPassword === '') {
          AlertModule.show({
            title: '警告/Warning',
            content: '请完整输入账号和密码<br />Check the username and password',
            buttonText: '返回'
//          onShow () {
//            console.log('Module: I\'m showing')
//          },
//          onHide () {
//            console.log('Module: I\'m hiding now')
//          }
          })
        } else {
          this.loginLoading = true
          this.loginText = 'Processing'
//          this.$http.post('/staff/validate', {
//            userName: 'wenjin',
//            userpwd: 'w123456'
//          }).then(res => {
//            console.log(JSON.stringify(res.data))
//          })
//          let loginRes = {
//            userName: 'wenjin',
//            userPassword: 'testpassword'
//          }
        }
        this.$emit('resLogin', {
          userName: 'wenjin',
          userPassword: 'testpassword',
          email: 'test@trest',
          mobile: 12332112321
        })
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
