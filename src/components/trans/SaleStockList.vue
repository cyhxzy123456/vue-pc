<template>
    <div>
      <table >
        <tbody>
        <tr>
          <th>股票代码</th><th>股票名称</th><th>持有数量</th><th>可卖数量</th><th>持仓成本</th><th>当前价格</th>
          <th>盈亏金额</th>
        </tr>
        <tr v-for="(item,index) in stockList" :key="index" @click="inputCode(item.stock_code,item.id,item.deal_num)">
          <td v-text="item.stock_code"></td><td v-text="item.stock_name"></td><td v-text="item.stock_num"></td><td v-text="item.deal_num-item.saleingNumber"></td>
          <td v-text="parseFloat(item.deal_price).toFixed(2)"></td><td v-text="parseFloat(item.now_price).toFixed(2)">当前价格</td>
          <td :class="item.moneyProfit>0?'color-red':'color-green'"
            v-text="parseFloat(item.moneyProfit).toFixed(2)">盈亏金额</td>
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
  import {GetPositionList} from '../../assets/js/myTrade/myTrade'//持仓
    export default {
        name: "saleStockList",
      props:['id'],
      data(){
          return{
            stockList:[],//持仓
            currentPage:1,
            pageSize:10,
            pageCount:0,
          }
      },
      methods:{
        handleSizeChange: function (size) {
          this.pageSize = size;
          this.getStockList()
        },
        handleCurrentChange: function(currentPage){
          this.currentPage = currentPage;
          this.getStockList()
        },
        //持仓
        getStockList(){
          let result = GetPositionList(this.id)
          result.then(res => {
            //this.pageCount = res.Count
            this.stockList = res.Data
          })
        },
        //把持仓的code放到卖出
        inputCode(code,id,num){
          this.$emit('put',code,id,num)
        }

      },

    }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  table {width: 100%;line-height: 24px;text-align: center;
    tr{cursor: pointer}
  th{font-weight: 700;color: #333;border-bottom: 1px solid #ddd;border-right: 1px solid #ddd}
  td{border-bottom: 1px solid #ddd;border-right: 1px solid #ddd}
    th:first-child,td:first-child{border-left: 1px solid #ddd}
  }
</style>
