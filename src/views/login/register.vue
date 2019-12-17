<template>
  <div class="content_main">
    <div class="login-box" >
      <div class="wrap clearfix" >
        <div class="login-content fl">
          <h2 class="login-tit"><router-link to="/login/register" class="go-reg">注册</router-link></h2>
          <div class="login-inp">
            <label>
              <el-input v-model.trim="mobile" type="number" placeholder="请输入您的手机号" @blur="checkNum"></el-input>
              <span v-show="showError" class="error">!</span>
            </label>
            <label class="dxyz short ">
              <el-input  class="code" v-model.trim="code_img" type="number" placeholder="请输入阿拉伯数字答案" ></el-input>
              <ImgVCode></ImgVCode>
            </label>
            <label class="dxyz short">
              <el-input type="number"  v-model.trim="code_phone" placeholder="请输入手机验证码" class="form-input code-mobile" ></el-input>
              <RegPhoneCode :code_img="code_img" :callIndex="callIndex" :mobile="mobile" :phoneValidate="phoneValidate"></RegPhoneCode>
            </label>
            <!--<label>
          <input type="text"  placeholder="设置昵称" class="form-input" v-model="nickName">
            </label>-->
            <label>
              <div class="el-input">
                <input class="el-input__inner" v-model.trim="pwd1" @keyup="pwdStrength(pwd1)" type="password" placeholder="请输入8-24位的组合密码">
              </div>
              <pwdStrength ref="strength"></pwdStrength>
            </label>
            <label>
              <el-input type="password" v-model.trim="pwd2" placeholder="请确认您的密码" class="form-input"></el-input>
            </label>
            <label >
              <el-input v-model.trim="recommend" :placeholder="isRequireRecommend==0?'请输入邀请码，没有请联系客服':'请输入邀请码，无则不填'" class="form-input"></el-input>
            </label>
            <div class="reg_btn_box">
              <div class="login-info">
                <input type="checkbox" class="check"  v-model="check"/>
                我同意<a @click="goReg('regpact')">《用户注册协议》</a>、<a @click="goReg('shenming')">《合格投资人申明》</a>、<a @click="goReg('fengxianjieshi')">《风险揭示书》</a></div>
              <div style="margin-top:10px"><button type="button" class="btn-blue" @click="register" >注册</button></div>
            </div>
          </div>
        </div>
        <div class="fl login-btn">
          <p>已有账号？ </p>
          <p>立即登录！</p>
          <router-link to="/login">立即登录</router-link>
        </div>
      </div>

    </div>
    <Close :name="name" :isOpen="this.$store.getters.config.validReg"></Close>
    <ProtocolPop :content="content" :isShow="showReg" @click="close('showReg')"></ProtocolPop>
  </div>
</template>

<script>
  import ImgVCode from '../../components/code/ImgVCode'
  import ProtocolPop from '../../components/pop/protocolPop'
  import RegPhoneCode from '../../components/code/regPhoneCode'
  import pwdStrength from '../../components/pwdStrength'
  import Close from '../../components/pop/close'
  import {reg} from '../../assets/js/loginApi/login'
  import {getProtocol} from '../../assets/js/globalApi/global'
    export default {
      name: "register",
      components:{ImgVCode,RegPhoneCode,ProtocolPop,pwdStrength,Close},
      data () {
        return {
          name:'注册',
          type:3,
          mobile:'',
          pwd1:'',
          pwd2:'',
          code_img:'',
          code_phone:'',
          recommend:'',//推荐码
          nickName:'',//昵称
          content:'',
          showReg:false,
          callindex:'',
          callIndex:'reg',//短信类型
          phoneValidate:1,//验证手机号是否存在
          check:false,
          isRequireRecommend:this.$store.getters.config.isRequireRecommend,
          refid:this.$route.query.refid,
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
        //弱密码
        pwdStrength(val){
          this.$refs.strength.pwdStrength(val)
        },
        checkNum(){
          if(this.mobile.length!=11||this.mobile.substring(0,1)!=1||this.mobile.substring(1,2)<3){
            this.$alert('手机号码格式不正确','消息提示')
            return
          }
        },
        //关闭弹窗
        close(attr){
          this[attr] = false
        },
        //进入注册协议
        goReg(callindex){
          this.showReg = true
          let result = getProtocol(callindex)
          result.then((res)=>{
            this.content = res.Data.content
          })
        },
        register(){
          if(this.mobile == ''){
            this.$alert('请输入手机号码')
            return
          }
          if(this.code_img == ''){
            this.$alert('请输入阿拉伯数字答案')
            return
          }
          if(this.code_phone == ''){
            this.$alert('请输入短信验证码')
            return
          }
          if(this.pwd1 == ''){
            this.$alert('请输入8-24位数字、字母、特殊字符至少两种以上的组合密码')
            return
          }
          if(this.pwd2 == ''){
            this.$alert('请确认您的密码')
            return
          }
          if(this.pwd2 != this.pwd1){
            this.$alert('两次输入密码不一致')
            return
          }

         /* if(this.reference == ''){
            this.$alert('请输入推荐码')
            return
          }*/
          if(!this.check){
            this.$alert('请阅读并勾选同意相关协议以完成注册')
            return;
          }
          let loading = this.$loading({
            lock: true,
            text: '正在注册',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
          });
          let result= reg(this.mobile,this.pwd1,this.code_img,this.code_phone,this.nickName,this.recommend)
            result.then((res)=>{
              this.$alert('注册成功','消息提示')
              this.$router.push('/login')
              loading.close()
            }).catch(err=>{
              loading.close()
            })
        },
      },
      mounted() {
        if(this.refid!=''){
          this.recommend=this.refid
        }else{
          this.recommend=''
        }
      }
    }
</script>
<style  lang="less" scoped>
  .close{padding-top:100px;color:red;font-size: 24px;text-align: center}
  .login-box {background: url(../../../static/img/login/login-bg.jpg)no-repeat center;padding: 50px 0;
    .wrap{padding-left:186px;}
    .login-content {width: 415px;height:590px;padding: 40px 48px 40px;background: rgba(255,255,255,0.5);
      .login-tit {text-align: center;color: #fff;
        span {font-family: "Meiryo";font-weight: 700;font-size: 24px;}
        .go-reg {font-size: 30px;color:#285c8b}
      }
      .login-inp {padding-top:30px;
        i{float:left}
        input {border: 0;line-height: 38px;height:38px;padding-left: 16px;vertical-align: top;border-radius: 20px;width:95%}
        input.short {width:180px;}
        label {font-size: 16px;position: relative;display: inline-block;height: 40px;line-height: 40px;border: 1px solid #384184;width: 100%;background: #FFF;margin-bottom: 20px;border-radius: 15px;
        }
        label.short{width:190px;float: left}
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
      .login-info{font-size: 16px;color:#333;line-height: 24px;
        a{color:#333}
        input{width:16px;height:16px;display: inline-block}
      }
    }
    .login-btn{text-align: left;padding:155px 0 190px 44px;width:415px;color:#fff;font-size: 24px;background: rgba(28,47,108,0.6);margin-top:25px;
      p{line-height: 38px;}
      a{display: block;width:135px;line-height: 40px;text-align: center;color:#fff;border:1px solid #fff;border-radius: 20px;margin-top:42px;}
    }
  }
</style>
