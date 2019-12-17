<template>
  <div style="position: relative">
    <table class="list-table" v-show="productType!=31">
      <tbody>
      <tr>
        <th>股票代码</th><th>股票名称</th><th>持有数量</th><th>可卖数量</th><th>持仓成本</th><th>当前价格</th><th>当前市值</th>
        <th>参考盈亏金额</th><th>盈亏比例</th>
      </tr>
      <tr class="pointer" v-for="(item,index) in stockList" :key="index" @click="sale(item.stock_code,item.deal_num-item.saleingNumber,item.id)">
        <td v-text="item.stock_code"></td><td v-text="item.stock_name"></td><td v-text="item.stock_num"></td><td v-text="item.deal_num-item.saleingNumber"></td>
        <td v-text="parseFloat(item.deal_price).toFixed(3)"></td><td v-text="parseFloat(item.now_price).toFixed(2)">当前价格</td>
        <td v-text="parseFloat(item.now_money).toFixed(2)">最新市值</td>
        <td :class="item.moneyProfit>0?'color-red':'color-green'"
            v-text="parseFloat(item.moneyProfit).toFixed(2)">参考盈亏金额</td>
        <td :class="item.moneyProfit>0?'color-red':'color-green'"
            v-text="parseFloat(item.moneyProfitRate).toFixed(2)+'%'">盈亏比例</td>
      </tr>
      </tbody>
    </table>
    <table class="list-table" v-show="productType==31">
      <tbody>
      <tr>
        <!--股票代码 股票名称 持有数量 可卖数量  持仓成本 止损价格 当前价格 最新市值 参考盈亏 盈亏比例 操作 查看-->
        <th>股票代码</th><th>股票名称</th><th>持有数量</th><th>可卖数量</th>
        <th>持仓成本</th><th>止损价格</th><th>当前价格</th>
        <th>当前市值</th>
        <th>参考盈亏</th><th>盈亏比例</th><th >操作</th><th>查看</th>
      </tr>
      <tr class="pointer" v-for="(item,index) in stockList" :key="index">
        <td v-text="item.stock_code"></td><td v-text="item.stock_name"></td><td v-text="item.stock_num"></td><td v-text="item.deal_num-item.saleingNumber"></td>
        <td v-text="parseFloat(item.deal_price).toFixed(3)"></td><td v-text="parseFloat(item.moneyStoploss).toFixed(2)">止损价格</td><td v-text="parseFloat(item.now_price).toFixed(2)">当前价格</td>
        <td v-text="parseFloat(item.now_money).toFixed(2)">当前市值</td>
        <td :class="item.moneyProfit>0?'color-red':'color-green'"
            v-text="parseFloat(item.moneyProfit).toFixed(2)">参考盈亏金额</td>
        <td :class="item.moneyProfit>0?'color-red':'color-green'"
            v-text="parseFloat(item.moneyProfitRate).toFixed(2)+'%'">盈亏比例</td>
        <td @click="sale(item.stock_code,item.deal_num-item.saleingNumber,item.id)">卖出</td>
        <td @click="detail(item.stockid,item.stock_code,item.stock_name,item.stock_num,item.deal_num-item.saleingNumber,item.now_price,item.now_money,item.moneyProfit,item.moneyProfitRate,item.deposit_money,item.todayExpectedMoney)">查看</td>
      </tr>
      </tbody>
    </table>
    <el-pagination style="padding-top:30px;text-align: right" v-show="productType==31"
                   @size-change="handleSizeChange1"
                   @current-change="handleCurrentChange1"
                   :current-page="currentPage1"
                   :page-sizes="[5, 10, 20, 40]"
                   :page-size="pageSize1"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="pageCount1">
    </el-pagination>
    <el-pagination style="padding-top:30px;text-align: right" v-show="productType!=31"
                   @size-change="handleSizeChange2"
                   @current-change="handleCurrentChange2"
                   :current-page="currentPage1"
                   :page-sizes="[5, 10, 20, 40]"
                   :page-size="pageSize2"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="pageCount2">
    </el-pagination>
    <setPop :isShow="showDetail" @closePop="close('showDetail')" @setData="close('showDetail')">
      <div class="detail">
        <h3 slot="tit">详情</h3>
        <ul>
          <li>股票代码:{{code}}</li><li>股票名称：{{name}}</li>
          <li>持有数量:{{stockNum}}</li><li>可卖数量：{{useNum}}</li>
          <li>当前价格:{{nowPrice}}</li><li>当前市值：{{nowMoney}}</li>
          <li>参考盈亏:{{profit}}</li><li>盈亏比例：{{rate}}%</li>
          <li><span  @click="flowing(nowId)" class="pointer">未结算额:{{noSettle}}</span>
            <span>
                <el-tooltip placement="top">
                  <div slot="content">未结算额=已缴纳保证金-已结算盈利-卖出已结算金额</div>
                  <el-button><span class="wen">?</span></el-button>
                </el-tooltip>
              </span>
          </li>
          <li>今日应结算额：{{todaySettle}}
            <span>
                <el-tooltip placement="top">
                <div slot="content">今日应结算额=参考盈亏+未结算额-当前市值*保证金缴纳比例</div>
                <el-button><span class="wen">?</span></el-button>
              </el-tooltip>
             </span>
          </li>
        </ul>
      </div>
    </setPop>
    <PopDetail v-show="showFlow" @closePop="close('showFlow')" @setData="close('showFlow')">
      <div class="settle-detail" >
        <h3 slot="tit">详情</h3>
        <!-- <span class="pointer" @click="showFlow=false">×</span>-->
        <table class="list-table " v-show="showFlow">
          <tbody>
          <tr>
            <th>业务类型</th><th>发生时间</th><th>发生金额</th><th>备注</th>
          </tr>
          <!-- -->
          <tr v-for="(item,index) in flowList" :key="index">
            <td v-text="item.dealTypeName"></td>
            <td ><span class="time" >{{item.time_deal}}</span><span>{{item.TimeDeal}}</span></td>
            <td v-show="item.deal_type==30">item.fee_money</td>
            <td v-show="item.deal_type!=30" v-text="item.deal_type==0||item.deal_type==50?-item.deal_money:item.deal_money"></td>
            <td v-text="item.remark" width="400"></td>
          </tr>
          <tr>
            <td colspan="2">未结算额合计：</td>
            <td>{{noSettle}}</td>
            <td>未结算额=已缴纳保证金-已结算盈利-卖出已结算金额</td>
          </tr>
          </tbody>
        </table>
        <el-pagination style="padding-top:30px;text-align: right" v-show="showFlow"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[5, 10, 20, 40]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="pageCount">
        </el-pagination>

      </div>
    </PopDetail>
  </div>
</template>

<script>
  import {GetPositionList} from '../../assets/js/myTrade/myTrade'//持仓
  import {GetPositionListMom} from '../../assets/js/myTrade/myTrade'//持仓
  import {GetFlowing2} from '../../assets/js/myTrade/myTrade'//持仓
  import setPop from '../../components/pop/setPop'
  import PopDetail from '../../components/pop/popDetail'
  export default {
    name: "stockList",
    components:{setPop,PopDetail},
    props:['id','productType'],
    data(){
      return{
        stockList:[],//持仓
        flowList:[],//流水
        currentPage:1,
        currentPage1:1,
        currentPage2:1,
        pageSize:10,
        pageSize1:10,
        pageSize2:10,
        pageCount:0,
        pageCount1:0,
        pageCount2:0,
        showFlow:false,
        showDetail:false,
        nowId:'',
        code:'',name:'',stockNum:'',useNum:'',nowPrice:'',nowMoney:'',profit:'',rate:'',noSettle:'',todaySettle:''
      }
    },
    methods:{
      //关闭弹窗
      close(attr){
        this[attr] = false
      },
      handleSizeChange: function (size) {
        this.pageSize = size;
        this.flowing()
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        this.flowing()
      },
      handleSizeChange1: function (size) {
        this.pageSize1 = size;
        this.getStockList()
      },
      handleCurrentChange1: function(currentPage){
        this.currentPage1 = currentPage;
        this.getStockList()
      },
      handleSizeChange2: function (size) {
        this.pageSize2 = size;
        this.getStockList()
      },
      handleCurrentChange2: function(currentPage){
        this.currentPage2 = currentPage;
        this.getStockList()
      },
      //持仓
      getStockList(){
        if(this.productType==31){
          let result = GetPositionListMom(this.id,this.pageSize1,this.currentPage1)
          result.then(res => {
            this.stockList = res.Data.Data
            this.pageCount1 = res.Data.PageCount
          })
        }else{
          let result = GetPositionList(this.id,this.pageSize2,this.currentPage2)
          result.then(res => {
            this.stockList = res.Data.Data
            this.pageCount2 = res.Data.PageCount
          })
        }
      },
      sale(code,num,id){
        this.$emit('saleClick',code,num,id)
      },
      //预结算额点击
      flowing(){
        this.showDetail=false
        this.showFlow=true
        let result = GetFlowing2(this.nowId,this.pageSize,this.currentPage)
        result.then(res => {
          this.flowList = res.Data.Data
          this.pageCount=res.Data.PageCount
        })
      },
      //点击查看
      detail(stockid,code,name,stockNum,useNum,nowPrice,nowMoney,profit,rate,noSettle,todaySettle){
        this.showDetail=true
        this.nowId=stockid
        this.code=code;this.name=name;
        this.stockNum=stockNum;this.useNum=useNum;
        this.nowPrice=parseFloat(nowPrice).toFixed(2);this.nowMoney=parseFloat(nowMoney).toFixed(2);
        this.profit=parseFloat(profit).toFixed(2);this.rate=parseFloat(rate).toFixed(2);
        this.noSettle=noSettle;this.todaySettle=parseFloat(todaySettle).toFixed(2);
      }
    },

  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .select{height: 28px!important;}
  .box-close{display: none!important;}
  .el-button{padding:0!important;border:none!important;}
  .settle-detail{width:900px;
    .pointer{position: absolute;right: 10px;top:0;color:#333;font-size: 30px;}
    td{background: #999;color:#fff!important;line-height: 26px!important;height:26px!important;border-right: 1px solid #eee}
  }
  .detail{
    .wen{ color:#fff;cursor: pointer;width: 16px;height: 16px;background: #9c221f;border-radius: 50%;display: inline-block;text-align: center;font-size: 14px;line-height: 16px;}
    li{float:left;width:49%;font-size: 16px;line-height: 30px}
  }
</style>
