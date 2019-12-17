<template>
    <div class="phoneCode">
      <button  @click="forgetCode" class="login_code" v-show="showGet">获取验证码</button>
      <button  class="login_code" v-text="'过'+time+'秒后重试'" v-show="reget"></button>
    </div>
</template>

<script>
  import {MobilePhoneCode} from '../../assets/js/personCenterApi/personCenter'
    export default {
      props: [ 'code_img'],
      data() {
        return {
          reget: false,//显示倒计时
          time: 60,
          showGet: true,//显示验证码
        }
      },
      methods: {
        //修改绑定手机发送验证码
        forgetCode() {
          if (this.code_img === '') {
            this.$alert('请输入请输入阿拉伯数字答案')
            return
          }
          let result = MobilePhoneCode(this.code_img)
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
        if (this.time < 0) {
          clearInterval(this.timer)
          this.reget = false//显示倒计时
          this.showGet = true//显示验证码
        }

      }
    }

</script>

<style scoped>
  .phoneCode{position: absolute;right:-130px;top:0}
.login_code {
  display: inline-block;
  cursor: pointer;
  color: #fff;
  line-height: 42px;
  width: 105px;
  height: 42px;
  border: 0;
  font-size: 14px;
  text-align: center;
  background-color: #566B96;
}
</style>
