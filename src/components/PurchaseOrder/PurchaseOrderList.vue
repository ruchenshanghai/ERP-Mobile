<template>
  <div>

    <search
      @on-change="searchTextChange"
      position="absolute"
      auto-scroll-to-top top="46px"
      ref="search">
    </search>
    <group title="请选择日期区间">
      <datetime v-model="dateBegin" title="起始日期"></datetime>
      <datetime v-model="dateEnd" title="结束日期"></datetime>
    </group>

  </div>
</template>

<script>
  import { Search, Datetime, Group } from 'vux'

  export default {
    directives: { },
    components: {
      Search,
      Datetime,
      Group
    },
    name: 'purchase-order-list',
    data () {
      return {
        propUser: this.user,
        propOperation: this.operations,
        dateBegin: null,
        dateEnd: null
      }
    },
    created () {
      this.$http.post(this.propOperation.purchaseOrder.getAllUrl, this.propUser).then(orderRes => {
        console.log('order', orderRes)
        console.log(JSON.stringify(orderRes.data))
      })
    },
    ready () {
    },
    methods: {
      searchTextChange (val) {
        console.log('on-change', val)
      }
    },
    computed: { },
    props: ['user', 'operations']
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
