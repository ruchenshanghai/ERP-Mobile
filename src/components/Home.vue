<template>
  <div class="wrapper">
    <v-header :user="user" @reset="resetUser"></v-header>
    <div class="content">
      <transition name="move" mode="out-in">
        <router-view :config="config" :user="user" @resLoginUser="resLogin"
                     @resAssistData="resAssistData"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import vHeader from './Header.vue'
  import apiConfig from '../../config/dev.api'

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
      resAssistData (paraNames, callback) {
        let promiseArray = []
        for (let i = 0; i < paraNames.length; i++) {
          switch (paraNames[i]) {
            case 'PayMethod':
              promiseArray.push(this.fetchPayMethod())
              break
            case 'ShippingMethod':
              promiseArray.push(this.fetchShippingMethod())
              break
            case 'Account':
              promiseArray.push(this.fetchAccount())
              break
            case 'SupplierContact':
              promiseArray.push(this.fetchSupplierContact())
              break
            case 'CustomerContact':
              promiseArray.push(this.fetchCustomerContact())
              break
            case 'Warehouse':
              promiseArray.push(this.fetchWarehouse())
              break
          }
        }
        Promise.all(promiseArray).then(result => {
          callback(result)
        })
      },
      fetchPayMethod () {
        return new Promise((resolve, reject) => {
          if (this.config.PayMethod.length === 0) {
            this.$http.post(this.config.AssistData.PayMethodURL, {
              userName: this.user.userName,
              password: this.user.password,
              fetchConfig: {
                typeNumber: 'PayMethod',
                isDelete: 2
              }
            }).then(res => {
              this.config.PayMethod = res.data.info.items
              resolve('fetch pay method')
            })
          } else {
            resolve('has fetched pay method')
          }
        })
      },
      fetchShippingMethod () {
        return new Promise((resolve, reject) => {
          if (this.config.ShippingMethod.length === 0) {
            this.$http.post(this.config.AssistData.ShippingMethodURL, {
              userName: this.user.userName,
              password: this.user.password,
              fetchConfig: {
                typeNumber: 'ShippingMethod',
                isDelete: 2
              }
            }).then(res => {
              this.config.ShippingMethod = res.data.info.items
              resolve('fetch shipping method')
            })
          } else {
            resolve('has fetched shipping method')
          }
        })
      },
      fetchAccount () {
        return new Promise((resolve, reject) => {
          if (this.config.Account.length === 0) {
            this.$http.post(this.config.AssistData.AccountURL, {
              userName: this.user.userName,
              password: this.user.password
            }).then(res => {
              this.config.Account = res.data.info.items
              resolve('fetch account')
            })
          } else {
            resolve('has fetched account')
          }
        })
      },
      fetchSupplierContact () {
        return new Promise((resolve, reject) => {
          if (this.config.SupplierContact.length === 0) {
            this.$http.post(this.config.AssistData.ContactURL, {
              userName: this.user.userName,
              password: this.user.password,
              fetchConfig: {
                type: this.config.AssistData.ContactConfig.SupplierType
              }
            }).then(res => {
              this.config.SupplierContact = res.data.info.rows
              resolve('fetch supplier contact')
            })
          } else {
            resolve('has fetched supplier contact')
          }
        })
      },
      fetchCustomerContact () {
        return new Promise((resolve, reject) => {
          if (this.config.SupplierContact.length === 0) {
            this.$http.post(this.config.AssistData.ContactURL, {
              userName: this.user.userName,
              password: this.user.password,
              fetchConfig: {
                type: this.config.AssistData.ContactConfig.CustomerType
              }
            }).then(res => {
              this.config.CustomerContact = res.data.info.rows
              resolve('fetch customer contact')
            })
          } else {
            resolve('has fetched customer contact')
          }
        })
      },
      fetchWarehouse () {
        return new Promise((resolve, reject) => {
          if (this.config.Account.length === 0) {
            this.$http.post(this.config.AssistData.WarehouseURL, {
              userName: this.user.userName,
              password: this.user.password
            }).then(res => {
              this.config.Warehouse = res.data.info.rows
              resolve('fetch warehouse')
            })
          } else {
            resolve('has fetched warehouse')
          }
        })
      }
    }
  }
</script>
