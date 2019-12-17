<template>
    <div>
      <table class="list-table">
        <tbody>
        <tr>
          <th>股票代码</th><th>股票名称</th><th>买入策略数量</th><th>买入策略成本</th>
          <th>卖出策略数量</th><th>卖出策略收入</th><th>结算盈亏</th>
        </tr>
        <tr v-for="(item,index) in dealHistoryList" :key="index">
          <td v-text="item.stock_code"></td><td v-text="item.stock_name"></td><td v-text="item.buy_num"></td><td v-text="item.deal_money"></td>
          <td v-text="item.sale_num"></td><td v-text="item.sale_money"></td><td v-text="item.profit_money"></td>
        </tr>
        <tr>
          <td colspan="7">总计：{{TotalMoney}}</td>
        </tr>
        </tbody>
      </table>
      <el-pagination style="padding-top:30px;text-align: right"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[5, 10, 20, 40]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="pageCount">
      </el-pagination>
    </div>
</template>

<script>
  import {GetStockHistory} from '../../assets/js/myTrade/myTrade'//获取历史成交
    export default {
      props:['id'],
      data(){
          return{
            dealHistoryList:[],//历史成交
            currentPage:1,
            pageSize:10,
            pageCount:0,
            TotalMoney:''
          }
      },
      methods:{
        handleSizeChange: function (size) {
          this.pageSize = size;
          this.stockHistory()
        },
        handleCurrentChange: function(currentPage){
          this.currentPage = currentPage;
          this.stockHistory()
        },
        //历史成交
        stockHistory(){
          let result = GetStockHistory(this.id,this.pageSize,this.currentPage)
          result.then(res => {
            this.TotalMoney= res.Data.TotalMoney
            this.pageCount= res.Data.list.PageCount
            this.dealHistoryList = res.Data.list.Data
          })
        },
      },
    }
</script>

<style scoped>

</style>
