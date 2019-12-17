<template>
  <div class="myTrade content_main">
    <div class="wrap">
      <div class="tradeNav">
        <div class="fl">
          <ul>
            <li @click="choose(item.status)" :class="{active:statusShow==item.status}" v-for="(item,index) in nav" :key="index">{{item.title}}</li>
          </ul>
        </div>
      </div>
      <div class="trade-content" >
        <div class="fl left-nav">
          <ul>
            <li class="bg-red color-w">我的策略</li>
            <li @click="getAll" :class="{active:nowType==''}">我的策略</li>
            <li :class="{active:item.productType==nowType}" v-for="item in typeNav" @click="getTradeList(item.productType,item.productName)">{{item.productName}}</li>
          </ul>
        </div>
        <div class="fl">
          <div class="myTradeList">
            <div>
              <div v-show="statusShow=='22,24,25'">
                <div >
                  <p @click="goTrade(nowType)" class="bg-red go" v-show="MyTradeList.length==0&&MyTradeListSettle.length==0&&nowType!=''&&nowType!=10">您暂无{{nowName}}，去创建</p>
                  <p @click="goTrade(nowType)" class="bg-red go" v-show="MyTradeList.length==0&&MyTradeListSettle.length==0&&nowType==''">您暂无可用策略，去创建</p>
                  <p @click="goSettle" class="bg-red go"  v-text="freeTxt" v-show="MyTradeList.length==0&&nowType==10">您的免费体验合约已结算</p>
                </div>
                <ul class="trading" >
                  <li v-for="(item,index) in MyTradeList" :key="index" v-cloak class="item">
                    <div class="item-head">
                      <span>{{item.product_name}}</span><span>({{item.id}})</span>
                      <span class="fr" >{{item.date_begin|dateFormat('YYYY-MM-DD')}} <i v-show="item.product_type!=31&&item.product_type!=13">～{{item.date_end | dateFormat('YYYY-MM-DD')}}</i></span>
                    </div>
                    <div class="item-cont">
                      <div  class="fl left">
                        <div v-show="item.product_type!=31">
                          <img  src="../../../static/img/trade/myTrade-bg.png" alt="">
                          <ul >
                            <li ><p >策略保证金</p> <span v-text="parseFloat(item.moneyDeposit).toFixed(2)">0</span></li><!--item.moneyProfit+-->
                            <li ><p >策略平仓线</p> <span >{{item.money_open_line}}</span></li>
                            <li ><p >策略警戒线</p> <span >{{item.money_warn}}</span></li>
                            <li ><p >当前策略总资产</p> <span >{{item.moneyAll}}</span></li>
                          </ul>
                        </div>
                        <div class="mom" v-show="item.product_type==31">
                          <p>可用风险保证金：<br>{{moneyDepositMom}}</p>
                          <p>策略可买额度：<br>{{userBalanceMom}}</p>
                          <p>策略总资产：<br>{{allMom}}</p>
                          <p>策略建议市值：<br>{{shiMom}}</p>
                          <p>冻结未成交金额：{{lockMom}}</p>
                          <p >策略盈亏：<span :class="moneyProfitMom>=0?'color-red':'color-green'">{{moneyProfitMom}}</span></p>
                        </div>
                      </div>
                      <div class="fl right">
                        <p v-show="item.product_type!=31">当前策略总资产：<span>{{item.moneyAll}}</span></p>
                        <p v-show="item.product_type==31">当前策略总资产：<span>{{allMom}}</span></p>
                        <p class="profit">
                          <span v-show="item.product_type!=31">浮动盈亏：<i :class="item.moneyProfit>=0?'color-red':'color-green'">{{parseFloat(item.moneyProfit).toFixed(2)}}</i></span>
                          <span v-show="item.product_type==31">浮动盈亏：<i :class="moneyProfitMom>=0?'color-red':'color-green'">{{parseFloat(moneyProfitMom).toFixed(2)}}</i></span>
                          <span v-show="item.product_type<15">已提取盈利：<i :class="item.extractProfit>=0?'color-red':'color-green'">{{parseFloat(item.extractProfit).toFixed(2)}}</i></span>
                          <span v-show="item.product_type==31">盈亏比例：<i :class="moneyProfitMom>=0?'color-red':'color-green'">{{parseFloat(moneyProfitMomRate).toFixed(2)}}%</i > </span>
                          <span v-show="item.product_type!=31">盈亏比例：<i :class="item.moneyProfit>=0?'color-red':'color-green'">{{parseFloat(item.moneyProfitRate).toFixed(2)}}%</i > </span>
                        </p>
                        <p v-show="isOpenContract==0"  class="protocol" ><span >《委托投资协议》</span> <i v-text="item.contractStatus <2?'去签署':'查看'" @click="getAgreement(item.borrowid,2,item.contractStatus)">去签署</i></p>
                        <button class="btn pointer" :class="{'bg-gray':item.contractStatus<2,'bg-red':isOpenContract==1}"  @click="judgeAgreen(item.contractStatus,item.borrowid,item.product_type)">策略建议发起</button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div  v-show="statusShow==23">
                <div >
                  <p  class="bg-red go" v-show="MyTradeListSettle.length==0&&nowType!=''">您暂无结算的{{nowName}}</p>
                  <p  class="bg-red go" v-show="MyTradeListSettle.length==0&&nowType==''">您暂无结算的策略</p>
                </div>
                <ul class="sell_ul1 settle">
                  <router-link tag="li" :to="{name:'hisTradeDetail',params:{id:item.borrowid}}" style="cursor: pointer" v-for="(item,index) in MyTradeListSettle" :key="index">
                    <div>
                      <div class="item-head">
                        <span>{{item.product_name}}</span><span>({{item.id}})</span>
                        <span class="fr">{{item.date_begin|dateFormat('YYYY-MM-DD')}}～{{item.date_end | dateFormat('YYYY-MM-DD')}}</span>
                      </div>
                      <ul class="clearfix">
                        <li>策略受托额：<small>{{parseFloat(item.money_borrow).toFixed(2)}}</small></li>
                        <li>盈亏：<small  :class="item.moneyProfit+item.extractProfit>=0?'color-red':'color-green'" >{{parseFloat(item.moneyProfit+item.extractProfit).toFixed(2)+'('+parseFloat((item.moneyProfit+item.extractProfit)/(item.money_borrow+item.money_deposit)*100).toFixed(2)+'%'+')'}}</small></li>
                      </ul>
                      <ul class="clearfix">
                        <li>触发警戒：<small  v-text="parseFloat(item.money_warn).toFixed(2)">7000.00</small></li>
                        <li>触发止损：<small v-text="parseFloat(item.money_open_line).toFixed(2)">6600.00</small></li>
                        <li>冻结资金：<small  v-text="parseFloat(item.moneyDeposit).toFixed(2)">2000.00</small></li></ul>
                    </div>
                  </router-link>
                </ul>
              </div>
            </div>
            <div >
            </div>
            <el-pagination style="padding-top:30px;text-align: right" v-show="MyTradeList.length!=0"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page="currentPage"
                           :page-sizes="[5, 10, 20, 40]"
                           :page-size="pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="pageCount">
            </el-pagination>
          </div>
        </div>

      </div>
    </div>
    <!-- <judgePop></judgePop>-->
    <ReviewNamePop ></ReviewNamePop>
    <!--//协议-->
    <AgreenPop :url="agreenUrl" :isShow="showAgreen" @close="close('showAgreen')"></AgreenPop>
  </div>
</template>
<script>
  import {ProductType} from '../../assets/js/trade/trade'
  import {ProductList} from '../../assets/js/myTrade/myTrade'
  import {GetAgreement} from '../../assets/js/personCenterApi/personCenter'
  import {SeeAgreement} from '../../assets/js/personCenterApi/personCenter'
  import {DownAgreement} from '../../assets/js/personCenterApi/personCenter'
  import {GetConfig} from '../../assets/js/globalApi/global'
  import ReviewNamePop from '../../components/pop/reviewNamePop'
  import judgePop from '../../components/pop/judgePop'
  import AgreenPop from '../../components/pop/agreenPop'
  export default {
    name: "myTrade",
    components:{ReviewNamePop,judgePop,AgreenPop},
    data(){
      return{
        checkVal:false,
        moneyDepositMom:'',//mom可用保证金
        userBalanceMom:'',//mom策略可买
        allMom:'',//mom策略总资产
        lockMom:'',//mom冻结未成交金额
        moneyProfitMom:'',//mom策略盈亏
        moneyProfitMomRate:'',//mom策略盈亏
        shiMom:'',//mom市值
        MyTradeList:[],
        MyTradeListSettle:[],
        list:[],
        statusShow:'22,24,25',
        nowType:'',
        nowName:'',
        typeQuery:this.$route.query.type,
        statusQuery:this.$route.query.status,
        currentPage:1,
        pageSize:5,
        pageCount:0,
        agreenUrl:'',
        showAgreen:false,
        isOpenContract:this.$store.getters.config.isOpenContract,
        color:'btn-org',
        nav:[{title:'策略中',status:'22,24,25'},{title:'历史策略',status:23}],
        //typeNav:[{name:'短期策略',type:11},{name:'长期策略',type:12}],
        typeNav:[],
        userBalance:this.$store.getters.userMoney.userBalance,
        momInfo:[],
        day:'',
        month:'',
        mom:'',
        end:true,
        abled:false,
        addDepositAuto:'',
        nowId:'',
        settleTip:false,
        freeTxt:'',
        freeList:[]
      }
    },
    methods:{
      //去结算页面
      goSettle(){
        if(this.freeList.length==0){
          this.$router.push('/trade/free')
        }else{
          this.statusShow='23'
          this.nowType==10
          this.getTrade()
        }
      },
      //去创建页面
      goTrade(type){
        if(this.nowType==10){
          this.$router.push('/free')
        }else{
          if(this.nowType==type){
            this.$router.push({path:'/trade',query:{type:type}})
          }
        }
      },
      //历史合约进入策略中
      go(type){
        this.nowType==type
        this.statusShow='22,24,25'
      },
      //获取产品类型
      getType(){
        let result = ProductType()
        result.then((res)=>{
          this.typeNav = res.Data
        })
      },
      getTradeList(type,name){
        this.active=false
        this.nowType=type
        this.nowName=name
        this.currentPage=1
        this.getTrade()
      },
      //判断是否签协议
      judgeAgreen(agreen,id,type){
        if(this.isOpenContract==0){
          if(agreen<2){
            this.$alert('策略发起前请先签署相关协议')
            return
          }else{
            this.$router.push({path:'/myTrade/trans',query:{id:id,type:type}});
          }
        }else{
          this.$router.push({path:'/myTrade/trans',query:{id:id,type:type}});
        }
      },
      //关闭弹窗
      close(attr){
        this[attr] = false
        this.getTrade()
        parent.location.reload()
      },
      //委托投资协议签署
      getAgreement(id,type,status){
        if(status<2){
          let loading = this.$loading({
            lock: true,
            text: '合同生成中，请稍等！',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
            //target: document.querySelector('.div1')
          });
          let result = GetAgreement(id,type)
          result.then((res)=>{
            this.showAgreen = true
            this.agreenUrl = res.Data.model
            this.getTrade()
            loading.close();
          }).catch((err)=>{
            loading.close();
          })
        }else{
          let result = SeeAgreement(id,type)
          result.then((res)=>{
            this.showAgreen = true
            this.agreenUrl = res.Data
          })
        }
      },
      //委托投资协议下载
      downAgreement(id,type){
        let result = DownAgreement(id,type)
        result.then((res)=>{
        })
      },
      handleSizeChange: function (size) {
        this.pageSize = size;
        this.getTrade()
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        this.getTrade()
      },
      //获取所有类型
      getAll(){
        this.active=true
        this.nowType=''
        this.currentPage=1
        this.getTrade()
      },
      //获取交易列表
      getTrade(){
        let that=this
        let result = ProductList(that.pageSize,that.currentPage,that.statusShow,that.nowType)
        result.then((res)=>{
          that.pageCount = res.Data.PageCount
          //that.MyTradeListSettle=res.Data.Data
          if(that.statusShow==23){
            that.MyTradeListSettle=res.Data.Data
          }else{
            that.MyTradeList=res.Data.Data
          }
          //mom
          that.MyTradeList.forEach(val=>{
            if(val.product_type==31){
              that.momInfo=val.follow_info.split(';')
              that.momInfo=res.Data.Data[0].follow_info.split(';')
              that.moneyDepositMom=that.momInfo[0].split(':')[1]
              that.userBalanceMom=that.momInfo[1].split(':')[1]
              that.allMom=that.momInfo[2].split(':')[1]
              that.shiMom=that.momInfo[3].split(':')[1]
              that.lockMom=that.momInfo[4].split(':')[1]
              that.moneyProfitMom=that.momInfo[5].split(':')[1]
              that.moneyProfitMomRate=that.momInfo[6].split(':')[1]
            }
          })
        })
      },
      //判断免息体验
      getTradeFree(){
        let that=this
        let result = ProductList(that.pageSize,that.currentPage,23,10)
        result.then((res)=>{
          this.freeList=res.Data.Data
          if(this.freeList.length==0){
            this.freeTxt='您暂无免费体验，去创建'
          }else{
            this.freeTxt='您的免费体验合约已结算'
          }
        })
      },
      //点击“交易”按钮获取数据getSettle
      choose(sta){
        let array=[]
        this.statusShow=sta
        this.nowType=this.nowType
        this.currentPage=1
        this.getTrade()
        if(sta==23){
          this.typeNav.forEach((val)=>{
            if(val.productType==31){
              return
            }else{
              array.push(val)
            }
          })
          this.typeNav=array
        }else{
          this.getType()
        }
      },
      getSiteConfigOpen(){
        let result = GetConfig()
        result.then((res)=>{
          this.isOpenContract=res.isOpenContract
        })
      },
    },
    mounted() {
      this.nowType=this.typeQuery;
      if(this.typeQuery== undefined){
        this.nowType="";
      }
      if(this.statusQuery== undefined){
        this.statusShow="22,24,25";
      }else{
        this.statusShow=this.statusQuery;
      }
      this.getSiteConfigOpen();
      this.getType()
      this.getTrade()
      this.getTradeFree()
    }
  }
</script>
<style  rel="stylesheet/less" lang="less" scoped>
  .go{text-align: center;line-height: 50px;color:#fff;cursor: pointer;width:40%;margin:0 auto;margin-top:100px}
  .auto{font-size: 12px;}
  .tradeNav{overflow: hidden;padding-top:60px;
    li{float: left;padding-bottom: 60px;font-size: 24px;cursor: pointer;color: #666;margin-right: 35px;
    }
    li.active {color: #9c221f!important;font-weight: bold}
    .en-title{padding: 20px 0;width:232px;text-align:center;font-size: 16px;font-weight: bold;color: #999;border: 1px solid #999;letter-spacing: 2px;line-height: 16px;}
    .line {width: 60px;background: #666;height: 3px;margin-bottom: 40px;}
  }
  .title{position: absolute;top:230px;
    span{cursor: pointer;font-size: 16px;padding-right: 30px}
    span.active{color:#9c221f;}
  }
  .trade-content{padding:40px 40px 60px;border:1px solid #eee;background: #fff;border-top:5px solid #9c221f;overflow: hidden;
    .left-nav{width:220px;border:1px solid #ddd;margin-right: 40px;
      li{line-height: 60px;text-align: center;border-bottom:1px solid #ddd;cursor: pointer}
      li.active{line-height: 60px;color: #9c221f;}
    }
    .myTradeList{    width: 854px;
      .item-head{background: #999;line-height: 50px;overflow: hidden;padding:0 30px;
        span{line-height: 50px;color:#fff}
      }
      .item{overflow: hidden;border:1px solid #ddd;
        .item-cont{padding:20px 0;overflow: hidden;
          .left{padding:62px 40px 10px 42px;overflow: hidden;width:500px;
            .mom{margin-top:-30px;    margin-right: -75px;
              p{line-height: 40px!important;width:49%;display: inline-block}
            }
            img{padding-left:24px}
            li{position: relative;float: left;margin-top: 15px;
              p{margin-right: 16px;font-size: 16px;line-height: 30px}
              span{border-radius: 5px;position: absolute;text-align:center;top: -100px;left:0;color: #fff;font-size: 14px;height: 28px;line-height:28px;background: #586995;padding:0 18px}
            }
            li:nth-child(2){
              span{top:-158px;background: #169055;left:0}
            }
            li:nth-child(3){text-align: center;
              span{top:-186px;left:0;background: #9f3ed5}
            }
            li:nth-child(4){text-align: center;
              span{top:-220px;left:0;background: #009999}
            }
          }
          .right{padding:10px 0 0 50px;border-left: 1px dashed #ddd;
            p{line-height: 34px}
            .btn{margin-top:20px;height:50px;line-height: 50px}
            .profit{span{display: block;line-height: 30px;}}
            .protocol{span{color:#586995}}
            i{cursor: pointer}
          }
        }
      }
    }
  }
  .settle>li{background: url("../../../static/img/trade/mt-settled.jpg") no-repeat right bottom;}
  .settle ul{padding: 0 40px;margin-top:40px}
  .settle ul:last-child{margin-bottom:40px;margin-top:0}
  .settle ul li{float:left;width:33.3%;padding-bottom: 18px;
    small{font-size: 16px;font-weight: bold}}

</style>
