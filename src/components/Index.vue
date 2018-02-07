<template>
  <div>
    <template v-for="operateType in operateArray">
      <group-title>{{operateType.name}}</group-title>
      <grid :cols="2">
        <template v-for="operation in operateType.details">
          <grid-item>
            <router-link :to="operation.link">
              <x-button type="primary">{{operation.name}}</x-button>
            </router-link>
          </grid-item>
        </template>
      </grid>
    </template>
  </div>

</template>

<script>
  import { Grid, GridItem, GroupTitle, XButton } from 'vux'

  export default {
    components: {
      Grid,
      GridItem,
      GroupTitle,
      XButton
    },
    name: 'index',
    data () {
      return {
        propUser: this.user,
        operateArray: [
          {
            name: '购货',
            details: [
              {
                name: '查询采购订单',
                link: 'PurchaseOrderQuery'
              },
              {
                name: '新增采购订单',
                link: ''
              },
              {
                name: '查询采购退货单',
                link: 'PurchaseReturnQuery'
              },
              {
                name: '新增采购退货单',
                link: ''
              }
            ]
          },
          {
            name: '销货',
            details: [
              {
                name: '查询销售报价单',
                link: 'SalesQuoteQuery'
              },
              {
                name: '新增销售报价单',
                link: ''
              },
              {
                name: '查询销售订单',
                link: 'SalesOrderQuery'
              },
              {
                name: '新增销售订单',
                link: ''
              },
              {
                name: '查询销售退货单',
                link: 'SalesReturnQuery'
              },
              {
                name: '新增销售退货单',
                link: ''
              }
            ]
          },
          {
            name: '仓库',
            details: [
              {
                name: '查询调拨单',
                link: 'AllocationListQuery'
              },
              {
                name: '新增调拨单',
                link: ''
              },
              {
                name: '查询采购入库',
                link: 'PurchaseInboundQuery'
              },
              {
                name: '新增采购入库',
                link: ''
              },
              {
                name: '查询销售出库',
                link: 'SalesOutboundQuery'
              },
              {
                name: '新增销售出库',
                link: ''
              },
              {
                name: '查询其他入库单',
                link: 'OtherInboundQuery'
              },
              {
                name: '新增其他入库单',
                link: ''
              },
              {
                name: '查询其他出库单',
                link: 'OtherOutboundQuery'
              },
              {
                name: '新增其他出库单',
                link: ''
              },
              {
                name: '盘点',
                link: ''
              }
            ]
          },
          {
            name: '资金',
            details: [
              {
                name: '查询收款单',
                link: ''
              },
              {
                name: '新增收款单',
                link: ''
              },
              {
                name: '查询付款单',
                link: ''
              },
              {
                name: '新增付款单',
                link: ''
              },
              {
                name: '查询其他收入单',
                link: ''
              },
              {
                name: '新增其他收入单',
                link: ''
              },
              {
                name: '查询其他支出单',
                link: ''
              },
              {
                name: '新增其他支出单',
                link: ''
              }
            ]
          }
        ]
      }
    },
    created () {
      // check the login status
      if (!this.user.isLogin) {
        this.$router.push('Login')
      }
      this.$http.post(this.config.AssistData.PayMethodURL, {
        userName: this.user.userName,
        password: this.user.password,
        fetchConfig: {
          typeNumber: 'PayMethod',
          isDelete: 2
        }
      }).then(res => {
        this.$emit('resPayMethod', res.data.info.items)
      })
      this.$http.post(this.config.AssistData.ShippingMethodURL, {
        userName: this.user.userName,
        password: this.user.password,
        fetchConfig: {
          typeNumber: 'ShippingMethod',
          isDelete: 2
        }
      }).then(res => {
        this.$emit('resShippingMethod', res.data.info.items)
      })
      this.$http.post(this.config.AssistData.AccountURL, {
        userName: this.user.userName,
        password: this.user.password
      }).then(res => {
//        console.log(res.data.info.items)
        this.$emit('resAccount', res.data.info.items)
      })
    },
    methods: {},
    props: ['user', 'config']
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
