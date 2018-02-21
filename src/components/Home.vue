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
            case 'Currency':
              promiseArray.push(this.fetchCurrency())
              break
            case 'Inventory':
              promiseArray.push(this.fetchInventory())
              break
            case 'Unit':
              promiseArray.push(this.fetchInventory())
              break
          }
        }
        Promise.all(promiseArray).then(result => {
          callback(result)
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
              for (let index in this.config.SupplierContact) {
                this.config.SupplierContact[index].key = this.config.SupplierContact[index].name
                this.config.SupplierContact[index].value = this.config.SupplierContact[index].name
              }
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
      fetchCurrency () {
        return new Promise((resolve, reject) => {
          if (this.config.Account.length === 0) {
            this.$http.post(this.config.AssistData.CurrencyURL, {
              userName: this.user.userName,
              password: this.user.password
            }).then(res => {
              this.config.Currency = res.data.info.items
              for (let index in this.config.Currency) {
                this.config.Currency[index].key = this.config.Currency[index].id
                this.config.Currency[index].value = this.config.Currency[index].name
              }
              resolve('fetch currency')
            })
          } else {
            resolve('has fetched currency')
          }
        })
      },
      fetchUnit () {
        return new Promise((resolve, reject) => {
          if (this.config.Account.length === 0) {
            this.$http.post(this.config.AssistData.Unit, {
              userName: this.user.userName,
              password: this.user.password
            }).then(res => {
              this.config.Unit = res.data.info.items
              for (let index in this.config.Unit) {
                this.config.Unit[index].key = this.config.Unit[index].name
                this.config.Unit[index].value = this.config.Unit[index].name
              }
              resolve('fetch unit')
            })
          } else {
            resolve('has fetched unit')
          }
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
              for (let index in this.config.PayMethod) {
                this.config.PayMethod[index].key = this.config.PayMethod[index].id
                this.config.PayMethod[index].value = this.config.PayMethod[index].name
              }
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
              for (let index in this.config.ShippingMethod) {
                this.config.ShippingMethod[index].key = this.config.ShippingMethod[index].id
                this.config.ShippingMethod[index].value = this.config.ShippingMethod[index].name
              }
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
              for (let index in this.config.Account) {
                this.config.Account[index].key = this.config.Account[index].id
                this.config.Account[index].value = this.config.Account[index].name
              }
              resolve('fetch account')
            })
          } else {
            resolve('has fetched account')
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
              for (let index in this.config.Warehouse) {
                this.config.Warehouse[index].key = this.config.Warehouse[index].id
                this.config.Warehouse[index].value = this.config.Warehouse[index].name
              }
              resolve('fetch warehouse')
            })
          } else {
            resolve('has fetched warehouse')
          }
        })
      },
      fetchInventory () {
        return new Promise((resolve, reject) => {
          if (this.config.Account.length === 0) {
            this.$http.post(this.config.AssistData.InventoryURL, {
              userName: this.user.userName,
              password: this.user.password
            }).then(res => {
              this.config.Inventory = res.data.info.rows
              for (let index in this.config.Inventory) {
                this.config.Inventory[index].key = this.config.Inventory[index].id
                this.config.Inventory[index].value = this.config.Inventory[index].name
              }
              resolve('fetch inventory')
            })
          } else {
            resolve('has fetched inventory')
          }
        })
      }
    }
  }
</script>
