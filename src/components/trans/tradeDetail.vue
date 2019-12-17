<template>
  <div class="tradeDetail">
    <div class="wrap" >
      <div class="deal-title1">
        <div class="wrap1-btn">
          <a @click="showAddMoney=true;addMoney=''" v-show="tradeDetail.product_type!=10">追加保证金</a>
          <a @click="ShowGetProfit=true;drawingMoney=''" v-show="tradeDetail.product_type!=15">提取盈利</a>
          <a @click="showAddContractTrue" v-show="tradeDetail.product_type!=15">追加策略</a>
          <a @click="showSettle=true" >终止策略</a>
        </div>
      </div>
    </div>
    <!--提取盈利-->
    <Pop :isShow="ShowGetProfit" @closePop="close('ShowGetProfit')" >
      <h3 slot="tit">提取利润</h3>
      <div class="addBound-balance">
        操盘账户余额：<span class="red">{{tradeDetail.moneyBalanceAble}}</span> 元
        <br>
        当前盈利：<span class="red" >{{tradeDetail.moneyProfit}}</span> 元
      </div>
      <div class="vertify-short"><el-input  class=" short" v-model.trim="drawingMoney" type="number" placeholder="请输入提取金额" ></el-input></div>
      <div class="addBound-tip">最高可提利润 <span class="yellow" v-text="canProfit>=0?canProfit:0">0</span>元</div>
      <div class="btnGroup">
        <button :disabled="abled2" slot="btn" type="button" class="popBtn fl" @click="commitProfit">确认提取</button>
        <button  slot="btn" type="button" class="popBtn fr" @click="close('ShowGetProfit')">取消</button>
      </div>
    </Pop>
    <!--追加操盘-->
    <setPop :isShow="showAddContract" @closePop="close('showAddContract')" @setData="showAddContractTwo" >
      <h3 slot="tit">追加策略</h3>
      <div class="addBound-balance">
        <ul>
          <li>账户余额：<span class="num" v-text="moneyTotal">0</span> 元</li>
          <li><span>追加受托额：</span> <input type="text" style="width:60%" placeholder="请输入受托额"  v-model="addContract"/></li>
          <li>应付风险保证金：{{addDeposite}}</li>
          <li>应付委托人收益：{{afterFee}}</li>
          <li>应付总计：{{afterPay}}</li>
        </ul>
        <p class="color-red"></p>
      </div>
      <div class="addBound-tip">最低追加1000元，追加金额须为1000的整数倍</div>
    </setPop>
    <Pop :isShow="showAddContract2" @closePop="close('showAddContract2')">
      <h3 slot="tit">追加策略</h3>
      <div class="addBound-balance">
        <ul>
          <li>您当前操作的业务为追加策略，</li>
          <li>您将缴纳{{addDeposite}}元保证金，{{afterFee}}元委托人收益</li>
          <li class="color-red">总计支付{{afterPay}}元</li>
        </ul>
      </div>
      <div class="btnGroup">
        <button :disabled="abled1" slot="btn" type="button" class="popBtn fl" @click="commitContract">确认追加</button>
        <button  slot="btn" type="button" class="popBtn fr" @click="close('showAddContract2')">取消追加</button>
      </div>
    </Pop>
    <!--追加保证金-->
    <setPop :isShow="showAddMoney" @closePop="close('showAddMoney')" @setData="showAddMoneyTwo" >
      <h3 slot="tit">追加保证金</h3>
      <div class="addBound-balance">
        账户余额：<span class="num" v-text="moneyTotal">0</span> 元<br>
      </div>
      <input type="text" placeholder="请输入追加金额"  v-model="addMoney" :maxlength="String(moneyTotal).length" @keyup="check"/>
      <div class="addBound-tip color-red">最低追加10元，追加金额须为10的整数倍</div>
    </setPop>
    <Pop :isShow="showAddMoney2" @closePop="close('showAddMoney2')">
      <h3 slot="tit"></h3>
      <p class="tip">您当前操作的业务为追加保证金，<br>
        您将缴纳{{baozheng1}}元风险保证金,不收取费用<br>
        <span style="text-align: center">总计支付：{{baozheng1}}元</span></p>
      <div class="btnGroup">
        <button :disabled="abled" slot="btn" type="button" class="popBtn fl" @click="commitAddMoney">确认追加</button>
        <button  slot="btn" type="button" class="popBtn fr" @click="close('showAddMoney2')">取消追加</button>
      </div>
    </Pop>
    <!--结算-->
    <Pop :isShow="showSettle" @closePop="close('showSettle')">
      <h3 slot="tit">结算确认</h3>
      <p class="tip">您的合约已使用 <span v-text="all.dealDays<0?0:all.dealDays"></span>天，<span v-show="type==12">当前还剩余{{all.remainNumber}}天，相关费用概不退还，</span>是否确认结算？</p>
      <div class="btnGroup">
        <button  slot="btn" type="button" class="popBtn fl" @click="commitSettle">确认结算</button>
        <button  slot="btn" type="button" class="popBtn fr" @click="close('showSettle')">取消结算</button>
      </div>
    </Pop>
    <!-- <Pop :isShow="showSettleLast" @closePop="close('showSettleLast')" >
       <h3 slot="tit">结算确认</h3>
       <p class="tip">您的合约已使用{{followDate}}天，当前还剩余{{daysLast}}天，相关费用概不退还，由于您提前结算，系统将不会自动结算退回保证金，需管理员审核确认，请知晓。</p>
       <div class="btnGroup">
         <button slot="btn" type="button" class="popBtn fl" @click="commitSettle">确认结算</button>
         <button slot="btn" type="button" class="popBtn fr" @click="close('showSettleLast')">取消结算</button>
       </div>
     </Pop>-->
  </div>
</template>
<script>
  import {ProductDetail} from '../../assets/js/myTrade/myTrade'//获取合约详情的状态
  import {GetProfit} from '../../assets/js/myTrade/myTrade'//提取利润
  import {AddContract} from '../../assets/js/myTrade/myTrade'//追加操盘
  import {GetAddMoney} from '../../assets/js/myTrade/myTrade'//追加保证金
  import {Settle} from '../../assets/js/myTrade/myTrade'//结算
  import setPop from '../../components/pop/setPop'
  import Pop from '../../components/pop/pop'
  export default {
    props:['id','tradeDetail','all','type'],
    //name: "tradeDetail",
    components:{setPop,Pop},
    data(){
      return{
        name:'',
        dateStart:'',
        dateEnd:'',
        feeNext:'',//下次收费时间
        manageFee:0,
        followDate:0,//已配资天数
        daysLast:0,//还剩配资天数
        money_warn:0,
        money_all:0,//当前资产
        money_open_line:0,
        money_begin:0,
        profit:0,//盈利金额
        moneyDeposit:0,//保证金
        ShowGetProfit:false,//提取利润
        showAddMoney:false,//追加保证金
        showAddMoney2:false,//追加保证金
        showAddContract:false,//追加操盘
        showAddContract2:false,//追加操盘确定
        showSettle:false,//结算
        showSettleLast:false,//结算确认
        drawingMoney:'',//提现金额
        addMoney:'',//追加保证金金额
        followMoney:0,//操盘账户余额
        isSettle:false,
        status:'',//22:操盘中，23:结算，24：冻结
        showSettleTip:false,
        //追加操盘数据
        moneyTimes:0,//配资倍数
        moneyRate:0,//管理费率
        addDeposite:0.00,//追加配资保证金
        addDepositeMoney:0.00,//追加配资额
        afterAddDeposite:0.00,//追加之后保证金
        afterMoney:0.00,//追加之后配资额
        afterFee:0.00,//补缴管理费
        afterPay:0.00,//共计应支付
        addContract:'',//输入追加的保证金
        product_type:11,//产品类型,
        moneyTotal:this.$store.getters.userMoney.userBalance,
        abled:false,
        abled1:false,
        abled2:false,
        timeFee:'',//上个收费日
        timeFeeNext:'',//下个收费日
        regDate:'',//注册时间
        startDate:'',//合约开始时间
      }
    },
    computed:{
      //追加保证金相关计算
      baozheng1:function(){
        return this.addMoney
      },
      canProfit:function(){
        if(this.tradeDetail.moneyProfit<0){
          return 0
        }
        else if(this.tradeDetail.moneyProfit>this.tradeDetail.moneyBalanceAble){
          return this.tradeDetail.moneyBalanceAble
        }else{
          return this.tradeDetail.moneyProfit
        }
      }
    },
    watch:{
      //追加操盘计算
      addContract:function(val){
        let that=this
        let fee
        if(val>=1000){
          that.daysLast=that.all.remainNumber
          that.followDate=that.all.dealDays
          that.moneyTimes=that.all.moneyTimes
          that.timeFeeNext=that.all.timeFeeNext.replace(/-/g,"/")
          that.timeFee=that.all.timeFee.replace(/-/g,"/")
          that.afterFee=that.all.afterFee
          that.regDate=that.tradeDetail.date_reg
          that.startDate=that.tradeDetail.date_begin
          that.moneyDeposit=that.tradeDetail.money_deposit
          that.moneyRate=that.tradeDetail.borrow_rate
          that.addDeposite=Math.ceil(val/that.moneyTimes/100)*100
          if(that.daysLast>that.getDaysBetween(that.timeFee,that.timeFeeNext)){
            that.daysLast=that.getDaysBetween(that.timeFee,that.timeFeeNext)
          }
          fee=parseFloat(val*that.moneyRate).toFixed(2)
          if(that.type==12){
            let day=that.getDaysBetween(that.timeFee,that.timeFeeNext)
            that.afterFee=parseFloat(val*that.moneyRate/day*(that.daysLast+1)).toFixed(2)
          }else if(that.type==11){
            let timeNow=that.time()
            let dateNow=that.getDateNow()
            let dateReg=that.regDate.split(' ')[0]
            let timeReg=that.regDate.split(' ')[1]
            let dateBegin=that.startDate.split(' ')[0]
            let three='15:00:00'
            if(dateNow==dateReg){
              if(timeReg<=three){
                if(timeNow<=three){
                  that.afterFee=fee*2
                }else{
                  that.afterFee=fee
                }
              }else{
                that.afterFee=fee*2
              }
            }else if(dateBegin==dateNow&&dateBegin!=dateReg){
              if(timeNow<=three){
                that.afterFee=fee*2
              }else{
                that.afterFee=fee
              }
            }else if(dateBegin>dateNow){
              that.afterFee=fee*2
            }else{
              that.afterFee=fee*1
            }
          }else if(that.type==13){
            that.afterFee=0
          }
          that.afterPay=parseFloat(Number(that.addDeposite)+Number(that.afterFee)).toFixed(2)
        }else{
          that.addDeposite=''
          that.afterFee=''
          that.afterPay=''
        }
      }
    },
    methods:{
      getDaysBetween:function(dateFormat1,dateFormat2){
        let  startDate = Date.parse(dateFormat1);
        let  endDate = Date.parse(dateFormat2);
        let days=(endDate - startDate)/(1*24*60*60*1000);
        return  days;
      },
      getDateNow () {
        let date = new Date();
        let seperator1 = "-";
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        let currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
      },
      //获取当前时间
      time(){
        let date = new Date();
        let hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
        let minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
        let seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
        return hours+":"+minutes+":"+seconds;
      },

      //关闭弹窗
      close(attr){
        this[attr] = false
      },
      //盈利提取提交
      commitProfit(){
        if(this.drawingMoney==0){
          this.$alert('请输入提现金额');
          return
        }
        if(this.drawingMoney > this.canProfit){
          this.$alert('提取金额不能大于最高可提利润');
          return
        }
        this.abled2=true
        let result = GetProfit(this.id,this.drawingMoney)
        result.then((res)=>{
          this.ShowGetProfit=false
          this.$alert(res.Message);
          this.abled2=false
        }).catch(err=>{
          this.abled2=false
        })
      },
      //追加策略点击
      showAddContractTrue(){
        this.addContract=''
        this.addDeposite=''
        this.afterFee=''
        this.afterPay=''
        let times=this.time()
        if(times>'08:00:00'&&times<'15:00:00'){
          this.showAddContract=true
        }else{
          this.$alert('追加策略时间为8:00-15:00，请合理安排时间')
        }

      },
      //追加策略第一步
      showAddContractTwo(){
        if(this.addContract<1000||this.addContract%1000!=0){
          this.$alert('最低追加1000元，追加金额须为1000的整数倍')
          return
        }
        this.showAddContract= false
        this.showAddContract2 = true
      },
      //追加操盘提交
      commitContract(){
        if(this.addContract==''){
          this.$alert('请输入追加金额')
        }
        this.abled1=true
        let result = AddContract(this.id,this.addDeposite,this.addContract)
        result.then((res)=>{
          this.addContract=''
          this.addDeposite=''
          this.afterFee=''
          this.afterPay=''
          this.$alert('追加策略成功');
          this.showAddContract2 = false
          this.abled1=false
        }).catch(err=>{
          this.abled1=false
        })
      },
      //追加保证金限额
      check(){
        this.addMoney=this.addMoney.replace(/[^\.\d]/g,'');
        this.addMoney=this.addMoney.replace('.','');
        if(this.moneyTotal<=0){
          this.$alert('最多输入0元')
          return
        }
        if(this.addMoney>this.moneyTotal){
          this.$alert('最多输入'+Math.floor(this.moneyTotal/10)*10+'元')
        }
      },
      showAddMoneyTwo(){
        if(this.moneyTotal<=0){
          this.$alert('最多输入0元')
          return
        }
        if(this.addMoney<10){
          this.$alert('最低追加10元')
          return
        }
        if(this.addMoney>this.moneyTotal){
          this.$alert('最多输入'+Math.floor(this.moneyTotal/10)*10+'元')
          return;
        }
        this.showAddMoney = false
        this.showAddMoney2 = true
      },
      //追加保证金提交
      commitAddMoney(){
        if(this.addMoney==0){
          this.$alert('请输入追加保证金')
          return
        }
        this.abled=true
        let result = GetAddMoney(this.id,this.addMoney)
        result.then((res)=>{
          this.addMoney = ''
          this.$alert('追加保证金成功');
          this.showAddMoney2 = false
          this.abled=false
        }).catch((err)=>{
          this.abled=false
        })
      },
      //结算提交
      commitSettle(){
        this.showSettle = false
        this.showSettleLast = false
        let result = Settle(this.id)
        result.then((res)=>{
          this.$alert('结算成功').then(()=>{
            this.$router.push({path:'/myTrade/myTrade',query:{type:this.type,status:'23'}})
          })
        })
      },
    },

  }
</script>

<style  rel="stylesheet/less" lang="less" scoped>
  .addBound-tip{padding:10px 0;background: url("../../../static/img/trade/tan.png") no-repeat left center;padding-left:28px;font-size: 14px;
    color: red;}
  .tradeDetail{font-size: 16px;
    .deal-title1 {position: absolute;right:20px;top:120px;z-index: 1;
      span{line-height: 60px;margin-left:25px}
      span:last-child{margin-left:0}
      .clock {display: inline-block;width: 15px;height: 15px;background: url(../../../static/img/trade/clock.png) 100% 100% no-repeat;background-size: 100%;margin-right: 0px;margin-left: 30px;}
      .wrap1-btn {position: relative; float: right;    display: inline-block;padding: 10px 10px 10px 0;
        a {background: #169055;display: inline-block;padding:0 8px;font-size:14px;height: 45px;line-height:45px;text-align: center;border-radius: 5px;color: #fff;}
        a:nth-child(2){    background: #9c221f;}
        a:nth-child(3){    background: #69789f;}
      }
    }
    .deal-info {display: block;width: 1172px;border: 1px solid #e5e5e5;padding-top: 10px;padding-bottom: 10px;border-top: none;
      span {display: inline-block;width: 32.8%;padding: 0px;text-align: center;color:#333}
    }
    .powerline {display: block;width: 1172px;padding-top: 10px;padding-bottom: 10px;border: 1px solid #e5e5e5;border-top: none;margin-bottom: 30px;
      .buoys{background: url("../../../static/img/trade/buoys.gif") no-repeat;margin-left:664px;color: #FFF;
        font-size: 16px;width: 120px;height: 70px;text-align: center;line-height: 60px;display: inline-block}
    }
    .bigtips{height: 30px;line-height: 30px;background: #cf1b14;color: #fff;text-align: center;margin-top: 30px;}
    .powerlineimg {display: block;width: 95%;margin: 5px auto;}
    .money_open_line2_text {display: inline-block;color: #717171;font-size: 16px;margin-left: 140px;text-align: center;}
    .money_warn2_text {display: inline-block;color: #2eb226;font-size: 16px;margin-left: 130px;text-align: center;}
    .money_base_all {display: inline-block;color: #fd0408;font-size: 16px;margin-left: 248px;text-align: center;}
    .addBound-balance{line-height: 52px;font-size: 14px;padding-left: 35px;margin-bottom: 10px;color:#333;
      li{line-height: 30px;font-size: 16px;}
    }
    .num{    font-size: 16px;color: #FF2626;font-weight: 700;}
  }
</style>
