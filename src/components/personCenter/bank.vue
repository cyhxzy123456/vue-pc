<template>
  <div  style="display: inline-block;">
    <select  class="select" v-model="selectBank" @change="chooseBank" placeholder="请选择银行卡">
      <option value="null"  label=""  key="">请选择银行</option>
      <option v-for="(item,index) in bankList" :key="index" :value="item"  v-text="item.title"></option>
    </select>
  </div>
</template>

<script>
  import {GetBank} from '../../assets/js/personCenterApi/personCenter'
    export default {
        name: "bank",
      data(){
          return{
            bankList:[],
            selectBank:null,
          }
      },
      methods:{
        getBankList(){
          let result = GetBank()
          result.then((res)=>{
            this.bankList = res.Data
          })
        },
        chooseBank(){
          this.$emit('choose',this.selectBank)
        }
      },
      created() {
        this.getBankList()
      }
    }
</script>

<style  rel="stylesheet/less" lang="less" scoped>
</style>
