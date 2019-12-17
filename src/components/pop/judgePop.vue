<template>
    <div>
      <Pop :isShow="showCharge" @closePop="close('showCharge')">
        <h3 slot="tit"></h3>
        <p class="tip" v-show="status==0">您的账户余额为：{{balance}}，当前保证金余额为{{MoneyContractVal}}，平仓差额为：{{OutOpenLine}}，请及时充值，以免 <span class="color-red">全部合约</span>被平仓处理。</p>
        <p class="tip" v-show="status==1">您的账户余额为：{{balance}}，欠费将影响您的持仓，平台有权择机处理，请留意风险！</p>
        <div class="btnGroup">
          <button  slot="btn" type="button" class="popBtn fl" @click="goCharge">立即充值</button>
          <button  slot="btn" type="button" class="popBtn fr" @click="close('showCharge')">下次再说</button>
        </div>
      </Pop>
    </div>
</template>

<script>
  import Pop from './pop'
  import {GetsysConfig} from '../../assets/js/globalApi/global'
    export default {
        name: "judgePop",
      components:{Pop},
      props:['balance','userBalance','showCharge','MoneyContractVal','OutOpenLine'],
      data(){
          return{
            userInfo:this.$store.getters.userInfo,
            //MoneyContractVal:this.$store.getters.userMoney.money_contract_val,//,//MoneyContractVal 净值
            OutWarnLine:this.$store.getters.userMoney.out_warn_line,//OutWarnLine 离预警线差额
            //OutOpenLine:this.$store.getters.userMoney.out_open_line,//OutOpenLine 离平仓线差额
            timer:null,
            status:''
          }
      },
      methods:{
          //获取状态GetsysConfig
        getStatus(){
          let result = GetsysConfig('riskwarn_rate')
          result.then((res)=>{
            this.status=res.Data.status
          })
        },
        //关闭弹窗
        close(attr){
          this[attr] = false
        },
        //弹窗去充值
        goCharge(){
          this.$router.push('/personCenter/recharge')
        },
      },
      mounted() {
        this.getStatus()
      },
    }
</script>

<style scoped>

</style>
