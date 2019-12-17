<template>
    <div>
        <div class="drawing center-right">
          <div class="rightCont" v-show="validCash==0">
            <div class="recharge_leftBody">
              <div class="center-tit">账户余额：<span v-text="'￥'+userMoney.userBalance">￥96,232.56</span></div>
             <div class="drawingCont center-right-cont">
               <ul class="chargeNav">
                 <li v-for="(item,index) in chargeNavList" :key="index" v-text="item.name" @click="changeType(item.type)" :class="{active:typeNow === item.type}"></li>
               </ul>
                <div class="draw" v-show="typeNow==1">
                  <Drawing @list="changeType(2)"></Drawing>
                </div>
               <div class="drawNote" v-show="typeNow==2">
                 <div>
                   <DrawingList ref="list"></DrawingList>
                 </div>
               </div>
             </div>
            </div>
          </div>
          <Close :name="name" :isOpen="this.$store.getters.config.validCash!=0"></Close>
        </div>
      <RealNamePop></RealNamePop>
    </div>
</template>
<script>
  import Drawing from '../../components/personCenter/drawing/drawing'
  import DrawingList from '../../components/personCenter/drawing/drawingList'
  import RealNamePop from '../../components/pop/realNamePop'
  import Close from '../../components/pop/close'
  import {GetConfig} from '../../assets/js/globalApi/global'//获取充值开关
  import {GetUserMoney} from '../../assets/js/personCenterApi/personCenter'
    export default {
      name: "drawing",
      components:{Drawing,DrawingList,RealNamePop,Close},
      layout:'left',
      data(){
        return{
          name:'提现',
          info:{},
          userMoney:[],
          moneyTotal:'',
          chargeNavList:[{name:'我要提现',type:1},{name:'提现记录',type:2}],
          typeNow:1,//
          validCash:''
        }
      },
      methods:{
        money(){
          let result = GetUserMoney()
          result.then((res)=>{
            this.userMoney=res.Data
          })
        },
        getConfig(){
          let result = GetConfig()
          result.then((res)=>{
            this.validCash=res.validCash
          })
        },
        changeType(type){
          this.money()
          this.typeNow = type
          if( this.typeNow ==2){
            this.$refs.list.drawingList()
          }
        },
      },
      mounted(){
        this.money()
        this.getConfig()
      }

    }
</script>
<style   lang="less" scoped>
.drawing{overflow: hidden;
   .font-red{color: #f83200}
.recharge_leftBody {width: 100%;position: relative;}
  .chargeNav{line-height: 42px;margin:28px 0;
    li{border-radius: 5px;cursor: pointer;display: inline-block;font-size: 16px;width: 150px;color: #333;text-align: center;line-height: 40px;border: 1px solid #d2d2d2;background-color: #fff;}
    li.active{color: #fff;background-color: #9c221f;}
    li:last-child{border:0;margin:0;padding: 0 20px;width:auto}
    li:first-child{margin-right:20px}
    .recharge2_title {font-size: 21px;}
  }
  }

</style>
