<template>
  <div>

    <search
      @on-change="searchTextChange"
      @on-cancel="searchTextReset"
      position="absolute"
      auto-scroll-to-top top="46px"
      ref="search">
    </search>
    <group title="请选择日期区间">
      <datetime v-model="dateStart" title="起始日期" @on-change="filterDataByDate"></datetime>
      <datetime v-model="dateEnd" title="结束日期" @on-change="filterDataByDate"></datetime>
    </group>

    <template v-for="order in displayList">
      <group :title="'订单编号: ' + order.billNo">
        <grid :cols="3" class="grid-order">
          <grid-item label="订单日期">
            {{order.billDate}}
          </grid-item>
          <grid-item label="业务类别">
            {{order.transTypeName}}
          </grid-item>
          <grid-item label="供应商">
            {{order.contactName}}
          </grid-item>
          <grid-item label="采购金额">
            {{order.amount}}
          </grid-item>
          <grid-item label="数量">
            {{order.totalQty}}
          </grid-item>
          <grid-item label="订单状态">
            {{order.billStatusName}}
          </grid-item>
          <grid-item label="交货日期">
            {{order.deliveryDate || '未设置'}}
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
  import {Search, Datetime, Group, Grid, GridItem} from 'vux'

  export default {
    directives: {},
    components: {
      Search,
      Datetime,
      Group,
      Grid,
      GridItem
    },
    name: 'purchase-order-list',
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
      this.$http.post(this.propOperation.purchaseOrder.getAllUrl, this.propUser).then(orderRes => {
//        console.log('order', orderRes)
//        console.log(JSON.stringify(orderRes.data))
        this.orderList = orderRes.data.info
        this.searchList = this.orderList
        this.displayList = this.orderList
      })
//      this.$http.get('http://localhost:3000/PurchaseOrderList', this.propUser).then(orderRes => {
//        console.log('order', orderRes)
//        this.orderList = orderRes.data
//        this.searchList = this.orderList
//        this.displayList = this.orderList
//      })
    },
    ready () {
    },
    methods: {
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
      searchTextReset () {
        this.searchList = this.orderList
        this.filterDataByDate()
      },
//      dateStartChange (val) {
//        console.log('date start onchange', val)
//      },
//      dateEndChange (val) {
//        console.log('date end onchange', val)
//      },
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
    computed: {},
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
