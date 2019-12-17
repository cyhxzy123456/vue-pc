<template>
  <div class="content_main" style="background: #fff">
    <div class="login-top-cen wrap">
      <div class="center">
        <div class="forget-title">找回登录密码</div>
        <div class="forget-cont">
          <span class="errTip">{{errTip}}</span>
          <div class="login-cont">
            <div style="display: none" class="error-msg"><span>密码错误</span></div>
            <label>
              <el-input v-model.trim="mobile" type="number" placeholder="请输入已注册手机号码" @blur="checkNum"></el-input>
              <span v-show="showError" class="error">!</span>
            </label>
            <label class=" short">
              <el-input type="number" placeholder="请输入阿拉伯数字答案" v-model.trim="code_img"></el-input>
              <ImgVCode></ImgVCode>
            </label>
            <label class=" short" >
              <el-input type="number" placeholder="请输入短信验证码" class="form-input" v-model.trim="code_phone" ></el-input>
              <RegPhoneCode :code_img="code_img" :callIndex="callIndex" :mobile="mobile" :phoneValidate="phoneValidate"></RegPhoneCode>
              <span  class="getcode2" style="display: none;"></span>
            </label>
            <label>
              <div class="el-input">
                <input type="password" @keyup="pwdStrength(pwd1)"  placeholder="请输入新密码" class="el-input__inner" v-model.trim="pwd1">
              </div>            </label>
            <pwdStrength ref="strength"></pwdStrength>
            <label>
              <el-input type="password" placeholder="再次输入新密码" class="form-input" v-model.trim="pwd2"></el-input>
            </label>
            <div class="login-menu">
              <button type="button" class="btn-orange " @click="findPwd">完成</button></div>
            <div class="forget-info">如您无法收到短信，请联系客服：<span class="color-black6 font-bold">{{configInfo.tel}}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {JudgeSmsCode} from '../../assets/js/globalApi/global'
  import {forgetLogin} from '../../assets/js/loginApi/login'
  import ImgVCode from '../../components/code/ImgVCode'
  import RegPhoneCode from '../../components/code/regPhoneCode'
  import pwdStrength from '../../components/pwdStrength'
    export default {
      name: "forgetPass",
      components:{ImgVCode,RegPhoneCode,pwdStrength},
      data () {
        return {
          type:4,
          mobile:'',
          pwd1:'',
          pwd2:'',
          code_img:'',
          code_phone:'',
          errTip:'',
          configInfo:this.$store.getters.allInfo,
          phoneValidate:2,
          callIndex:'verifyCode',
          showError:false
        }
      },
      watch:{
        mobile:function(val){
          if(val.length!=11||val.substring(0,1)!=1||val.substring(1,2)<3){
            this.showError=true
          }else{
            this.showError=false
          }
        }
      },
      methods:{
        checkNum(){
          if(this.mobile.length!=11||this.mobile.substring(0,1)!=1||this.mobile.substring(1,2)<3){
            this.$alert('手机号码格式不正确','消息提示')
            return
          }
        },
        //弱密码
        pwdStrength(val){
          this.$refs.strength.pwdStrength(val)
        },
        //验证短信验证码
        judgeSmsCode(){
          let result= JudgeSmsCode(this.mobile,this.code_phone)
          result.then((res)=>{
            this.commit()
          })
        },
        findPwd(){
          if(this.mobile==''){
            this.$alert('请输入手机号码')
            return
          }
          if(this.code_img==''){
            this.$alert('请输入图形验证码')
            return
          }
          if(this.code_phone==''){
            this.$alert('请输入手机验证码')
            return
          }
          if(this.pwd1==''){
            this.$alert('请输入8-24位数字、字母、特殊字符至少两种以上的组合密码')
            return
          }
          if(this.pwd2==''){
            this.$alert('请再次输入新密码')
            return
          }
          if(this.pwd2!=this.pwd1){
            this.$alert('两次输入密码不一致')
            return
          }
          this.judgeSmsCode()
        },
        commit(){
          let result= forgetLogin(this.mobile,this.pwd1,this.pwd2)
          result.then((res)=>{
            this.$alert('密码重置成功，请使用新密码登录')
            this.$router.push('/login')
          })
        }
      },
    }
</script>
<style  lang="less" scoped>
  .center {color: white;text-align: center;margin-top: 20px;cursor: pointer;padding-bottom: 120px;
    .forget-title{font-size:26px;color:#666;font-weight:700;padding-bottom:20PX;margin-bottom:50px;}
    .forget-info,.wx-bind{font-size:14px;text-align:center}
    .forget-info{color:#999;padding-top:20px}
    .wx-bind{margin-top:20px;color:#666}
    .wx-bind a{color:#566B96;text-decoration:underline}
    .login-cont label{line-height:42px;height:42px;border:1px solid #ddd;display:block;margin-bottom:20px;border-radius: 10px}
    .login-cont label.focus{border-color:#566B96}
    .login-cont label.focus i{color:#566B96}
    .login-cont label.focus-err{border-color:red}
    .login-cont label i{color:#DDD}
    .forget-cont {width: 320px;margin: 0 auto;}
    .login-cont {margin-top: 40px;position: relative;text-align: left;}
    .login-cont label input {border: none;height: 40px;padding-left:16px;vertical-align: top;background: transparent;font-size: 16px}
    .imgcode2 img{right:0!important;top:65px;width:152px}
    .login-cont label.dxyz {
      width: 192px;display: inline-block;
    }
    .code{    margin-left: 26px;}
    .phoneCode{float:right}
  }
  .errTip{color:red}
</style>
