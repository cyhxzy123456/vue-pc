<template>
    <div class="content_main">
      <div class="bg-banner">
        <img src="../../../static/img/trade/free-banner.png" width="100%" >
      </div>
      <div class="free-bg wrap">
        <div class="mfty_bg">每个新用户只有一次体验机会</div>
        <p></p>
        <img src="../../../static/img/trade/free-icon1.png" >
        <div class="mfty_border">{{this.$store.getters.allInfo.webName}}出 <span class="c-red" v-text="moneyMax"></span>元 <span class="font-size-20">（完全免费）</span></div>
        <img src="../../../static/img/trade/free-icon1.png" >
        <div class="mfty_border">您交 <span class="c-red">{{money}}</span>元保证金 <span class="font-size-20">(无亏损全额返还亏损则剩余返还)</span></div>
        <img src="../../../static/img/trade/free-icon1.png" >
        <div class="mfty_border">总计 <span class="c-red" v-text="total"></span>元 <span class="font-size-20">（由您操盘）</span></div>
        <img src="../../../static/img/trade/free-icon1.png">
        <div class="mfty_border">交易 <span class="c-red">{{day}}</span>天 <span class="font-size-20">（第{{day}}个交易日 <span class="c-red">14:30</span>前卖出）</span></div>
        <img src="../../../static/img/trade/free-icon1.png" >
        <div class="mfty_border">盈利全归您 <span class="font-size-20">（亏损自负）</span></div>
        <img src="../../../static/img/trade/free-icon2.png" >
        <div class="btn_ljty pointer" @click="startStockFree">立即体验</div>
        <div class="mftyrule">
          <h1>活动规则</h1>
          <ul>
            <li>1、 赠送 {{moneyMax}}元实盘资金（完全免费）; </li>
            <li>2、 您交{{money}}元保证金（结束时如无亏损全额返还，如亏损则扣除亏损剩余返还）;</li>
            <li>3、 总共<span >{{total}}</span>元实盘资金（由您操盘，盈利全归您);</li>
            <li>4、 盈利全归您，亏损自负（无亏损保证金全额退还，如交易账户总资产低于<span v-text="rateOpenLine">600.00</span>元将会自动平仓并终止体验，亏损将从保证金中扣除，超出保证金亏损部分由{{this.$store.getters.allInfo.webName}}承担）;</li>
            <li>5、 免费操盘资金仅限使用<span>{{day}}</span>个交易日，第<span>{{day}}</span>个交易日只能委托卖出不能委托买入，如第<span>{{day}}</span>个交易日未委托卖出股票，系统将在14:30后执行自动委托卖出指令，不保证委托卖出价格。</li>
          </ul>
          <div class="bg3-cont">
            <div class="right">*{{this.$store.getters.allInfo.webName}}拥有本次活动最终解释权</div>
          </div>
          <div class="toy"></div>
        </div>
      </div>
      <setPop :isShow="ShowFree" @closePop="close('ShowFree')" @setData="subFree" :error="err" >
        <h3 slot="tit">免息体验</h3>
        <ul class="freeDetail" >
          <li><span>风险保证金</span><span v-text="money+'元'">88元</span></li>
          <li><span>赠送合约资金<i style="color:#999;font-size: 12px;font-weight: normal"></i></span>
            <span >{{moneyMax}}</span>
          </li>
          <li><span>合约期限</span><span v-text="day+'个交易日'"></span></li>
        </ul>
        <p class="tipBot">非盘中申请的合约，下个交易日生成</p>
      </setPop>
      <ReviewNamePop ></ReviewNamePop>
    </div>
</template>

<script type="text/ecmascript-6">
  import setPop from '../../components/pop/setPop'
  import {ProductDetail} from '../../assets/js/trade/trade'
  import {CommitProduct} from '../../assets/js/trade/trade'
  import ReviewNamePop from '../../components/pop/reviewNamePop'
export default {
  components:{setPop,ReviewNamePop},
  data () {
    return {
      err:'',
      ShowFree:false,
      productType:10,
      freeList:{},
      rateOpenLine:'',
      total:0,
      fee:0,//管理费
      profitDistribution:0,//盈利分成,
      moneyMax:'',
      moneyTimes:'',
      money:'',
      day:''
    }
  },
  methods: {
    startStockFree(){
      let token = this.$store.getters.token;
      if(token == ""){
        this.$alert('请先登录')
        this.$router.push('/login')
      }else{
        this.ShowFree = true
      }
    },
    getDetail(){
      let result = ProductDetail(this.productType)
      result.then((res)=>{
        this.freeList = res.Data[0]
        this.day = res.Data[0].dateMax
        this.profitDistribution = res.Data[0].rateDivide
        this.moneyMax = res.Data[0].moneyMax
        this.moneyTimes = res.Data[0].moneyTimes
        this.money = this.moneyMax/this.moneyTimes
        this.total=this.moneyMax+this.money
        this.rateOpenLine=this.freeList.rateOpenLine*this.money+this.moneyMax
      })
    },
    subFree(){
      let result = CommitProduct(this.freeList.id,this.freeList.moneyMin,this.moneyMax,this.fee,this.profitDistribution,this.freeList.dateMin)
      result.then((res)=>{
        this.$alert('免费策略申请成功！')
        this.ShowFree = false
      })
    },
    //关闭弹窗
    close(attr){
      this[attr] = false
    }
  },
  created() {
    this.getDetail()
  }

}
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .c-red {color: red;}
  .right{text-align: right}
  .font-size-20 {font-size: 20px;}
  .free-bg {padding: 50px 0;font-size: 36px;font-weight: normal;color: #666;text-align: center}
  .mfty_bg {background-color: #f3895b;color: #fff;border-radius: 5px;line-height: 90px;width: 800px;margin: 0 auto;border: 1px solid #eab36c;}
  img {padding: 5px 0;}
  .mfty_border {border-radius: 10px;line-height: 90px;width: 798px;margin: 0 auto;border: 1px solid #eab36c;}
  .btn_ljty {background-color: #fa7f3b;color: #fff;line-height: 71px;width: 327px;margin: 0 auto;border: 1px solid #eab36c;border-radius: 10px;margin-top: 57px;}
  .mftyrule {color: #666;line-height: 40px;font-size: 16px;text-align: left;padding-top: 50px;
    li{line-height: 30px}
    h1 {font-size: 24px;}
  }
  .freeDetail {
    li{font-size: 14px;color: #666;margin-bottom: 20px;margin-top: 20px;border-bottom: 1px dotted #ddd;padding-bottom: 20px;
      span{display: inline-block;font-weight: 700;}
      span:last-child{float:right}
    }
  }
  .tipBot{    color: orange;font-size: 14px;font-weight: 700;margin: 20px auto 10px;text-align: center;}

</style>
