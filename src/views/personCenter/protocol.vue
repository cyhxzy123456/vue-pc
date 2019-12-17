<template>
  <div class="protocol ">
    <div class="head">用户协议</div>
    <div class="hang"><span>用户协议 </span><span >《注册协议》</span><!--@click="downAgreen"-->
      <span class="go-btn" v-show="isOpenUserContract==0"  @click="getAgreement1" v-text="contractStatus ==0?'去签署':'查看'"></span>
    </div>
    <agreenPop :url="agreenUrl" :isShow="showAgreen" @close="close('showAgreen')"></agreenPop>
    <RealNamePop></RealNamePop>
  </div>
</template>
<script>
  import {GetUserInfo} from '../../assets/js/personCenterApi/personCenter'
  import agreenPop from '../../components/pop/agreenPop'
  import {GetAgreement} from '../../assets/js/personCenterApi/personCenter'
  import {SeeAgreement} from '../../assets/js/personCenterApi/personCenter'
  import {DownAgreement} from '../../assets/js/personCenterApi/personCenter'
  import {GetConfig} from '../../assets/js/globalApi/global'//获取开关
  import RealNamePop from '../../components/pop/realNamePop'
  export default {
    name: "apply",
    layout: 'left',
    components:{agreenPop,RealNamePop},
    data() {
      return {
        contractStatus:'',
        agreenUrl:'',
        showAgreen:false,
        isOpenUserContract:''
      }
    },
    methods: {
      getConfig(){
        let result = GetConfig()
        result.then((res)=>{
          this.isOpenUserContract=res.isOpenUserContract
        })
      },
      getInfo(){
        let result = GetUserInfo()
        result.then((res)=>{
          this.contractStatus=res.contractStatus
        })
      },
      //关闭弹窗
      close(attr){
        this[attr] = false
        parent.location.reload()
      },
      //注册协议
      getAgreement1(){
        if(this.$store.getters.userInfo.nameTrue==0){
          this.$confirm('未实名认证，请前往认证','实名认证',{confirmButtonText: '立即认证', cancelButtonText: '取消'}).then(()=>{
            this.$router.push('/personCenter/setting')
          })
          return
        }else{
          if(this.contractStatus<2){
            let loading = this.$loading({
              lock: true,
              text: '合同生成中，请稍等！',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)',
              //target: document.querySelector('.div1')
            });
            let result = GetAgreement(0,1)
            result.then((res)=>{
              this.showAgreen = true
              this.agreenUrl = res.Data.model
              loading.close();
            }).catch((err)=>{
              loading.close();
            })
          }else{
            let result = SeeAgreement(0,1)
            result.then((res)=>{
              this.showAgreen = true
              this.agreenUrl = res.Data
            })
          }
        }
      },
      //注册协议下载
      downAgreen(){
        let result = DownAgreement(0,1)
        result.then((res)=>{
          /*this.showAgreen = true
          this.agreenUrl = res.Data.model*/
        })
      },
    },
    mounted() {
      this.getInfo()
      this.getConfig()
    }
  }
</script>

<style  lang="less" scoped>
  .head{ width: 220px;line-height: 50px;text-align: center; background: #9c221f;color: #fff;margin-bottom: 40px}
  .go-btn{float:right;background: #9c221f;color: #fff;width: 138px;line-height: 40px;border-radius: 5px;text-align: center;cursor: pointer}
  .hang{width:660px}
</style>
