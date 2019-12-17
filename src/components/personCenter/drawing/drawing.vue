<template>
    <div class="drawing">
      <div class="contRight">
        <div class="top">
          <div class="list"><span >提现金额：</span>
            <input type="number" v-model.trim="cashMoney" @keyup="realMoney">
            <span>元</span>
          </div>
          <p class="draw-info">提现金额：提现金额必须大于{{cashMin}}元,小于{{cashMax}}元！</p>
          <p class="draw-info">提现时间：交易日{{cashInfo.limitStartTime}}-{{cashInfo.limitEndTime}}，当日结算，具体到账时间以银行为准！</p>
          <div class="list"><span >到账金额：</span>
            <input type="number" v-model.trim="real" disabled="true">
            <span>元</span>
          </div>
          <p class="draw-info">到账金额：单笔提现手续费率为{{cashFee*100}}%，单笔最低收费{{cashFeeMin}}元！</p>
          <div class="list">
            <span>提现卡号：</span>
            <select v-model="chooseName">
              <option value="">请选择银行卡</option>
              <option v-for="(item,index) in bankList" :key="index"  :value="item.bankName" v-text="item.bankName+item.bankCard"></option>
            </select>
            <router-link to="/personCenter/setting" v-show="bankList == null">立即绑定</router-link>
          </div>
          <div class="list">
            <span>提现密码：</span>
            <input type="password"  style="display: none">
            <input type="password" v-model="cashPass" onautocomplete="off">
            <span class="forget" @click="showPop" v-text="this.$store.getters.userInfo.pwdTransStatus==0?'设置提现密码':'忘记提现密码'">忘记提现密码</span></div>
          <p class="recharge_btn">
            <button class="btn" @click="drawCommit"  :disabled="abled">提交</button>
          </p>
        </div>
        <div class="recharge_tips">
          <h1 style="    text-align: center;color: #ff2626;">温馨提示</h1>
          <div class="drawing_explain">
            <p style="padding:10px;line-height: 23px;" v-html="cashInfo.expound"></p>
            <label></label>
          </div>
          <div></div>
        </div>
      </div>
      <forgetPass ref="forget"></forgetPass>
    </div>
</template>

<script>
  import setPop from '../../../components/pop/setPop'
  import ImgVCode from '../../../components/code/ImgVCode'
  import {CommitDraw} from '../../../assets/js/personCenterApi/personCenter'//提现提交
  import {GetDrawInfo} from '../../../assets/js/globalApi/global'
  import RealNamePop from '../../../components/pop/realNamePop'
  import PhoneCode from '../../../components/code/phoneCode'
  import forgetPass from '../../../components/personCenter/setting/forgetTradePwd'
  export default {
    name: "drawing",
    components:{setPop,ImgVCode,RealNamePop,PhoneCode,forgetPass},
    layout:'left',
    data(){
      return{
        info:{},
        userMoney:[],
        moneyTotal:'',
        chargeNavList:[{name:'我要提现',type:1},{name:'提现记录',type:2}],
        typeNow:1,//
        isName:this.$store.getters.userInfo.nameTrue,
        bankList:this.$store.getters.bankList,
        drawingTip:'',
        chooseName:'',//提现到账银行卡名称
        cashMoney:'',//提现金额
        cashPass:'',//提现密码
        remark:'',
        abled:false,
        drawTxt:'',
        cashInfo:'',
        cashMin:'',
        cashMax:'',
        cashFee:'',
        cashFeeMin:'',
        real:''//到账金额
      }
    },
    methods:{
      realMoney(){
        if(this.cashMoney>=this.cashMin&&this.cashMoney<=this.cashMax){
          if(this.cashMoney*this.cashFee<this.cashFeeMin){
            this.real=this.cashMoney-this.cashFeeMin
          }else{
            this.real=this.cashMoney-this.cashMoney*this.cashFee
          }
          if(this.real<0){
            this.real=0
          }
        }else{
          this.real=0
        }
      },
      //提现信息
      getDrawInfo(){
        let result = GetDrawInfo()
        result.then((res)=>{
          this.cashInfo=res
          this.cashMin=res.cashMin
          this.cashMax=res.cashMax
          this.cashFee=res.cashFee
          this.cashFeeMin=res.cashFeeMin
        })
      },
      close(attr){
        this[attr] = false
      },
      showPop(){
        if(this.$store.getters.userInfo.pwdTransStatus==0){
          this.$router.push('/personCenter/setting')
        }else{
          this.$refs.forget.ShowUpdateDrawing = true
          this.$refs.forget.clear()
        }
      },
      changeType(type){
        this.typeNow = type
        if( this.typeNow ==2){
          this.drawingList()
        }
      },
      //提交提现
      drawCommit(){
        let that = this
        if(that.cashMoney == ''){
          that.$alert('请输入提现金额')
          return
        }
        if(that.cashMoney <this.cashMin){
          that.$alert('至少输入'+this.cashMin+'元')
          return
        }
        if(that.cashMoney >this.cashMax){
          that.$alert('最多输入'+this.cashMax+'元')
          return
        }
        if(that.cashMoney%10 != 0){
          that.$alert('提现金额只能是10的整数倍')
          return
        }
        if(that.chooseName == ''){
          that.$alert('请选择银行卡')
          return
        }
        if(that.cashPass== ''){
          that.$alert('请输入提现密码')
          return
        }
        that.abled=true
        let result = CommitDraw(that.cashMoney,that.chooseName,that.cashPass)
        result.then((res)=>{
          that.$alert('提现申请成功，我们会尽快审核处理！')
          that.cashMoney = ''
          that.chooseName = ''
          that.cashPass= ''
          that.real= ''
          that.$emit('list')
          that.abled=false
        }).catch((err)=>{
          that.abled=false
        })

      },
    },
    mounted() {
      this.getDrawInfo()
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .code{width:136px;display: inline-block;
    img{width:136px}
  }
  .navLeft{background: #f3f3f3;width:175px;height:868px;
    li{line-height: 80px;font-size: 14px;color:#666;font-weight: bold;text-align:right}
    li:first-child{padding-top:118px}
    li:nth-child(2){padding:33px 0 10px}
  }
  .contRight{
    input,select{padding: 0 10px;width: 300px;height: 40px;line-height: 40px;border-radius: 4px;border: 1px solid #DDD;color: #555;}
    .top{padding-left:154px;
      .recharge2_p1 {font-size: 14px;line-height: 30px;padding-bottom: 15px;border-bottom: 1px dashed #b6b5bb;color: #b6b5bb;}
      .easy_style42 {color: #fd3134;font-size: 18px;font-weight: bold}
      .recharge2_p2 {margin: 25px 0 40px;font-size: 13px;line-height: 18px;font-weight: 600;}
      .draw-info {    margin-bottom: 10px;font-size: 14px;color: #999;background: url('../../../../static/img/personCenter/jinggao.png') no-repeat left center;padding-left:20px;line-height: 30px}
      .list{padding:0 0 15px;
        .forget{color: #566B96;font-size: 14px;padding-left:5px;cursor: pointer}
        span:first-child{float:left;line-height: 40px}
      }
    }
    .bot{padding:10px;
      .recharge2_p10 {;font-size: 16px;line-height: 50px;color: #fe2725;font-weight: 600;display: flex;border-top: 1px solid #e6e6e6;padding-bottom: 10px;}
      .recharge2_last{overflow: hidden;background: #f3f3f3;border-top: 1px solid #e6e6e6;padding-bottom: 10px;}
      .recharge2_last>div {text-align: center;float:left;width:30%;color:#333}
      .recharge2_last>div:first-child {text-align: center;float:left;width:40%;color:#333}
      .recharge2_last>div>h6 {font-size: 14px;line-height: 14px;color: #fe2725;margin: 12px 0;}
      .recharge2_last>div>p {font-size: 12px;line-height: 20px;}
      .recharge2_last>div>p>span {color: #fe2725;font-weight: 600;}
      .recharge2_p11 {font-size: 12px;line-height: 30px;}
    }
    .recharge_btn{text-align: center;padding-left:98px}
    .btn-red{background: #FF2626;width: 220px;height: 58px;line-height: 58px;font-weight: 700;padding-left: 0;padding-right: 0;font-size: 16px;color: #FFF;text-align: center;display: inline-block;cursor: pointer;border: 0;}
    .easy_style32 {text-align: right!important;width: 235px!important;}
    .recharge_tips {margin-top: 30px;font-size: 14px;border-top: 1px dashed #DDD;padding-top: 20px;color: #999;line-height: 22px;
      h1 {font-weight: 700;text-align: center;color: #ff2626;font-size: 14px!important;padding:0!important;}
      .drawing_explain{background: #F3F3F3;border-top: 1px solid #DDD;margin-top: 20px;margin-bottom: 5px;height: 128px;
        ul {float: left;width: 380px;
          li {line-height: 22px;text-align: center;
            h1 {margin-top: 12px;font-size: 14px;padding-bottom: 10px;color: #666;}
          }
        }
      }
    }
  }

</style>
