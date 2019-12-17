<template>
    <div>
      <table class="list-table">
        <tbody>
        <tr>
          <th>股票代码</th><th>股票名称</th><th>买卖方向</th><th>策略时间</th>
          <th>策略价格</th><th>策略数量</th><th>委托号</th><th>成交价格</th>
          <th>成交数量</th><th>状态</th><!--<th>操作</th>-->
        </tr>
        <tr v-for="(item,index) in applyTodayList" :key="index">
          <td v-text="item.stock_code"></td><td v-text="item.stock_name"></td><td v-text="item.dealTypeName"></td>
          <td >{{item.time_decl}}</td>
          <td v-text="item.decl_price"></td><td v-text="item.decl_num"></td> <td v-text="item.auth_no"></td>
          <td v-text="item.deal_price"></td><td v-text="item.deal_num"></td><td v-text="item.statusName"></td>
<!--
          <td><span @click="getCancleList(item.Id)" v-show="item.DealStatus ===0||item.DealStatus ===4||item.DealStatus ===6||item.DealStatus ===9">撤单</span></td>
-->
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
  import {GetApplyToday} from '../../assets/js/myTrade/myTrade'//获取当日委托
  //import {cancle} from '../../assets/js/global/api'//撤单
 /* import Pop from '../../components/pop'*/
    export default {
        name: "applyDealToday",
      props:['id'],
      data(){
          return{
            applyTodayList:[],//当日委托
            currentPage:1,
            pageSize:10,
            pageCount:0,
            timer:null,
            showCancel:false
          }
      },
      methods:{
        handleSizeChange: function (size) {
          this.pageSize = size;
          this.applyToday()
        },
        handleCurrentChange: function(currentPage){
          this.currentPage = currentPage;
          this.applyToday()
        },
        //撤单
        async getCancleList(val){
          let self=this;
          let msg='是否确认撤单?';
          this.$confirm(msg, '确认撤单', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'})
            .then(() => {
            let result = cancle(this.id,val)
            result.then(res => {
              self.$alert('撤单成功！')
              self.applyToday()
            })
        })
        },
        //当日委托
        applyToday(){
          let result = GetApplyToday(this.id,this.pageSize,this.currentPage)
          result.then(res => {
            this.pageCount= res.Data.PageCount
            this.applyTodayList = res.Data.Data
          })
        },
      },
    }
</script>

<style scoped>

</style>
