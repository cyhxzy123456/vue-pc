<template>
    <div>
      <table class="list-table">
        <tbody>
        <tr>
          <th>股票代码</th><th>股票名称</th><th>交易方式</th><th>策略时间</th>
          <th>策略价格</th><th>策略数量</th><th>成交数量</th>
          <th>成交价格</th><th>成交金额</th><th>状态</th>
        </tr>
        <tr v-for="(item,index) in applyHistoryList" :key="index">
          <td v-text="item.stock_code"></td><td v-text="item.stock_name"></td><td v-text="item.dealTypeName"></td>
          <td >{{item.time_decl}}</td>
          <td v-text="item.decl_price"></td><td v-text="item.decl_num"></td><td v-text="item.deal_num"></td>
          <td v-text="item.deal_price"></td><td v-text="item.deal_money"></td><td v-text="item.statusName"></td>
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
  import {GetApplyHistory} from '../../assets/js/myTrade/myTrade'//获取历史委托
    export default {
        name: "applyHis",
      props:['id'],
      data(){
          return{
            applyHistoryList:[],//历史委托
            currentPage:1,
            pageSize:10,
            pageCount:0,
          }
      },
      methods:{
        handleSizeChange: function (size) {
          this.pageSize = size;
          this.applyHistory()
        },
        handleCurrentChange: function(currentPage){
          this.currentPage = currentPage;
          this.applyHistory()
        },
        //历史委托
        applyHistory(){
          let result = GetApplyHistory(this.id,this.pageSize,this.currentPage)
          result.then(res => {
            this.applyHistoryList = res.Data.Data
            this.pageCount= res.Data.PageCount
          })
        },
      },
      created() {

      }
    }
</script>

<style scoped>

</style>
