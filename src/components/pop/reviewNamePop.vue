
<template>
  <div>
  </div>
</template>

<script>
  import {GetUserInfo} from '../../assets/js/personCenterApi/personCenter'
  export default {
    name: "reviewNamePop",
    data(){
      return{
        contractStatus:'',
        nameTrue:'',
        token:''
      }
    },
    methods:{
      info(){
        let result = GetUserInfo()
        result.then((res)=>{
          this.contractStatus=res.contractStatus
          this.nameTrue=res.nameTrue
          this.token=localStorage.getItem('access_token')

        })
        if(this.$store.getters.userInfo.nameTrue==0){
          this.$confirm('未实名认证，请前往认证','实名认证',{confirmButtonText: '立即认证', cancelButtonText: '取消'})
            .then(()=>{
              this.$router.push('/personCenter/setting')
            })
        }else{
          if(this.$store.getters.config.isOpenUserContract==0){
            if(this.$store.getters.userInfo.contractStatus==0){
              this.$confirm(' 您未签署《用户注册协议》','协议签署',{confirmButtonText: '立即签署', cancelButtonText: '取消'}).then(()=>{
                this.$router.push('/personCenter/protocol')
              })
            }else{
              if(this.$store.getters.config.isOpenQa==0){
                if(this.$store.getters.userInfo.qaStatus == null){
                  this.$confirm('请先进行风险评测','风险评测',{confirmButtonText: '立即评测', cancelButtonText: '取消'}).then(()=>{
                    this.$router.push('/personCenter/review')
                  })
                }
              }else{
                return
              }
            }
          }
        }
      },
    },
    mounted() {
      this.info()
      if(this.token&&this.token!=''){

      }
    }
  }
</script>

<style scoped>

</style>

