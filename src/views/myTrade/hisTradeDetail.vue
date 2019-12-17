<template>
  <div class="hisTradeDetail content_main">
    <div class="wrap">
      <div class="inner-page-nav-wrap wrap">
        <ul class="wrap clearfix inner-page-nav">
          <li  class="nav "><router-link to="/myTrade/myTrade"> 我的策略</router-link></li>
        </ul>
      </div>
      <div class="transport ">
        <div class="tranport_title">
          <span id="idd">{{hisTradeList.productTypeName}} ({{hisTradeList.borrowid}})</span>
        </div>
        <div class="tranport_content">
          <div class="history-title-wrap" >
            <ul class="first">
              <li>
                <div>策略投资额</div>
                <div v-text="parseFloat(hisTradeList.money_borrow+hisTradeList.moneyDeposit).toFixed(2)">8000</div>
              </li>
              <li>
                <div>策略受托额</div>
                <div v-text="hisTradeList.money_borrow">6000</div>
              </li>
              <li>
                <div>风险保证金</div>
                <div v-text="hisTradeList.moneyDeposit">2000</div>
              </li>
            </ul>
            <ul class="first">
              <li>
                <div>利益分配</div>
                <div>{{profitDistribution*10}}%</div>
              </li>
              <li>
                <div>风险警戒线</div>
                <div v-text="hisTradeList.money_warn">7000</div>
              </li>
              <li>
                <div>亏损平仓线</div>
                <div v-text="hisTradeList.money_open_line">6600</div>
              </li>
            </ul>
          </div>
          <div class="history-title-wrap second easy_style45">
            <div class="history_title">合约明细</div>
            <ul>
              <li> <div>操盘资金：<span style="font-weight: 600;" v-text="parseFloat(hisTradeList.money_borrow+hisTradeList.moneyDeposit).toFixed(2)">8000</span></div></li>
              <li> <div>交易品种：<span style="font-weight: 600;"><span style="color: #566B96;">A</span>股</span></div></li>
              <li>  <div>交易盈亏：<span :class="hisTradeList.moneyProfit+AnyProfit>=0?'color-red':'color-green'" v-text="parseFloat(hisTradeList.moneyProfit+AnyProfit).toFixed(2)">0</span></div></li>
            </ul>
            <ul>
              <li><div>开始时间：<span >{{hisTradeList.date_begin  | dateFormat('YYYY-MM-DD')}}</span></div></li>
              <li><div>结束时间：<span>{{hisTradeList.date_end  | dateFormat('YYYY-MM-DD')}}</span></div></li>
              <li v-show="hisTradeList.product_type!=13"><div>委托人收益：<span v-text="parseFloat(borrowAnyInterest).toFixed(2)">13.2</span>元</div></li>
              <li v-show="hisTradeList.product_type==13"><div>委托人收益：<span v-text="parseFloat(borrowAnyInterest).toFixed(2)">13.2</span>元</div></li>
            </ul>
          </div>
          <div class="history-title-wrap second easy_style45">
            <div class="history_title">
              <span >交易盈利分配</span>
              <span class="easy_style48" v-text="hisTradeList.StatusName">已结算</span>
            </div>
            <ul>
              <li>
                <div>盈利分配：<span :class="userProfit>=0?'color-red':'color-green'" v-text="userProfit<0?0:parseFloat(userProfit).toFixed(2)">0</span></div>
              </li>
              <li>
                <div>已提走盈利：<span  v-text="AnyProfit">0</span></div>
              </li>
              <li>
                <div>亏损赔付：<span v-text="userLoss">0</span></div>
              </li>
            </ul>
          </div>
          <div class="history-title-wrap second third easy_style45">
            <div class="history_title">
              <span style="color: #666;">履约金结算</span>
              <span class="easy_style48" v-text="hisTradeList.StatusName">已结算</span>
            </div>
            <ul>
              <li>
                <div>冻结：<span style="font-weight: 600; color: #566B96;" v-text="hisTradeList.moneyDeposit">2000</span></div>
              </li>
              <li>
                <div>扣减：<span style="font-weight: 700; color: #999;" id="sale_number"  v-text="parseFloat(hisTradeList.moneyProfit)>0?'0.00':hisTradeList.moneyProfit">0</span></div>
              </li>
              <li>
                <div>解冻：<span style="font-weight: 700; color: #333;" v-text="parseFloat(moneyGet).toFixed(2)">2000</span></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p class="hisTrade">历史交易</p>
      <HisDeal :id="id" ref="hisDeal"></HisDeal>
    </div>
  </div>
</template>

<script>
  import {SettleDetail} from '../../assets/js/myTrade/myTrade'
  import HisDeal from '../../components/trans/hisDeal'
  export default {
    components:{HisDeal},
    data(){
      return{
        hisTradeList:{},
        data:{},
        hisCharge:[],
        id:this.$route.params.id,
        currentPage:1,
        pageSize:10,
        timer:null,
        moneyGet:'',//解冻
        userProfit:'',//盈利分配
        userLoss:'',//亏损赔付
        AnyProfit:'',//亏损赔付
        profitDistribution:'',//盈利分成,
        borrowAnyInterest:''
      }
    },
    methods:{
      hisDetail(){
        let result = SettleDetail(this.id)
        result.then((res)=>{
          this.hisTradeList = res.Data.followModel
          this.profitDistribution = res.Data.profitDistribution
          this.moneyGet = res.Data.moneyGet
          this.userProfit = res.Data.followModel.moneyProfit
          this.userLoss = res.Data.userLoss
          this.AnyProfit = res.Data.AnyProfit
          this.borrowAnyInterest = res.Data.borrowAnyInterest
          this.$refs.hisDeal.dealHistory()
        })
      },
    },
    created() {
      this.hisDetail()
    }
  }
</script>

<style rel="stylesheet/less" lang="less" >
  .inner-page-nav-wrap {text-align: center;
    .inner-page-nav {
      .nav {float: left;padding:40px 0;font-size: 24px;cursor: pointer;color: #9c221f;margin-right: 35px;font-weight: 700}
      a{color: #9c221f;}
    }
  }
  .hisTradeDetail{
    .title{border-bottom: 1px solid #2f7ca8;height: 35px;
      span{display: inline-block;width: 100px;font-size: 14px;line-height: 14px;color: #2f7ca8;padding-bottom: 15px;border-bottom: 2px solid #2f7ca8;margin-left: 10px;text-align: center;}
    }
    .transport{padding: 40px 40px 60px;border: 1px solid #eee;background: #fff;border-top: 5px solid #9c221f;
      .tranport_title{background-color: #999;color:#fff;font-size: 16px;font-weight: 700;padding-left: 30px;height:78px;line-height: 78px}
      .history-title-wrap {margin: 40px 40px 0;padding-bottom: 24px;border-bottom: 1px solid #ddd;
        ul{margin-bottom: 30px;overflow: hidden;
          li{float: left;width: 33%}
          li>div{padding-left:8%}
        }
        ul.first li div:first-child{margin-bottom: 20px}
      }
      .history_title {padding: 40px 40px 20px 0;color: #666;font-weight: 700;}
    }
    .easy_style48 {float: right;color: #999;font-size: 14px;font-weight: 700;}
    .history_apply {height: 45px;line-height: 45px;margin: 20px 0 20px 0;border-bottom: 1px solid #ddd;font-weight: 600;color:#333;}
    .list-table th {text-align: center;background: #999!important;color: #fff;line-height: 56px;border-bottom: 1px solid #DDD;}
    .list-table td{    padding: 0 0;color: #e54343;border-bottom: 1px solid #ebeef5;text-align: center!important;line-height: 56px;}
    .red{font-weight: 600; color: #FF2626; }
    .hisTrade{font-size: 16px;font-weight: 700;padding-bottom: 20px;border-bottom: 1px solid #ddd;margin-bottom: 20px;margin-top: 50px;}
  }

</style>
