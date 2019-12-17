<template>
  <div class="invitation">
    <div class="nav">
      <ul class="clearfix">
        <li v-for="(item,index) in navList" :key="index" @click="change(item.value)" :class="{active:item.value==nowValue}">{{item.txt}}</li>
      </ul>
    </div>
    <div class="box1 box" v-show="nowValue==1">
      <h3>邀请好友来交易，每月按时领返佣！被推荐人完成注册并成功交易的，推荐人可以获得返佣。</h3>
      <p>
        1、推荐的好友买入股票即可获得返佣，不限金额，1元起返。<br>
        例：推荐1个好友 本金10万 10倍买入，交易10次，可得返佣3000元 ；10万x10倍x10次x万3=3000<br>
        2、推荐人必须是赤禹操盘有效盘手；<br>
        3、请推荐人务必完善个人信息，每月财务清算后会以QQ或短信的方式发送推广明细。<br>
        4、佣金发放日为每月10号，财务清算后，统一发放上个月的推广佣金到个人账户，可随时提现，2小时内到账。
      </p>
    </div>
    <div class="box2 box" v-show="nowValue==2">
      1、您的推广链接：{{url}}通过该地址访问过来的人，注册后就都属于您的用户。<br>
      2、您的邀请码：{{'A0B0C' +this.$store.getters.userInfo.id}}<br>
      新用户注册时在推荐人处填写您的邀请码，注册后就都属于您的用户。<br>
      3、您的推广二维码：微信扫描二维码，注册后就都属于您的用户。
       <div id="qrcode" ref="qrcode"></div>
    </div>
    <div class="box3 box" v-show="nowValue==3">
      <div class="list-nav">
        <ul class="clearfix">
          <li v-for="(item,index) in levelList" :key="index" @click="changeList(item.level)" :class="{active:nowLevel==item.level}">{{item.txt}}</li>
        </ul>
        <div class="table">
          <table>
            <tr>
              <th>手机号码</th>
              <th>注册时间</th>
            </tr>
            <tr v-for="(item,index) in levelItem" :key="index">
              <td>{{item.phoneNumber}}</td>
              <td>{{item.regDate}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="box4 box" v-show="nowValue==4">
      <div class="time">
        <p class="get fl">累计收入：{{total}}</p>
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="choose"
        >
        </el-date-picker>
      </div>

      <div class="list-nav">
        <div class="table">
          <table>
            <tr>
              <th>发生时间</th>
              <th width="200px">收入类型</th>
              <th>合约号</th>
              <th>收入金额</th>
              <th>会员信息</th>
              <th>备注</th>
            </tr>
            <tr v-for="(item,index) in chargeItem" :key="index">
              <td>{{item.timeAdd}}</td>
              <td>推广收益</td>
              <td>{{item.serviceId}}</td>
              <td>{{item.moneyGet}}</td>
              <td>{{item.phoneNumber}}</td>
              <td>{{item.remark}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {GetRefrenceList} from '../../assets/js/personCenterApi/personCenter'
  import {GetRefrenceMoneyList} from '../../assets/js/personCenterApi/personCenter'
  import {GetTotal} from '../../assets/js/personCenterApi/personCenter'
    import  QRCode from 'qrcodejs2'
  export default {
    name: "invitation",
    layout:'left',
    data(){
      return{
        navList:[{txt:'推广链接',value:2},{txt:'我的会员',value:3},{txt:'我的收益',value:4}],/*{txt:'推广赚钱',value:1},*/
        levelList:[{txt:'一级推广',level:1},{txt:'二级推广',level:2},{txt:'三级推广',level:3}],
        chargesList:[{txt:'一级佣金',level:1},{txt:'二级佣金',level:2},{txt:'三级佣金',level:3}],
        nowValue:2,
        nowLevel:1,
        PageSize:10,
        PageIndex:1,
        PageSize1:10,
        PageIndex1:1,
        levelItem:[],
        chargeItem:[],
        qrcodeObj:{},
        url:this.$store.getters.allInfo.webUrl +"login/register?refid=A0B0C" +this.$store.getters.userInfo.id,
        urlWap:this.$store.getters.allInfo.webWapUrl +"#/login/register?refid=A0B0C" +this.$store.getters.userInfo.id,
        total:'',
        value1: [],
        startTime:'',
        endTime:'',
      }
    },
    methods:{
      choose(){
        this.startTime=this.value1[0]
        this.endTime=this.value1[1]
        this.totalMoney(this.startTime,this.endTime)
        this.chargeList(this.startTime,this.endTime)
      },
      totalMoney(start,end){
        let result = GetTotal(start,end)
        result.then((res)=>{
          this.total=res.Data.moneyGetSum
        })
      },
      changeList(level){
        this.nowLevel=level
        this.refrenceList()
      },
      refrenceList(){
        let result = GetRefrenceList(this.PageSize,this.PageIndex,this.nowLevel)
        result.then((res)=>{
          this.levelItem=res.Data.Data
        })
      },
      chargeList(start,end){
        let result = GetRefrenceMoneyList(this.PageSize1,this.PageIndex1,start,end)
        result.then((res)=>{
          this.chargeItem=res.Data.Data
        })
      },
      change(val){
        this.nowValue=val
      },
    },
    created(){
      this.refrenceList()
      this.chargeList()
      this.totalMoney()
    },
    mounted (){
      this.$nextTick(()=>{
        var canvas = this.$refs.qrcode;
        new QRCode(canvas, {
          text:this.urlWap,
          width:200,
          height:200,
          colorDark : "#666",   //二维码颜色
          colorLight : "#ffffff"   //二维码背景色
        })

      })
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .time{padding-bottom: 10px}
  .nav li {cursor: pointer;
    float:left;display: inline-block;width:110px;height: 46px;line-height:46px;background: #ddd;border-radius: 5px;margin-right:5px;text-align: center;}
  li.active{background: #ff5a55;color:#fff}
  .box{padding:40px 20px;background: #fff;border:1px solid #eee;font-size: 14px;line-height: 24px}
  .box1{
    h3{color:#000;line-height: 24px;margin:10px 0;}
    p{line-height: 24px;coloe:#666}
  }
  .list-nav li{float:left;width:33.333%;line-height: 45px;background: #666;text-align: center;color:#fff;cursor: pointer}
  .list-nav li.active{background: #db3752;color:#fff}
  .table{
    th{background: #e7f1ff}
    table{width:100%;
      td{border-bottom: 1px solid #eee}
      td,th{line-height: 55px;}
    }
    .box3{
      th,td{width:50%;}
    }
  }
  .get{font-size: 20px;color:red;line-height: 30px;}
</style>
