<template>
    <div class="protocol" v-show="isShow">
      <div class="wrap">
        <div>
          <span class="close" @click="close">关闭</span>
          <iframe style="width:100%;min-height: 765px;" :src="url" frameborder="0"></iframe>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "agreenPop",
      props:['url','isShow'],
      methods:{
        close(){
          parent.location.reload()
          this.$store.dispatch('userAction')
          this.$emit('close')
        }
      }
    }
</script>

<style rel="stylesheet/less" lang="less" scoped>
.protocol{width:100%;position: fixed;height:100%;top:88px;left:0;background: #fff;line-height: 28px;font-size: 16px;min-height: 83%;    z-index: 2;
  h3.tit{    font-size: 24px;text-align: center;margin: 20px auto;padding-bottom: 20px;font-weight: 400;}
  .cont{min-height: 300px;margin: 50px auto 30px;border: 1px solid #ccc;padding: 20px 30px 40px;text-align: left;color: #333;}
  .close{cursor: pointer;position: fixed;padding:0 20px;line-height: 40px;background: red;color:#fff;text-align: center;font-size: 18px;border-radius: 10px;right:12%}
}
</style>
