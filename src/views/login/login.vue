<template>
  <div class="content_main">
    <div class="login-box">
      <div class="wrap clearfix">
        <div class="login-content fl">
          <h2 class="login-tit"><router-link to="/login/login" class="go-reg">登录</router-link></h2>
          <div class="login-inp">
            <label>
              <el-input v-model.trim="mobile" type="number" placeholder="请输入您的手机号" @blur="checkNum"></el-input>
              <span v-show="showError" class="error">!</span>
            </label>
            <label>
              <el-input type="password"  placeholder="请输入登录密码" v-model.trim="password"></el-input>
            </label>
            <label class="short">
              <el-input type="number" placeholder="请输入阿拉伯数字答案" v-model.trim="code"></el-input>
              <ImgVCode ref="imgCode"></ImgVCode>
            </label>
            <label v-show="showPhone" class="short">
              <el-input type="number" placeholder="短信验证码" v-model.trim="code_phone" ></el-input>
              <RegPhoneCode :code_img="code" :callIndex="callIndex" :mobile="mobile" :phoneValidate="phoneValidate"></RegPhoneCode>
            </label>
            <div class="remember">
              <div class="left fl">
                <input @click="remember"  type="checkbox" id="checkbox" name="remember" >
                <span>记住用户名</span>
              </div>
              <router-link to="/forget" class="fr">忘记密码?</router-link>
            </div>
            <div class="login-menu"><button type="button"  class="btn-blue" @click="login">登录</button></div>
          </div>
        </div>
        <div class="fl login-btn">
          <p>还没有账号？</p>
          <p> 立即免费注册！</p>
          <a @click="register">立即注册</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ImgVCode from '../../components/code/ImgVCode'
  import RegPhoneCode from '../../components/code/regPhoneCode'
  import {getUser} from '../../assets/js/loginApi/login'
  import {GetConfig} from '../../assets/js/globalApi/global'
  export default {
    name: "login",
    components:{ImgVCode,RegPhoneCode},
    data () {
      return {
        errorTip:'',
        mobile:'',
        password:'',
        code:'',
        token:'',
        url:'/api/verifyCode/getCode',
        phoneValidate:2,
        callIndex:'verifyCode',
        showPhone:false,
        code_phone:'',
        showError:false,
        validReg:''
      }
    },
    watch:{
      mobile:function(val){
        if(val==''||val=='null'){
          this.showError=false
        }else if(val.length!=11||val.substring(0,1)!=1||val.substring(1,2)<3){
          this.showError=true
        }else{
          this.showError=false
        }
      }
    },
    methods:{
      getConfigOpen(){
        let result = GetConfig()
        result.then((res)=>{
          this.validReg=res.validReg
        })
      },
      register(){
        if(this.validReg==0){
          this.$router.push('/login/register')
        }else{
          this.$alert('会员注册通道已关闭，详情请联系客服:'+this.$store.getters.allInfo.tel)
        }
      },
      checkNum(){
        if(this.mobile.length!=11||this.mobile.substring(0,1)!=1||this.mobile.substring(1,2)<3){
          this.$alert('手机号码格式不正确','消息提示')
          return
        }
      },
      //点击记住密码
      remember(){
        this.$store.commit('setUser',this.mobile)
      },
      login(){
        if(this.mobile == ''){
          this.$alert('请输入手机号码')
          return
        }
        if(this.password == ''){
          this.$alert('请输入登录密码')
          return
        }
        if(this.code == ''){
          this.$alert('请输入阿拉伯数字答案')
          return
        }
        let loading = this.$loading({
          lock: true,
          text: '登录中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
        });
        let result = getUser(this.mobile,this.password,this.code,this.code_phone)
        result.then((res) => {
          this.token = res.Data.access_token
          this.$store.commit('setStorage',this.token)
          this.$store.commit('setFresh',res.Data.refresh_token)
          this.$store.commit('expires',res.Data.expires_in)
          localStorage.setItem("access_token", res.Data.access_token);
          localStorage.setItem("refresh_token", res.Data.refresh_token);
          let overTime = new Date().getTime() + res.Data.expires_in * 600;
          localStorage.setItem("overTime", overTime);
          this.$router.push('/personCenter/user')
          loading.close();
        }).catch((err)=>{
          loading.close();
          this.$refs.imgCode.toggleVerifyCode()
          if(err.Message=="系统检测到您的账号可能在异地登录，请获取短信验证码确认"){
            this.showPhone=true
          }
        })
      }
    },
    mounted(){
      this.getConfigOpen()
      this.$store.dispatch('getConfig')
      const self = this
      self.mobile =  this.$store.getters.mobile
    },
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .login_code{width:131px!important;}
  .login-code {display: inline-block;background: #fa7e41;width: 130px;
    line-height: 38px;text-align: center;color:#fff;background: url("../../../static/img/login/code-bg.png") no-repeat;vertical-align: top;
  }
  .login-box {background: url(../../../static/img/login/login-bg.jpg)no-repeat center;padding: 74px 0;
    .wrap{padding-left:186px;}
    .login-content {width: 415px;height:550px;padding: 40px 48px 120px;background: url(../../../static/img/login/login-cont-bg.png)no-repeat center;;margin: 0 auto;
      .login-tit {text-align: center;color: #fff;
        span {font-family: "Meiryo";font-weight: 700;font-size: 24px;}
        .go-reg {font-size: 30px;color:#285c8b}
      }
      .login-inp {padding-top: 42px;
        i{float:left}
        input {font-size: 16px;border: 0;line-height: 40px;height:40px;padding-left: 16px;vertical-align: top;border-radius: 20px;width:95%}
        label {display: inline-block;height: 42px;line-height: 42px;border: 1px solid #384184;width: 100%;background: #FFF;margin-bottom: 34px;border-radius: 15px;
          .imgcode{position: relative;width:136px;float:right}
        }
        .icon-user {display: inline-block;width: 40px;height: 40px;background: url(../../../static/img/login/user.png)no-repeat center;background-color: #fa7e41;}
        .icon-pwd {display: inline-block;width: 40px;height: 40px;background: url(../../../static/img/login/pwd.png)no-repeat center;background-color: #fa7e41;}
      }
      .login-menu {margin-top: 35px;}
      .btn-blue{background:  url(../../../static/img/login/login-btn.png)no-repeat center;display: block;height: 40px;width:100%;color:#fff}
      .remember {padding-top: 11px;font-size: 18px;overflow: hidden;
        a {font-size: 18px;cursor: pointer;color:#384184;float: right}
        span{color:#333}
        input{display: inline-block;width:18px;height:18px;border:1px solid #384184}
      }
    }
    .login-btn{padding:155px 0 190px 44px;width:415px;color:#fff;font-size: 24px;background: rgba(28,47,108,0.6);margin-top:25px;
      p{line-height: 38px;}
      a{display: block;width:135px;line-height: 40px;text-align: center;color:#fff;border:1px solid #fff;border-radius: 20px;margin-top:42px;}
    }
  }
</style>
