<template>
    <div class="apply center-right">
      <ul>
        <li v-show="day!=''"><span>{{day}}</span><span>资产委托合作期限：最少2个交易日，自动展期</span><router-link tag="button" to="/trade">去创建{{day}}</router-link></li>
        <li v-show="month!=''"><span>{{month}}</span><span>资产委托合作期限：1自然月，自动展期</span><router-link tag="button" :to="{path:'/trade',query:{type:12}}">去创建{{month}}</router-link></li>
        <li v-show="ke!=''"><span>{{ke}}</span><span class="two">资产委托合作期限：至少2个交易日，自动展期；按购买市值收取费用，策略灵活配置</span><router-link tag="button" :to="{path:'/trade',query:{type:13}}">去创建{{ke}}</router-link></li>
        <li v-show="hui!=''"><span>{{hui}}</span><span>策略约定可用3个交易日，盈利8成归您</span><router-link tag="button" :to="{path:'/trade',query:{type:15}}">去创建{{hui}}</router-link></li>
        <li v-show="mom!=''"><span>{{mom}}</span><span class="two">资产委托合作期限：最少2个交易日，自动展期<br> {{remark[1]}}</span><router-link tag="button" :to="{path:'/trade',query:{type:31}}">去创建{{mom}}</router-link></li>
      </ul>
    </div>
</template>
<script>
  import {ProductType} from '../../assets/js/trade/trade'
    export default {
      name: "apply",
      layout: 'left',
      data() {
        return {
          day:'',
          month:'',
          mom:'',
          ke:'',
          hui:'',
          remark:''
        }
      },
      methods: {
        //获取产品类型
        getType(){
          let result = ProductType()
          result.then((res)=>{
            res.Data.forEach((val)=>{
              if(val.productType==11){
                this.day=val.productName
              }else if(val.productType==12){
                this.month=val.productName
              }else if(val.productType==13){
                this.ke=val.productName
              }else if(val.productType==15){
                this.hui=val.productName
              }else if(val.productType==31){
                this.mom=val.productName
                this.remark=val.remark.split('；')
              }
            })
          })
        },
      },
      mounted() {
        this.getType()
      }
    }
</script>

<style  lang="less" scoped>
.apply{padding:0 30px;
  li{font-size: 18px;border-bottom: 1px solid #ddd;height:115px;overflow: hidden;
    span{float:left;line-height: 115px;}
    span:first-child{font-size: 20px;color:#333;width:84px;}
    span.two{line-height: 28px;margin-top:15px}
    span:nth-child(2){font-size:18px;color:#999;width:512px;padding:0 80px 0 35px}
button{background: #9c221f;width:196px;line-height: 40px;text-align: center;border-radius: 5px;float:right;color:#fff;margin-top:36px;}
  }
}
</style>
