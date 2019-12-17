<template>
  <div>
    <table class="list-table">
      <tbody>
      <tr>
        <th>股票代码</th><th>股票名称</th><th>买卖方向</th>
        <th>委托时间</th><th>委托价格</th><th>委托数量</th>
        <th>委托号</th><th>成交价格</th><th>成交数量</th>
        <th>状态</th><th>操作</th>
      </tr>
      <tr v-for="(item,index) in applyTodayList" :key="index">
        <td v-text="item.stock_code"></td><td v-text="item.stock_name"></td><td v-text="item.dealTypeName"></td>
        <td >{{item.time_decl}}</td><td v-text="item.decl_price"></td><td v-text="item.decl_num"></td>
        <td v-text="item.auth_no"></td><td v-text="item.deal_price"></td><td v-text="item.deal_num"></td>
        <td v-text="item.statusName"></td>
        <td v-show="item.deal_status==0||item.deal_status==4||item.deal_status==6||item.deal_status==9||item.deal_status==11||item.deal_status==100||item.deal_status==101||item.deal_status==102">
          <span @click="getCancleList(item.id)" >撤单</span>
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
  import {GetCancle} from '../../assets/js/myTrade/myTrade'//获取当日委托
  import {Cancle} from '../../assets/js/myTrade/myTrade'//撤单
  import {CancleMom} from '../../assets/js/myTrade/myTrade'//撤单
  export default {
    name: "cancleStock",//撤单
    props:['id','productType'],
    data(){
      return{
        applyTodayList:[],//当日委托
        currentPage:1,
        pageSize:10,
        pageCount:0,
        timer:null
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
            if(this.productType==31){
              let result = CancleMom(val)
              result.then((res) => {
                self.$alert('撤单成功！')
                self.applyToday()
              })
            }else{
              let result = Cancle(val)
              result.then((res) => {
                self.$alert('撤单成功！')
                self.applyToday()
              })
            }

          })
      },
      //当日委托
      applyToday(){
        let that=this
        let result = GetCancle(this.id,this.pageSize,this.currentPage)
        result.then(res => {
          that.applyTodayList=res.Data.Data
          that.pageCount=res.Data.PageCount
        })
      },
    },
  }
</script>

<style scoped>

</style>
