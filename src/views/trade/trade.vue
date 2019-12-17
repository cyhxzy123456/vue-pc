<template>
  <div class="content_main ">
    <div class="trade">
      <div class="inner-page-nav-wrap wrap">
        <div class="tradeNav">
          <div class="fl">
            <ul>
              <router-link to="/myTrade/myTrade" tag="li">我的策略</router-link>
              <li v-for="(item,index) in tradeNav"  :key="index" @click="chooseType(item.productType,item.remark,item.productName,index,item.priceList)" :class="{active:nowType==item.productType}">
                <a>{{item.productName}}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="wrap">
        <div class="trade-content">
          <div class="trade-content-wrap clearfix">
            <div class="day-month" v-show="nowType!=31">
              <div class="select-btn-label" style="margin:0 ;padding-bottom: 15px; border-bottom: 1px dashed #666;margin-bottom: 20px">申请{{nowName}}受托额</div>
              <div class="trade-form clearfix">
                <div class="select-btn-group-wrap">
                  <button  v-for="(item,index) in moneyList" :key="index" :class="{active:nowMoney==Number(item)}"  @click="chooseMoney(Number(item))">{{Number(item/10000)}}万</button>
                  <input  :maxLength="String(moneyMax).length" type="text" v-model="money" @keyup="compute" placeholder="手动输入金额，千元的整数倍" class="other" @blur="checkMoney">
                  <p style="font-size: 14px;padding-top:10px">备注：{{moneyMin}}元-{{moneyMax/10000}}万（手动输入金额，千元的整数倍）</p>
                </div>
                <div class="select-btn-label">策略风险保证金</div>
                <ul class="select-btn-group-wrap last-child" v-show="showTimes">
                  <li @click="chooseTimes(item.moneyTimes,item.rateWarn,item.rateOpenLine,item.moneyRate,item.id,item.rateDivide,item.dateMin,item.productId,item.moneyMax,item.moneyMin, index)" v-for="(item,index) in productDetail" :key="index" class="tehui-btn select-btn " :class="{active:nowTimes==item.moneyTimes}">
                    <p class="money-pay">{{Math.ceil(Number(nowMoney)/item.moneyTimes/100)*100}}</p>
                  </li>
                </ul>
                <div class="border">
                  <p>策略风险保证金：<span>{{Math.ceil(nowMoney/nowTimes/100)*100}}元</span></p>
                  <p  v-show="nowType!=13">资产委托人固定收益：<span> <i v-text="nowType==11?fee/2:fee"></i>元/<i v-text="nowType==12?'自然月':'交易日'"></i></span></p>
                  <p v-show="nowType==13">资产委托人固定收益：买入当天免收费用；<br>
                    根据购买T+1日8:00市值收取持仓展期费用：市值*{{this.moneyRate}}/交易日  ；</p>
                  <p>策略应付金额：<span>{{pay}}元</span><small v-show="nowType!=13">（策略风险保证金 +资产委托人固定收益）</small></p>
                  <p>策略建议人余额：<span>{{moneyUse}}</span>元</p>
                </div>
              </div>
              <div class="JS-result trade-result">
                <div class="border">
                  <div class="tit" >策略期限：{{minDay}}个<i v-text="nowType==12?'自然月':'交易日'"></i></div>
                  <p v-show="nowType!=15">约定的策略期限届满前一个交易日策略建议人提交所有策略卖出建议，委托期限届满交易日后，本策略自动终止，如果策略建议人未提交所有策略卖出建议，默认<i v-show="nowType==11">按天</i>自动展期。</p>
                  <p v-show="nowType==15">策略约定可用{{minDay}}个交易日，到期当日系统冻结买入权限，如果策略建议人未提交所有策略卖出建议，系统将在到期当日14:30自动卖出建议。</p>
                </div>
                <div class="border last">
                  <div class="tit">
                    <p>风险预警线：策略总资产不能低于<span>{{rateWarn}}</span>元</p>
                    <p>风险平仓线：策略总资产不能低于<span>{{rateOpenLine}}</span>元</p>
                  </div>
                  <p v-html="remark">
                  </p>
                </div>
              </div>
            </div>

            <div class="wei" v-show="nowType==31">
              <div class="list fl">
                <p class="tip">策略规则</p>
                <div class="box">
                  <div class="hang">
                    <h3>微策略规则：</h3>
                    <p>策略建议人为资产委托人提供证券投资策略建议，资产委托人享有策略建议人证券投资策略额的固定收益。策略建议人证券投资策略额的盈利均由策略建议人享有，亏损均由策略建议人承担。</p>
                  </div>
                  <div class="hang">
                    <h3>资产委托人固定收益：</h3>
                    <p v-html="remark0"></p>
                  </div>
                  <div class="hang">
                    <h3>策略期限：</h3>
                    <p>每支股票策略期限最低2个交易日，自动展期。</p>
                  </div>
                </div>
              </div>
              <div class="list fr">
                <p class="tip">策略风控条约</p>
                <div class="box">
                  <div class="hang">
                    <p v-html="remark2">证券投资策略建议不得有停牌的股票。</p>
                  </div>
                </div>
              </div>
              <div class="list fl">
                <p class="tip">策略资金</p>
                <div class="box">
                  <div class="hang">
                    <h3>最大策略受托额：{{max}}元</h3>
                  </div>
                  <div class="hang">
                    <h3>策略建议风险保证金</h3>
                    <p v-html="remark1">策略建议人每次证券投资策略建议支付的风险保证金为本次策略额的{{1/times}}%</p>
                  </div>
                  <div class="hang">
                    <h3 class="font-bold">策略建议人余额：<span class="color-red">{{moneyUse}}</span>元</h3>
                  </div>
                </div>
              </div>
              <div class="list fr">
                <p class="tip">策略建议结算规则</p>
                <div class="box">
                  <div class="hang" >
                    <p v-html="remark3"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-submit-btn">
            <div v-show="nowType!=31">
              <p v-show="nowType==11"><input type="checkbox" class="check"  v-model="check"/><span class="tips" >我已阅读并理解</span>
                <a @click="protocol('agreement_day')" >《短期策略委托投资协议》同意申请策略后签署该协议</a>
              </p>
              <p v-show="nowType==12"><input type="checkbox" class="check"  v-model="check"/><span class="tips" >我已阅读并理解</span>
                <a @click="protocol('agreement_month')" >《长期策略委托投资协议》同意申请策略后签署该协议</a>
              </p>
              <p v-show="nowType==13"><input type="checkbox" class="check"  v-model="check"/><span class="tips" >我已阅读并理解</span>
                <a @click="protocol('agreement_SciTech')" >《科创板委托投资协议》同意申请策略后签署该协议</a>
              </p>
              <p v-show="nowType==15"><input type="checkbox" class="check"  v-model="check"/><span class="tips" >我已阅读并理解</span>
                <a @click="protocol('agreement_Reciprocity')" >《互惠策略委托投资协议》同意申请策略后签署该协议</a>
              </p>
              <button  class="btn-standard btn-blue" :disabled="abled" @click="subProduct">立即申请</button>
            </div>
            <div v-show="nowType==31">
              <p v-show="list.length==0" style="margin-top:40px"><input type="checkbox" class="check"  v-model="check"/><span class="tips" >我已阅读并理解</span>
                <a @click="protocol('agreement_Microstrategy')" >《微策略委托投资协议》同意申请策略后签署该协议</a>
              </p>
              <button  v-show="list.length==0" class="btn-standard btn-blue" :disabled="abled" @click="subProduct">立即申请</button>
              <router-link v-show="list.length!=0" :to="{path:'/myTrade/myTrade',query:{type:31}}" tag="button"  class="btn-standard btn-blue" :disabled="abled" >策略建议发起</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ReviewNamePop ></ReviewNamePop>
    <ProtocolPop :content="content" :isShow="showProtocol" @click="close('showProtocol')"></ProtocolPop>
  </div>
</template>

<script>
  import {ProductType} from '../../assets/js/trade/trade'
  import {ProductDetail} from '../../assets/js/trade/trade'
  import {CommitProduct} from '../../assets/js/trade/trade'
  import {getProtocol} from '../../assets/js/globalApi/global'
  import {ProductList} from '../../assets/js/myTrade/myTrade'
  import {GetUserInfo} from '../../assets/js/personCenterApi/personCenter'
  import ProtocolPop from '../../components/pop/protocolPop'
  import ReviewNamePop from '../../components/pop/reviewNamePop'
  import RealNamePop from '../../components/pop/realNamePop'
  export default {
    name: "trade",
    components:{ReviewNamePop,RealNamePop,ProtocolPop},
    data () {
      return {
        typeQuery:this.$route.query.type,
        tradeNav:[],
        money:'',//输入的本金
        showOther:true,
        showTimes:true,
        nowType:'',
        nowName:'',
        nowTimes:'',//倍数
        moneyList:[],//存本金列表
        /*{text:'1万',money:10000}, {text:'3万',money:30000}, {text:'5万',money:50000}, {text:'8万',money:80000}, {text:'10万',money:100000},
        {text:'20万',money:200000}, {text:'30万',money:300000}, {text:'50万',money:500000},*/
        nowMoney:'',//当前选择的本金
        productDetail:[],//详情列表
        productDetailList:[],//详情列表
        product:'',
        totalMoney:0,//总操盘资金	  元（申请资金 + 投资本金）
        rateWarn:0,//警戒线
        rateWarnRate:0,//警戒线率
        rateOpenLine:0,//平仓线、止损线
        rateOpenLineRate:0,//平仓线、止损线率
        moneyRate:0,
        moneyPay:0,//共计应支付
        nowId:'',//选中倍数的id
        profitDistribution:0,//利润分配
        minDay:0,//借款最小天数
        moneyUse:'--',
        showProtocol:false,//显示协议
        content:{},
        abled:false,
        accountId:0,
        userId:this.$store.getters.userInfo.id,
        productId:'',
        moneyMin:'',
        moneyMax:'',
        check:false,
        remark:'',
        max:'--',//mom最大策略受托额,
        times:'',//mom倍数
        list:[],//微策略列表
        statusShow:'22,24,25',
        remark0:'',
        remark1:'',
        remark2:'',
        remark3:'',
        selectIndex:0,
        selectTypeIndex:0,
        contractStatus:''
      }
    },
    computed:{
      fee:function(){
        if(this.nowType==13){
          return 0
          /* return '市值*'++'/交易日'*/
        }else if(this.nowType==11){
          return parseFloat(Number(this.nowMoney)*this.moneyRate*2).toFixed(2)
        }else{
          return parseFloat(Number(this.nowMoney)*this.moneyRate).toFixed(2)
        }
      },
      bao:function(){
        return Math.ceil(Number(this.nowMoney)/this.nowTimes/100)*100
      },
      pay:function(){
        if(this.nowType==13){
          return Number(this.bao)
        }else{
          return Number(this.bao)+Number(this.fee)
        }
      }
    },
    methods:{
      getInfo(){
        let result = GetUserInfo()
        result.then((res)=>{
          this.contractStatus=res.contractStatus
        })
      },
      //获取列表
      getList(){
        let that=this
        let result = ProductList(10,1,that.statusShow,31)
        result.then((res)=>{
          this.list=res.Data.Data

        })
      },
      //关闭弹窗
      close(attr){
        this[attr] = false
      },
      //输入金额时计算费用
      compute(){
        this.money=this.money.replace(/[^\.\d]/g,'');
        this.money=this.money.replace('.','');
        if(this.money!=''&&this.money<this.moneyMin||this.money>this.moneyMax||this.money%1000!=0){
          this.showTimes=false
          this.rateWarn=0
          this.nowMoney=0
          this.rateOpenLine=0
          this.totalMoney=0
          this.fee=0
          this.moneyPay=0
          return;
        }else{
          this.showTimes=true
          if(this.money==''){
            this.nowMoney=10000
          }else{
            this.nowMoney=this.money;
          }
          this.getDetail()
        }

      },
      //选择本金计算
      chooseMoney(val){
        let that=this
        that.showTimes=true
        that.productDetail=that.productDetail
        that.showOther=false
        that.money=''
        that.nowMoney=val
        this.changeData()
      },
      //选择倍数计算
      chooseTimes(moneyTimes,rateWarn,rateOpenLine,moneyRate,id,rateDivide,dateMin,productId,moneyMax,moneyMin,index){
        this.selectIndex=index
        this.moneyRate=moneyRate
        this.moneyMax=moneyMax
        this.moneyMin=moneyMin
        this.productId=productId
        this.nowTimes=moneyTimes
        this.nowId=id
        this.profitDistribution=rateDivide
        this.minDay=dateMin
        this.moneyRate=moneyRate
        this.rateWarnRate=rateWarn
        this.rateOpenLineRate=rateOpenLine
        this.changeData()
      },
      //输入框检测
      checkMoney(){
        if(this.money == ''){
          this.moneyList=this.tradeNav[this.selectTypeIndex].priceList.split(',')
          this.nowMoney=this.moneyList[0]
          return;
        }
        if(this.money%1000 !==0){
          this.$alert('受托额限定为1000的正整数倍数值')
          return
        }
        if(this.money < this.moneyMin){
          this.money=this.moneyMin
          this.nowMoney=this.moneyMin
          this.getDetail()
          this.showTimes=true
          return
        }
        if(this.money > this.moneyMax){
          this.$alert('最多输入'+parseInt(this.moneyMax/10000)+'万')
          return
        }
      },
      //选择类型同时请求产品信息
      chooseType(type,remark,name,index,list){
        this.typeQuery=type
        this.nowType = type
        this.moneyList=list.split(',')
        this.nowMoney=Number(this.moneyList[0])
        this.showTimes=true
        this.money=''
        this.selectIndex=0
        this.selectTypeIndex = index
        this.nowName=name
        this.check=false
        this.getDetail()
        if(this.nowType == 10){
          this.$router.push('/trade/free')
        }else{
          this.remark=this.tradeNav[this.selectTypeIndex].remark
          if(type==31&&remark!=null){
            this.remark=remark.split('；')
            this.remark0=this.remark[0]
            this.remark1=this.remark[1]
            this.remark2=this.remark[2]
            this.remark3=this.remark[3]
            if(this.$store.getters.token!=''){
              this.getList()
            }
          }else{
            this.remark=remark
          }
        }
      },
      //获取产品详情
      getDetail(){
        let that = this
        let result = ProductDetail(that.nowType)
        result.then((res)=>{
          that.productDetailList=res.Data
          if(that.nowType==31){
            that.nowId=res.Data.id
            that.times=res.Data.moneyTimes
            that.moneyRate=res.Data.moneyRate
            that.minDay=res.Data.dateMin
            that.nowMoney=0
            if(that.$store.getters.token!=''){
              that.moneyUse=that.$store.getters.userMoney.userBalance
              that.max=parseFloat(that.moneyUse*(1/that.times)).toFixed(2)
            }
          }else{
            that.changeData()
          }
        })
      },
      //改变数据
      changeData(){
        let that=this
        that.productDetail=[]
        for (let i = 0; i < that.productDetailList.length; i++) {
          if (that.money <= that.productDetailList[i].moneyMax) {
            that.productDetail.push(that.productDetailList[i]);
          }
        }
        that.product=that.productDetail[this.selectIndex]
        that.nowId=that.product.id
        that.nowTimes=that.product.moneyTimes
        that.minDay=that.product.dateMin
        that.moneyMin=that.product.moneyMin
        that.moneyMax=that.product.moneyMax
        that.profitDistribution=that.product.rateDivide
        that.rateWarnRate=that.product.rateWarn
        that.rateOpenLineRate=that.product.rateOpenLine
        that.moneyRate=that.product.moneyRate
        that.totalMoney=that.nowMoney+that.nowMoney/that.nowTimes
        that.rateWarn=parseFloat(Number(that.nowMoney)+Number(that.bao*that.product.rateWarn)).toFixed(2)
        that.rateOpenLine=parseFloat(Number(that.nowMoney)+Number(that.bao*that.product.rateOpenLine)).toFixed(2)
        that.moneyPay=that.nowMoney+that.fee*that.minDay
      },
      //获取产品类型
      getType(){
        let that=this
        let result = ProductType()
        result.then((res)=>{
          that.tradeNav = res.Data
          that.nowName=that.tradeNav[0].productName
          if(that.tradeNav.length==0){
            that.nowMoney=0
            that.nowTimes=1
          }else{
            this.typeQuery=this.$route.query.type
            if(this.typeQuery!=''&&this.typeQuery!=undefined){
              this.nowType=this.typeQuery
              that.getDetail()
              that.tradeNav.forEach((val)=>{
                if(this.nowType==val.productType){
                  that.moneyList=val.priceList.split(',')
                  that.nowMoney=that.moneyList[0]
                  that.nowName=val.productName
                  if(that.nowType==31&&this.remark!=null){
                    that.remark=val.remark.split('；')
                    that.remark0=that.remark[0]
                    that.remark1=that.remark[1]
                    that.remark2=that.remark[2]
                    that.remark3=that.remark[3]
                  }else{
                    that.remark=val.remark
                  }
                }
              })
            }else {
              if(that.tradeNav[0].productType==10){
                that.remark=that.tradeNav[1].remark
                that.nowType=that.tradeNav[1].productType
                that.productId=that.tradeNav[1].id
                that.moneyList=that.tradeNav[1].priceList.split(',')
                that.nowMoney=that.moneyList[0]
                //that.getDetail()
              }else{
                that.remark=that.tradeNav[0].remark
                that.nowType=that.tradeNav[0].productType
                that.productId=that.tradeNav[0].id
                that.moneyList=that.tradeNav[0].priceList.split(',')
                that.nowMoney=that.moneyList[0]
                that.getDetail()
                that.tradeNav.forEach((val)=>{
                  if(that.nowType==31&&this.remark!=null){
                    that.remark=val.remark.split('；')
                    that.remark0=that.remark[0]
                    that.remark1=that.remark[1]
                    that.remark2=that.remark[2]
                    that.remark3=that.remark[3]
                  }
                })
              }
            }
          }

        })
      },
      protocol(callIndex){
        let top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
        if(top>0){
          window.scrollTo(0,0);
        }
        let result = getProtocol(callIndex,this.accountId,this.userId,this.productId,this.moneyRate,this.nowMoney,this.bao,this.nowMoney+this.nowMoney/this.nowTimes,this.rateWarn,this.rateOpenLine,this.fee)
        result.then((res)=>{
          this.showProtocol = true
          this.content = res.Data.content
        })
      },
      //提交合约
      subProduct(){
        if(!this.check){
          this.$alert('请同意相关合约协议')
          return;
        }
        if(this.$store.getters.userInfo.nameTrue==0){
          this.$confirm('未实名认证，请前往认证','实名认证',{confirmButtonText: '立即认证', cancelButtonText: '取消'}).then(()=>{
            this.$router.push('/personCenter/setting')
          })
          return;
        }else {
          if(this.$store.getters.config.isOpenUserContract==0){
            if (this.contractStatus==0) {
              this.$confirm(' 您未签署《用户注册协议》', '协议签署', {confirmButtonText: '立即签署', cancelButtonText: '取消'}).then(() => {
                this.$router.push('/personCenter/protocol')
              })
              return;
            }
          }
          if (this.pay > this.moneyUse) {
            this.$alert('亲，您的账户余额不足，请先充值补足')
            this.$router.push('/personCenter/recharge')
            return
          } else {
            let msg
            if(this.nowType==31){
              this.nowMoney=0
              this.nowTimes=1
              msg=`微策略开户不收取费用;<br/>
                      资产委托人固定收益：<br/>
                      策略建议金额的${this.moneyRate*100}%/交易日;<br/>
                      是否确认申请该策略？为避免<br/>
                      因欠费而平仓，请确保账户余<br/>
                      额足够支付委托人收益！<br/>
                      `
            }else{
              if(this.nowType==13){
                msg=`<p>策略受托额：${this.nowMoney} </p>
                    <p>策略风险保证金：${this.bao} </p>
                    <p>策略投资额：${Number(this.nowMoney)+Number(this.bao)}</p>
                    <p >应付委托人收益：市值*${this.moneyRate}/交易日</p>
                    <p>风险预警线：${this.rateWarn}</p>
                    <p>风险平仓线：${this.rateOpenLine}</p>
                    <p> 是否确认申请该策略？为避免</p>
                    <p>因欠费而平仓，请确保账户余</p>
                    <p>额足够支付委托人收益！</p>
                     `
              }else{
                msg=`<p>策略受托额：${this.nowMoney} </p>
                    <p>策略风险保证金：${this.bao} </p>
                    <p>策略投资额：${Number(this.nowMoney)+Number(this.bao)}</p>
                    <p >应付委托人收益：${this.fee}</p>
                    <p>风险预警线：${this.rateWarn}</p>
                    <p>风险平仓线：${this.rateOpenLine}</p>
                    <p> 是否确认申请该策略？为避免</p>
                    <p>因欠费而平仓，请确保账户余</p>
                    <p>额足够支付委托人收益！</p>
                     `
              }

            }
            this.$confirm(msg , '确认申请信息', {confirmButtonText: '确定', cancelButtonText: '取消',dangerouslyUseHTMLString:true})
              .then(()=>{
                let loading = this.$loading({
                  lock: true,
                  text: '策略申请中，请稍等……',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.7)',
                });

                let result = CommitProduct(this.nowId, this.bao, this.nowMoney, this.fee, this.profitDistribution, this.minDay)
                result.then((res) => {
                  loading.close();
                  this.$msgbox(
                    {title:'消息',message:'您已成功申请'+this.nowName,showCancelButton:false,
                      confirmButtonText: '去我的策略',
                      cancelButtonText: '取消',
                      center:true
                    }).then(() => {
                    setTimeout(() => {
                      this.$router.push({path:'/myTrade/myTrade',query:{type:this.nowType}})
                    }, 1000)
                  })
                }).catch((err)=>{
                  loading.close();
                })
              })
          }
        }
      },
    },
    mounted(){
      this.getType()
      if(this.$store.getters.token!=''){
        this.getInfo()
        this.moneyUse=this.$store.getters.userMoney.userBalance
      }

    },
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .wei{overflow: hidden;font-size: 16px;
    .list{width:500px;
      .tip{line-height:54px;font-weight: bold;color:#333}
      .box{border:1px solid #ddd;padding:30px 60px 30px 30px;    height: 326px;
        .hang{margin-bottom: 30px}
        .hang:last-child{margin-bottom: 0}
        p{color:#999;line-height: 26px;}
      }
    }
    .list:nth-child(3) .box,.list:nth-child(4) .box{height: 248px}
  }
  .el-message-box__message p{text-align: center!important;}
  .trade{padding-bottom: 80px}
  .border{border:1px solid #ddd;border-radius: 5px;padding:35px 16px;
    .tit{font-size: 20px;padding-bottom: 20px;border-bottom:1px dashed #666;margin-bottom: 25px;color:#333;
      p{font-size: 20px;line-height: 36px;}
    }
    p{line-height: 30px;font-size: 16px;}
    small{font-size: 14px}
    input{border:0;width:30px}
    .chose{font-size: 16px;cursor: pointer}
    .month{width:66%;margin:0 auto}
    .month li{cursor: pointer;width:100px;height:26px;line-height: 26px;background: #eee;text-align: center;display: inline-block;margin:0 5px 5px 0}
    .month li.active{background: #9c221f;color:#fff}
    span{color:#9c221f}
  }
  .inner-page-nav-wrap {
    .tradeNav{overflow: hidden;padding-top:60px;
      li{float: left;padding-bottom: 60px;font-size: 24px;cursor: pointer;color: #666;margin-right: 35px;
      }
      li.active a{color: #9c221f;font-weight: bold}
      .en-title{padding: 20px 0;width:232px;text-align:center;font-size: 16px;font-weight: bold;color: #999;border: 1px solid #999;letter-spacing: 2px;line-height: 16px;}
      .line {width: 60px;background: #666;height: 3px;margin-bottom: 40px;}
    }
  }
  .trade-content{padding:40px 40px 60px;border:1px solid #eee;background: #fff;border-top:5px solid #9c221f;
    .trade-content-wrap {
      .trade-form {width: 560px;float: left;padding-bottom: 40px;}
      .select-btn-label, .select-btn-label2 {;text-align: left;border: none;font-size: 20px;color: #666;
        background-color: #fff;cursor: inherit;margin-top:20px;
      }
      .select-btn-group-wrap {padding-bottom: 20px;
        .other{width:100%;height:70px;border:1px solid #9c221f;margin:20px 0 0 0;font-size:20px;color:#666;padding:0 20px;border-radius: 5px}
        button {display: inline-block;    width: 127px;height: 70px;text-align: center;color: #333;border: 1px solid #9c221f;font-size: 24px;
          background-color: #fff;    margin: 20px 17px 0 0;padding: 0;border-radius: 5px}
        button:nth-child(4n+4){margin-right:0}
        button.active  {
          background:#9c221f;color:#fff;font-weight: bold}
      }
      .select-btn-group-wrap.last-child{
        li{ display: inline-block;text-align: center;color: #333;border: 1px solid #9c221f;font-size: 24px;
          background-color: #fff;margin: 20px 17px 0 0;position: relative;height: 68px;width: 127px;cursor: pointer;border-radius: 5px;
          .money-pay{line-height: 68px}
        }
        li.active{color:#fff;background: #9c221f;font-weight: bold}
        li:nth-child(4n+4){margin-right:0}
      }
      .trade-result {margin-top: 20px;width: 515px;float: right;
        .border{padding:45px 16px}
        .border.last{margin-top:105px;padding:35px 16px}
        .line {border-bottom: 1px solid #fff;}
      }

      .wei{overflow: hidden;font-size: 16px;
        .list{width:500px;
          .tip{line-height:54px;font-weight: bold;color:#333}
          .box{border:1px solid #ddd;padding:30px 60px 30px 30px;
            .hang{margin-bottom: 30px}
            .hang:last-child{margin-bottom: 0}
            p{color:#999;line-height: 26px;}
          }

        }
      }
    }
    .form-submit-btn{text-align: center;
      a {color: #3181AC;cursor: pointer;}
      button {margin: 40px auto 0;background: #9c221f;width: 220px;height: 58px;line-height: 58px;font-weight: 700;padding-left: 0;padding-right: 0;font-size: 16px;color: #FFF;text-align: center;display: block;cursor: pointer;border: 0;}
    }
  }

</style>
