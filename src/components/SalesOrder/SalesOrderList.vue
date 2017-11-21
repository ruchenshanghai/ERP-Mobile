<template>
  <div>
    <group title="搜索">
      <x-input title="请输入搜索关键词" placeholder="keyword" :show-clear="false"  placeholder-align="right" @on-change="searchTextChange"></x-input>
    </group>
    <group title="请选择日期区间">
      <datetime v-model="dateStart" title="起始日期" @on-change="filterDataByDate"></datetime>
      <datetime v-model="dateEnd" title="结束日期" @on-change="filterDataByDate"></datetime>
    </group>


    <template v-for="order in displayList">
      <group :title="'订单编号: ' + order.billNo + ' 业务类别: ' + order.transTypeName">
        <grid :cols="3" class="grid-order">
          <grid-item label="订单日期">
            {{order.billDate}}
          </grid-item>
          <grid-item label="销售人员">
            {{order.staffName}}
          </grid-item>
          <grid-item label="客户">
            {{order.contactName}}
          </grid-item>
          <grid-item label="销售金额">
            {{order.totalAmount + ' ' + order.currencyCode}}
          </grid-item>
          <grid-item label="数量">
            {{order.totalQty}}
          </grid-item>

          <template v-if="$route.params.salesOrderType === 'SalesOrders'">
            <grid-item label="订单状态">
              {{computeBillStatusName(order.billStatus)}}
            </grid-item>
          </template>

          <grid-item label="交货周期/天">
            {{(computeDayInterval(order.billDate, order.deliveryDate) === null) ? '未设置' : computeDayInterval(order.billDate, order.deliveryDate)}}
          </grid-item>
          <grid-item label="制单人">
            {{order.userName}}
          </grid-item>
          <grid-item label="审核人">
            {{order.checkName || '未设置'}}
          </grid-item>
          <grid-item label="备注">
            {{order.description || '未设置'}}
          </grid-item>
        </grid>
      </group>
    </template>

  </div>
</template>

<script>
  import {XInput, Datetime, Group, Grid, GridItem} from 'vux'

  export default {
    directives: {},
    components: {
      XInput,
      Datetime,
      Group,
      Grid,
      GridItem
    },
    name: 'sales-order-list',
    data () {
      return {
        propUser: this.user,
        propOperation: this.operations,
        dateStart: '',
        dateEnd: '',
        orderList: [],
        searchList: [],
        displayList: []
      }
    },
    created () {
      this.$http.post(this.propOperation.salesOrder.getAllUrl + this.$route.params.salesOrderType, this.propUser).then(orderRes => {
        if (orderRes.data.status) {
          this.orderList = orderRes.data.info
          this.searchList = this.orderList
          this.displayList = this.orderList
        }
      })
//      this.$http.get('http://localhost:3000/SalesOrders', this.propUser).then(orderRes => {
//        console.log('route path: ' + this.$route.params.salesOrderType)
//        console.log(JSON.stringify(orderRes.data))
//        this.orderList = orderRes.data
//        this.searchList = this.orderList
//        this.displayList = this.orderList
//      })
    },
    ready () {
    },
    methods: {
      computeDayInterval (preDate, postDate) {
        if (preDate === null || postDate === null) {
          return null
        }
        let tempStart = new Date(preDate)
        let tempEnd = new Date(postDate)
        let dayInterval = (tempEnd - tempStart) / (24 * 60 * 60 * 1000)
        return dayInterval
      },
      computeBillStatusName (statusCode) {
        if (statusCode === 2) {
          return '全部出库'
        } else {
          return '未出库'
        }
      },
      searchTextChange (val) {
        console.log(val)
        let tempList = []
        for (let orderIndex in this.orderList) {
          let tempValueArray = Object.values(this.orderList[orderIndex])
          for (let valueIndex = 0; valueIndex < tempValueArray.length; valueIndex++) {
            if (String(tempValueArray[valueIndex]).indexOf(val) > -1) {
              tempList.push(this.orderList[orderIndex])
              break
            }
          }
        }
        this.searchList = tempList
        this.filterDataByDate()
      },
      filterDataByDate () {
        console.log('start ', this.dateStart)
        console.log('end ', this.dateEnd)
        if (this.dateStart === '' && this.dateEnd === '') {
          console.log('invalid date')
          this.displayList = this.searchList
          return
        }
        let tempList = []
        if (this.dateStart === '' && this.dateEnd !== '') {
          // filter by end
          for (let orderIndex in this.searchList) {
            if (this.searchList[orderIndex].billDate < this.dateEnd) {
              tempList.push(this.searchList[orderIndex])
            }
          }
        } else if (this.dateStart !== '' && this.dateEnd === '') {
          for (let orderIndex in this.searchList) {
            if (this.searchList[orderIndex].billDate > this.dateStart) {
              tempList.push(this.searchList[orderIndex])
            }
          }
        } else {
          for (let orderIndex in this.searchList) {
            if (this.searchList[orderIndex].billDate > this.dateStart && this.searchList[orderIndex].billDate < this.dateEnd) {
              tempList.push(this.searchList[orderIndex])
            }
          }
        }
        this.displayList = tempList
      }
    },
    computed: {
    },
    props: ['user', 'operations']
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .grid-order {
    text-align: center;
    margin-bottom: 20px;
  }

</style>
