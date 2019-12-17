<template>
    <div>
      <setPop :isShow="ShowSetDrawing" @closePop="close('ShowSetDrawing')" @setData="setDrawingPass">
        <h3 slot="tit">设置提现密码</h3>
        <input type="password" placeholder="请输入提现密码" v-model="drawingPwd1" @blur="judge(drawingPwd1)"/>
        <input type="password" placeholder="请重复提现密码" v-model="drawingPwd2" @blur="judge(drawingPwd2)"/>
      </setPop>
      <setPop :isShow="ShowUpdateDrawing" @closePop="close('ShowUpdateDrawing')" @setData="updateDrawingPass" >
        <h3 slot="tit">修改提现密码</h3>
        <label><input type="text"  v-model="phoneMobile" disabled="disabled"/></label>
        <label class="shortInp">
          <div class="vertify-short"><el-input  class=" short" v-model.trim="draw_code_img" type="number" placeholder="请输入阿拉伯数字答案" ></el-input></div>
          <span class="code"> <ImgVCode ref="upDraw"></ImgVCode></span>
        </label>
        <label class="shortInp">
          <div class="vertify-short"><el-input  class=" short" v-model.trim="draw_code_phone" type="number" placeholder="手机验证码" ></el-input></div>
          <PhoneCode :callIndex="verifyCode" :code_img="draw_code_img" ></PhoneCode>
        </label>
        <label class="shortInp">
          <div class="vertify border">
            <el-input  class=" short" v-model.trim="drawPwd1" type="password" placeholder="旧提现密码" autocomplete="off"></el-input>
            <span @click="forget" class="find">忘记提现密码</span>
          </div>
        </label>
        <label>
          <div class="el-input border">
            <input class="el-input__inner" v-model.trim="drawPwd2" @blur="judge(drawPwd2)" type="password" placeholder="新提现密码" autocomplete="off">
          </div>
        </label>
      </setPop>
      <ForgetTradePwd ref="forget"></ForgetTradePwd>
    </div>
</template>

<script>
  import setPop from '../../../components/pop/setPop'
  import PhoneCode from '../../../components/code/phoneCode'
  import ImgVCode from '../../../components/code/ImgVCode'
  import ForgetTradePwd from '../../../components/personCenter/setting/forgetTradePwd'
  import {VerifyCode} from '../../../assets/js/globalApi/global'
  import {setDrawing} from '../../../assets/js/personCenterApi/personCenter'

  export default {
    components:{setPop,PhoneCode,ImgVCode,ForgetTradePwd},
    data(){
      return{
        phoneMobile:this.$store.getters.userInfo.phoneNumber,
        ShowSetDrawing:false,//显示设置提现密码弹窗
        ShowUpdateDrawing:false,//显示修改提现密码弹窗
        drawingPwd1:'',
        drawingPwd2:'',
        draw_code_img:'',
        draw_code_phone:'',
        drawPwd1:'',
        drawPwd2:'',
        verifyCode:'verifyCode',
        showForget:true
      }
    },
    methods:{
      forget(){
        this.$refs.forget.ShowUpdateDrawing = true
        this.ShowUpdateDrawing=false
      },
      //判断提现密码
      judge(val){
        let num = /^[0-9]*$/
        if(val.length!=6 || !num.test(val)){
          this.$alert('提现密码只能是6位数字')
          return
        }
      },
      clear(){
        this.drawingPwd1=''
        this.drawingPwd2=''
        this.draw_code_img=''
        this.draw_code_phone=''
        this.drawPwd1=''
        this.drawPwd2=''
      },
      //关闭弹窗
      close(attr){
        this[attr] = false
        this.clear()
      },
      //验证短信验证码VerifyCode
      verify(){
        let that=this
        let result = VerifyCode(that.draw_code_phone)
        result.then((res)=>{
          this.commit()
        }).catch(err=>{
          if(err.Result==1){

          }
        })
      },
      //设置提现密码的‘确定’
      setDrawingPass(){
        if(this.drawingPwd1==''){
          this.$alert( '请输入提现密码')
          return
        }
        if(this.drawingPwd2==''){
          this.$alert( '请重复输入提现密码')
          return
        }
        if(this.drawingPwd2!=this.drawingPwd1){
          this.$alert( '两次输入密码不一致')
          return
        }
        let result = setDrawing('',this.drawingPwd1)
        result.then((res)=>{
          this.$alert('设置提现密码成功！')
          this.ShowSetDrawing = false

          this.$emit('setTradePwdClick')
        })
      },
      //修改提现密码的‘确定’
      updateDrawingPass(){
        let num = /^[0-9]*$/
        if(this.draw_code_img == ''){
          this.$alert( '请输入验证码')
          return
        }
        if(this.draw_code_phone == ''){
          this.$alert( '请输入短信验证码')
          return
        }
        if(this.drawPwd1 == ''){
          this.$alert('请输入旧提现密码')
          return
        }
        if(this.drawPwd2 == ''){
          this.$alert( '请输入新提现密码')
          return
        }
        if(this.drawPwd2.length!=6 || !num.test(this.drawPwd2)){
          this.$alert('提现密码只能是6位数字')
          return
        }
        this.verify()
      },
      commit(){
        let result= setDrawing(this.drawPwd1,this.drawPwd2)
        result.then((res)=>{
          this.$alert('修改提现密码成功！')
          this.ShowUpdateDrawing = false
          this.clear()
        })
      },
      //重新获取验证码
      getCode(){
        this.$refs.upDraw.toggleVerifyCode()
      }
    },
  }
</script>

<style rel="stylesheet/less" lang="less"  scoped>
  .find{cursor:pointer;position: absolute;top:0;right:-130px;color: #fff;line-height: 44px;width: 124px;height: 44px;border: 0;font-size: 14px;text-align: center;background-color: #566B96;}
  .vertify-short{border:1px solid #eee}
  .code{width:136px;
    img{width:136px}
  }
</style>
