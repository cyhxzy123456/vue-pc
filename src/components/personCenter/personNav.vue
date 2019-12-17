<template>
  <div >
      <div class="">
        <div class="left">
          <ul class="list">
            <!-- <li><span>个人中心</span></li>-->
            <router-link tag="li"  to="/personCenter/user" active-class="active"><span>个人中心</span></router-link>
            <router-link tag="li"  to="/trade" active-class="active"><span>创建策略</span></router-link>
            <router-link tag="li"  to="/myTrade/myTrade" active-class="active"><span>我的策略</span></router-link>
            <router-link tag="li"  to="/personCenter/flowing" active-class="active"><span>资金明细</span></router-link>
            <router-link tag="li"  to="/personCenter/setting" active-class="active"><span>我的资料</span></router-link>
            <router-link tag="li"  v-show="isOpenUserContract==0" to="/personCenter/protocol" active-class="active"><span>用户协议</span></router-link>
            <router-link tag="li" v-show="isOpenQa==0"  to="/personCenter/goView" active-class="active"><span>风险评测</span></router-link>
            <!-- <router-link @click="chargeBtn" tag="li"  to="" active-class="active"><span >账户充值</span></router-link>-->
            <router-link tag="li"  to="/personCenter/message" active-class="active"><span>消息中心</span></router-link>
            <router-link tag="li" v-show="WorkOrderIsLock==0"  to="/personCenter/feedback" active-class="active"><span>意见反馈</span></router-link>
            <router-link tag="li" v-show="isOpenExtension==0"  to="/personCenter/invitation" active-class="active"><span>邀请好友</span></router-link>
          </ul>
        </div>
       <!-- <div class="right">
          <div class="right-content">
            <router/>
          </div>
        </div>-->
      </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import personCenterHeader from './personCenterHeader'
  import {GetConfig} from '../../assets/js/globalApi/global'
  export default {
    components: {personCenterHeader},
    data(){
      return{
        info:this.$store.getters.userInfo,
        userList:[
          {name:'个人中心',url:'/personCenter/user'},
          {name:'账户充值',url:'/personCenter/recharge'},
          {name:'申请策略',url:'/personCenter/apply'},
          {name:'策略建议',url:'/myTrade/myTrade'},
          {name:'资金明细',url:'/personCenter/flowing'},
          {name:'我的资料',url:'/personCenter/setting'},
          {name:'用户协议',url:'/personCenter/protocol'},
          /* {name:'交割单查询',url:'/personCenter/delivery'},
           {name:'消息中心',url:'/personCenter/message'},*/
          {name:'意见反馈',url:'/personCenter/feedback'},
        ],
        WorkOrderIsLock:'',
        isOpenUserContract:'',
        isOpenQa:'',
        isOpenExtension:''
      }
    },
    methods:{
      chargeBtn(){
        if(this.$store.getters.userInfo.nameTrue==0){
          this.$confirm('未实名认证，请前往认证','实名认证',{confirmButtonText: '立即认证', cancelButtonText: '取消'}).then(()=>{
            this.$router.push('/personCenter/setting')
          })
          return
        }else{
          if(this.$store.getters.config.isOpenUserContract==0){
            if(this.$store.getters.userInfo.contractStatus==0){
              this.$confirm(' 您未签署《用户注册协议》','协议签署',{confirmButtonText: '立即签署', cancelButtonText: '取消'}).then(()=>{
                this.$router.push('/personCenter/setting')
              })
              return;
            }else{
              this.$router.push('/personCenter/recharge')
            }
          }else{
            return;
          }
        }
      },
      getConfigOpen(){
        let result = GetConfig()
        result.then((res)=>{
         this.isOpenUserContract=res.isOpenUserContract
         this.isOpenQa=res.isOpenQa
         this.isOpenExtension=res.isOpenExtension
         this.WorkOrderIsLock=res.isOpenWorkOrder
          if(this.WorkOrderIsLock==1){
            this.userList = this.userList.splice(0,7)
          }
        })
      },
    },
    mounted() {
     this.getConfigOpen()
    }
  }
</script>

<style  lang="less" scoped>
    .left{width:220px;float:left;}
    .right{width:854px;float:right;background:#fff}
    .list{width:220px;background-color: #fff;border: 1px solid #DDD;}
    .list li{width:220px;box-sizing: border-box;font-size: 16px;line-height: 60px;cursor: pointer;color:#666;text-align: center; border-bottom: 1px solid #DDD;
      i{display: inline-block;width: 28px;height: 28px;background: url(../../../static/img/personCenter/assets-icon.png) center no-repeat;background-size: 510px 44px;vertical-align: middle;margin-right: 10px}
    }
    .list li.active{    background-color: #9c221f;color:#fff}
    .list li a{color:#333}
  .right{background: #fff!important;}
</style>
