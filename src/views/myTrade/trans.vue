<template>
  <div class="content_main">
    <div class="wrap">
      <div class="trans">
        <div v-show="type==31">
          <MoneyListMom ref="momMoney" :tradeDetailMom="tradeDetailMom" :tradeDetail="tradeDetail"></MoneyListMom>
        </div>
        <div v-show="type!=31">
          <TradeDetail :id="id" :tradeDetail="tradeDetail" :all="all" :type="type" ref="moneyList" ></TradeDetail>
          <MoneyList :tradeDetail="tradeDetail" :all="all" :moneyDeposit="moneyDeposit" :moneyProfit="moneyProfit"></MoneyList>
        </div>
        <div class="transContent">
          <div class="nav fl">
            <ul>
              <li :class="{active:nowType==item.type}" v-for="(item,index) in navList" :key="index" v-text="item.name" @click="chooseType(item.type)"></li>
            </ul>
          </div>
          <div class="rightCont">
            <div class="buy"  v-show="nowType == 0">
              <!--:stockCodeBuy="stockCodeBuy" :id="id" :stockid="stockid" @click="selfClick"-->
              <selfChoose ref="choose" :id="id" @buyBtn="buySelf"></selfChoose>
            </div>
            <!--            买入-->
            <div class="buy"  v-show="nowType == 1">
              <Buy  :id="id" ref="buyRef" :money_balance="money_balance_able" :productType="product_type" :tradeDetailMom="tradeDetailMom" :money_balance_mom="money_balance_mom"></Buy>
            </div>
            <!--            卖出-->
            <div class="buy sale" v-show="nowType == 2">
              <Sale :productType="product_type" :id="id" ref="saleRef" :stockCodeSale="stockCodeSale" ></Sale>
            </div>
            <!-- 撤单-->
            <div  v-show="nowType == 3">
              <CancleStock :id="id" ref="cancle" :productType="product_type"></CancleStock>
            </div>
            <!--            持仓查询-->
            <div v-show="nowType == 4">
              <StockList @saleClick="sale" :id="id" ref="position" :productType="product_type"></StockList>
            </div>
            <!--            资金流水-->
            <div v-show="nowType == 5">
              <Flowing :id="id" ref="flow"></Flowing>
            </div>
            <!--            当日委托-->
            <div  v-show="nowType == 6">
              <ApplyDealToday :id="id" ref="todayApplay"></ApplyDealToday>
            </div>
            <!--            当日成交-->
            <div  v-show="nowType == 7">
              <TodayDeal :id="id" ref="dealToday"></TodayDeal>
            </div>
            <!--            历史委托-->
            <div  v-show="nowType == 8">
              <ApplyHis :id="id" ref="applyHis"></ApplyHis>
            </div>
            <!--            历史成交-->
            <div class="hisDeal" v-show="nowType == 9">
              <HisDeal :id="id" ref="hisDeal"></HisDeal>
            </div>
            <!--            交割单-->
            <div  v-show="nowType ==100">
              <Delivery :id="id" ref="delivery"></Delivery>
            </div>
            <!--结算策略-->
            <div  v-show="nowType == 10">
              <HisStock :id="id" ref="hisStock"></HisStock>
            </div>
          </div>
        </div>
        <Pop :isShow="dangerTip"  @closePop="close('dangerTip')" >
          <h3 slot="tit">风险提示</h3>
          <p class="tip">当前账户欠费已触发警戒线，无法委托买入</p>
          <button slot="btn" type="button" class="popBtn" @click="close('dangerTip')">确认</button>
        </Pop>
        <!-- <Pop :isShow="freezeTip"  @closePop="close('freezeTip')" >
           <h3 slot="tit">冻结提示</h3>
           <p class="tip">您的账号已被单向冻结，无法委托买入</p>
           <button slot="btn" type="button" class="popBtn" @click="close('freezeTip')">确认</button>
         </Pop>-->
      </div>
    </div>
  </div>
</template>

<script>
  import {ProductDetail} from '../../assets/js/myTrade/myTrade'//获取合约详情的状态
  import {ProductDetailMom} from '../../assets/js/myTrade/myTrade'//获取合约详情的状态
  import MoneyList from '../../components/trans/moneyList'
  import MoneyListMom from '../../components/trans/momMoneyList'
  import TradeDetail from '../../components/trans/tradeDetail'
  import HisDeal from '../../components/trans/hisDeal'
  import TodayDeal from '../../components/trans/todayDeal'
  import ApplyHis from '../../components/trans/applyHis'
  import ApplyDealToday from '../../components/trans/applyToday'
  import Flowing from '../../components/trans/flowing'
  import StockList from '../../components/trans/stockList'
  import selfChoose from '../../components/trans/selfChoose'
  import Buy from '../../components/trans/buy'
  import Sale from '../../components/trans/sale'
  import Pop from '../../components/pop/pop'
  import CancleStock from '../../components/trans/cancleStock'//撤单
  import Delivery from '../../components/trans/delivery'//交割单
  import HisStock from '../../components/trans/stockHis'//结算策略
  export default {
    components:{HisStock,MoneyListMom,selfChoose,MoneyList,TradeDetail,HisDeal,ApplyHis,TodayDeal,ApplyDealToday,Flowing,StockList,Buy,Sale,Pop,CancleStock,Delivery},
    data(){
      return{
        product_type:'',//协议类型
        money_begin:0,//起始资金
        money_all:0,//总资产
        money_balance:0,//账户余额
        money_balance_able:0,//可用余额
        money_cap:0,//证券净值
        moneyProfit:0,//盈亏金额
        moneyDeposit:0,//保证金
        id:this.$route.query.id,
        type:this.$route.query.type,
        Borrowid:'',
        //,{name:'交割单',type:10}
        navList:[
          {name:'自选股票',type:0},{name:'委托买入',type:1},{name:'委托卖出',type:2},{name:'委托撤单',type:3},{name:'持仓查询',type:4},{name:'委托流水',type:5},
          {name:'当日委托',type:6},{name:'当日成交',type:7},{name:'历史委托',type:8},{name:'历史成交',type:9},{name:'结算策略',type:10}
        ],
        nowType:1,
        nowType1:this.$route.params.nowType1,
        saleCode:this.$route.params.code,
        dealType:'0',//0买入，1，卖出
        status:'',//合约详情的状态
        freezeTip:false,
        dangerTip:false,
        BalanceMoney:'',
        tradeStatus:'',
        tradeDetail:{},
        tradeDetailMom:[],
        all:{},
        timer:null,
        timer1:null,
        stockCodeSale:'',
        money_balance_mom:'',
        freeze:''
      }
    },
    methods:{
      //自选跳到买入
      buySelf(val){
        this.nowType = 1
        this.$refs.buyRef.stockCodeBuy=val
        this.$refs.buyRef.interval()
      },
      //从持仓跳到卖出
      sale(code,num,id){
        this.nowType=2
        this.$refs.saleRef.stockCodeSale=code
        this.$refs.saleRef.positionNum=num
        this.$refs.saleRef.stockId=id
        this.$refs.saleRef.interval()
        this.$refs.saleRef.quotation(code)
      },
      //获取合约详情mom
      getStatus(first){
        if(this.$route.query.type==31){
          this.navList=this.navList
          let result = ProductDetailMom(this.id)
          result.then(res => {
            this.tradeDetailMom = res.Data.followInfo.split(';')
            this.tradeDetail = res.Data.followModel
            this.money_balance_mom=this.tradeDetailMom[1].split(':')[1]
            this.product_type=res.Data.followModel.product_type
            this.status = res.Data.followModel.status
            this.freeze = res.Data.followModel.freeze
            setTimeout(()=>{
              this.$refs.momMoney.deng()
            },1000)
            if(first){
              if(this.freeze == 24||this.freeze==25||this.status == 24||this.status==25){
                this.$alert('您的账号已被单向冻结，无法委托买入')
                this.tradeStatus = '单向冻结'
              }else{
                this.tradeStatus = '操盘中'
              }
            }
          })
        }else{
          this.navList=this.navList.slice(0,10)
          let result = ProductDetail(this.id)
          result.then(res => {
            this.all=res.Data
            this.tradeDetail = res.Data.followModel
            this.moneyDeposit = this.tradeDetail.moneyDeposit
            console.log(this.moneyDeposit)
            this.moneyProfit = res.Data.followModel.moneyProfit
            this.money_balance=res.Data.followModel.moneyBalance
            this.money_balance_able=res.Data.followModel.moneyBalanceAble
            this.product_type=res.Data.followModel.product_type
            this.status = res.Data.followModel.status
            this.freeze = res.Data.followModel.freeze
            if(first){
              if(this.freeze == 24||this.freeze==25||this.status == 24||this.status==25){
                this.$alert('您的账号已被单向冻结，无法委托买入')
                this.tradeStatus = '单向冻结'
              }else{
                this.tradeStatus = '操盘中'
              }
            }
          })
        }
      },
      //关闭弹窗
      close(attr){
        this[attr] = false
      },
      //当日委托和撤单数据加载
      chooseType( type){
        let that = this
        clearInterval(that.timer)
        this.nowType = type
        clearInterval(that.$refs.buyRef.timer)
        clearInterval(that.$refs.saleRef.timer)
        if(that.nowType ==0){
          that.$refs.choose.myChoose()
        }
        if(that.nowType ==1){
          that.$refs.buyRef.clear()
        }
        if(that.nowType ==2){
          that.$refs.saleRef.clear()
        }
        if(that.nowType ==3){
          that.$refs.cancle.applyToday()
          that.timer=setInterval(function(){
            that.$refs.cancle.applyToday()
          },6000)
        }
        if(that.nowType ==6){
          that.$refs.todayApplay.applyToday()
          that.timer=setInterval(function(){
            that.$refs.todayApplay.applyToday()
          },6000)
        }
        if(that.nowType ==4){
          that.$refs.position.getStockList()
          that.timer=setInterval(function(){
            that.$refs.position.getStockList()
          },6000)
        }
        if(that.nowType ==5){
          that.$refs.flow.flowing()
          that.timer=setInterval(function(){
            that.$refs.flow.flowing()
          },6000)
        }
        if(that.nowType ==7){
          that.$refs.dealToday.dealToday()
          that.timer=setInterval(function(){
            that.$refs.dealToday.dealToday()
          },6000)
        }
        if(that.nowType ==8){
          that.$refs.applyHis.applyHistory()
          that.timer=setInterval(function(){
            that.$refs.applyHis.applyHistory()
          },6000)
        }
        if(that.nowType ==9){
          that.$refs.hisDeal.dealHistory()
          that.timer=setInterval(function(){
            that.$refs.hisDeal.dealHistory()
          },6000)
        }
        //交割单执行
        if(that.nowType ==100){
          that.$refs.delivery.getDelivery()
          that.timer=setInterval(function(){
            that.$refs.delivery.getDelivery()
          },6000)
        }
        //结算策略hisStock
        if(that.nowType ==10){
          that.$refs.hisStock.stockHistory()
          that.timer=setInterval(function(){
            that.$refs.hisStock.stockHistory()
          },6000)
        }
      },
      panduan(){
        if(this.nowType1==2){
          let that = this
          that.nowType = 2
        }
      }
    },
    mounted() {
      this.getStatus(true)
      this.timer1=setInterval(()=>{
        this.getStatus(false)
      },3000)
      this.panduan()
    },
    beforeDestroy() {
      clearInterval(this.timer)
      clearInterval(this.timer1)
    }
  }
</script>

<style rel="stylesheet/less" lang="less" >

  .trans{position: relative;    margin: 60px 0;background: #fff;border:1px solid #ddd;border-top:5px solid #9c221f;padding:0 40px 70px;
    .list-table{font-size: 14px;    border: 1px solid #eee;
      th{background: #666;line-height: 60px;vertical-align: middle;padding:0;color: #fff;font-weight: bold;
        .cell{text-align: center}}
      td{padding:0 0;color: #e54343;border-bottom: 1px solid #ebeef5;text-align: center!important;line-height: 56px;
        .cell{;color:#e54343;line-height: 56px;}
        span{cursor: pointer}
      }
    }
    .red{color:#e60012}
    .user-money {width: 100%;overflow: hidden;    margin-bottom: 30px;position: relative;
      li {border: 0;float: left;padding-right:4%;color:#333;
        p:last-child,p:nth-child(2) {font-size: 20px;margin-top: 14px;color:#9c221f}
      }
      li:last-child{padding-right: 0}
      button{position: absolute;padding:5px 15px;background: #666;color:#fff;border-radius: 5px;top:35px}
    }
    .id{margin:10px 0;font-size: 18px}
    .transContent{overflow: hidden;
      .nav{border:1px solid #ddd;margin-right: 40px;
        li{width:220px;height:60px;line-height: 60px;text-align: center;cursor: pointer;border-bottom: 1px solid #ddd}
        li.active{background: #9c221f;color:#fff;}
      }
      .rightCont{float:left;width:850px;
        .buy{overflow: hidden;
          .buyLeft{margin-right: 38px;
            li{margin-bottom: 20px;position: relative;
              button{cursor:pointer;position: absolute;width:36px;height:40px;line-height: 36px;background:#666;color:#fff;top:0;right:0;text-align: center;font-size: 30px;
              }
              button.delete{left:132px;border-bottom-left-radius: 5px;border-top-left-radius: 5px;background: url("../../../static/img/trade/del.png") no-repeat center #666}
              button.add{ border-bottom-right-radius: 5px;border-top-right-radius: 5px;background: url("../../../static/img/trade/add.png") no-repeat center #666}
              span{width:132px;display: inline-block;float:left;line-height: 40px}
              input{border: 1px solid #ccc;width:246px;height:40px;line-height: 40px;border-radius: 5px;font-size: 16px;color:#999;padding:0 20px}
              input.small{padding-left:40px;}
              .number{
                p{display: inline-block;width:50%;line-height: 58px;text-align: center;
                  input{width:18px;height: 18px;}
                }
              }
            }
            li.chooseNum{overflow:hidden;height: auto}
            li:first-child{position: relative}
            li.btn{margin:0 auto}
          }
          .buy-right{float:left;    width: 434px;
            .data-list{
              .top{span{font-size: 26px;color:#333;padding-right: 20px}button{background: none;font-size: 16px;border:1px solid #9c221f;border-radius:5px;line-height: 28px;width:90px;text-align: center;float:right}}
              .center{
                span{line-height: 66px;padding-right: 25px;}
                span:first-child{font-size: 24px;i{font-size: 44px;}}
              }
              .bot{margin-bottom: 10px;overflow: hidden;
                li{line-height: 30px;float:left;width:33.33%;text-align: left;}
                li:nth-child(3n+3){margin-right: 0;}
              }
            }
          }
        }

      }
    }
  }

</style>
