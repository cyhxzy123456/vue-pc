<template>
  <div  v-show="isOpen==1">
    <p class="close">{{name}}通道已关闭，详情请联系客服{{this.$store.getters.allInfo.phone}}</p>
  </div>
</template>

<script>
    export default {
      name: "close",
      props:['name','isOpen']
    }
</script>

<style scoped>
  .close{padding-top:100px;color:red;font-size: 24px;margin:0 auto;text-align: center;min-height: 294px}
</style>
