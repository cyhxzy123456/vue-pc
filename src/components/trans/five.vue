<template>
  <div >
    <div class="buyCenter fl">
      <ul class="sale5">
        <li><span>卖⑤</span><span :class="{'color-red':salePrice5>yesPrice,'color-green':salePrice5<yesPrice}" v-text="salePrice5" @click="changeCode(salePrice5)">10.71</span><span :class="{'color-red':salePrice5>yesPrice,'color-green':salePrice5<yesPrice}" v-text="saleNum5">59</span></li>
        <li><span>卖④</span><span :class="{'color-red':salePrice4>yesPrice,'color-green':salePrice4<yesPrice}" v-text="salePrice4" @click="changeCode(salePrice4)">10.71</span><span :class="{'color-red':salePrice4>yesPrice,'color-green':salePrice4<yesPrice}" v-text="saleNum4">59</span></li>
        <li><span>卖③</span><span :class="{'color-red':salePrice3>yesPrice,'color-green':salePrice3<yesPrice}" v-text="salePrice3" @click="changeCode(salePrice3)">10.71</span><span :class="{'color-red':salePrice3>yesPrice,'color-green':salePrice3<yesPrice}" v-text="saleNum3">59</span></li>
        <li><span>卖②</span><span :class="{'color-red':salePrice2>yesPrice,'color-green':salePrice2<yesPrice}" v-text="salePrice2" @click="changeCode(salePrice2)">10.71</span><span :class="{'color-red':salePrice2>yesPrice,'color-green':salePrice2<yesPrice}" v-text="saleNum2">59</span></li>
        <li><span>卖①</span><span :class="{'color-red':salePrice1>yesPrice,'color-green':salePrice1<yesPrice}" v-text="salePrice1" @click="changeCode(salePrice1)">10.71</span><span :class="{'color-red':salePrice1>yesPrice,'color-green':salePrice1<yesPrice}" v-text="saleNum1">59</span></li>
      </ul>
      <ul class="buy5">
        <li><span>买①</span><span :class="{'color-red':buyPrice1>yesPrice,'color-green':buyPrice1<yesPrice}" v-text="buyPrice1" @click="changeCode(buyPrice1)">10.71</span><span :class="{'color-red':buyPrice1>yesPrice,'color-green':buyPrice1<yesPrice}" v-text="buyNum1">59</span></li>
        <li><span>买②</span><span :class="{'color-red':buyPrice2>yesPrice,'color-green':buyPrice2<yesPrice}" v-text="buyPrice2" @click="changeCode(buyPrice2)">10.71</span><span :class="{'color-red':buyPrice2>yesPrice,'color-green':buyPrice2<yesPrice}" v-text="buyNum2">59</span></li>
        <li><span>买③</span><span :class="{'color-red':buyPrice3>yesPrice,'color-green':buyPrice3<yesPrice}" v-text="buyPrice3" @click="changeCode(buyPrice3)">10.71</span><span :class="{'color-red':buyPrice3>yesPrice,'color-green':buyPrice3<yesPrice}" v-text="buyNum3">59</span></li>
        <li><span>买④</span><span :class="{'color-red':buyPrice4>yesPrice,'color-green':buyPrice4<yesPrice}" v-text="buyPrice4" @click="changeCode(buyPrice4)">10.71</span><span :class="{'color-red':buyPrice4>yesPrice,'color-green':buyPrice4<yesPrice}" v-text="buyNum4">59</span></li>
        <li><span>买⑤</span><span :class="{'color-red':buyPrice5>yesPrice,'color-green':buyPrice5<yesPrice}" v-text="buyPrice5" @click="changeCode(buyPrice5)">10.71</span><span :class="{'color-red':buyPrice5>yesPrice,'color-green':buyPrice5<yesPrice}" v-text="buyNum5">59</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "five",
    props: [ 'list'],
    data() {
      return {
        fiveList:null,
        buyPrice1: '--',
        buyPrice2: '--',
        buyPrice3: '--',
        buyPrice4: '--',
        buyPrice5: '--',
        salePrice1: '--',
        salePrice2: '--',
        salePrice3: '--',
        salePrice4: '--',
        salePrice5: '--',
        buyNum1: '--',
        buyNum2: '--',
        buyNum3: '--',
        buyNum4: '--',
        buyNum5: '--',
        saleNum1: '--',
        saleNum2: '--',
        saleNum3: '--',
        saleNum4: '--',
        saleNum5: '--',
        downPrice: '--',//跌停价
        upPrice: '--',//涨停价
        todayPrice: '--',//今开
        yesPrice: '--',//昨收,
        nowPriceBuy:''
      }
    },
    methods: {
      clear(){
        this.buyPrice1= '--'
          this.buyPrice2= '--'
          this.buyPrice3= '--'
          this.buyPrice4= '--'
          this.buyPrice5= '--'
          this.salePrice1= '--'
          this.salePrice2= '--'
          this.salePrice3= '--'
          this.salePrice4= '--'
          this.salePrice5= '--'
          this.buyNum1= '--'
          this.buyNum2= '--'
          this.buyNum3= '--'
          this.buyNum4= '--'
          this.buyNum5= '--'
          this.saleNum1= '--'
          this.saleNum2= '--'
          this.saleNum3= '--'
          this.saleNum4= '--'
          this.saleNum5= '--'
      },
      //根据股票代码相关数据
      getFive() {
        if(this.list==null){
          this.clear()
        }else{
          this.fiveList=this.list
          this.todayPrice = parseFloat(this.fiveList.PriceOpen).toFixed(2)
          this.yesPrice = parseFloat(this.fiveList.PriceYesterdayClose).toFixed(2)
          this.upPrice = parseFloat(this.fiveList.PriceRiseStop).toFixed(2)
          this.downPrice = parseFloat(this.fiveList.PriceFallStop).toFixed(2)
          this.nowPriceBuy = parseFloat(this.fiveList.PriceCurrent).toFixed(2)
          //买5
          this.buyNum1 = parseInt(this.fiveList.BuyOneNum/ 100)
          this.buyPrice1 = parseFloat(this.fiveList.BuyOneAmount).toFixed(2)
          this.buyNum2 = parseInt(this.fiveList.BuyTwoNum/ 100)
          this.buyPrice2 = parseFloat(this.fiveList.BuyTwoAmount).toFixed(2)
          this.buyNum3 = parseInt(this.fiveList.BuyThreeNum/ 100)
          this.buyPrice3 = parseFloat(this.fiveList.BuyThreeAmount).toFixed(2)
          this.buyNum4 = parseInt(this.fiveList.BuyFourNum / 100)
          this.buyPrice4 = parseFloat(this.fiveList.BuyFourAmount).toFixed(2)
          this.buyNum5 = parseInt(this.fiveList.BuyFiveNum / 100)
          this.buyPrice5 = parseFloat(this.fiveList.BuyFiveAmount).toFixed(2)
          //卖5
          this.saleNum1 = parseInt(this.fiveList.SaleOneNum/ 100)
          this.salePrice1 = parseFloat(this.fiveList.SaleOneAmount).toFixed(2)
          this.saleNum2 = parseInt(this.fiveList.SaleTwoNum/ 100)
          this.salePrice2 = parseFloat(this.fiveList.SaleTwoAmount).toFixed(2)
          this.saleNum3 = parseInt(this.fiveList.SaleThreeNum/ 100)
          this.salePrice3 = parseFloat(this.fiveList.SaleThreeAmount).toFixed(2)
          this.saleNum4 = parseInt(this.fiveList.SaleFourNum/ 100)
          this.salePrice4 = parseFloat(this.fiveList.SaleFourAmount).toFixed(2)
          this.saleNum5 = parseInt(this.fiveList.SaleFiveNum/ 100)
          this.salePrice5 = parseFloat(this.fiveList.SaleFiveAmount).toFixed(2)
        }
      },
      //把5里面的价格填入到买入框
      changeCode(val) {
        this.$emit('change', val)
      }
    },

  }
</script>

<style scoped rel="stylesheet/less" lang="less" >
  .buyCenter{margin-bottom: 10px;
    padding:10px 0;font-size: 14px;width:432px;border:1px solid #ddd;border-radius: 5px;
    .sale5{border-right:1px dashed #ddd;}
    .sale5,.buy5{width:49%;display: inline-block;
      li{line-height: 30px;
        span{width:33%;text-align: center;display: inline-block;}
        span:first-child{color: #666}
        span:nth-child(2){cursor: pointer}
      }
    }
    .priceList{
      li{border: 1px solid #e7e7e7;margin-bottom: 10px;line-height: 24px;
        span{width:24%;display: inline-block;text-align: center;cursor: pointer}
      }
    }
  }
</style>
