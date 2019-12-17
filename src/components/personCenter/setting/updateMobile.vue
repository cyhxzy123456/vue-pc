<template>
    <div>
      <setPop :isShow="ShowNewMobile" @closePop="close('ShowNewMobile')" @setData="updateMobile">
        <h3 slot="tit">修改绑定手机号</h3>
        <p style="font-size: 14px;padding-bottom: 20px">原手机号码{{phoneMobile}}</p>
        <label><input type="text"  v-model="newMobile"  placeholder="11位手机号"/></label>
        <label class="shortInp">
          <input type="text"  placeholder="请输入阿拉伯数字答案" v-model.trim="code_img" class="short"/>
          <ImgVCode ref="upLogin"></ImgVCode>
        </label>
        <label class="shortInp">
          <input type="text"  placeholder="手机验证码" v-model="code_phone" class="short" autocomplete="off" />
          <UpdatePhoneCode  :code_img="code_img" ></UpdatePhoneCode>
        </label>
      </setPop>
    </div>
</template>

<script>
  import setPop from '../../../components/pop/setPop'
  import UpdatePhoneCode from '../../../components/code/updateMobilephoneCode'
  import ImgVCode from '../../../components/code/ImgVCode'
  import {UpdateMobile} from '../../../assets/js/personCenterApi/personCenter'
    export default {
      components:{setPop,UpdatePhoneCode,ImgVCode},
      data(){
        return{
          ShowNewMobile:false,//显示修改登录密码弹窗
          phoneMobile:this.$store.getters.userInfo.phoneNumber,
          newMobile:'',
          code_img:'',
          code_phone:'',
        }
      },
      methods:{
        //重新获取验证码
        getCode(){
          this.$refs.upLogin.toggleVerifyCode()
        },
        //关闭弹窗
        close(attr){
          this[attr] = false
        },
        //修改登录密码的‘确定’code_phone
        updateMobile(){
          if(this.newMobile==''){
            this.$alert('请输入新手机号')
            return
          }
          if(this.code_img === ''){
            this.$alert('请输入阿拉伯数字答案')
            return
          }
          if(this.code_phone === ''){
            this.$alert('请输入短信验证码')
            return
          }
          let result = UpdateMobile(this.newMobile,this.code_phone,this.code_img)
          result.then((res)=>{
            this.$alert('修改手机成功')
            this.ShowNewMobile = false
            this.$emit('updateMobileClick')
          })
        },
      }
    }
</script>

<style rel="stylesheet/less" lang="less"  scoped>

  .code{width:136px;
    img{width:136px}
  }
</style>
