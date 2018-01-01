<template>
  <div>
    <group :title="'订单编号: ' + orderDetail.billNo">
      <grid :cols="3" class="grid-order">
        <grid-item label="供应商">
          {{orderDetail.contactName}}
        </grid-item>
        <grid-item label="收货仓库">
          {{orderDetail.locationName || '未设置'}}
        </grid-item>
        <grid-item label="单据日期">
          {{orderDetail.date}}
        </grid-item>
        <grid-item label="交货日期">
          {{orderDetail.deliveryDate || '未设置'}}
        </grid-item>
        <grid-item label="币种">
          {{orderDetail.currencyText}}
        </grid-item>
        <grid-item label="支付方式">
          {{orderDetail.paymentMethod || '未设置'}}
        </grid-item>
        <grid-item label="交货方式">
          {{orderDetail.shippingMethod || '未设置'}}
        </grid-item>
        <grid-item label="结算账户">
          {{orderDetail.account || '未设置'}}
        </grid-item>
        <grid-item label='优惠率'>
          {{orderDetail.disRate + '%'}}
        </grid-item>
        <grid-item label="优惠金额">
          {{orderDetail.disAmount}}
        </grid-item>
        <grid-item label="优惠后金额">
          {{orderDetail.rpAmount}}
        </grid-item>
        <grid-item label="备注">
          {{orderDetail.description || '未设置'}}
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
            {{item.discountRate}}
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
  import {Group, Grid, GridItem} from 'vux'
  export default {
    name: 'purchase-order-detail',
    directives: {},
    components: {
      Group,
      Grid,
      GridItem
    },
    data () {
      return {
        orderDetail: {}
      }
    },
    created () {
      console.log('get purchase order ID: ' + this.$route.params.ID)
      let orderID = this.$route.params.ID
      let postData = {}
      postData.userName = this.user.userName
      postData.password = this.user.password
      postData.fetchConfig = {
        id: orderID
      }
      this.$http.post(this.config.Purchase.PurchaseOrder.detailURL, postData).then(orderRes => {
        orderRes = orderRes.data
        if (!orderRes.status) {
          this.$router.push('Index')
          return
        }
        this.orderDetail = orderRes.info
      })
    },

    methods: {},
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
