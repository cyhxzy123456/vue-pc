<template>
  <div>
    <div v-show="validBuy==0">
      <div class="buyLeft fl">
        <ul>
          <li><span>股票代码：</span><input type="text" maxLength="6" v-model="stockCodeBuy"  @keyup="search"><button @click="clear">×</button>
            <ul class="searchList" v-show="showSearch">
              <li @click="searchChoose(item.stock_code)" v-for="(item,index) in searchList" :key="index" v-text="item.stock_code +item.stock_name"></li>
            </ul>
          </li>
          <li><span>股票名称：</span><input type="text" v-model="stockNameBuy"/></li>
          <li><span>当前价格：</span><input type="text" v-model="nowPriceBuy"/></li>
          <li>
            <span>委托价格：</span><input @keyup="type" class="small" type="text" v-model="declPriceBuy"/>
            <button class="add" @click="addPrice"></button>
            <button class="delete" @click="delPrice"></button>
          </li>
          <li>
            <span >最大可买：</span><input disabled="true" type="text" v-model="maxBuy"/>
            <p style="font-size: 13px;padding-top:5px" class="color-red">(最大可买数量为根据您的余额以及平台设定的风控综合计算所得)</p>
          </li>
          <li>
            <span>委托数量：</span><input class="small" type="text" v-model="buyNum" @keyup="param=0"/>
            <button class="add" @click="addNum"></button>
            <button class="delete" :disabled="numAbled" @click="delNum"></button>
          </li>
          <li v-show="productType!=31"><span >策略可用额：</span><input class="no-border" disabled="disabled" type="number" v-model="money_balance"/></li>
          <li v-show="productType==31"><span >策略可买额度：</span><input disabled="disabled" class="no-border" type="number" v-model="money_balance_mom"/></li>
          <li class="chooseNum">
            <div class="number">
              <p v-for="(item,index) in numList" :key="index">
                <input @click="changeNum(item.value)" :id="item.value" type="radio" name="radios" :value="item.value" v-model="param"><label :for="item.value">{{item.txt}}</label>
              </p>
            </div>
          </li>
          <li class="btn" @click="buyStock">建议买入</li>
        </ul>
      </div>
      <div class="buy-right">
        <div class="data-list">
          <div class="top"><span v-text="stockCodeBuy">000001</span><span v-text="stockNameBuy">平安银行</span>
            <!-- <button v-text="word" @click="choose"></button>-->
            <MyChoose :stockCodeBuy="stockCodeBuy" :stockNameBuy="stockNameBuy" ref="choose"></MyChoose>
            <div class="limitBtn fr color-red pointer" @click="showBuy=true">今日限买股</div>
          </div>
          <div class="center">
            <span :class="{'color-red':nowPriceBuy>yesterday,'color-green':nowPriceBuy<yesterday}">{{nowPriceBuy}}<i v-text="nowPriceBuy>yesterday?'↑':'↓'" v-show="nowPriceBuy!=yesterday">↑</i></span>
            <span :class="priceRise>=0?'color-red':'color-green'"><i v-show="priceRise>0">+</i>{{priceRise}}</span>
            <span :class="priceRise>=0?'color-red':'color-green'"><i v-show="priceRise>0">+</i>{{parseFloat(priceRisePercent).toFixed(2)}}%</span>
          </div>
          <div class="bot">
            <ul class="priceList">
              <li>今开：<span :class="{'color-red':stockBuyList.PriceOpen>yesterday,'color-green':stockBuyList.PriceOpen<yesterday}">{{todayPrice}}</span></li>
              <li>最高：<span :class="{'color-red':stockBuyList.PriceDayHigh>yesterday,'color-green':stockBuyList.PriceDayHigh<yesterday}">{{hight}}</span></li>
              <li>涨停：<span class="color-red" @click="declPriceBuy=stockBuyList.PriceRiseStop">{{upPrice}}</span></li>
              <li>昨收：<span >{{yesterday}}</span></li>
              <li>最低：<span :class="{'color-red':stockBuyList.PriceDayLow>yesterday,'color-green':stockBuyList.PriceDayLow<yesterday}">{{low}}</span></li>
              <li>跌停：<span class="color-green"  @click="declPriceBuy=stockBuyList.PriceFallStop">{{downPrice}}</span></li>
            </ul>
          </div>
        </div>
        <Five ref="five" :list="stockBuyList"  @change="changePrice"></Five>
        <Quotation :code="stockCodeBuy" ref="tu"></Quotation>
      </div>
      <!--  <selfChoose :stockCodeBuy="stockCodeBuy" :id="id" :stockid="stockid" @click="selfClick"></selfChoose>-->
    </div>
    <Close :name="name" :isOpen="this.$store.getters.config.validBuy"></Close>
    <LimitBuy @closeLimit="showBuy=false" :showLimit="showBuy"></LimitBuy>
  </div>
</template>

<script>
  import {GetMychoose} from '../../assets/js/myTrade/myTrade'//添加自选
  import {AddMychoose} from '../../assets/js/myTrade/myTrade'//添加自选
  import {DeleteMychoose} from '../../assets/js/myTrade/myTrade'//删除自选
  import {SearchStock} from '../../assets/js/myTrade/myTrade'//搜索
  import {Market} from '../../assets/js/myTrade/myTrade'//买5卖5
  import {Buy} from '../../assets/js/myTrade/myTrade'//买入
  import {BuyMom} from '../../assets/js/myTrade/myTrade'//买入
  import {GetConfig} from '../../assets/js/globalApi/global'//获取充值开关
  import {GetMaxMom} from '../../assets/js/myTrade/myTrade'
  import {GetMax} from '../../assets/js/myTrade/myTrade'
  import Five from '../../components/trans/five'
  import Quotation from '../../components/trans/quotation'
  import selfChoose from '../../components/trans/selfChoose'
  import MyChoose from '../../components/trans/myChooseBtn'
  import Close from '../../components/pop/close'
  import LimitBuy from '../../components/trans/limitBuy'
  export default {
    components:{Five,selfChoose,Close,Quotation,MyChoose,LimitBuy},
    name: "buy",
    props:['id','money_balance','productType','tradeDetailMom','money_balance_mom'],
    data(){
      return{
        color:'#666',
        moneyBalance:'',//可用额
        name:'买入',
        stockCodeBuy:"",//买入股票代码
        stockNameBuy:'',//股票代码
        nowPriceBuy:'--',//当前价格
        declPriceBuy:'',//委托价格
        maxBuy:'',//最大可买
        buyNum:'',//买入数量
        showSearch:false,//是否显示搜索
        searchList:[],//搜索列表
        stockBuyList:{},//买入时输入股票代码返回的数据
        currentPage:1,
        pageSize:10,
        pageCount:0,
        stockid:0,//持仓id
        param:0,
        numList:[{value:1/2,txt:'1/2仓'},{value:1/3,txt:'1/3仓'},{value:1/4,txt:'1/4仓'},{value:1/5,txt:'1/5仓'},],
        word:'+ 自选',//自选按钮，
        myChooseList:[],
        downPrice: '--',//跌停价
        upPrice: '--',//涨停价
        todayPrice: '--',//今开
        hight: '--',//
        low: '--',//,
        priceRise:'--',//涨跌幅,
        priceRisePercent:'0',//涨跌幅,
        yesterday:'--',
        numAbled:false,
        showBuy:false,
        validBuy:''
      }
    },
    methods:{
      getConfig(){
        let result = GetConfig()
        result.then((res)=>{
          this.validBuy=res.validBuy
        })
      },
      clear(){
        this.param=0
        this.showSearch=false
        this.stockCodeBuy=''
        this.stockNameBuy=''
        this.nowPriceBuy='--'
        this.declPriceBuy=''
        this.maxBuy=''
        this.buyNum=''
        this.downPrice='--'
        this.upPrice='--'
        this.todayPrice='--'
        this.hight='--'
        this.low='--'
        this.priceRise='--'
        this.yesterday='--'
        this.priceRisePercent='0'
        this.$refs.five.clear()
        this.$refs.tu.url=''
        this.word='+ 自选'
      },
      addPrice(){
        if(parseFloat(this.declPriceBuy)+0.01<=this.upPrice){
          this.declPriceBuy=parseFloat((this.declPriceBuy*100+0.01*100)/100).toFixed(2)
        }else{
          return
        }
      },
      delPrice(){
        if(parseFloat(this.declPriceBuy)-0.01>=this.downPrice){
          this.declPriceBuy=parseFloat(this.declPriceBuy-0.01).toFixed(2)
        }else{
          return
        }
      },
      addNum(){
        //debugger
        this.param=0
        if(Number(this.buyNum)+100>this.maxBuy){
          this.buyNum=this.maxBuy
        }else{
          this.buyNum=Number(this.buyNum)+100
        }
      },
      delNum(){
        this.param=0
        if(Number(this.buyNum)-100<0){
          return
        }else{
          this.buyNum=Number(this.buyNum)-100
        }
      },
      //获取mom最大可买
      momMax(priceMom){
        let that=this
        let result = GetMaxMom(this.id,priceMom,this.stockCodeBuy)
        result.then(res => {
          if(that.stockCodeBuy.substring(0,3)=='688'){
            if(res<200||that.declPriceBuy==0){
              that.maxBuy=0
              that.buyNum=0
            }else{
              that.maxBuy = res
              that.buyNum = 200
            }
          }else{
            that.maxBuy = res
            if(that.maxBuy<100){
              that.buyNum = 0
            }else{
              that.buyNum = 100
            }
          }
        })
      },
      //股配获取最大可买
      max(price){
        let that=this
        let result = GetMax(that.id,price,this.stockCodeBuy)
        result.then(res => {
          if(that.stockCodeBuy.substring(0,3)=='688'){
            if(res.Data<200||that.declPriceBuy==0){
              that.maxBuy=0
              that.buyNum=0
            }else{
              that.maxBuy = res.Data
              that.buyNum = 200
            }
          }else{
            if(res.Data==null){
              that.maxBuy=0
              that.buyNum = 0
            }else{
              that.maxBuy = res.Data
              if(that.maxBuy<100){
                that.maxBuy = 0
                that.buyNum = 0
              }else{
                that.buyNum = 100
              }
            }
          }
        })
      },
      type(declPriceBuy){
        if(this.productType==31){
          this.momMax(declPriceBuy)
        }else{
          this.max(declPriceBuy)
        }
      },
      //自选数据获取
      myChoose(){
        let that=this
        let result = GetMychoose(that.pageSize,that.currentPage)
        result.then(res => {
          that.myChooseList = res.Data
          that.myChooseList.forEach((val) => {
            if (val.stockCode == that.stockCodeBuy) {
              that.word = '- 自选'
            } else {
              that.word = '+ 自选'
            }
          })
        })
      },
      //把行情5里面的价格填充
      changePrice(val){
        this.declPriceBuy=val
      },
      //买入按钮
      buyStock(){
        clearInterval(this.timer);
        if(this.stockCodeBuy == ''){
          this.$alert('请输入股票代码')
          return
        }
        if(this.buyNum == 0){
          this.$alert('委托数量不能为0')
          return
        }
        if(this.buyNum>this.maxBuy){
          this.$alert('最大可买为'+this.maxBuy)
          return
        }
        if(this.stockCodeBuy.substring(0,3) =='688'){
          if(this.declPriceBuy<parseFloat(this.nowPriceBuy*0.98).toFixed(2)||this.declPriceBuy>parseFloat(this.nowPriceBuy*1.02).toFixed(2)){
            this.$alert('委托失败：科创板股票委托价格不能超过现价涨跌2%范围，请重新委托。')
            return
          }
        }
        let msg=`股票名称：${this.stockNameBuy} <br/>股票代码：${this.stockCodeBuy}  <br/>委托价格：${this.declPriceBuy} <br/>委托数量：${this.buyNum}<br/>买卖方向：建议买入`
        this.$confirm(msg , '确认买入', {confirmButtonText: '确定', cancelButtonText: '取消',dangerouslyUseHTMLString:true})
          .then(()=>{
            if(this.productType==31){
              let loading = this.$loading({
                lock: true,
                text: '提交中，请稍等……',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
              });
              let result = BuyMom(this.id,this.stockCodeBuy,this.stockNameBuy,this.declPriceBuy,this.buyNum,)
              result.then(res => {
                loading.close();
                this.$alert(res.Message);
                this.clear()
              }).catch((err)=>{
                loading.close();
              })
            }else{
              let loading = this.$loading({
                lock: true,
                text: '提交中，请稍等……',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
              });
              let result = Buy(this.id,this.stockCodeBuy,this.stockNameBuy,this.declPriceBuy,this.buyNum,)
              result.then(res => {
                //debugger
                this.maxBuy=''
                this.buyNum = ''
                loading.close();
                this.$alert(res.Message);
                this.clear()
                //console.log(this.declPriceBuy)
              }).catch((err)=>{
                loading.close();
              })
            }
          })
      },
      //选择数量分数
      changeNum(num){
        this.buyNum = Math.floor(parseInt(this.maxBuy*num)/100)*100
      },
      //搜索下拉表
      search(){
        let result = SearchStock(this.stockCodeBuy)
        result.then(res => {
          this.showSearch = true
          if(res.Data.length==0){
            this.$alert('该股票不存在').then(()=>{
              this.clear()
            })
            return
          }else{
            this.searchList = res.Data
          }
        }).catch((err)=>{
          this.clear()
        })
      },
      //搜索后选中
      searchChoose(val){
        this.showSearch = false
        this.searchList=[]
        this.stockCodeBuy = val
        this.$refs.tu.getQuotation(val)
        this.interval()
      },
      //根据股票代码相关数据
      getStockInfo(first){
        let result = Market(this.stockCodeBuy)
        result.then(res => {
          this.stockBuyList=res.Data
          this.hight=parseFloat(this.stockBuyList.PriceDayHigh).toFixed(2)
          this.low=parseFloat(this.stockBuyList.PriceDayLow).toFixed(2)
          this.downPrice=parseFloat(this.stockBuyList.PriceFallStop).toFixed(2)
          this.upPrice=parseFloat(this.stockBuyList.PriceRiseStop).toFixed(2)
          if(this.stockBuyList.TodayPriceOpen!='--'){
            this.todayPrice=parseFloat(this.stockBuyList.TodayPriceOpen).toFixed(2)
          }
          this.yesterday=parseFloat(this.stockBuyList.PriceYesterdayClose).toFixed(2)
          this.stockNameBuy=res.Data.StockName
          this.nowPriceBuy=res.Data.PriceCurrent
          this.priceRise=res.Data.PriceRise
          this.priceRisePercent=res.Data.PriceRisePercent
          if(first){
            this.declPriceBuy = this.nowPriceBuy
            this.type(this.declPriceBuy)
          }
        }).catch((err)=>{
          this.clear()
          clearInterval(this.timer);
        })
      },
      //自选查看
      selfClick(val){
        this.stockCodeBuy = val
        this.getStockInfo()
      },
      interval(){
        let that=this
        clearInterval(that.timer);
        that.getStockInfo(true)
        setTimeout(()=>{
          that.$refs.five.getFive();
        },1000)
        that.timer = setInterval(()=>{
          that.getStockInfo(false)
          that.$refs.five.getFive();
        }, 3000)
      },
    },
    watch:{
      buyNum:function(val){
        if(this.stockCodeBuy.substring(0,3)=='688'){
          if(val-100<200){
            this.numAbled=true
          }else{
            this.numAbled=false
          }
        }else{
          this.numAbled=false
        }
      },
      declPriceBuy:function(val){
        this.type(val)
      },
      stockCodeBuy:function(val){
        if(val.length<6||val.length>6){
          clearInterval(this.timer);
          this.$refs.choose.myChoose()
          return
        }
        if(val.length == 6){
          let that =this
          if(this.productType==13){
            if(val.substring(0,3) !=='688'){
              this.$alert('该产品未开通非科创板交易！');
              setTimeout(()=>{
                this.clear()
              },500)
              clearInterval(this.timer);
              return;
            }
          }else {
            if(val.substring(0,3) =='688'){
              this.$alert('该产品未开通科创板交易！')
              setTimeout(()=>{
                this.clear()
              },500)
              clearInterval(this.timer);
              return;
            }
          }
          that.$refs.choose.myChoose()
          if(val.substring(0,1)==6||val.substring(0,1)==3||val.substring(0,1)==0){
            //that.myChoose()
            that.param=0
            //this.interval()
          }else{
            this.$alert('请输入正确的股票代码')
            return;
          }
        }
      },
    },
    beforeDestroy(){
      clearInterval(this.timer);
    },
    mounted() {
      this.getConfig()
    }
  }
</script>

<style scoped rel="stylesheet/less" lang="less">
  .limitBtn{font-size: 16px!important;padding:0 5px;line-height: 32px;}
  .searchList{border:1px solid #de2a33;background: #fff;position: absolute;left:132px;z-index: 1;padding:0 10px;width:65%;
    li{    color: #de2a33!important;line-height: 35px;margin:0!important;text-align: center;background: none!important;cursor: pointer}
  }

</style>
