<template>
    <div>
      <setPop :isShow="ShowUpdateDrawing" @closePop="close('ShowUpdateDrawing')" @setData="updateDrawingPass" >
        <h3 slot="tit">找回提现密码</h3>
        <label><input type="text"  v-model="mobile" disabled="disabled"/></label>
        <label class="shortInp">
          <div class="vertify-short"><el-input  class=" short" v-model.trim="code_img" type="number" placeholder="请输入阿拉伯数字答案" ></el-input></div>
          <span class="code"><ImgVCode ref="upDraw"></ImgVCode></span>
        </label>
        <label class="shortInp">
          <div class="vertify-short"><el-input  class=" short" v-model.trim="draw_code_phone" type="number" placeholder="手机验证码" ></el-input></div>
          <PhoneCode :callIndex="verifyCode" :code_img="code_img" ></PhoneCode>
        </label>
        <label>
          <div class="vertify border">
            <el-input  class=" short" v-model.trim="pwd1" type="password" placeholder="新提现密码" autocomplete="off"></el-input>
          </div>
        </label>
        <label>
          <div class="el-input border">
            <input class="el-input__inner" v-model.trim="pwd2" type="password" placeholder="重复提现密码" autocomplete="off">
          </div>
        </label>
      </setPop>
    </div>
</template>

<script>
  import setPop from '../../../components/pop/setPop'
  import PhoneCode from '../../../components/code/phoneCode'
  import ImgVCode from '../../../components/code/ImgVCode'
  import {VerifyCode} from '../../../assets/js/globalApi/global'
  import {FindDrawing} from '../../../assets/js/personCenterApi/personCenter'

  export default {
    components:{setPop,PhoneCode,ImgVCode},
    data(){
      return{
        ShowUpdateDrawing:false,
        verifyCode:'verifyCode',
        mobile:this.$store.getters.userInfo.phoneNumber,
        code_img:'',
        draw_code_phone:'',
        pwd1:'',
        pwd2:'',
      }
    },
    methods:{
      clear(){
        this.code_img=''
        this.draw_code_phone=''
        this.pwd1=''
        this.pwd2=''
      },
      //找回密码确定按钮
      updateDrawingPass(){
        let num = /^[0-9]*$/
        if(this.pwd1 == ''){
          this.$alert('请输入新提现密码')
          return
        }
        if(this.pwd1.length!=6 || !num.test(this.pwd1)){
          this.$alert('提现密码只能是6位数字')
          return
        }
        if(this.pwd2 == ''){
          this.$alert('请重复新提现密码')
          return
        }
        this.verify()

      },
      //验证短信验证码VerifyCode
      verify(){
        let result = VerifyCode(this.draw_code_phone)
        result.then((res)=>{
          this.commit()
        })
      },
      commit(){
        let result = FindDrawing(this.pwd1,this.pwd2,this.mobile)
        result.then((res)=>{
          this.$alert('找回提现密码成功')
          this.ShowUpdateDrawing = false
          this.clear()
        })
      },
      //判断提现密码
      judge(val){
        let num = /^[0-9]*$/
        if(val.length!=6 || !num.test(val)){
          this.$alert('提现密码只能是6位数字')
          return
        }
      },
      //关闭弹窗
      close(attr){
        this[attr] = false
        this.clear()
      },
      //重新获取验证码
      getCode(){
        this.$refs.upDraw.toggleVerifyCode()
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
