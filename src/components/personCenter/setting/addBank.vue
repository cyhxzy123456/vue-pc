<template>
  <div class="addBank">
    <div class="content">
      <div class="right ">
<!--
        <div class="cont-right">（因第三方支付政策要求）请选择常用的银行卡，绑定成功后 充值提现只能在该银行卡上进行！</div>
-->

       <!-- <p >
          <span v-show="isName == 0"><router-link to="/personCenter/setting" style="color:red">您还未实名，点击前往实名认证</router-link></span>
          <span class="font-bold" v-show="isName == 2" v-text="userName"> 欢欢</span>
        </p>-->
        <div class="list">
          <span>开户人姓名：</span>
          <input type="text" v-model="userName" placeholder="请先实名认证" disabled>
        </div>
        <div class="list">
          <span>开户行银行：</span>
          <bank @choose="changeBank"></bank>
        </div>
        <div class="list">
          <span>开户地区：</span>
          <city  @selectChange="changeCity"></city>
        </div>
        <div class="list">
          <span>开户支行：</span>
          <div class="vertify">
            <el-input v-model.trim="upbankname" type="text" placeholder="请输入支行" @blur="jiaoYan"></el-input>
          </div>
        </div>
        <div class="list">
          <span>银行卡号：</span>
          <div class="vertify"><el-input v-model.trim="bankNo1" type="number" placeholder="银行卡号" ></el-input></div>
        </div>
        <div class="list">
          <span>请确认银行卡号：</span>
          <div class="vertify">
            <el-input v-model.trim="bankNo2" type="number" placeholder="确认银行卡号" ></el-input>
          </div>
        </div>
        <div class="list">
          <span>银行预留手机号：</span>
         <!-- <input type="text" placeholder="银行预留11位手机号" v-model="mobile">-->
          <div class="vertify"><el-input v-model.trim="mobile" type="number" placeholder="银行预留11位手机号" @blur="checkNum"></el-input></div>
        </div>
        <div class="list ">
          <span>图形验证码：</span>
         <div class="vertify-short"><el-input  class=" short" v-model.trim="bank_code_img" type="number" placeholder="请输入阿拉伯数字答案" ></el-input></div>
          <ImgVCode ref="addBank"></ImgVCode>
        </div>
        <div class="list ">
          <span>手机验证码：</span>
          <div class="vertify-short"><el-input type="number"  v-model.trim="bank_code_phone" placeholder="请输入手机验证码" > </el-input></div>
          <RegPhoneCode :code_img="bank_code_img" :callIndex="verifyCode" :mobile="mobile" :phoneValidate="0"></RegPhoneCode>
        </div>
        <div class="">
          <button class="btn" type="button" :disabled="abled"  @click="addBankCommit">确认添加</button>
        </div>
      </div>
    </div>
   <!-- <RealNamePop></RealNamePop>-->
  </div>
</template>
<script>
  import city from '../../city'
  import bank from '../bank'
  import RealNamePop from '../../pop/realNamePop'
  import ImgVCode from '../../../components/code/ImgVCode'
  import RegPhoneCode from '../../../components/code/regPhoneCode'
  import {AddBank} from '../../../assets/js/personCenterApi/personCenter'
  import {VerifyCode} from '../../../assets/js/globalApi/global'
  import {JudgeSmsCode} from '../../../assets/js/globalApi/global'
  export default {
    name: "addBank",
    layout:'left',
    components:{city,bank,RealNamePop,ImgVCode,RegPhoneCode},
    props:['userName',],
    data(){
      return{
        mobile:'',
        isName:this.$store.getters.userInfo.nameTrue,
        info:{},
        bankVal:'',
        bankName:'',
        bankNo1:'',
        bankNo2:'',
        upbankname:'',//支行,
        selectBank:null,
        province:'',
        city:'',
        bank_code_img:'',
        verifyCode:'verifyCode',
        bank_code_phone:'',
        abled:false
      }
    },///[^/d] /g
    methods:{
      checkNum(){
        if(this.mobile.length!=11||this.mobile.substring(0,1)!=1||this.mobile.substring(1,2)<3){
          this.$alert('手机号码格式不正确','消息提示')
          return
        }
      },
      //验证短信验证码VerifyCode
      verify(){
        let result = JudgeSmsCode(this.mobile,this.bank_code_phone)
        result.then((res)=>{
          this.abled=false
         this.commit()
        }).catch((err)=>{
          this.abled=false
        })
      },
      jiaoYan(){
        let han = /^[\u4e00-\u9fa5]+$/;
        if(!han.test(this.upbankname)||this.upbankname.length>20){
          this.$alert('支行信息请输入20字以内的中文字符！')
          return
        }
      },
      Num(){
        let num = /^[0-9]*$/ ;
        if(!num.test(this.bankNo1)){
          this.$alert('银行账号只能是数字')
          return
        }
      },
      //确认绑定
      addBankCommit(){
        let han = /^[\u4e00-\u9fa5]+$/;
        if(this.$store.getters.userInfo.nameTrue==0){
          this.$confirm('未实名认证，请前往认证','实名认证',{confirmButtonText: '立即认证', cancelButtonText: '取消'}).then(()=>{
            parent.location.reload()
          })
          return
        }
        if(this.selectBank === null){
          this.$alert('请选择开户行银行')
          return
        }
        if(this.province === ''){
          this.$alert('请选择省')
          return
        }
        if(this.city == ''){
          this.$alert('请选择市')
          return
        }
        if(this.upbankname == ''){
          this.$alert('请选择支行')
          return
        }
        if(!han.test(this.upbankname)||this.upbankname.length>20){
          this.$alert('支行信息请输入20字以内的中文字符！')
          return
        }
        if(this.bankNo1 == ''){
          this.$alert('请输入银行卡号')
          return
        }
        if(this.bankNo2 == ''){
          this.$alert('请重复银行卡号')
          return
        }
        if(this.bankNo2!= this.bankNo1){
          this.$alert('两次输入的银行卡号不一致，请修改！')
          return
        }
        this.abled=true
       this.verify()
      },
      commit(){
        this.abled=true
        let result = AddBank(this.selectBank.title,this.province+','+this.city,this.upbankname,this.bankNo1,this.mobile)
        result.then((res)=>{
          this.$store.dispatch('BankList')
          this.$alert('银行卡绑定成功！')
          this.$emit('add')
          this.abled=false
        }).catch((err)=>{
          this.abled=false
        })
      },
      changeCity(val1,val2){
        this.province = val1
        this.city = val2
      },
      changeBank(val){
        this.selectBank = val
      }

    },


  }
</script>
<style  rel="stylesheet/less" lang="less" >
  .addBank{
    .font-bold{font-weight: bold}
    .line100{line-height: 100px}
    select,input{width:400px;height: 40px;line-height: 40px;border: 1px solid #DDD;padding-left:10px;font-size: 14px;border-radius: 5px}
   input.short{width:278px}

    .title{border-bottom: 1px solid #2f7ca8;height: 35px;
      span{display: inline-block;width: 100px;font-size: 14px;line-height: 14px;color: #2f7ca8;padding-bottom: 15px;border-bottom: 2px solid #2f7ca8;margin-left: 10px;text-align: center;}
    }
    .content{    width: initial;overflow: hidden;    padding-bottom: 20px;
      .left{width:175px;background: #f3f3f3;min-height: 560px;
        li{font-size: 14px;color: #666;font-weight: 700;text-align: right;padding-right: 40px;margin-top: 62px;}
        li:first-child{;margin-top: 120px;}
      }
      .right{width:785px;
        .cont-right {margin-bottom: 28px;border: 1px solid #FF8C19;background-color: #FFE599;font-size: 16px;color: #FF8C19;height:78px;line-height: 78px;text-align: center}
        .list{margin-bottom: 15px;overflow: hidden;position: relative;
          .vertify{    height: 40px;line-height: 40px;border: 1px solid #DDD;display: inline-block;width:400px;border-radius: 5px}
          .vertify-short{    height: 40px;line-height: 40px;border: 1px solid #DDD;display: inline-block;width:278px;border-radius: 5px}
          .img{right:230px}
          .phoneCode{right:230px}
        span{float:left;width:145px;line-height: 45px;text-align: right}
        }
        .add-box{border-top:1px solid #DDD;padding-top:60px;margin-top:50px;
          button{color:#fff;width:150px;border:0;margin:0 auto;display:block;background: #d82800;height: 38px;font-size: 16px;line-height: 38px;text-align: center;border-radius: 5px}
        }
        .province-city{display: inline-block;
          form{float:left;width:210px;
            .el-form-item{margin:0!important;float:left;width:50%;}
            input{width:186px!important;}
          }
          form:nth-child(2){margin:0 5px}
        }
      }
    }

  }

</style>
