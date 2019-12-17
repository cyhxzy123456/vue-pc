<template>
    <div>
      <setPop :isShow="ShowForgetPass" @closePop="close('ShowForgetPass')" @setData="setLoginPass">
        <h3 slot="tit">修改登录密码</h3>
        <label><input type="text"  v-model="phoneMobile" disabled="disabled"/></label>
        <label class="shortInp">
          <div class="vertify-short"><el-input  class=" short" v-model.trim="code_img" type="number" placeholder="请输入阿拉伯数字答案" ></el-input></div>
          <span class="code"><ImgVCode ref="upLogin"></ImgVCode></span>
        </label>
        <label class="shortInp">
          <div class="vertify-short"><el-input  class=" short" v-model.trim="code_phone" type="number" placeholder="手机验证码" ></el-input></div>
          <PhoneCode :callIndex="verifyCode" :code_img="code_img" ></PhoneCode>
        </label>
        <label>
          <div class="vertify border">
            <el-input  class=" short" v-model.trim="pwd1" type="password" placeholder="旧登录密码" autocomplete="off"></el-input>
          </div>
        </label>
        <label>
          <div class="el-input border">
            <input class="el-input__inner" v-model.trim="pwd2" @keyup="pwdStrength(pwd2)" type="password" placeholder="新登录密码" autocomplete="off">
          </div>
          <pwdStrength ref="strength"></pwdStrength>
        </label>
      </setPop>
    </div>
</template>

<script>
  import setPop from '../../../components/pop/setPop'
  import PhoneCode from '../../../components/code/phoneCode'
  import ImgVCode from '../../../components/code/ImgVCode'
  import pwdStrength from '../../../components/pwdStrength'
  import {updateLogin} from '../../../assets/js/personCenterApi/personCenter'
  import {VerifyCode} from '../../../assets/js/globalApi/global'

    export default {
      components:{setPop,PhoneCode,ImgVCode,pwdStrength},
      data(){
        return{
          ShowForgetPass:false,//显示修改登录密码弹窗
          phoneMobile:this.$store.getters.userInfo.phoneNumber,
          code_img:'',
          code_phone:'',
          pwd1:'',
          pwd2:'',
          verifyCode:'verifyCode',
        }
      },
      methods:{
        //弱密码
        pwdStrength(val){
          this.$refs.strength.pwdStrength(val)
        },
        clear(){
          this.code_img=''
          this.code_phone=''
          this.pwd1=''
          this.pwd2=''
          this.$refs.strength.Lcolor=''
          this.$refs.strength.Mcolor=''
          this.$refs.strength.Hcolor=''
        },
        //关闭弹窗
        close(attr){
          this[attr] = false
          this.clear()
        },
        //验证短信验证码VerifyCode
        verify(){
          let result = VerifyCode(this.code_phone)
          result.then((res)=>{
            this.commit()
          }).catch(err=>{
            if(err.Result==1){

            }
          })
        },
        //修改登录密码的‘确定’code_phone
        setLoginPass(){
          if(this.code_img == ''){
            this.$alert('请输入阿拉伯数字答案')
            return
          }
          if(this.code_phone == ''){
            this.$alert('请输入短信验证码')
            return
          }
          if(this.pwd1 == ''){
            this.$alert('请输入旧登录密码')
            return
          }
          if(this.pwd2 == ''){
            this.$alert('请输入新登录密码')
            return
          }
          this.verify()
        },
        commit(){
          let result = updateLogin(this.pwd1,this.pwd2)
          result.then((res)=>{
            this.$alert('修改登录密码成功')
            this.ShowForgetPass = false
            this.clear()
            this.$router.push('/login')
          })
        },
        //重新获取验证码
        getCode(){
          this.$refs.upLogin.toggleVerifyCode()
        }
      },
    }
</script>

<style rel="stylesheet/less" lang="less"  scoped>
  .vertify-short{border:1px solid #eee}
  .code{width:136px;
    img{width:136px}
  }
</style>
