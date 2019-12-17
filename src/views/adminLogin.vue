<template>
    <div class="content_main"></div>
</template>

<script>
  import {Admin} from '../assets/js/loginApi/login'
    export default {
        name: "admin",
      data(){
          return{
            token:'',
            userName:this.$route.query.token
          }
      },
      mounted() {
        let result = Admin(this.userName)
        result.then((res)=>{
          this.$router.push('/personCenter/user')
          this.token = res.Data.access_token
          localStorage.setItem("access_token", this.token);
          this.$store.commit('setStorage',this.token)
        })
        //http://localhost:53265/#/adminLogin?userName=201905161923491389
      }
    }
</script>

<style scoped>

</style>
