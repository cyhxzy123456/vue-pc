<template>
    <div class="delivery">
      <div class="put">
        <span>实盘交易查询 : </span><input type="text" v-model="no" placeholder="请输入您的交易委托号">
      </div>
      <div class="btnList">
        <button @click="getDelivery">确定</button>
      </div>
      <div class="tip">
        <p>操作说明：</p>
        <p>1、实盘交易查询仅限于鼓鼓掌客户用户查询合约内交易是否真实进入市场。</p>
        <p>2、平台确保查询信息真实，对查询结果负责。</p>
        <p>3、鼓鼓掌平台拥有查询功能最终解释权。</p>
      </div>
      <div class="deliveryPop" v-show="deliverShow">
        <img class="close" @click="deliverShow=false" src="https://video.ggz188.com/static/img/index/close.png" alt="">
        <img class="zhang" src="https://video.ggz188.com/static/img/index/tuzhang.png" alt="">
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
        <el-pagination style="text-align: right;padding-right:50px;background: #fff;width: 553px; margin-left: 48%;position: fixed;bottom: 42%;left:9%"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-size="pageSize"
                       layout="total,prev, pager, next, jumper"
                       :total="pageCount">
        </el-pagination>
      </div>
    </div>
</template>

<script>
  import {DeliverInfo} from '../../assets/js/myTrade/myTrade'//获取交割单
    export default {
      name: "delivery",
      layout:'left',
      data(){
        return{
          no:'',
          deliverShow:false,
          deliveryList:[],
          currentPage:1,
          pageSize:5,
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
          if(this.no==''){
            this.$alert('请输入委托号')
            return
          }
          let result = DeliverInfo(this.no,0,this.pageSize,this.currentPage)
          result.then(res => {
            if(res.Data.Data.length==0){
              this.$alert('您的合约下不存在此委托号，请确认')
            }else{
              this.pageCount= res.Data.PageCount
              this.deliveryList =res.Data.Data
              this.deliverShow=true
            }
          })
        },
      }
    }
</script>

<style  lang="less" scoped>
  .el-pagination__total{color:#333}
.delivery{font-size: 20px;color:#f24856;padding: 30px 40px;
  input{width:464px;height:47px;line-height: 47px;border:1px solid #f24856;padding:10px}
  input::-webkit-input-placeholder{color:#666}
  .btnList{padding:40px 0 60px 140px;}
  button{width:140px;height:32px;line-height: 32px;border:1px solid #f24856;border-radius: 20px;background: none;color:#f24856;margin-right:50px}
  .tip{
    p{font-size: 14px;line-height: 24px;color:#f24856}
  }
  .deliveryPop{height:370px;width:1110px;position: fixed;top:20%;border-radius: 50px;padding:54px 20px 0;
    background-color:  rgba(0,0,0,0.5);
    .close{width:38px;height:38px;position: absolute;top:12px;right:30px;cursor: pointer}
    table th,table td{background: #DEE1EA;color:#666;border-right:1px solid #999;    border-bottom: 1px solid #999;}
    .zhang{width:100px;position: absolute;right:30px;top:50px}
  }
}
</style>
