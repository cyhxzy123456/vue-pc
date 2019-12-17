<template>
    <div>
      <table class="list-table">
        <tbody>
        <tr>
          <th>账户ID</th><th>委托日期</th><th>挂单时间</th>
          <th>证券代码</th><th>证券名称</th><th>买卖标志</th>
          <th>委托单价</th><th>委托数量</th><th>成交价格</th>
          <th>成交数量</th><th>成交金额</th><th>委托号</th>
          <th>券商佣金</th><th>印花税</th><th>过户费</th>
        </tr>
        <tr v-for="(item,index) in deliveryList" :key="index">
          <td v-text="item.followid"></td><td v-text="">{{item.time_deal | dateFormat('YYYY-MM-DD')}}</td><td >{{item.time_deal}}</td>
          <td v-text="item.stock_code"></td><td v-text="item.stock_name"></td><td  v-text="item.deal_type == 0?'买入':'卖出'"></td>
          <td v-text="item.decl_price"></td><td v-text="item.decl_num"></td><td v-text="parseFloat(item.deal_price).toFixed(2)"></td>
          <td v-text="item.deal_num"></td><td v-text="parseFloat(item.deal_money).toFixed(2)"></td><td v-text="item.auth_no"></td>
          <td v-text="item.comission_money"></td><td v-text="item.tax_money"></td><td v-text="item.transfer_money"></td>
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
  import {DeliverInfo} from '../../assets/js/myTrade/myTrade'//获取交割单
    export default {
      name: "delivery",
      props:['id'],
      data(){
          return{
            deliveryList:[],//历史成交
            currentPage:1,
            pageSize:10,
            pageCount:0,
          }
      },
      methods:{
        handleSizeChange: function (size) {
          this.pageSize = size;
          this.getDelivery()
        },
        handleCurrentChange: function(currentPage){
          this.currentPage = currentPage;
          this.getDelivery()
        },
        //交割单
        getDelivery(){
          let result = DeliverInfo('',this.id,this.pageSize,this.currentPage)
          result.then(res => {
            this.pageCount= res.Data.PageCount
            this.deliveryList =res.Data.Data
          })
        },
      },
      created() {

      }
    }
</script>

<style scoped>

</style>
