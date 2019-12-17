<template>
    <div class="setting">
      <div class="content">
      <div class="nav">
        <ul>
          <li v-for="(item,index) in navList" :key="index" @click="changeNav(item.type)" :class="{active:typeNow==item.type}">{{item.txt}}</li>
        </ul>
      </div>
        <div class="setting-cont">
          <div class="idCard" v-show="typeNow==1">
            <RealName :nameTrue="nameTrue" ref="name" @realNameClick="realNameSure"></RealName>
          </div>
          <div class="bankCard" v-show="typeNow==2">
            <div v-show="bankList==null"><AddBank :userName="userName"  @add="getList" ></AddBank></div>
            <div v-show="bankList!=null"><span >已绑定</span><span class="fr pointer update-btn" @click="showBank" >点击修改</span></div>
          </div>
          <div class="pass" v-show="typeNow==3">
            <ul>
            <!--  <li><span>绑定手机：</span><span v-text="mobile"></span><span class="update-btn" @click="showMobile" >修改</span></li>-->
              <li><span>登录密码：</span><span >已设置</span><span @click="ShowForget" class="update-btn">修改</span></li>
              <li><span>提现密码：</span><span v-text="pwdTransStatus == 0?'未设置':'已设置'"></span>
                <span class="update-btn"  v-text="pwdTransStatus == 0?'立即设置':'修改'" @click="showDrawing"></span>
              </li>
              <li><span>昵 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span><span v-text="NickName==''?'未设置':'已设置'"></span><span @click="showNickName" class="update-btn" v-text="NickName==''?'设置':'修改'">修改</span></li>
            </ul>
          </div>
        </div>
      </div>
      <NickName ref="nickName" @nickNameClick="nameSure"></NickName>
      <RealName ref="name" @realNameClick="realNameSure"></RealName>
      <UpdateBank ref="newBank" :bankList="bankList"  :bankId="bankId" :bankName="bankName" :bankCard="bankCard" @updateBank="getList"></UpdateBank>
      <NewMobile ref="updateMobile" @updateMobileClick="getInfo"></NewMobile>
      <LoginPwd ref="loginPwd"></LoginPwd>
      <TradePwd ref="tradePwd" @setTradePwdClick="setTradePwdSure"></TradePwd>
      <agreenPop :url="agreenUrl" :isShow="showAgreen" @close="close('showAgreen')"></agreenPop>
    </div>
</template>
<script>
  import {Cancle} from '../../assets/js/personCenterApi/personCenter'//注销
  import {GetBankList} from '../../assets/js/personCenterApi/personCenter'
  import {GetAgreement} from '../../assets/js/personCenterApi/personCenter'
  import {SeeAgreement} from '../../assets/js/personCenterApi/personCenter'
  import {DownAgreement} from '../../assets/js/personCenterApi/personCenter'
  import Bank from '../../components/personCenter/bank'
  import setPop from '../../components/pop/setPop'
  import ImgVCode from '../../components/code/ImgVCode'
  import regPhoneCode from '../../components/code/regPhoneCode'
  import City from '../../components/city'
  import agreenPop from '../../components/pop/agreenPop'
  import PhoneCode from '../../components/code/phoneCode'
  import NickName from '../../components/personCenter/setting/nickName'
  import RealName from '../../components/personCenter/setting/realName'
  import LoginPwd from '../../components/personCenter/setting/updateLoginPwd'
  import TradePwd from '../../components/personCenter/setting/updateTradePwd'
  import NewMobile from '../../components/personCenter/setting/updateMobile'
  import UpdateBank from '../../components/personCenter/setting/updateBank'
  import AddBank from '../../components/personCenter/setting/addBank'
  import {GetUserInfo} from '../../assets/js/personCenterApi/personCenter'
    export default {
      name: "setting",
      layout:'left',
      components:{AddBank,setPop,ImgVCode,regPhoneCode,Bank,City,agreenPop,PhoneCode,NickName,RealName,LoginPwd,TradePwd,NewMobile,UpdateBank},
      data(){
        return{
          navList:[{txt:'身份证',type:1},{txt:'绑定银行卡',type:2},{txt:'其他设置',type:3}],
          typeNow:1,
          typeQuery:this.$route.query.type,
          info:this.$store.getters.userInfo,
          mobile:this.$store.getters.userInfo.phoneNumber,
          NickName:'',
          nameTrue:'',
          nameTrueTxt:'',
          userName:'',
          bankList:null,//是否绑定银行卡
          bankId:'',//是否绑定银行卡
          bankName:'',//是否绑定银行卡
          bankCard:'',//是否绑定银行卡
          pwdTransStatus:'',
          contractStatus:this.$store.getters.userInfo.contractStatus,
          qaStatus:this.$store.getters.userInfo.qaStatus,
          qaTimes:this.$store.getters.userInfo.qaTimes,//评测结果
          reviewBtn:'去评测',//评测的按钮字幕
          agreenUrl:'',
          showAgreen:false,
          BalanceMoney:'',
        }
      },
      methods:{
        //获取绑定的银行卡
        getList(){
          let result = GetBankList()
          result.then((res)=>{
            this.bankList=res.Data
            if(res.Data!=null){
              this.bankId=res.Data.id
              this.bankName=res.Data.bankName
              this.bankCard=res.Data.bankCard
            }
          })
        },
        changeNav(type){
          this.typeNow=type
          if(this.typeNow==2){
            if(this.$store.getters.userInfo.nameTrue==0){
              this.$confirm('未实名认证，请前往认证','实名认证',{confirmButtonText: '立即认证', cancelButtonText: '取消'}).then(()=>{
                //this.$router.push('/personCenter/setting')
                parent.location.reload()
              })
              return
            }else{
              if(this.$store.getters.config.isOpenUserContract==0){
                if (this.$store.getters.userInfo.contractStatus == 0) {
                  this.$confirm(' 您未签署《用户注册协议》', '协议签署', {confirmButtonText: '立即签署', cancelButtonText: '取消'}).then(() => {
                    this.$router.push('/personCenter/protocol')
                  })
                  return;
                }
              }
            }
          }
        },
        getInfo(){
          let result = GetUserInfo()
          result.then((res)=>{
            this.$store.commit('getUserInfo',res)
            this.userName=res.userName
            this.NickName=res.nickName
            this.nameTrue=res.nameTrue
            if(this.nameTrue==0){
              this.nameTrueTxt='去认证'
            }else if(this.nameTrue==1){
              this.nameTrueTxt='审核中'
            }else {
              this.nameTrueTxt='已认证'
            }
            this.pwdTransStatus=res.pwdTransStatus
            this.mobile=res.phoneNumber
          })
        },
        //修改昵称的‘弹窗’
        showNickName(){
          this.$refs.nickName.ShowNickName = true
        },
        //点击确定改变昵称
        nameSure(){
          this.getInfo()
        },
        //显示实名认证
        realName(){
          if(this.nameTrue == 0){
            this.$refs.name.showRealName = true
          }else{
            return
          }
        },
        //提交实名name_code_img
        realNameSure(){
          this.getInfo()
        },
        //银行卡的‘弹窗’
        showBank(){
          if(this.bankList.length==0){
            this.$router.push('/personCenter/addBank')
          }
          else{
            this.$refs.newBank.ShowUpdateBank = true
            this.$refs.newBank.getCode()
          }
        },
        //显示修改登录密码弹窗
        ShowForget(){
          this.$refs.loginPwd.ShowForgetPass = true
          this.$refs.loginPwd.getCode()
        },
        //提现密码弹窗显示
        showDrawing(){
          if(this.pwdTransStatus == 0){
            this.$refs.tradePwd.ShowSetDrawing = true
          }
          else{
            this.$refs.tradePwd.ShowUpdateDrawing = true
            this.$refs.tradePwd.getCode()
          }
        },
        //设置提现密码成功
        setTradePwdSure(){
          this.getInfo()
        },
        //显示修改绑定手机
        showMobile(){
          this.$refs.updateMobile.ShowNewMobile = true
          this.$refs.updateMobile.getCode()
        },
        //注册协议
        getAgreement1(){
          if(this.contractStatus==0){
            let result = GetAgreement(0,1)
            result.then((res)=>{
              this.showAgreen = true
              this.agreenUrl = res.Data.model
            })
          }else{
            let result = SeeAgreement(0,1)
            result.then((res)=>{
              this.showAgreen = true
              this.agreenUrl = res.Data
            })
          }
        },
        //注册协议下载
        downAgreen(){
          let result = DownAgreement(0,1)
          result.then((res)=>{
            /*this.showAgreen = true
            this.agreenUrl = res.Data.model*/
          })
        },
        //注销
        logOff(){
            let result = Cancle()
            result.then((res)=>{
              this.$alert('注销申请已提交，等待审核')
              this.$router.push('/login')
            })
        },
        //评测文字
        gradeTxt(){
          if(this.qaStatus == null){
            this.reviewBtn='去评测'
          } else{
            this.reviewBtn=this.qaTimes+'级(重新评测)'
          }
        },
        //去测评
        goReview(){
          this.$router.push('/personCenter/review')
        },
        //关闭弹窗
        close(attr){
          this[attr] = false
          parent.location.reload()
        },
        qr(){
          if(this.typeQuery==3){
            this.typeNow=3
          }else if(this.typeQuery==2){
            this.typeNow=2
          }
        }
      },
      mounted(){
        this.qr()
        this.getInfo()
        this.gradeTxt()
        this.getList()
      },
    }
</script>
<style  lang="less" >
  .list label{display: block;margin-bottom: 10px;height: 44px;}
  .setting{
    .el-input{height: 44px !important;}
    .popCont{top:30%}
    .el-form{width:50%;float:left}
    .el-popper[x-placement^=bottom]{margin-top:-14px}
    .title{border-bottom: 1px solid #2f7ca8;height: 35px;
       span{display: inline-block;width: 100px;font-size: 14px;line-height: 14px;color: #2f7ca8;padding-bottom: 15px;border-bottom: 1px solid #2f7ca8;margin-left: 10px;text-align: center;}
     }
    .content{max-width:660px;
      .nav{padding-bottom: 40px;
        li{display: inline-block;width:220px;line-height: 50px;border:1px solid #ddd;text-align: center;cursor: pointer}
        li.active{background: #9c221f;color:#fff}
        li:nth-child(1),li:nth-child(2){border-right:0}
      }
      .setting-cont{
       /* button{margin:10px auto 0;}*/
        .update-btn{display: inline-block;background: #9c221f;color:#fff;width:138px;line-height: 40px;border-radius: 5px;text-align: center}
        .idCard{
          label{display: block;margin:0 auto;margin-bottom: 15px;position: relative;height:44px;margin-bottom: 20px;
            input{line-height: 40px;border-radius: 5px;padding:0 20px;width:400px;height:40px;}
            span{line-height: 40px;width:90px;display: inline-block;text-align: right}
          }
        }
        .idCardShow{p{line-height: 34px;}}
        .pass{
          li{overflow: hidden;margin-bottom: 10px;}
          span{float:left;line-height: 40px;cursor: pointer}
          span:first-child{width:100px;}
          span:nth-child(2){width:400px;line-height: 40px;height:40px;border:1px solid #ddd;border-radius: 5px;padding:0 20px;margin-right:10px;}
        }
      }

      h3{font-size: 16px;padding-bottom: 20px;border-bottom: 1px solid #eee;color:#333;font-weight: bold}
    .settingList{
      li{height: 55px;line-height: 55px;position: relative;overflow: hidden;    border-bottom: 1px dotted #DDD;
        span{display: inline-block;text-align: center;font-size: 14px}
        span:first-child{border-top: 1px solid #FFF;background-color: #F3F3F3;width: 26%;color: #999;font-size: 14px;text-align: left;padding-left: 40px;}
        span:nth-child(2){width: 47%;padding-left: 40px;font-weight: 700;color:#333;text-align: left}
        span:last-child{cursor: pointer;width: 20%;height: 52px;vertical-align: middle;    font-size: 14px;color: #566B96;float: right;}
        span:last-child:hover{border-color:#F24856;color:#F24856}
      }
    }

    }
  }

</style>
