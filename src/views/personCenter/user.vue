<template>
    <div>
<div class="assets">
          <div class="rightCont">
            <div class="tit">账户中心</div>
            <div class="account-table clearfix">
              <div class="fl left">
                <img src="../../../static/img/personCenter/center1.png" alt="">
                <ul>
                  <li>
                    <p>冻结资金</p>
                    <span v-text="freezeMoney"></span>
                  </li>
                  <li>
                    <p>可用资金</p>
                    <span v-text="userBalance"></span>
                  </li>
                  <li>
                    <p>保证金余额</p>
                    <span v-text="money_contract_val"></span>
                  </li>
                  <li>
                    <p>我的资产</p>
                    <span v-text="parseFloat(moneyTotal).toFixed(2)"></span>
                  </li>
                </ul>
              </div>
              <div class="fl clearfix right-cont">
               <div class="clearfix">
                 <div class="head fl">
                   <img src="../../../static/img/personCenter/mrt.jpg">
                 </div>
                 <div class="num fl">
                   <span class="user-name" >昵称：{{this.$store.getters.userInfo.nickName}}</span>
                   <p  class="user-name" style="margin-top:15px">{{this.$store.getters.userInfo.phoneNumber}}</p>
                 </div>
               </div>
                <div class="middle">
                  <p><span>我的资产：</span><span v-text="parseFloat(moneyTotal).toFixed(2)"></span></p>
                  <p><span>保证金余额：</span><span v-text="money_contract_val"></span></p>
                  <p><span>可用资金：</span><span  v-text="userBalance"></span></p>
                  <p><span>冻结资金：</span><span v-text="freezeMoney"></span></p>
                </div>
                <div class="bot">
                  <div>
                    <a @click="chargeBtn"  class="button button1">充值</a>
                    <a  @click="drawingBtn" class="button">提现</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <judgePop :balance="balance" :userBalance="userBalance" :showCharge="showCharge" :MoneyContractVal="money_contract_val" :OutOpenLine="OutOpenLine"></judgePop><!--//判断欠费-->
    </div>
</template>
<script>
  import judgePop from '../../components/pop/judgePop'
  import {GetUserMoney} from '../../assets/js/personCenterApi/personCenter'
    export default {
      name: "assets",
      components:{judgePop},
      layout:'left',
      data(){
        return{
          info:'',
          mobile:'',
          refresh_token:this.$store.getters.refresh_token,
          money_contract_val:0,
          userBalance:0,
          balance:0,
          freezeMoney:0,
          moneyTotal:0,
          OutOpenLine:0,
          name:['冻结资金','可用资金','保证金余额','我的资产'],
          colorList:['#586995','#9c221f','#9f3ed5','#009999'],
          showCharge:false
        }
      },
      methods:{
        //获取金额
        money(){
          let result = GetUserMoney()
          result.then((res)=>{
            this.money_contract_val=res.Data.money_contract_val
            this.userBalance=res.Data.userBalance
            this.balance=res.Data.balance
            this.freezeMoney=res.Data.freezeMoney
            this.OutOpenLine=res.Data.out_open_line
            this.moneyTotal=this.money_contract_val+this.userBalance+this.freezeMoney
            if(this.userBalance<0){
              this.showCharge=true
            }
          })
        },
        drawingBtn(){
          if(this.$store.getters.userInfo.nameTrue==0){
            this.$confirm('未实名认证，请前往认证','实名认证',{confirmButtonText: '立即认证', cancelButtonText: '取消'}).then(()=>{
              this.$router.push('/personCenter/setting')
            })
            return
          }else{
            if(this.$store.getters.bankList.length==0){
              this.$confirm('您未绑定银行卡','绑定银行卡',{confirmButtonText: '立即绑定', cancelButtonText: '取消'})
                .then(()=>{
                  this.$router.push({path:'/personCenter/setting/',query:{type:2}})
                })
            }else{
              if(this.$store.getters.userInfo.pwdTransStatus==0){
                this.$confirm('您未设置提现密码','设置提现密码',{confirmButtonText: '立即设置', cancelButtonText: '取消'})
                  .then(()=>{
                    this.$router.push({path:'/personCenter/setting/',query:{type:3}})
                  })
              }else{
                this.$router.push('/personCenter/drawing')
              }
            }
          }
        },
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
                  this.$router.push('/personCenter/protocol')
                })
                return;
              }else{
                this.$router.push('/personCenter/recharge')
              }
            }else{
              this.$router.push('/personCenter/recharge')
            }
          }
        }
      },
      mounted(){
        this.money()
        this.$store.dispatch('userAction')
        this.$store.dispatch('BankList')
        this.$store.dispatch('money')
      },
    }
</script>
<style  rel="stylesheet/less" lang="less" scoped>
  [v-cloak]{display: none}
  .tit{line-height: 50px;padding-left:25px;color:#fff;font-size: 20px;background: #999}
.assets{overflow: hidden;}
  .account-table {padding: 40px;border:1px solid #ddd;border-radius: 3px;position: relative;
    .left{width:400px;padding:32px 25px 15px 0;overflow: hidden;
      img{padding-left:22px;}
      li{position: relative;float:left;width:25%;    margin-top: 15px;
      span{    padding: 0 5px;border-radius: 5px;position: absolute;top:-134px;left:0;color:#fff;font-size: 14px;min-width:66px;height: 30px;line-height: 30px; background: #586995;text-align: center}
      }
      li:nth-child(2){
        span{top:-207px;background: #9C221F}
      }
      li:nth-child(3){text-align: center;
      span{top:-232px;left:13px;background: #9F3ED5}
      }
      li:nth-child(4){text-align: center;
      span{top:-265px;right:0;background: #009999}
      }
    }
    .right-cont{padding-left:30px;border-left:1px dashed #ddd;
      .head{margin-right: 10px;
        img{width:96px;height:96px;}
      }
      .num{padding-top:24px;}
      .middle{ padding:30px 0 18px;
       p{line-height:26px}
        span:last-child{color:#9c221f}
      }
      .bot{
        a{height:40px;line-height:40px;width:120px;border-radius: 5px;border:1px solid #384184;text-align: center;color:#384184;margin-right:22px;display: inline-block}
      a:last-child{background: #9c221f;color:#fff;border-color:#9c221f;margin:0}
      }
    }
  }
  .account {padding: 40px;border: 1px solid #DDD;background-color: #FFF;margin-top: 18px;
    .account-title {font-weight: 600;font-size: 20px;color: #333;}
    .my-trade-nodata {margin: 30px;padding: 20px;border-bottom: 2px solid #ECECEC;}
    .my-trade-nodata a {display: inline-block;background: #FF4400;color: #FFF;padding: 10px;border-radius: 5px;box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.2);}
  }
</style>
