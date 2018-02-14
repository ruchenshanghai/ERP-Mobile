<template>

  <div
    v-loading="loadingStatus"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <group :title="'订单编号: ' + orderDetail.billNo">
      <selector title="供应商" v-model="orderDetail.contactName" :options="supplierContact"></selector>
      <selector title="收货仓库" v-model="orderDetail.locationId" :options="warehouse"></selector>
      <selector title="币种" v-model="orderDetail.currency" :options="currency"></selector>
      <selector title="支付方式" v-model="orderDetail.paymentMethod" :options="payMethod"></selector>
      <selector title="收货方式" v-model="orderDetail.shippingMethod" :options="shippingMethod"></selector>
      <selector title="结算账户" v-model="orderDetail.accId" :options="account"></selector>
      <x-input title="订单备注" v-model="orderDetail.description" placeholder="请输入该笔订单的备注信息"></x-input>
      <datetime v-model="orderDetail.date" title="单据日期"></datetime>
      <datetime v-model="orderDetail.deliveryDate" title="交货日期"></datetime>

      <grid :cols="3" class="grid-order">
        <grid-item label="优惠率(%)">
          <x-input type="number" v-model="orderDetail.disRate" @on-blur="updateAmountByDisRate"></x-input>
        </grid-item>
        <grid-item label="优惠金额">
          <x-input v-model="orderDetail.disAmount" type="number" @on-blur="updateAmountByDisAmount"></x-input>
        </grid-item>
        <grid-item label="优惠后金额">
          {{orderDetail.amount}}
        </grid-item>
        <grid-item label="制单人">
          {{orderDetail.userName}}
        </grid-item>
        <grid-item label="审核人">
          {{orderDetail.checkName || '未设置'}}
        </grid-item>
        <grid-item label="最后修改日期">
          {{orderDetail.modifyTime}}
        </grid-item>
      </grid>
    </group>

    <template v-for="(item, $index) in orderDetail.entries">
      <group :title="'详情: ' + ($index + 1)">
        <selector title="商品名称" v-model="item.invId" :options="inventory" @on-change="updateInventory"></selector>
        <grid :cols="3" class="grid-order">
          <grid-item label="商品型号">
            {{item.inventory.spec}}
          </grid-item>
          <grid-item label="单位">
            {{item.inventory.unitName}}
          </grid-item>
          <grid-item label="采购单价">
            <x-input type="number" v-model="item.price" @on-blur="updateDetailAmount($index)"></x-input>
          </grid-item>
          <grid-item label="数量">
            <x-input type="number" v-model="item.qty" @on-blur="updateDetailAmount($index)"></x-input>
          </grid-item>
          <grid-item label="折扣率(%)">
            <x-input type="number" v-model="item.discountRate" @on-blur="updateDetailAmountByDisRate($index)"></x-input>
          </grid-item>
          <grid-item label="折扣额">
            <x-input type="number" v-model="item.deduction" @on-blur="updateDetailAmountByDeduction($index)"></x-input>
          </grid-item>
        </grid>
        <x-input :title="'采购金额' + ' #' + ($index + 1)" type="number" v-model="item.amount" readonly></x-input>
        <x-input title="订单备注" v-model="item.description" placeholder="请输入该商品的备注"></x-input>
      </group>
    </template>
    <x-button type="primary" @click.native="addNewDetail">新增详情</x-button>
    <flexbox id="flex-margin">
      <template v-if="this.orderDetail.checked === 0">
        <flexbox-item>
          <x-button type="default" @click.native="checkInOrder">审核</x-button>
        </flexbox-item>
      </template>
      <template v-else>
        <flexbox-item>
          <x-button type="default" @click.native="checkOutOrder">反审核</x-button>
        </flexbox-item>
      </template>
    <flexbox-item>
      <x-button type="primary" @click.native="updateOrder">更新</x-button>
    </flexbox-item>
    <flexbox-item>
      <x-button type="warn" @click.native="deleteOrder">删除</x-button>
    </flexbox-item>
  </flexbox>
  </div>

</template>

<script>
  import { Group, Grid, GridItem, Selector, Datetime, XInput, XButton, Flexbox, FlexboxItem } from 'vux'
  import parseFunction from '../../utils/parseText'

  export default {
    name: 'purchase-order-detail',
    directives: {},
    components: { Group, Grid, GridItem, Selector, Datetime, XInput, XButton, Flexbox, FlexboxItem },
    data () {
      return {
        loadingStatus: true,
        orderDetail: {},
        parseFunction: parseFunction,
        supplierContact: [],
        warehouse: [],
        currency: [],
        payMethod: [],
        shippingMethod: [],
        account: [],
        inventory: [],
        unit: []
      }
    },
    created () {
      const self = this
      self.loadingStatus = true
      let assistParams = ['PayMethod', 'ShippingMethod', 'Account', 'SupplierContact', 'CustomerContact', 'Warehouse', 'Currency', 'Inventory', 'Unit']
      self.$emit('resAssistData', assistParams, resData => {
        self.supplierContact = self.config.SupplierContact
        self.warehouse = self.config.Warehouse
        self.currency = self.config.Currency
        self.payMethod = self.config.PayMethod
        self.shippingMethod = self.config.ShippingMethod
        self.account = self.config.Account
        self.inventory = self.config.Inventory
        self.unit = self.config.Unit
        let orderID = self.$route.params.ID
        let postData = {}
        postData.userName = self.user.userName
        postData.password = self.user.password
        postData.fetchConfig = {
          id: orderID
        }
        self.$http.post(self.config.Purchase.PurchaseOrder.detailURL, postData).then(orderRes => {
          orderRes = orderRes.data
          if (!orderRes.status) {
            self.$router.push('Index')
            return
          }
          if (orderRes.info === null) {
            self.$router.go(-1)
            return
          }
          self.orderDetail = orderRes.info
          self.parseOrderDetailInventory()
          self.loadingStatus = false
        })
      })
    },
    methods: {
      parseOrderDetailInventory () {
        for (let index in this.orderDetail.entries) {
          for (let i = 0; i < this.inventory.length; i++) {
            if (this.inventory[i].number === this.orderDetail.entries[index].invNumber) {
              this.orderDetail.entries[index].inventory = this.inventory[i]
              break
            }
          }
        }
      },
      updateAmountByDisRate (val) {
        if (val > 100) {
          this.orderDetail.disRate = 100
        }
        this.orderDetail.disAmount = (this.orderDetail.totalAmount * this.orderDetail.disRate / 100).toFixed(2)
        this.orderDetail.amount = (this.orderDetail.totalAmount - this.orderDetail.disAmount).toFixed(2)
      },
      updateAmountByDisAmount (val) {
        if (val > this.orderDetail.totalAmount) {
          this.orderDetail.disAmount = this.orderDetail.totalAmount
        }
        this.orderDetail.amount = (this.orderDetail.totalAmount - this.orderDetail.disAmount).toFixed(2)
        this.orderDetail.disRate = (this.orderDetail.disAmount / this.orderDetail.totalAmount * 100).toFixed(2)
      },
      updateAmountByDetail () {
        this.orderDetail.totalAmount = 0
        for (let index in this.orderDetail.entries) {
          console.log(this.orderDetail.entries[index].amount)
          this.orderDetail.totalAmount = Number(this.orderDetail.totalAmount) + Number(this.orderDetail.entries[index].amount)
        }
        this.orderDetail.disAmount = (this.orderDetail.totalAmount * this.orderDetail.disRate / 100).toFixed(2)
        this.orderDetail.amount = (this.orderDetail.totalAmount - this.orderDetail.disAmount).toFixed(2)
      },
      updateInventory () {
        for (let item in this.orderDetail.entries) {
          if (this.orderDetail.entries[item].invId !== this.orderDetail.entries[item].inventory.id) {
            for (let i = 0; i < this.inventory.length; i++) {
              if (this.inventory[i].id === this.orderDetail.entries[item].invId) {
                this.orderDetail.entries[item].inventory = this.inventory[i]
                this.orderDetail.entries[item].price = this.inventory[i].purPrice
                this.updateDetailAmount(item)
                break
              }
            }
          }
        }
      },
      updateDetailAmount (index) {
        this.orderDetail.entries[index].deduction = (this.orderDetail.entries[index].price * this.orderDetail.entries[index].qty * this.orderDetail.entries[index].discountRate / 100).toFixed(2)
        this.orderDetail.entries[index].amount = (this.orderDetail.entries[index].price * this.orderDetail.entries[index].qty - this.orderDetail.entries[index].deduction).toFixed(2)
        this.updateAmountByDetail()
      },
      updateDetailAmountByDisRate (index) {
        if (this.orderDetail.entries[index].discountRate > 100) {
          this.orderDetail.entries[index].discountRate = 100
        }
        this.orderDetail.entries[index].deduction = (this.orderDetail.entries[index].qty * this.orderDetail.entries[index].price * this.orderDetail.entries[index].discountRate / 100).toFixed(2)
        this.orderDetail.entries[index].amount = (this.orderDetail.entries[index].qty * this.orderDetail.entries[index].price - this.orderDetail.entries[index].deduction).toFixed(2)
        this.updateAmountByDetail()
      },
      updateDetailAmountByDeduction (index) {
        if (this.orderDetail.entries[index].deduction > (this.orderDetail.entries[index].qty * this.orderDetail.entries[index].price)) {
          this.orderDetail.entries[index].deduction = (this.orderDetail.entries[index].qty * this.orderDetail.entries[index].price)
        }
        this.orderDetail.entries[index].amount = (this.orderDetail.entries[index].qty * this.orderDetail.entries[index].price - this.orderDetail.entries[index].deduction).toFixed(2)
        this.orderDetail.entries[index].discountRate = (this.orderDetail.entries[index].deduction / (this.orderDetail.entries[index].qty * this.orderDetail.entries[index].price) * 100).toFixed(2)
        this.updateAmountByDetail()
      },
      addNewDetail () {
        let tempNewEntry = {
          invId: 87,
          price: 0,
          qty: 0,
          discountRate: 0,
          deduction: 0,
          amount: 0,
          inventory: this.inventory[0],
          description: ''
        }
        this.orderDetail.entries.push(tempNewEntry)
      },
      makeUpUpdatePostData () {
        let postEntries = { }
        let totalQty = 0
        for (let index in this.orderDetail.entries) {
          totalQty += Number(this.orderDetail.entries[index].qty)
          let tempObj = {
            invId: this.orderDetail.entries[index].invId,
            invNumber: this.orderDetail.entries[index].inventory.number,
            invName: this.orderDetail.entries[index].inventory.name,
            invSpec: this.orderDetail.entries[index].inventory.spec,
            skuId: this.orderDetail.entries[index].inventory.unitId ? this.orderDetail.entries[index].inventory.unitId : -1,
            skuName: '',
            unitId: this.orderDetail.entries[index].inventory.unitId,
            mainUnit: this.orderDetail.entries[index].inventory.unitName,
            qty: this.orderDetail.entries[index].qty,
            price: this.orderDetail.entries[index].price,
            discountRate: this.orderDetail.entries[index].discountRate,
            deduction: this.orderDetail.entries[index].deduction,
            amount: this.orderDetail.entries[index].amount,
            description: this.orderDetail.entries[index].description,
            locationId: this.orderDetail.entries[index].inventory.locationId,
            locationName: this.orderDetail.entries[index].inventory.locationName
          }
          postEntries.push(tempObj)
        }
        let postData = {
          id: this.orderDetail.id,
          buId: this.orderDetail.buId,
          contactName: this.orderDetail.contactName,
          date: this.orderDetail.date,
          deliveryDate: this.orderDetail.deliveryDate,
          locationId: this.orderDetail.locationId,
          billNo: this.orderDetail.billNo,
          transType: this.orderDetail.transType,
          entries: postEntries,
          totalQty: totalQty,
          totalAmount: this.orderDetail.totalAmount,
          description: this.orderDetail.description,
          disRate: this.orderDetail.disRate,
          disAmount: this.orderDetail.disAmount,
          amount: this.orderDetail.amount,
          paymentMethod: this.orderDetail.paymentMethond,
          shippingMethod: this.orderDetail.shippingMethod
        }
        for (let index in this.currency) {
          if (this.currenc[index].name === this.orderDetail.currencyText) {
            postData.currency = this.currenc[index].id
            break
          }
        }
        return postData
      },
      updateOrder () {
        console.log('update')
        const self = this
        let postData = {}
        postData.userName = self.user.userName
        postData.password = self.user.password
        postData.updateConfig = self.orderDetail
        postData.updateConfig.totalQty = 0
        postData.updateConfig.modifyTime = new Date().toLocaleString()
        for (let index in postData.updateConfig.entries) {
          postData.updateConfig.totalQty += Number(postData.updateConfig.entries[index].qty)
          postData.updateConfig.entries[index].invNumber = postData.updateConfig.entries[index].inventory.number
          postData.updateConfig.entries[index].invName = postData.updateConfig.entries[index].inventory.name
          postData.updateConfig.entries[index].invSpec = postData.updateConfig.entries[index].inventory.spec
          postData.updateConfig.entries[index].mainUnit = postData.updateConfig.entries[index].inventory.unitName
          postData.updateConfig.entries[index].locationId = postData.updateConfig.entries[index].inventory.locationId
          postData.updateConfig.entries[index].locationName = postData.updateConfig.entries[index].inventory.locationName
        }
        console.log(JSON.stringify(postData))
        self.$http.post(self.config.Purchase.PurchaseOrder.updateURL, postData).then(orderRes => {
          orderRes = orderRes.data
          if (!orderRes.status) {
            self.$router.push('Index')
            return
          }
          console.log(JSON.stringify(orderRes.data))
        })
      },
      checkInOrder () {
        console.log('check in')
      },
      checkOutOrder () {
        console.log('check out')
      },
      deleteOrder () {
        console.log('delete')
      }
    },
    computed: {},
    props: ['user', 'config']
  }
</script>

<style scoped>
  .grid-order {
    text-align: center;
    margin-bottom: 20px;
  }
  #flex-margin {
    margin-top: 10px;
  }
</style>
