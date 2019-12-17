<template>
    <div>
      <div  v-show="nameTrue==0">
        <label><span>真实姓名：</span><input type="text"  placeholder="请输入姓名" v-model="name"/></label>
        <label><span>身份证号：</span><input type="text"  placeholder="请输入身份证号码" v-model="nameCode"/></label>
        <label >
          <span>验证码：</span><input type="text"  placeholder="请输入阿拉伯数字答案" v-model.trim="codeImg" class="short"/>
          <ImgVCode ref="name"></ImgVCode>
        </label>
        <button class="btn" @click="commitRealName">提交</button>
      </div>
      <div class="idCardShow" v-show="!nameTrue==0">
        <p v-text="this.$store.getters.userInfo.nameTrueName"></p>
        <p>身份证号：{{this.$store.getters.userInfo.idCard}}</p>
        <p>姓名：{{this.$store.getters.userInfo.userName}}</p>
      </div>
    </div>
</template>

<script>
  import setPop from '../../../components/pop/setPop'
  import ImgVCode from '../../../components/code/ImgVCode'
  import {RealName} from '../../../assets/js/personCenterApi/personCenter'

    export default {
      name: "nickName",
      components:{setPop,ImgVCode},
      props:['nameTrue'],
      data(){
        return{
          showRealName:false,//显示昵称弹窗
          name:'',
          nameCode:'',
          codeImg:''
        }
      },
      methods:{
        clear(){
          this.name=''
          this.nameCode=''
          this.codeImg=''
        },
        //关闭弹窗
        close(attr){
          this[attr] = false
        },
        //提交实名
        commitRealName(){
          let han = /^[\u4e00-\u9fa5]+$/;
          if(this.name == ''){
            this.$alert('请输入姓名')
            return
          }
          if(!han.test(this.name)){
            this.$alert('姓名只能是汉字')
            return
          }
          if(this.name.length<2||this.name.length>12){
            this.$alert('真实姓名必须是2-12位的中文字符组成')
            return
          }
          if(this.nameCode == ''){
            this.$alert('请输入身份证号码')
            return;
          }if(this.codeImg == ''){
            this.$alert('请输入阿拉伯数字答案')
            return;
          }
          let result= RealName(this.nameCode,this.name,this.codeImg)
          result.then((res)=>{
            this.showRealName = false
            this.$alert('您的实名信息已通过认证！')
            this.$emit('realNameClick')
          }).catch((err)=>{
            this.$refs.name.toggleVerifyCode()
          })
        },
      }
    }
</script>

<style rel="stylesheet/less" lang="less"  scoped>
  .img{right:162px!important;}
  input.short{width:278px!important;}
</style>
