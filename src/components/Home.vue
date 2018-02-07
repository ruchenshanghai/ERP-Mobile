<template>
  <div class="wrapper">
    <v-header :user="user" @reset="resetUser"></v-header>
    <div class="content">
      <transition name="move" mode="out-in">
        <router-view :config="config" :user="user" @resLoginUser="resLogin" @resPayMethod="resPayMethod" @resShippingMethod="resShippingMethod" @resAccount="resAccount" @resSupplierContact="resSupplierContact" @resCustomerContact="resCustomerContact"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import vHeader from './Header.vue'
  import apiConfig from '../../config/prd.api'

  export default {
    data () {
      return {
        user: {
          isLogin: false
        },
        config: apiConfig

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
      },
      resPayMethod (resData) {
        this.config.PayMethod = resData
      },
      resShippingMethod (resData) {
        this.config.ShippingMethod = resData
      },
      resAccount (resData) {
        this.config.Account = resData
      },
      resSupplierContact (resData) {
        this.config.SupplierContact = resData
      },
      resCustomerContact (resData) {
        this.config.CustomerContact = resData
      }
    }
  }
</script>
