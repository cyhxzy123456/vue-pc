<template>
    <div>
      <table class="list-table">
        <tbody>
        <tr>
          <th>流水编号</th><th>交易类型</th><th>交易时间</th>
          <th>发生金额</th><th>股票代码</th><th>股票名称</th><th>备注</th>
        </tr>
        <tr v-for="(item,index) in flowingList" :key="index">
          <td v-text="item.id"></td><td v-text="item.dealTypeName"></td>
          <td ><span class="time" >{{item.time_deal}}</span><span>{{item.TimeDeal}}</span></td>
          <td v-text="item.deal_type==30?'-'+item.fee_money:item.deal_money"></td>
          <td v-text="item.stock_code"></td>
          <td v-text="item.stock_name"></td>
          <td  width="300px">
            <span v-text="item.remark" style="line-height: 30px;display: block"></span>
          </td>
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
  import {GetFlowing} from '../../assets/js/myTrade/myTrade'//获取流水
    export default {
        name: "Flowing",
      props:['id'],
      data(){
          return{
            flowingList:[],//资金流水
            currentPage:1,
            pageSize:10,
            pageCount:0,
          }
      },
      methods:{
        handleSizeChange: function (size) {
          this.pageSize = size;
          this.flowing()
        },
        handleCurrentChange: function(currentPage){
          this.currentPage = currentPage;
          this.flowing()
        },
        //资金流水
        flowing(){
          let result = GetFlowing(this.id,this.pageSize,this.currentPage)
          result.then(res => {
            this.flowingList = res.Data.Data
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
