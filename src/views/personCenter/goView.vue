<template>
    <div class="view ">
      <div class="head">风险等级评测</div>
      <div ><span>风险等级评测</span><span></span>
        <span @click="goReview" class="go-btn"  v-text="reviewBtn"></span></div>

      <agreenPop :url="agreenUrl" :isShow="showAgreen" @close="close('showAgreen')"></agreenPop>
    </div>
</template>
<script>

    export default {
      name: "view",
      layout: 'left',
      components:{},
      data() {
        return {
          reviewBtn:'去评测',//评测的按钮字幕
          qaStatus:this.$store.getters.userInfo.qaStatus,
          qaTimes:this.$store.getters.userInfo.qaTimes,//评测结果
        }
      },
      methods: {
        //关闭弹窗
        close(attr){
          this[attr] = false
          parent.location.reload()
        },
        //评测文字
        gradeTxt(){
          if(this.qaStatus == null){
            this.reviewBtn='去评测'
          } else{
            this.reviewBtn=this.qaTimes+'级(重新评测)'
          }
        },
        //去测评
        goReview(){
          this.$router.push('/personCenter/review')
        },
      },
      mounted() {
        this.gradeTxt()
      }
    }
</script>

<style  lang="less" scoped>
.head{ width: 220px;line-height: 50px;text-align: center; background: #9c221f;color: #fff;margin-bottom: 40px}
  .go-btn{display: inline-block;background: #9c221f;color: #fff;width: 138px;line-height: 40px;border-radius: 5px;text-align: center;cursor: pointer}
</style>
