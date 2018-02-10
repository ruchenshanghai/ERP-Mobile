<template>

  <div>
    <group :title="'订单编号: ' + orderDetail.billNo">
      <selector title="供应商" v-model="orderDetail.contactName" :options="supplierContact"></selector>
      <selector title="收货仓库" v-model="orderDetail.locationName" :options="warehouse"></selector>
      <selector title="币种" v-model="orderDetail.currencyText" :options="currency"></selector>
      <selector title="支付方式" v-model="orderDetail.paymentMethod" :options="payMethod"></selector>
      <selector title="收货方式" v-model="orderDetail.shippingMethod" :options="shippingMethod"></selector>
      <selector title="结算账户" v-model="orderDetail.account" :options="account"></selector>
      <x-input title="订单备注" v-model="orderDetail.description" placeholder="请输入该笔订单的备注信息"></x-input>


      <datetime v-model="orderDetail.date" title="单据日期"></datetime>
      <datetime v-model="orderDetail.deliveryDate" title="交货日期"></datetime>
      <grid :cols="3" class="grid-order">
        <!--<grid-item label="币种">-->
          <!--{{orderDetail.currencyText}}-->
        <!--</grid-item>-->
        <!--<grid-item label="支付方式">-->
          <!--{{parseFunction.getNameByID(this.config.PayMethod, orderDetail.paymentMethod)}}-->
        <!--</grid-item>-->
        <!--<grid-item label="交货方式">-->
          <!--{{parseFunction.getNameByID(this.config.ShippingMethod, orderDetail.shippingMethod)}}-->
        <!--</grid-item>-->
        <!--<grid-item label="结算账户">-->
          <!--{{parseFunction.getNameByID(this.config.Account, orderDetail.accId)}}-->
        <!--</grid-item>-->
        <grid-item label="优惠率(%,回车确认)">
          <x-input type="number" v-model="orderDetail.disRate" @on-enter="updateAmountByDisRate"></x-input>
        </grid-item>
        <grid-item label="优惠金额">
          <x-input v-model="orderDetail.disAmount" type="number"></x-input>
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
            {{item.goods}}
          </grid-item>
          <grid-item label="商品型号">
            {{item.spec}}
          </grid-item>
          <grid-item label="单位">
            {{item.mainUnit}}
          </grid-item>
          <grid-item label="数量">
            {{item.qty}}
          </grid-item>
          <grid-item label="采购单价">
            {{item.price}}
          </grid-item>
          <grid-item label="折扣率">
            {{item.discountRate + '%'}}
          </grid-item>
          <grid-item label="折扣额">
            {{item.deduction}}
          </grid-item>
          <grid-item label="采购金额">
            {{item.amount}}
          </grid-item>
        </grid>
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
        account: []
      }
    },
    created () {
      const self = this
      let assistParams = ['PayMethod', 'ShippingMethod', 'Account', 'SupplierContact', 'CustomerContact', 'Warehouse', 'Currency']
      self.$emit('resAssistData', assistParams, resData => {
        console.log(resData)
        self.supplierContact = self.config.SupplierContact
        self.warehouse = self.config.Warehouse
        self.currency = self.config.Currency
        self.payMethod = self.config.PayMethod
        self.shippingMethod = self.config.ShippingMethod
        self.account = self.config.Account
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
          self.orderDetail.paymentMethod = parseFunction.getNameByID(self.payMethod, self.orderDetail.paymentMethod)
          self.orderDetail.shippingMethod = parseFunction.getNameByID(self.shippingMethod, self.orderDetail.shippingMethod)
          self.orderDetail.account = parseFunction.getNameByID(self.account, self.orderDetail.accId)
          console.log(JSON.stringify(self.orderDetail))
        })
      })
    },

    methods: {
      updateAmountByDisRate (val) {
        console.log(val)
        if (val > 100) {
          this.orderDetail.disRate = 100
        }
        this.orderDetail.disAmount = (this.orderDetail.totalAmount * this.orderDetail.disRate / 100).toFixed(2)
        console.log(this.orderDetail.disAmount)
        this.orderDetail.amount = this.orderDetail.totalAmount - this.orderDetail.disAmount
        console.log(this.orderDetail.amount)
      },
      updateAmountByDisAmount (val) {
        if (val > this.orderDetail.totalAmount) {
          this.orderDetail.disAmount = this.orderDetail.totalAmount
        }
        this.orderDetail.amount = this.orderDetail.amount - this.orderDetail.disAmount
        this.orderDetail.disRate = ((this.orderDetail.totalAmount - this.orderDetail.amount) / 100).toFixed(2)
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
