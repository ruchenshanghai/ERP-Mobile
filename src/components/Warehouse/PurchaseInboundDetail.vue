<template>

  <div>
    <group :title="'单据编号: ' + orderDetail.billNo">
      <grid :cols="3" class="grid-order">
        <grid-item label="单据日期">
          {{orderDetail.date}}
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
          {{orderDetail.modifyTime || '未设置'}}
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
            {{item.invSpec}}
          </grid-item>
          <grid-item label="单位">
            {{item.mainUnit}}
          </grid-item>
          <grid-item label="采购数量">
            {{item.qty}}
          </grid-item>
          <grid-item label="仓库">
            {{item.locationName}}
          </grid-item>
          <grid-item label="入库数量">
            {{item.stockinQty}}
          </grid-item>
          <grid-item label="备注">
            {{item.description || '未设置'}}
          </grid-item>
        </grid>
      </group>
    </template>
  </div>

</template>

<script>
  import { Group, Grid, GridItem } from 'vux'

  export default {
    name: 'purchase-inbound-detail',
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
      let orderID = this.$route.params.ID
      let postData = {}
      postData.userName = this.user.userName
      postData.password = this.user.password
      postData.fetchConfig = {
        id: orderID
      }
      this.$http.post(this.config.Warehouse.PurchaseInbound.detailURL, postData).then(orderRes => {
        orderRes = orderRes.data
        if (!orderRes.status) {
          this.$router.push('Index')
          return
        }
        if (orderRes.info === null) {
          this.$router.go(-1)
          return
        }
        this.orderDetail = orderRes.info

        // console.log(JSON.stringify(this.orderDetail))
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

