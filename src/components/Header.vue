<template>
  <div>

    <!--<div class="logo-div">-->
      <!--<img class="logo-png" src="../assets/logo.png">-->
      <!--九五尊易-ERP-->
    <!--</div>-->
    <!--<group title="身份认证/Identity" title-color="black">-->
      <!--<x-input title="账号名/Account" v-model="userName" type="text" required-->
               <!--placeholder="请填写用户名或注册邮箱"></x-input>-->
      <!--<x-input title="密码/Password" v-model="userPassword" type="password" required-->
               <!--placeholder="请填写账号密码"></x-input>-->
      <!--<x-button type="primary" :disable="loginLoading" :show-loading="loginLoading" :text="loginText"-->
                <!--@click.native="loginClick"></x-button>-->
    <!--</group>-->

    <!--<x-header :left-options="header.leftOptions" :right-options="header.rightOptions" @on-click-more="headerRightClick">{{user.displayName}}</x-header>-->
    <x-header :left-options="header.leftOptions">
      {{header.pageStatus}}
      <a slot="right" @click="headerRightClick">{{header.rightOptions.showText}}
    </a></x-header>
    <div v-transfer-dom>
      <actionsheet :menus="this.propUser.menus" v-model="header.showMenus" show-cancel></actionsheet>
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
            showBack: false
          },
          rightOptions: {
            showMore: true,
            showText: 'Please Login First!'
          },
          pageStatus: 'Login',
          showMenus: false,
          menus: {
            a: '123',
            b: '456'
          }
        }
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
      headerRightClick () {
        this.header.showMenus = true
      }
    },
    computed: { },
    watch: {
      propUser (to, from) {
        console.log(JSON.stringify(to))
        console.log(JSON.stringify(from))
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
