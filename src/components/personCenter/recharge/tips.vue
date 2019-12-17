<template>
    <div>
      <div class="recharge-tips" >
        温馨提示 <br>
        1、打开支付宝或者微信进行扫一扫支付，支付成功后资金秒到账；<br>
        2、为了您的资金安全，您的账户资金将由第三方平台托管；<br>
        3、禁止洗钱、信用卡套现、虚假交易等行为，一经发现和确认，将终止该账户的使用；<br>
        4、为了您的资金安全，建议充值前进行实名认证、添加银行卡、设置提现密码；<br>
        5、如果充值遇到任何问题，请联系客服：{{this.$store.getters.allInfo.tel}}。
      </div>
    </div>
</template>

<script>
    export default {
        name: "tips"
    }
</script>

<style scoped>
.recharge-tips{padding:42px 25px;color: #999;font-size: 14px;line-height: 25px;}
</style>
