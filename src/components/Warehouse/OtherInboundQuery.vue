<template>
  <div>
    <group title="搜索">
      <x-input title="请输入搜索关键词" v-model="fetchConfig.keyword" placeholder="keyword" :show-clear="false"  placeholder-align="right" @on-change="searchTextChange"></x-input>
    </group>

    <group title="请选择日期区间">
      <datetime v-model="fetchConfig.beginDate" title="起始日期" @on-change="filterDataByDate"></datetime>
      <datetime v-model="fetchConfig.endDate" title="结束日期" @on-change="filterDataByDate"></datetime>
    </group>


    <group :title="'分页查看，每页最多10条数据，共计' + fetchConfig.rowsCount + '条'">
      <el-pagination
        small :current-page="fetchConfig.pageIndex" :page-size="fetchConfig.pageSize"
        layout="prev, pager, next, jumper" :total="fetchConfig.rowsCount"
        @current-change="handleCurrentPageChange">
      </el-pagination>
    </group>

    <template v-for="order in displayList">
      <group :title="'单据编号: ' + order.billNo + ' 业务类别: ' + order.transTypeName">
        <router-link :to="{'name': 'OtherInboundDetail', 'params': {'ID': order.id}}">
          <grid :cols="3" class="grid-order">
            <grid-item label="单据日期">
              {{order.billDate}}
            </grid-item>
            <grid-item label="供应商">
              {{order.contactName}}
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
        </router-link>
      </group>
    </template>

  </div>
</template>

<script>
  import {XInput, Datetime, Group, Grid, GridItem} from 'vux'
  import moment from 'moment'

  export default {
    directives: {},
    components: {
      XInput,
      Datetime,
      Group,
      Grid,
      GridItem
    },
    name: 'other-inbound-list',
    data () {
      return {
        propUser: this.user,
        // pageIndex, pageSize
        fetchConfig: {
          pageIndex: 1,
          pageSize: 10,
          rowsCount: 0,
          keyword: '',
          beginDate: '',
          endDate: ''
        },
        orderList: [],
        searchList: [],
        displayList: []
      }
    },
    created () {
      if (!this.user.isLogin) {
        this.$router.push('Login')
        return
      }
      // initial the date setting
      this.fetchConfig.beginDate = moment().subtract(6, 'months').format('YYYY-MM-DD')
      this.fetchConfig.endDate = moment().format('YYYY-MM-DD')
      this.fetchOrderListByConfig()
    },
    methods: {
      fetchOrderListByConfig () {
        let postData = { }
        postData.userName = this.user.userName
        postData.password = this.user.password
        postData.fetchConfig = this.fetchConfig
        this.$http.post(this.config.Warehouse.OtherInbound.fetchURL, postData).then(orderRes => {
          orderRes = orderRes.data
          if (!orderRes.status) {
            this.$router.push('Index')
            return
          }
          this.fetchConfig.rowsCount = orderRes.info.rowsCount
          this.orderList = orderRes.info.rows
          this.searchList = this.orderList
          this.displayList = this.orderList
        })
      },
      searchTextChange (val) {
        this.fetchConfig.pageIndex = 1
        this.fetchOrderListByConfig()
      },
      filterDataByDate () {
        this.fetchConfig.pageIndex = 1
        this.fetchOrderListByConfig()
      },
      handleCurrentPageChange (val) {
        this.fetchConfig.pageIndex = val
        this.fetchOrderListByConfig()
      },
      computeBillStatusName (statusCode) {
        if (statusCode === 2) {
          return '全部出库'
        } else {
          return '未出库'
        }
      }
    },
    computed: {},
    props: ['user', 'config']
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .grid-order {
    text-align: center;
    margin-bottom: 20px;
  }

</style>
