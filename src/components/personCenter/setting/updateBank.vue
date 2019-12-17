<template>
    <div>
      <setPop :isShow="ShowUpdateBank" @closePop="close('ShowUpdateBank')" @setData="setUpdateBank" :abled="abled">
        <h3 slot="tit">修改银行卡</h3>
        <label ><input type="text"  placeholder="请输入11位手机号" v-model="mobile"  disabled="disabled"></label>
        <label>
          <select v-model="updateCard" class="select" >
            <option value=""  label=""  key="">选择要修改的银行卡</option>
            <option  :value="bankId" v-text="bankName+bankCard"></option>
          </select>
         <!-- <select v-model="updateCard" >
            <option value=""  label=""  key="">选择要修改的银行卡</option>
            <option v-for="(item,index) in bankList" :key="index" :value="item.id" v-text="item.bankName+item.bankCard"></option>
          </select>-->
        </label>
        <label class="shortInp">
          <div class="vertify-short"><el-input  class=" short" v-model.trim="bank_code_img" type="number" placeholder="请输入阿拉伯数字答案" ></el-input></div>
          <ImgVCode ref="upBank"></ImgVCode>
        </label>
        <label class="shortInp" >
          <div class="vertify-short"><el-input type="number"  v-model.trim="bank_code_phone" placeholder="请输入手机验证码" ></el-input></div>
          <PhoneCode :callIndex="verifyCode" :code_img="bank_code_img" ></PhoneCode>
        </label>
        <label ><Bank ref="bank" @choose="changeBankUpdate"></Bank></label>
        <label ><City ref="city" @selectChange="changeCity"></City></label>
        <label >
          <div class="el-input border">
            <input class="el-input__inner" v-model.trim="upbankname" @blur="jiaoYan" type="text" placeholder="开户支行" autocomplete="off">
          </div>
        </label>
        <label >
          <div class="vertify-short"><el-input  class=" short" v-model.trim="newCardNo" type="number" placeholder="请输入新银行卡号" ></el-input></div>
        </label>
        <label >
          <div class="vertify-short"><el-input  class=" short" v-model.trim="newCardNo2" type="number" placeholder="请重复银行卡号" ></el-input></div>
        </label>
        <label >
          <div class="vertify-short"><el-input v-model.trim="bankMobile" type="number" placeholder="银行预留11位手机号" @blur="checkNum(bankMobile)"></el-input></div>
        </label>
      </setPop>
    </div>
</template>

<script>
  import setPop from '../../../components/pop/setPop'
  import ImgVCode from '../../../components/code/ImgVCode'
  import Bank from '../../../components/personCenter/bank'
  import City from '../../../components/city'
  import PhoneCode from '../../../components/code/phoneCode'
  import {UpdateBank} from '../../../assets/js/personCenterApi/personCenter'
  import {GetBankList} from '../../../assets/js/personCenterApi/personCenter'
  import {VerifyCode} from '../../../assets/js/globalApi/global'
    export default {
      name: "updateBank",
      components:{setPop,Bank,City,ImgVCode,PhoneCode},
      props:['bankList','bankId','bankName','bankCard'],
      data(){
        return{
          mobile:this.$store.getters.userInfo.phoneNumber,
          bankMobile:'',
          ShowUpdateBank:false,
          bank_code_img:'',
          bank_code_phone:'',
          upbankname:'',
          newCardNo:'',
          newCardNo2:'',
          updateCard:'',//要修改的那张银行卡对应的对象
          newCard:null,//新银行卡对应的对象
          verifyCode:'verifyCode',
          abled:false,
        }
      },
      methods:{
        clear(){
          this.updateCard=''
          this.bank_code_img = ''
          this.bank_code_phone = ''
          this.newCard = null
          this.$refs.city.province= ''
          this.$refs.city.city = ''
          this.$refs.bank.selectBank = null
          this.upbankname = ''
          this.newCardNo = ''
          this.newCardNo2 = ''
          this.bankMobile = ''
        },
        checkNum(num){
          if(num.length!=11||num.substring(0,1)!=1){
            this.$alert('手机号码格式不正确','消息提示')
            return
          }
        },
        jiaoYan(){
          let han = /^[\u4e00-\u9fa5]+$/;
          if(!han.test(this.upbankname)||this.upbankname.length>20){
            this.$alert('支行信息请输入20字以内的中文字符！')
            return
          }
        },
        //关闭弹窗
        close(attr){
          this[attr] = false
          this.clear()
        },
        //验证短信验证码VerifyCode
        verify(){
          let that=this
          that.abled=true
          let result = VerifyCode(that.bank_code_phone)
          result.then((res)=>{
            that.abled=false
            this.commit()
          }).catch(err=>{
            that.abled=false
          })
        },
        //changeBank选择新的银行卡
        changeBankUpdate(value){
          this.newCard = value
        },
        //绑定省市
        changeCity(val1,val2){
          this.province = val1
          this.city = val2
        },
        //修改银行卡的‘确定’
        setUpdateBank(){
          let han = /^[\u4e00-\u9fa5]+$/;
          if(this.mobile==''){
            this.$alert('请输入手机号')
            return
          }
          if(this.updateCard == ''){
            this.$alert('请选择要修改的银行卡')
            return
          }
          if(this.bank_code_img == ''){
            this.$alert('请输入阿拉伯数字答案')
            return
          }
          if(this.bank_code_phone == ''){
            this.$alert('请输入短信验证码')
            return
          }
          if(this.newCard == null){
            this.$alert('请选择修改后的银行卡')
            return
          }
          if(this.province== ''){
            this.$alert('请选择省')
            return
          }
          if(this.city == ''){
            this.$alert('请选择市')
            return
          }
          if(this.upbankname == ''){
            this.$alert('请输入分行')
            return
          }
          if(!han.test(this.upbankname)||this.upbankname.length>20){
            this.$alert('支行信息请输入20字以内的中文字符！')
            return
          }
          if(this.newCardNo == ''){
            this.$alert('请输入新银行卡号')
            return
          }
          if(this.newCardNo2 == ''){
            this.$alert('请重复新银行卡号')
            return
          }
          if(this.newCardNo2 != this.newCardNo){
            this.$alert('两次绑定卡号不一致')
            return
          }
          if(this.bankMobile==''){
            this.$alert('请输入银行预留手机号码')
            return
          }
          this.verify()
        },
        commit(){
          let that=this
          that.abled=true
          let result= UpdateBank(that.newCard.title,that.province+','+that.city,that.upbankname,that.newCardNo,that.bankMobile)
          result.then((res)=>{
            that.$alert('修改银行卡成功！').then(()=>{
              this.$emit('updateBank')
              that.ShowUpdateBank = false
              that.clear()
              that.abled=false
            })
          }).catch(err=>{
            that.abled=false
          })
        },
        //重新获取验证码
        getCode(){
          this.$refs.upBank.toggleVerifyCode()
        }
      },
    }
</script>

<style rel="stylesheet/less" lang="less"  scoped>
  .code{width:136px;
  img{width:136px}
  }
</style>
