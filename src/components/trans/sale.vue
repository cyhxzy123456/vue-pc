<template>
  <div>
    <div class="saleCom" v-show="this.$store.getters.config.validSale==0">
      <div class="buyLeft fl">
        <ul>
          <li  ><span>股票代码：</span>
            <div @click="getPosition" style="display: inline-block"> <input type="text" disabled="disabled" v-model="stockCodeSale"><span class="down" ></span></div>
            <ul class="searchList" v-show="showSearchSale">
              <li><span>股票代码名称</span><span>持仓/可卖</span></li>
              <li @click="searchChoose(item.stock_code,item.id,item.deal_num-item.saleingNumber,item.substockid)" v-for="(item,index) in searchListSale" :key="index" >
                <span v-text="item.stock_code +'/'+item.stock_name"></span><span>{{item.stock_num}}/{{item.deal_num-item.saleingNumber}}</span>
              </li>
            </ul>
          </li>
          <li><span>股票名称：</span><input type="text" v-model="stockNameSale"/></li>
          <li><span>当前价格：</span><input type="text" v-model="nowPriceBuy"/></li>
          <li><span>委托价格：</span>
            <input class="small" type="text" v-model="declPriceSale"/>
            <button class="add" @click="addPrice"></button>
            <button class="delete" @click="delPrice"></button>
          </li>
          <li><span>可卖数量：</span><input type="text" v-model="positionNum" disabled="true"/></li>
          <li><span>卖出数量：</span>
            <input class="small" type="text" v-model="saleNum" @keyup="param=0"/>
            <button class="add" @click="addNum"></button>
            <button class="delete" @click="delNum"></button>
          </li>
          <li class="chooseNum">
            <div class="number">
              <p v-for="(item,index) in numList" :key="index">
                <input @click="changeNumSale(item.value)" :id="item.value" type="radio" name="radios" :value="item.value" v-model="param"><label :for="item.value">{{item.txt}}</label>
              </p>
            </div>
          </li>
          <li class="btn" @click="saleStock">建议卖出</li>
        </ul>
      </div>
      <div class="buy-right">
        <div class="data-list">
          <div class="top"><span v-text="stockCodeSale">000001</span><span v-text="stockNameSale">平安银行</span></div>
          <div class="center">
            <span :class="{'color-red':nowPriceBuy>yesterday,'color-green':nowPriceBuy<yesterday}">{{nowPriceBuy}}<i v-text="nowPriceBuy>yesterday?'↑':'↓'" v-show="nowPriceBuy!=yesterday">↑</i></span>
            <span :class="priceRise>=0?'color-red':'color-green'"><i v-show="priceRise>0">+</i>{{priceRise}}</span>
            <span :class="priceRise>=0?'color-red':'color-green'"><i v-show="priceRise>0">+</i>{{parseFloat(priceRisePercent).toFixed(2)}}%</span>
          </div>
          <div class="bot">
            <ul class="priceList">
              <li>今开：<span :class="{'color-red':todayPrice>yesterday,'color-green':todayPrice<yesterday}">{{todayPrice}}</span></li>
              <li>最高：<span :class="{'color-red':hight>yesterday,'color-green':hight<yesterday}">{{hight}}</span></li>
              <li>涨停：<span class="color-red" @click="declPriceSale=upPrice">{{upPrice}}</span></li>
              <li>昨收：<span >{{yesterday}}</span></li>
              <li>最低：<span :class="{'color-red':low>yesterday,'color-green':low<yesterday}">{{low}}</span></li>
              <li>跌停：<span class="color-green"  @click="declPriceSale=downPrice">{{downPrice}}</span></li>
            </ul>
          </div>
        </div>
        <Five ref="five" :list="stockSaleList"  @change="changePrice"></Five>
        <Quotation :code="stockCodeSale" ref="tu"></Quotation>
      </div>
    </div>
    <Close :name="name" :isOpen="this.$store.getters.config.validSale"></Close>
  </div>
</template>

<script>
  import {Market} from '../../assets/js/myTrade/myTrade'//买5卖5
  import {Sale} from '../../assets/js/myTrade/myTrade'//买入
  import {SaleMom} from '../../assets/js/myTrade/myTrade'//卖出
  import {GetPositionList} from '../../assets/js/myTrade/myTrade'//持仓
  import {GetPositionListMom} from '../../assets/js/myTrade/myTrade'//持仓mom
  import {GetMaxSale} from '../../assets/js/myTrade/myTrade'//最大可卖
  import Five from '../../components/trans/five'
  import Quotation from '../../components/trans/quotation'
  import Close from '../../components/pop/close'
  export default {
    components:{Five,Close,Quotation},
    name: "sale",
    props:['id','productType'],
    data(){
      return{
        nowPriceBuy:'--',//当前价格
        name:'卖出',
        stockCodeSale:'',//卖出代码
        stockNameSale:'',//卖出名称
        declPriceSale:'',//卖出成交价
        yesPriceSale:'--',//作收
        saleNum:'',//卖出数量
        positionNum:'',//持仓数量
        showSearchSale:false,//是否显示搜索
        searchListSale:[],//搜索列表
        stockSaleList:{},//买入时输入股票代码返回的数据
        currentPage:1,
        pageSize:10,
        pageCount:0,
        stockId:0,//持仓id,
        subStockId:0,//,
        timer:null,
        param:0,
        numList:[{value:1,txt:'全部'},{value:1/2,txt:'1/2仓'},{value:1/3,txt:'1/3仓'},{value:1/4,txt:'1/4仓'},],
        yesterday:'--',
        downPrice: '--',//跌停价
        upPrice: '--',//涨停价
        todayPrice: '--',//今开
        hight: '--',//最高
        low: '--',//最低,
        rise:'--',
        priceRise:'--',//涨跌幅,
        priceRisePercent:0,//涨跌幅,
      }
    },
    methods:{
      maxSale(){
        let result = GetMaxSale(this.id,this.stockCodeSale,this.subStockId,this.stockId)
        result.then(res => {
          if(res.Result==0){
            this.positionNum=res.Data[0].deal_num
            if(this.positionNum<100){
              this.positionNum=0
            }
          }else{
            return
          }

        }).catch(err=>{
          return
        })
      },
      //点击小三角
      getPosition(){
        this.searchSale()
        this.showSearchSale=!this.showSearchSale
      },
      clear(){
        this.param=0
        this.stockCodeSale=''
        this.stockNameSale=''
        this.nowPriceBuy='--'
        this.declPriceSale=''
        this.positionNum=''
        this.saleNum=''
        this.downPrice='--'
        this.upPrice='--'
        this.todayPrice='--'
        this.hight='--'
        this.low='--'
        this.priceRise='--'
        this.yesterday='--'
        this.priceRisePercent=0
        this.$refs.five.clear()
        this.$refs.tu.url=''
      },
      addPrice(){
        if(parseFloat(this.declPriceSale)+0.01<=this.upPrice){
          this.declPriceSale=parseFloat((this.declPriceSale*100+0.01*100)/100).toFixed(2)
        }else if(this.declPriceSale>this.upPrice){
          return
        }
      },
      delPrice(){
        if(parseFloat(this.declPriceSale)-0.01>=this.downPrice){
          this.declPriceSale=parseFloat(this.declPriceSale-0.01).toFixed(2)
        } else if(this.declPriceSale<=this.downPrice){
          return
        }
      },
      addNum(){
        this.param=0
        if(Number(this.saleNum)+100>this.positionNum){
          this.saleNum=this.positionNum
        }else{
          this.saleNum=Number(this.saleNum)+100
        }
      },
      delNum(){
        this.param=0
        if(Number(this.saleNum)-100<0){
          return
        }else{
          this.saleNum=Number(this.saleNum)-100
        }
      },
      //把行情5里面的价格填充searchList
      changePrice(val){
        this.declPriceSale=val
      },
      changeNumSale(numSale){ //选择数量（卖出）
        this.saleNum = Math.floor(parseInt(this.positionNum*numSale)/100)*100
      },
      //搜索下拉表
      searchSale(){
        if(this.productType==31){
          let result = GetPositionListMom(this.id,1000,1)
          result.then(res => {
            this.searchListSale = res.Data.Data
          })
        }else{
          let result = GetPositionList(this.id,1000,1)
          result.then(res => {
            this.searchListSale = res.Data.Data
          })
        }
      },

      //搜索后选中
      searchChoose(code,id,num,substockid){
        let that = this
        that.param=0
        that.showSearchSale = false
        that.stockCodeSale = code
        that.subStockId = substockid
        that.stockId = id
        if(num<100){
          num=0
        }
        //that.positionNum = num
        that.maxSale()
        that.interval()
        setTimeout(()=>{
          that.$refs.tu.getQuotation(that.stockCodeSale)
        })
      },
      //根据股票代码相关数据
      getStockInfoSale(first){
        let result = Market(this.stockCodeSale)
        result.then(res => {
          this.stockSaleList=res.Data
          this.hight=parseFloat(this.stockSaleList.PriceDayHigh).toFixed(2)
          this.low=parseFloat(this.stockSaleList.PriceDayLow).toFixed(2)
          this.downPrice=parseFloat(this.stockSaleList.PriceFallStop).toFixed(2)
          this.upPrice=parseFloat(this.stockSaleList.PriceRiseStop).toFixed(2)
          if(this.stockSaleList.TodayPriceOpen!='--'){
            this.todayPrice=parseFloat(this.stockSaleList.TodayPriceOpen).toFixed(2)
          }
          this.yesterday=parseFloat(this.stockSaleList.PriceYesterdayClose).toFixed(2)
          this.stockNameSale=res.Data.StockName
          this.yesPriceSale=res.Data.PriceYesterdayClose
          this.nowPriceBuy=res.Data.PriceCurrent
          this.priceRise=res.Data.PriceRise
          this.priceRisePercent=res.Data.PriceRisePercent
          if(first){
            this.declPriceSale = this.nowPriceBuy
            if(this.stockCodeSale.substring(0,3)=='688'){
              if(this.positionNum<200){
                this.saleNum=0
              }else{
                this.saleNum = 200
              }
              if(this.positionNum>0&&this.positionNum<100){
                this.$alert('零头股票请联系管理员处理。')
              }
            }else{
              if(this.positionNum<100){
                this.saleNum=0
              }else{
                this.saleNum = 100
              }
            }
          }
        })
      },
      //卖出按钮saleNum
      saleStock(){
        if(this.stockCodeSale == ''){
          this.$alert('请输入股票代码')
          return
        }
        if(this.saleNum == 0){
          this.$alert('委托数量不能为0')
          return
        }
        if(this.stockCodeSale.substring(0,3) =='688'){
          if(this.declPriceSale<parseFloat(this.nowPriceBuy*0.98).toFixed(2)||this.declPriceSale>parseFloat(this.nowPriceBuy*1.02).toFixed(2)){
            this.$alert('委托失败：科创板股票委托价格不能超过现价涨跌2%范围，请重新委托。')
            return
          }
        }
        let msg=`证券名称：${this.stockNameSale} <br/>股票代码：${this.stockCodeSale}  <br/>委托价格：${this.declPriceSale} <br/>委托数量：${this.saleNum}<br/>买卖方向：建议卖出`
        this.$confirm(msg , '确认卖出', {confirmButtonText: '确定', cancelButtonText: '取消',dangerouslyUseHTMLString:true})
          .then(()=>{
           if(this.productType==31){
             let loading = this.$loading({
               lock: true,
               text: '提交中，请稍等……',
               spinner: 'el-icon-loading',
               background: 'rgba(0, 0, 0, 0.7)',
             });
             let result = SaleMom(this.id,this.stockId,this.stockCodeSale,this.stockNameSale,this.declPriceSale,this.saleNum)
             result.then(res => {
               loading.close();
               this.$alert(res.Message);
               clearInterval(this.timer);
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
             let result = Sale(this.id,this.stockId,this.stockCodeSale,this.stockNameSale,this.declPriceSale,this.saleNum)
             result.then(res => {
               loading.close();
               this.$alert(res.Message);
               clearInterval(this.timer);
               this.clear()
             }).catch((err)=>{
               loading.close();
             })
           }
          })
      },
      interval(){
        let that=this
        clearInterval(that.timer);
        that.getStockInfoSale(true)
         setTimeout(()=>{
           that.$refs.five.getFive();
         },1000)
        that.timer = setInterval(()=>{
          that.getStockInfoSale(false)
          that.$refs.five.getFive();
        },3000)
      },
      quotation(code){
        this.$refs.tu.getQuotation(code)
      }
      //把持仓code放到卖出
     /* replaceCode(code,stockId,num){
        this.stockCodeSale=code
        this.stockId=stockId
        this.positionNum=num
        this.getStockInfoSale(true)
      },*/
     /* //获取持仓数据
      updateStockList(){
        this.$refs.saleStock.getStockList()
      }*/
    },
    watch:{
      stockCodeSale:function(val){
        if(val.length<6){
          clearInterval(this.timer);
          return
        }
      },
    },
    beforeDestroy(){
      clearInterval(this.timer);
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .buyRight {width: 445px;}
  .buyRight .tit {font-size: 14px;font-weight: 700;height: 34px;line-height: 34px;background: #ea3733;padding: 0 18px;color: #fff;position: relative}
  .buyRight .chooseList {font-size: 12px;border-top: 1px solid #ddd;}
  .searchList{border:1px solid #de2a33;background: #fff;position: absolute;left:132px;z-index: 1;padding:0 10px;width:65%;max-height: 440px;overflow-y: scroll;
    li{ font-weight: normal!important;color: #de2a33!important;line-height: 35px;margin:0!important;text-align: center;background: none!important;cursor: pointer;
      span{font-size: 14px;width:60%!important;}
      span:last-child{font-size: 14px;width:40%!important;}
    }
  }
  .buyLeft{
    li{position: relative;
      .down{background: url("../../../static/img/trade/btn-arrow-down.png") no-repeat;position: absolute;width:18px!important;height:18px;right:5px;top:10px;
        background-size: contain;cursor: pointer;
      }
    }
  }

</style>
