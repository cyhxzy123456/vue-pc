<template>
  <div class="phoneCode">
    <button  @click="forgetCode" class="login_code" v-show="showGet">获取验证码</button>
    <button  class="login_code" v-text="'过'+time+'秒后重试'" v-show="reget"></button>
  </div>
</template>

<script>
  import {getRegCode} from '../../assets/js/globalApi/global'
  export default {
    name: "regPhoneCode",
    props: ['callIndex', 'code_img','mobile','phoneValidate'],
    data() {
      return {
        reget: false,//显示倒计时
        time: 60,
        showGet: true,//显示验证码
      }
    },
    methods: {
      //登录前的获取验证码
      forgetCode() {
        if(this.mobile.length<11||this.mobile.substring(0,1)!=1){
          this.$alert('手机号码格式不正确','消息提示')
          return
        }
        if (this.code_img === '') {
          this.$alert('请输入阿拉伯数字答案')
          return
        }
        let result = getRegCode(this.mobile,this.code_img,this.callIndex,this.phoneValidate)
        result.then((res) => {
          this.$alert('验证码发送成功！')
          this.repeat()
        })
      },
      repeat() {
        const self = this
        if (self.time > 0) {
          self.timer = setInterval(function () {
            self.time--
          }.bind(this), 1000)
          self.showGet = false//显示验证码
          self.reget = true//显示倒计时
        }
      }
    },
    updated() {
      if (this.time <=0) {
        clearInterval(this.timer)
        this.reget = false//显示倒计时
        this.showGet = true//显示验证码
        this.time=60
      }

    }
  }

</script>

<style scoped>
  .phoneCode{position: absolute;right:-130px;top:0}
  .login_code {background: #fa7e41;width: 124px;vertical-align: text-bottom;font-size: 16px;
    line-height: 38px;text-align: center;color:#fff;
  }
</style>
