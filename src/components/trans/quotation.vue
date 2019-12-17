<template>
    <div class="quotation">
      <ul class="quotation-nav">
        <li @click="choose(item.type)" :class="{active:nowType==item.type}" v-for="(item,index) in quotationList" :key="index">{{item.name}}</li>
      </ul>
      <div class="quotations">
        <iframe style="width:455px;height: 250px" :src="url" frameborder="0"></iframe>
      </div>
    </div>
</template>

<script>
  import {Quotations} from '../../assets/js/myTrade/myTrade'
    export default {
        name: "quotation",
      props:['code'],
      data(){
          return{
            nowType:'1',
            quotationList:[{name:'分时图',type:1},{name:'日k线',type:2},{name:'周k线',type:3},{name:'月k线',type:4},],
            url:''//行情图
          }
      },
      methods:{
        choose(type){
          this.nowType=type
          if(this.code==''){
            return
          }else{
            this.getQuotation(this.code)
          }
        },
        getQuotation(code){
          let result = Quotations(this.nowType,code);
          result.then(res => {
            this.url=res
          })
        },
      },

    }
</script>

<style scoped rel="stylesheet/less" lang="less">
.quotation{
  .quotation-nav{
    li{cursor: pointer;font-size: 14px;display: inline-block;border-right: 1px solid #ddd;padding:0 5px;}
    li.active{color:#9c221f}
  }
  .quotations{margin-left:-20px}
}
</style>
