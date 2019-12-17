
<template>
 <div class="img">
   <img :src="codeUrl" alt="验证码" title="点击切换验证码" @click="toggleVerifyCode()">
 </div>
</template>

<script>
  export default {
    data() {
      return {
        codeUrl: String
      }
    },

    methods: {
      toggleVerifyCode() {
        this.codeUrl = '/api/verifyCode/getCode?t=' + Math.random()
      }
    },
    mounted() {
      this.toggleVerifyCode()
    }
  }
</script>
<style scoped>
  .img{position: absolute;top:0;right:-130px}
  img{width: 124px;height:38px;}
</style>
