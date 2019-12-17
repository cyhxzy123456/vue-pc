<template>
    <div>
      <div class="user-money">
        <router-link tag="button" :to="{path:'/myTrade/myTrade',query:{type:tradeDetail.product_type}}" >返回</router-link>
        <ul>
          <li> <p style="margin-top:20px">{{tradeDetail.productTypeName}}({{tradeDetail.borrowid}})</p><p></p></li>
          <li>
            <p>策略总资产</p>
            <p class="money-value " v-text="allMom">2000.00</p>
          </li>
          <li>
            <p>可用风险保证金</p>
            <p class="money-value " v-text="moneyDepositMom">2000.00</p>
          </li>
          <li>
            <p>冻结未成交金额</p>
            <p class="money-value " v-text="lockMom">2000.00</p>
          </li>
          <li >
            <p>策略可买额度</p>
            <p class="money-value " v-text="userBalanceMom">0.00</p>
          </li>
          <li >
            <p>策略建议市值</p>
            <p class="money-value " v-text="shiMom">0.00</p>
          </li>
          <li >
            <p>策略盈亏</p>
            <p  :class="moneyProfitMom>=0?'color-red':'color-green'" class="money-value " v-text="moneyProfitMom">0.00</p>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
    export default {
      props:['tradeDetailMom','tradeDetail'],
      data(){
        return{
          moneyDepositMom:'',//mom可用保证金
          userBalanceMom:'',//mom策略可买额度=策略总资金
          allMom:'',//mom策略总资产
          lockMom:'',//mom冻结未成交金额
          moneyProfitMom:'',//mom策略盈亏
          shiMom:'',//mom市值
        }
      },
      methods:{
        deng(){
          let that=this
          /*可用风险保证金:8320.00;策略总资金:83200.00;策略总资产:0.00;策略市值:0.00;冻结风险保证金:0.00;策略盈亏:0.00;*/
          that.moneyDepositMom=that.tradeDetailMom[0].split(':')[1]
          that.userBalanceMom=that.tradeDetailMom[1].split(':')[1]
          that.allMom=that.tradeDetailMom[2].split(':')[1]
          that.shiMom=that.tradeDetailMom[3].split(':')[1]
          that.lockMom=that.tradeDetailMom[4].split(':')[1]
          that.moneyProfitMom=that.tradeDetailMom[5].split(':')[1]
        }
      },
    }
</script>

<style scoped>
ul{overflow: hidden;padding:26px 0;border-bottom: 1px solid #eee;padding-left:85px}
  ul li{padding-right: 4% !important}
  ul li:last-child{padding-right: 0 !important}
</style>
