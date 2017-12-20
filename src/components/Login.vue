<template>
  <div>

    <div class="logo-div">
      <img class="logo-png" src="../assets/logo.png">
      九五尊易-ERP
    </div>
    <group title="身份认证/Identity" title-color="black">
      <x-input title="账号名/Account" v-model="propUser.userName" type="text" required
               placeholder="请填写用户名或注册邮箱"></x-input>
      <x-input title="密码/Password" v-model="propUser.password" type="password" required
               placeholder="请填写账号密码"></x-input>
      <x-button type="primary" :disable="loginLoading" :show-loading="loginLoading" :text="loginText"
                @click.native="loginClick"></x-button>
    </group>

  </div>

</template>

<script>
  import { XButton, AlertModule, Group, XInput, md5 } from 'vux'

  export default {
    components: {
      XButton,
      Group,
      XInput
    },
    name: 'login',
    data () {
      return {
        propUser: this.user,
        loginText: '登录/Login',
        loginLoading: false
      }
    },
    created () {
      // load the page
//      if (this.$route.fullPath)
//       console.log(md5('w123456'))
    },
    methods: {
      loginClick () {
        const self = this
        if (self.propUser.userName === '' || self.propUser.password === '') {
          AlertModule.show({
            title: '警告/Warning',
            content: '请完整输入账号和密码<br />Check the username and password',
            buttonText: '返回/Back'
//          onShow () {
//            console.log('Module: I\'m showing')
//          },
//          onHide () {
//            console.log('Module: I\'m hiding now')
//          }
          })
        } else {
          self.loginLoading = true
          self.loginText = 'Processing'
          // md5 encrypt
          self.propUser.password = md5(self.propUser.password)
          self.$http.post(self.config.Staff.validateURL, {
            userName: self.propUser.userName,
            password: self.propUser.password
          }).then(res => {
            self.loginLoading = false
            let loginRes = res.data
            if (loginRes.status) {
              self.$emit('resLoginUser', loginRes.info)
              AlertModule.show({
                title: '提示/Tips',
                content: '登陆成功/Login success',
                buttonText: '确定/Confirm',
                onHide () {
                  // redirect to home data list
                  self.$router.push('Index')
                }
              })
            } else {
              AlertModule.show({
                title: '警告/Warning',
                content: '账号和密码不匹配<br />Illegal username and password',
                buttonText: '返回/Back',
                onHide () {
                  self.$router.go(0)
                }
              })
            }
          })
        }
      }
    },
    props: ['config', 'user']
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
