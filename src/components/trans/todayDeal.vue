<template>
    <div>
      <table class="list-table">
        <tbody>
        <tr>
          <th>股票代码</th><th>股票名称</th><th>交易方式</th><th>成交时间</th>
          <th>成交价格</th><th>成交数量</th><th>成交金额</th><th>委托号</th>
        </tr>
        <tr v-for="(item,index) in dealTodayList" :key="index">
          <td v-text="item.stock_code"></td><td v-text="item.stock_name"></td><td v-text="item.dealTypeName"></td><td>{{item.time_deal}}</td>
          <td v-text="item.deal_price"></td><td v-text="item.deal_num"></td><td v-text="parseFloat(item.deal_money).toFixed(2)"></td> <td v-text="item.auth_no"></td>
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
  import {GetDealToday} from '../../assets/js/myTrade/myTrade'//获取当日成交
    export default {
        name: "todayDeal",
      props:['id'],
      data(){
          return{
            dealTodayList:[],//当日成交
            currentPage:1,
            pageSize:10,
            pageCount:0,
          }
      },
      methods:{
        handleSizeChange: function (size) {
          this.pageSize = size;
          this.dealToday()
        },
        handleCurrentChange: function(currentPage){
          this.currentPage = currentPage;
          this.dealToday()
        },
        //当日成交
        dealToday(){
          let result = GetDealToday(this.id,this.pageSize,this.currentPage)
          result.then(res => {
            this.pageCount= res.Data.PageCount
            this.dealTodayList = res.Data.Data
          })
        },
      },
      created() {

      }
    }
</script>

<style scoped>

</style>
