<template>
  <div class="limit" v-show="showLimit">
    <!--<setPop :isShow="showLimit" @closePop="close('showLimit')" @setData="close('showLimit')" >-->
    <div class="wrap">
      <div class="inner">
        <h3 class="tit color-red">今日限买</h3>
        <div class="cont">
          <ul>
            <li v-for="(item,index) in list" :key="index"><p>{{item.stock_name}}</p><p>{{item.stock_code}}</p></li>
          </ul>
          <p class="color-red tip" >平台不可交易基金、S、ST、*ST、S*ST及SST类股票</p>
          <button type="button" class="popBtn" @click="close">确认</button>
        </div>
      </div>
    </div>
    <!-- </setPop>-->
  </div>
</template>

<script>
  import setPop from '../../components/pop/setPop'
  import {Limit} from '../../assets/js/myTrade/myTrade'
  export default {
    name: "limitBuy",
    components:{setPop},
    props:['showLimit'],
    data(){
      return{
        pageIndex:1,
        pageSize:10,
        list:[],
        //showLimit:true
      }
    },
    methods:{
      //关闭弹窗
      close(){
        this.$emit('closeLimit')
      },
      getLimit(){
        let result = Limit(1000,1)
        result.then((res)=>{
          this.list=res.Data.Data
        })
      }
    },
    mounted(){
      this.getLimit()
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .popBtn{border-radius: 5px;background-color: #9c221f;color: #FFF;text-align: center;font-size: 14px;height: 46px;width: 170px;padding: 0;margin: 0 auto 0;display: block;border: 1px solid #9c221f;box-shadow: 1px 1px 3px rgba(0,0,0,0.3);font-weight: 700;}
  .limit{position: fixed;width: 100%;height: 100%;background: rgba(0,0,0,0.5);top: 0;left: 0;z-index: 10;
    .inner{width:490px;background: #fff;margin:0 auto;margin-top:30%;padding:30px}
    .tit{padding-bottom: 20px}
    ul{height: 174px;overflow-y: scroll}
    li{width:95px;display: inline-block;border:1px solid #566B96;margin:0 3px 15px;
      p{line-height: 35px;text-align: center;color:#566B96}
      p:first-child{background: #566B96;color:#fff}
    }
    .tip{margin-bottom: 30px}
  }
</style>
