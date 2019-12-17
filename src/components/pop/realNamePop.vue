<template>
    <div>
    </div>
</template>
<script>
    export default {
      name: "realNamePop",
      methods:{
        getInfo(){
          if(this.$store.getters.userInfo.nameTrue==0){
            this.$confirm('未实名认证，请前往认证','实名认证',{confirmButtonText: '立即认证', cancelButtonText: '取消'})
              .then(()=>{
              this.$router.push('/personCenter/setting')
            })
          }
        },
      },
      created() {
        this.getInfo()
      }
    }
</script>

<style scoped>

</style>
