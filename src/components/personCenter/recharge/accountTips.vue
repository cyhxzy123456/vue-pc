<template>
  <div class="account-tips">
   <!-- <div class="top" v-html="tip.split('：')[0]"></div>-->
    <div class="bottom" v-html="tip">
     <!-- 1、工作日17点30分前转账的，承诺在资金到账后的半小时内完成充值<br>
      2、工作日17点30分以后转账的，承诺在第二个工作日的早上9点完成充值
      <br>
      3、非工作日转账的，承诺在下一工作日的早上9点完成充值
      <br>
      4、请使用实名认证后对应姓名的银卡进行转账
      <br>
      5、如未能及时充值，请联系客服：<strong>{{this.$store.getters.allInfo.tel}}</strong>-->
    </div>
  </div>
</template>

<script>
    export default {
        name: "tips",
      props:['tip']
    }
</script>

<style rel="stylesheet/less" lang="less" scoped>
.account-tips{float: left;background: #F9F9F9;padding: 20px;border: 1px solid #EEE;width:100%;
  .top{float: left;width: 100%;color: #333;font-size: 16px;font-weight: 700;}
  .bottom {float: left;width: 710px;padding-left: 20px;color: #333;font-size: 14px;line-height: 32px;}
}
</style>
