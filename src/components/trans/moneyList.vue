<template>
    <div>
      <div class="user-money">
        <router-link tag="button" :to="{path:'/myTrade/myTrade',query:{type:tradeDetail.product_type}}"  >返回</router-link>
        <ul>
          <li>
            <p>{{tradeDetail.productTypeName}}({{tradeDetail.borrowid}})</p>
            <p v-show="tradeDetail.product_type!=13">{{tradeDetail.date_begin | dateFormat('MM.DD')}}-{{tradeDetail.date_end | dateFormat('MM.DD')}}</p>
            <p v-show="tradeDetail.product_type==13">{{tradeDetail.date_begin | dateFormat('MM.DD')}}</p>
          </li>
          <li>
            <p>策略天数</p>
            <p>第{{all.dealDays}}个交易日</p>
          </li>
          <li>
            <p>策略风险保证金</p>
            <p>{{moneyDeposit}}</p>
          </li>
          <li>
            <p>策略受托额</p>
            <p>{{tradeDetail.money_borrow}}</p>
          </li>
          <li>
            <p>策略投资额</p>
            <p>{{tradeDetail.money_begin}}</p>
          </li>
          <li>
            <p>策略预警线</p>
            <p>{{tradeDetail.money_warn}}</p>
          </li>
          <li>
            <p>策略平仓线</p>
            <p>{{tradeDetail.money_open_line}}</p>
          </li>
        </ul>
        <ul class="last">
         <!-- <li>
            <p>起始资金</p>
            <p class="money-value " v-text="tradeDetail.money_begin">2000.00</p>
          </li>-->
          <li>
            <p>策略总资产</p>
            <p class="money-value " v-text="tradeDetail.moneyAll">2000.00</p>
          </li>
          <li>
            <p>策略余额</p>
            <p class="money-value " v-text="tradeDetail.moneyBalance">2000.00</p>
          </li>
          <li>
            <p>策略可用余额</p>
            <p class="money-value " v-text="tradeDetail.moneyBalanceAble">2000.00</p>
          </li>
          <li >
            <p>策略市值</p>
            <p class="money-value " v-text="tradeDetail.moneyCap">0.00</p>
          </li>
          <li >
            <p>保证金余额</p>
            <p class="money-value " v-text="parseFloat(moneyProfit+moneyDeposit).toFixed(2)">0.00</p>
          </li>
          <li >
            <p>策略盈亏</p>
            <p  :class="tradeDetail.moneyProfit>=0?'color-red':'color-green'" class="money-value " v-text="tradeDetail.moneyProfit">0.00</p>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
    export default {
      name: "moneyList",
      props:['tradeDetail','all','moneyProfit','moneyDeposit'],
      data(){
        return{
        }
      },

    }
</script>

<style scoped>
ul{overflow: hidden;padding:26px 0;border-bottom: 1px solid #eee;padding-left:85px}
ul.last{padding-left:0}
  ul.last li{;width:auto!important;min-width:10%!important;padding:0 10px;}
</style>
