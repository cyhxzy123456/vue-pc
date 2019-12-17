<template>
    <div class="protocolPop" v-show="isShow">
      <div class="wrap">
        <span class="close" @click="close">关闭</span>
        <div v-html="content"></div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "protocolPop",
      props:['content','isShow'],
      methods:{
        close(){
          this.$emit('click')
        }
      }
    }
</script>

<style rel="stylesheet/less" lang="less" >

  h1{font-size: 24px!important;font-weight: bold!important;padding:15px 0;color:#000;
  span{font-size: 24px!important;font-weight: bold!important;padding:15px 0;color:#000}
  }
.protocolPop{width:100%;position: absolute;min-height:100%;height:auto;top:88px;left:0;background: #fff;line-height: 28px;font-size: 16px;
  h3.tit{    font-size: 24px;text-align: center;margin: 20px auto;padding-bottom: 20px;font-weight: 400;}
  p{line-height: 30px!important;}
  .cont{min-height: 300px;margin: 50px auto 30px;border: 1px solid #ccc;padding: 20px 30px 40px;text-align: left;color: #333;}
  .close{cursor: pointer;position: fixed;padding:0 20px;line-height: 40px;background: red;color:#fff;text-align: center;font-size: 18px;border-radius: 10px;right:14%}
}
</style>
