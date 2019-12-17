<template>
    <div v-cloak>
      <div class="person-info clearfix">
        <div>
          <img src="../../../static/img/personCenter/mrt.jpg">
        </div>
        <div class="middle-wrap">
          <span class="user-name" >您好！{{this.$store.getters.userInfo.userName}}</span>
          <p  class="user-name" style="font-size: 14px;margin-top:45px">{{this.$store.getters.userInfo.phoneNumber}}</p>
          <div class="yanzheng">安全验证：<span class="icon_sjyz"></span><span class="icon_yhyz"></span><span class="icon_mmyz"></span></div>
          <div><router-link to="/personCenter/recharge" class="button button1">充值</router-link><a  @click="drawingBtn" class="button">提现</a></div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "personCenterHeader",
      //props:['info'],
      methods:{
        drawingBtn(){
          if(this.$store.getters.bankList.length==0){
            this.$alert('请先绑定银行卡')
          }else{
            this.$router.push('/personCenter/drawing')
          }
        }
      }
    }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  [v-cloak]{display: none}
  .person-info {position: relative;height: 100px;margin-bottom: 0px;color: #fff;background-color: #fff;
    img {border-radius: 50%;width: 70px;height: 70px;position: absolute;margin: 20px 40px;border: 2px solid #fff; }
    .middle-wrap {width: 810px;height: 65px;position: absolute;margin-top: 20px;margin-left: 130px;font-size: 0;
      span {bottom: 30px;line-height: 20px;}
      .user-name {position: absolute;color: #000;font-size: 20px;}
     /* .account-num {position: absolute;top: 70%;left: 0;color: #555;}*/
       .yanzheng {position: absolute;left: 150px;bottom: 0px;font-size: 14px;color: #555;line-height: 25px;
        span {vertical-align: middle;display: inline-block;width: 20px;height: 20px;    margin-left: 20px;}
      }
    }
    .icon_sjyz {background: url(../../../static/img/personCenter/sjyz.png)no-repeat center;background-size: auto 100%;margin:0!important;}
    .icon_yhyz {background: url(../../../static/img/personCenter/yhyz.png)no-repeat center;background-size: auto 100%;}
    .icon_mmyz {background: url(../../../static/img/personCenter/mmyz.png)no-repeat center;background-size: auto 100%;}
    .button {width: 107px;height: 44px;text-align: center;line-height: 44px;cursor: pointer;font-size: 20px;position: absolute;right: 0;
      color: #fff;margin-top: 10px;border-radius: 5px;margin-right: 0px;background-color: #3092f6;
    }
    .button.button1 {color: #fff;background-color: #fa7e41;margin-right: 120px;}
  }
</style>
