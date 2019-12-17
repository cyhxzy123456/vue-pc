<template>
    <div class="hetong">
      <Pop :isShow="showRealName" @closePop="close('showRealName')" @setData="go"  >
       <p class="tip">签署成功！</p>
      </Pop>
    </div>
</template>

<script>
  import Pop from '../components/pop/setPop'
  import {BackAgreement} from '../assets/js/personCenterApi/personCenter'
    export default {
      name: "agreen",
      layout:'noHead',
      components:{Pop},
      data(){
          return{
            showRealName:true,
            data:this.$route.query
          }
      },
      methods:{
          go(){
           parent.location.reload()
          },
        back(){
          let result=BackAgreement(this.data.resultCode,this.data.resultDesc,this.data.contractID,this.data.customerType,this.data.customerID,this.data.timestamp,this.data.msgDigest)
          result.then((res)=>{

          })
        },
        //关闭弹窗
        close(attr){
          this[attr] = false
        }
      },
      mounted() {
        this.back()
        //this.$store.dispatch('userAction')
      }
    }
</script>

<style scoped>
.hetong{    min-height: 591px;}
  .header{display: none}
.footer{display: none}
  .tip{font-size: 20px;font-weight: bold;text-align: center;padding-bottom:20px}
</style>
