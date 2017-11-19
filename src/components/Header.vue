<template>
  <div>
    <x-header :left-options="header.leftOptions">
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
            showBack: false
          },
          rightOptions: {
            showMore: true
          },
          showMenus: false
        }
      }
    },
    created () {
//      if (!this.propUser.isLogin) {
//        this.$router.push('/')
//      }
    },
    methods: {
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
//          ['UserName: ' + this.propUser.userName, 'Name: ' + this.propUser.name, 'Email: ' + this.propUser.email, 'Mobile: ' + this.propUser.mobile, '退出登录/Logout']
//          {
//            userName: 'UserName: ' + this.propUser.userName,
//              name: 'Name: ' + this.propUser.name,
//            email: 'Email: ' + this.propUser.email,
//            mobile: 'Mobile: ' + this.propUser.mobile,
//            logout: '退出登录/Logout'}
        } else {
          return null
        }
      }
    },
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
