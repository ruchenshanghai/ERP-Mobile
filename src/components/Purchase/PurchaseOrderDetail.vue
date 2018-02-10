<template>

  <div>
    <group :title="'订单编号: ' + orderDetail.billNo">
      <selector title="供应商" v-model="orderDetail.contactName" :options="supplierContact"></selector>
      <selector title="收货仓库" v-model="orderDetail.locationId" :options="warehouse"></selector>
      <selector title="币种" v-model="orderDetail.currencyText" :options="currency"></selector>
      <selector title="支付方式" v-model="orderDetail.paymentMethod" :options="payMethod"></selector>
      <selector title="收货方式" v-model="orderDetail.shippingMethod" :options="shippingMethod"></selector>
      <selector title="结算账户" v-model="orderDetail.accId" :options="account"></selector>
      <x-input title="订单备注" v-model="orderDetail.description" placeholder="请输入该笔订单的备注信息"></x-input>
      <datetime v-model="orderDetail.date" title="单据日期"></datetime>
      <datetime v-model="orderDetail.deliveryDate" title="交货日期"></datetime>

      <grid :cols="3" class="grid-order">
        <grid-item label="优惠率(%)">
          <x-input type="number" v-model="orderDetail.disRate" @on-enter="updateAmountByDisRate"></x-input>
          <div class="detail-wrapper"><span class="title">回车确认</span></div>
        </grid-item>
        <grid-item label="优惠金额">
          <x-input v-model="orderDetail.disAmount" type="number" @on-enter="updateAmountByDisAmount"></x-input>
          <div class="detail-wrapper"><span class="title">回车确认</span></div>
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
        <grid :cols="3" class="grid-order">
          <grid-item label="商品名称">
            <selector v-model="item.invId" :options="inventory" @on-change="updateInventory($index)"></selector>
          </grid-item>
          <grid-item label="商品型号">
            {{item.inventory.spec}}
          </grid-item>
          <grid-item label="单位">
            {{item.inventory.unitName}}
          </grid-item>
          <grid-item label="采购单价">
            <x-input type="number" v-model="item.price"></x-input>
          </grid-item>
          <grid-item label="数量">
            <x-input type="number" v-model="item.qty"></x-input>
          </grid-item>
          <grid-item label="折扣率(%)">
            <x-input type="number" v-model="item.discountRate"
                     @on-enter="updateDetailAmountByDisRate($index)"></x-input>
            <div class="detail-wrapper"><span class="title">回车确认</span></div>
          </grid-item>
          <grid-item label="折扣额">
            <x-input type="number" v-model="item.deduction" @on-enter="updateDetailAmountByDeduction($index)"></x-input>
            <div class="detail-wrapper"><span class="title">回车确认</span></div>
          </grid-item>
        </grid>
        <x-input title="采购金额" type="number" v-model="item.amount" readonly></x-input>
      </group>
    </template>
  </div>

</template>

<script>
  import { Group, Grid, GridItem, Selector, Datetime, XInput } from 'vux'
  import parseFunction from '../../utils/parseText'

  export default {
    name: 'purchase-order-detail',
    directives: {},
    components: {Group, Grid, GridItem, Selector, Datetime, XInput},
    data () {
      return {
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
//          self.orderDetail.paymentMethod = parseFunction.getNameByID(self.payMethod, self.orderDetail.paymentMethod)
//          self.orderDetail.shippingMethod = parseFunction.getNameByID(self.shippingMethod, self.orderDetail.shippingMethod)
//          self.orderDetail.account = parseFunction.getNameByID(self.account, self.orderDetail.accId)
          this.parseOrderDetailInventory()
        })
      })
    },
    methods: {
      updateAmountByDisRate (val) {
        if (val > 100) {
          this.orderDetail.disRate = 100
        }
        this.orderDetail.disAmount = (this.orderDetail.totalAmount * this.orderDetail.disRate / 100).toFixed(2)
        this.orderDetail.amount = this.orderDetail.totalAmount - this.orderDetail.disAmount
      },
      updateAmountByDisAmount (val) {
        if (val > this.orderDetail.totalAmount) {
          this.orderDetail.disAmount = this.orderDetail.totalAmount
        }
        this.orderDetail.amount = this.orderDetail.totalAmount - this.orderDetail.disAmount
        this.orderDetail.disRate = (this.orderDetail.disAmount / this.orderDetail.totalAmount * 100).toFixed(2)
      },
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
      updateInventory (index) {
        for (let i = 0; i < this.inventory.length; i++) {
          if (this.inventory[i].id === this.orderDetail.entries[index].invId) {
            this.orderDetail.entries[index].inventory = this.inventory[i]
          }
        }
      },
      updateDetailAmountByDisRate (index) {
        if (this.orderDetail.entries[index].discountRate > 100) {
          this.orderDetail.entries[index].discountRate = 100
        }
        this.orderDetail.entries[index].deduction = (this.orderDetail.entries[index].qty * this.orderDetail.entries[index].price * this.orderDetail.entries[index].discountRate / 100).toFixed(2)
        this.orderDetail.entries[index].amount = this.orderDetail.entries[index].qty * this.orderDetail.entries[index].price - this.orderDetail.entries[index].deduction
      },
      updateDetailAmountByDeduction (index) {
        if (this.orderDetail.entries[index].deduction > (this.orderDetail.entries[index].qty * this.orderDetail.entries[index].price)) {
          this.orderDetail.entries[index].deduction = (this.orderDetail.entries[index].qty * this.orderDetail.entries[index].price)
        }
        this.orderDetail.entries[index].amount = this.orderDetail.entries[index].qty * this.orderDetail.entries[index].price - this.orderDetail.entries[index].deduction
        this.orderDetail.entries[index].discountRate = (this.orderDetail.entries[index].deduction / (this.orderDetail.entries[index].qty * this.orderDetail.entries[index].price) * 100).toFixed(2)
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
</style>
