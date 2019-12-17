<template>
  <div class="content_main">
    <Banner :slides="slides"></Banner>
    <div class="noticeBox">
      <div class="wrap">
        <div class="notice">
          <span class="fl">最新公告 ：</span>
          <SliderDown :list="noticeList"></SliderDown>
          <router-link to="/personCenter/message" class="fr" tag="span">更多 >></router-link>
        </div>
      </div>
    </div>
    <div class="product cont">
      <div class="wrap">
        <div class="product-head clearfix">
          <div class="title fl">
            <p class="line"></p>
            <p class="txt">业务说明</p>
          </div>
          <!--<div class="en-title fr">Product description +</div>-->
        </div>
        <div class="product-cont">
          <div class="top-cont">
            <ul class="clearfix">
              <li>
                <h3>{{this.$store.getters.allInfo.webName}}平台</h3>
                <img src="../../static/img/index/product1.png" alt="product1">
                <p>资产委托人和策略建议人的合作提供信息撮合居间服务，风控技术服务、客服服务。</p>
              </li>
              <li class="active">
                <h3>策略建议人</h3>
                <img >
                <p>有一定证券投资经验，为资产委托人提供证券投资策略建议。</p>
              </li>
              <li>
                <h3>资产委托人</h3>
                <img src="../../static/img/index/product3.png" alt="product3">
                <p>合法拥有投资资金，把投资资金存放在证券账户中作为委托资产。</p>
              </li>
            </ul>
          </div>
          <div class="bot-cont clearfix">
            <img src="../../static/img/index/product4.png" alt="product4" calss="fl">
            <div class="fr text">
              <p>      资产委托人依据策略建议人提供的证券投资策略建议信息进行证券投资，资产委托人享有委托资产额的固定收益。
              </p>
              <p> 策略建议人为资产委托人提供证券投资策略建议，受托资产额的证券投资所有亏损均由策略建议人承担，受托资产额的证券投资所有盈利均由策略建议人享有。为保证委托资产额的安全，策略建议人向资产委托人支付策略风险保证金。</p>
              <div class="go">
                <router-link to="/trade" tag="button">申请策略</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="trade bg-gray cont">
      <div class="wrap">
        <div class="trade-head clearfix">
          <div class="title fl">
            <p class="line"></p>
            <p class="txt">最新策略</p>
          </div>
          <div class="title fr">
            <p class="line"></p>
            <p class="txt">最新盈利</p>
          </div>
        </div>
        <div class="trade-cont clearfix">
          <div class="fl part " ref=slide>
            <p class="no" v-show="dealList.length==0">暂无数据</p>
            <ul ref="slide1">
              <li class="item" v-for="(item,index) in dealList" :key="index">
                <ul class="item-line" >
                  <li >
                    <p>{{item.phoneNumber}} </p>
                    <p style="font-size: 15px">{{item.time_deal }}</p>
                  </li>
                  <li>
                    <p>{{item.stock_name}}</p>
                    <p>{{item.stock_code}}</p>
                  </li>
                  <li>
                    <p> {{item.deal_num}}股</p>
                    <p>{{item.deal_price}}</p>
                  </li>
                  <li>
                    <p>交易类型</p>
                    <p v-text="item.deal_type==0?'买入策略':'卖出策略'"></p>
                  </li>
                </ul>
              </li>
            </ul>
            <ul ref="slide2"></ul>
          </div>
          <div class="fr part profit" ref="slideTwo">
            <p class="no" v-show="profitList.length==0">暂无数据</p>
            <ul ref="slide3">
              <li class="item" v-for="(item,index) in profitList" :key="index" >
                <ul  class="item-line">
                  <li >
                    <p>{{item.phoneNumber}} </p>
                    <p  style="font-size: 15px">{{item.time_deal}}</p>
                  </li>
                  <li>
                    <p>{{item.stock_name}}</p>
                    <p>{{item.stock_code}}</p>
                  </li>
                  <li>
                    <p> {{item.deal_num}}股</p>
                    <p>{{item.deal_price}}</p>
                  </li>
                  <li>
                    <p>盈利分配</p>
                    <p class="color-red">{{item.profitMoney}}</p>
                  </li>
                </ul>
              </li>
            </ul>
            <ul ref="slide4"></ul>
          </div>

        </div>
      </div>
    </div>
    <div class="step cont bg-white">
      <div class="wrap">
        <div class="step-cont">
          <router-link  to="/trade">申请策略</router-link>
          <router-link to="/">撮合资产委托人</router-link>
          <router-link to="/">签署《委托投资协议》</router-link>
          <router-link to="/">支付策略风险保证金</router-link>
          <router-link to="/">提供证券投资策略建议信息</router-link>
          <router-link to="/">结算策略盈亏</router-link>
          <router-link to="/">终止策略</router-link>
        </div>
      </div>
    </div>
    <div class="news cont bg-gray" >
      <div class="wrap">
        <div class="news-cont">
          <ul class="clearfix">
            <li class="deep-gray">
              <div class="title">
                <p class="line"></p>
                <p class="txt">新闻中心</p>
                <span>NEWS</span>
              </div>
            </li>
            <li><img src="../../static/img/index/news1.png" alt=""></li>
            <li class="deep-gray list">
              <h3>{{nav1}}</h3>
              <p v-for="(item,index) in list1" :key="index"><router-link tag="span" :to="{name:'newsDetail',params:{id:item.id}}">{{item.sketch}}</router-link><span>{{item.timeAdd | dateFormat('YYYY.MM.DD')}}</span></p>
              <i class="jian"></i>
            </li>
            <li><img src="../../static/img/index/news2.png" alt=""></li>
            <li>NEWS</li>
            <li>NEWS</li>
            <li class="white-bg list">
              <h3>{{nav2}}</h3>
              <p v-for="(item,index) in list2" :key="index"><router-link tag="span" :to="{name:'newsDetail',params:{id:item.id}}">{{item.sketch}}</router-link><span>{{item.timeAdd | dateFormat('YYYY.MM.DD')}}</span></p>
              <i class="jian"></i>
            </li>
            <li><img src="../../static/img/index/news3.png" alt=""></li>
            <li class="white-bg list">
              <h3>{{nav3}}</h3>
              <p v-for="(item,index) in list3" :key="index"><router-link tag="span" :to="{name:'newsDetail',params:{id:item.id}}">{{item.sketch}}</router-link><span>{{item.timeAdd | dateFormat('YYYY.MM.DD')}}</span></p>
              <i class="jian"></i>
            </li>
            <li><router-link tag="button" to="/about/newsList">更多资讯</router-link></li>
          </ul>
        </div>
      </div>
    </div>
    <div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Banner from '../components/slider/banner-slider.vue'
  import {getBanner} from '../assets/js/globalApi/global'
  import {getList} from '../assets/js/newApi/news'
  import {GetChild} from '../assets/js/newApi/news'
  import {GetTrade} from '../assets/js/myTrade/myTrade'//最新交易
  import {GetLastProfit} from '../assets/js/myTrade/myTrade'//最新盈利
  import SliderDown from '../components/slider/sliderDown'
  //import vueSeamless from 'vue-seamless-scroll'
  export default {
    scrollToTop: true,
    components: { Banner,SliderDown},
    data () {
      return {
        animate:false,
        animate1:false,
        nowIndex:0,
        show:true,
        speed: 3000,
        slides: [],
        newsList:[],
        type:0,
        category_id:'',
        currentPage:1,
        pageSize:10,
        noticeList:[],
        noticeListNews:[],
        dealList:[],
        profitList:[],
        callIndexNow:'',
        nav:[],
        nav1:'',
        nav2:'',
        nav3:'',
        list:[],
        list1:[],
        list2:[],
        list3:[],
        number:0,
        number1:0,
        timer:null,
        scrollTimer:null,
        scrollTimer1:null,
        marginRoll:-100,
      }
    },
    methods: {
      //最新交易
      getTrade() {
        let that=this
        let result = GetTrade();
        result.then(res => {
          that.dealList = res.Data
          if (res.Data.length > 5) {
            this.$nextTick(() => {
              that.$refs.slide2.innerHTML = that.$refs.slide1.innerHTML;
              that.scrollTimer = setInterval(() => {
                if (that.$refs.slide2.offsetTop - that.$refs.slide.scrollTop <= 2)
                  that.$refs.slide.scrollTop -= that.$refs.slide1.offsetHeight;
                else {
                  that.$refs.slide.scrollTop++;
                }
              }, 50);
            });
          }
        })
      },
      //最新盈利
      getLastProfit() {
        let that=this
        let result = GetLastProfit();
        result.then(res => {
          that.profitList = res.Data
          if (res.Data.length > 5) {
            this.$nextTick(() => {
              this.$refs.slide4.innerHTML = this.$refs.slide3.innerHTML;
              this.scrollTimer1 = setInterval(() => {
                if (this.$refs.slide4.offsetTop - this.$refs.slideTwo.scrollTop <= 2)
                  this.$refs.slideTwo.scrollTop -= this.$refs.slide3.offsetHeight;
                else {
                  this.$refs.slideTwo.scrollTop++;
                }
              }, 50);
            });
          }
        })
      },
      //获取子类
      getNav() {
        let that = this
        let array = []
        let result = GetChild('InfomationCenter')
        result.then((res) => {
          res.Data.forEach(val => {
            if (val.isLock == 0) {
              array.push(val)
            }
          })
          that.nav = array
          that.nav1 = that.nav[0].title
          that.nav2 = that.nav[1].title
          that.nav3 = that.nav[2].title
          that.getNewsList1()
          that.getNewsList2()
          that.getNewsList3()
        })
      },
      //获取新闻列表
      getNewsList1() {
        let result = getList(this.pageSize, this.currentPage, this.nav[0].callIndex)
        result.then(res => {
          this.list1 = res.Data.Data.slice(0, 2)
        })
      },
      getNewsList2() {
        let result = getList(this.pageSize, this.currentPage, this.nav[1].callIndex)
        result.then(res => {
          this.list2 = res.Data.Data.slice(0, 2)
        })
      },
      getNewsList3() {
        let result = getList(this.pageSize, this.currentPage, this.nav[2].callIndex)
        result.then(res => {
          this.list3 = res.Data.Data.slice(0, 2)
        })
      },
      //获取公告
      getList() {
        let result = getList(this.pageSize, this.currentPage, "notice");
        result.then(res => {
          this.noticeList = res.Data.Data
          this.noticeListNews = res.Data.Data.slice(0, 5)
        })
      },
      //banner
      getBanner() {
        let result = getBanner(1);
        result.then(res => {
          this.slides = res.Data
        })
      }
    },
    beforeDestroy(){
      clearInterval(this.scrollTimer);
      clearInterval(this.scrollTimer1);
    },
    beforeRouteLeave(to, from, next) {
      clearInterval(this.scrollTimer);
      clearInterval(this.scrollTimer1);
      next();
    },
    mounted(){
      this.getNav()
      this.getBanner()
      this.getList()
      this.getTrade()
      this.getLastProfit()
    },

  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .no{text-align: center;line-height: 100px;}
  .noticeBox{height:40px;line-height:40px;background: #eaeaea;overflow: hidden;font-size: 14px;
    .box{
      li{height:40px!important;line-height: 40px}
    }
    span{display: block;line-height: 40px;height: 40px}
    span:first-child{margin-right: 85px;padding-left:27px;background: url("../../static/img/index/laba.png") no-repeat left center;background-size:21%}
    span:last-child{cursor: pointer}
  }
  .headTit{font-weight: bold;text-align: center;padding-top:60px;position: relative;
    .lineTit{    font-size: 14px;height: 64px;background: url(../../static/img/index/line.png) center no-repeat;padding: 0;}
    h3{text-align: center;font-size: 30px;color: #333;}
  }
  .cont{padding:80px 0}
  .title{margin-bottom: 60px;
    .line{width:60px;background: #666;height:3px;margin-bottom: 40px}
    .txt{color:#000;font-size: 30px;font-weight: bold}
  }
  .bg-gray{background: #f4f4f4!important;}
  .bg-white{background: #fff}
  .product{background: #fff;
    .en-title{padding:20px 18px;font-size:16px;font-weight: bold;color:#999;border:1px solid #999;letter-spacing: 2px;line-height: 16px;}
    .product-cont{
      .top-cont{margin-bottom: 60px;
        li{width:384px;padding:40px 15px;border:1px solid #9c221f;float:left;margin-right: 24px;
          h3{font-size: 24px;color:#333;font-weight: bold;text-align: center}
          p{font-size: 18px;line-height: 28px}
          img{height:115px;margin:36px auto 42px;display: block}
        }
        /*li:hover{background: #9c221f;border:0;color:#fff!important;
          h3{color:#fff}
         }*/
        li:first-child{border-top: 3px solid #9c221f}
        li:last-child{margin:0;border-bottom: 3px solid #9c221f}
        li.active{background: url("../../static/img/index/product2.png") no-repeat;height:355px;background-size: cover;color:#fff;
          h3{color:#fff}
        }
      }
      .bot-cont{
        .text{width:70%;padding-top:88px}
        p{line-height: 36px;color:#333;text-indent: 2em;padding-bottom: 35px}
        .go{text-align: right;padding-top:25px}
        button{font-size: 20px;color:#fff;padding:20px 50px;background: #b61d22}
      }
    }
  }
  .trade{
    .trade-cont{position: relative;
      .part{border:1px solid #ccc;border-top:2px solid #b61d22;padding:0 20px;width:49%;    height: 498px;overflow: hidden;}
      .item{padding:26px 0;border-bottom: 1px dashed #ccc;}
      ul.item-line{overflow: hidden;
        li{float:left;margin-right:47px;min-width: 72px;
          p:first-child{color:#999;padding-bottom: 10px}
          button{height:30px;line-height: 30px;text-align: center;border-radius: 10px;display: inline-block;color:#b61d22;width:112px;background: none;
            margin-top:10px}
        }
        li:last-child{margin:0}
      }

    }
  }
  .step{
    .step-cont{background: url("../../static/img/index/step-bg.png") no-repeat;height:315px;position: relative;
      a{position: absolute}
      a:first-child{top:224px;left:10px}
      a:nth-child(2){top:186px;left:170px}
      a:nth-child(3){top:120px;left:313px}
      a:nth-child(4){top:186px;left:525px}
      a:nth-child(5){top:120px;left:676px}
      a:nth-child(6){top:186px;left:905px}
      a:nth-child(7){top:224px;right:10px}
    }
  }
  .news{font-size: 14px;background: #F2F0EF;overflow: hidden;padding-bottom: 70px;
    .list{background: #2d2d2d;padding: 30px 20px;position: relative;
      p{color:#fff;line-height: 26px;}
      h3{color:#333}
      .jian{position: absolute;bottom:20px;right:20px;width:30px;height:10px}
    }
    .deep-gray{    background: #2d2d2d;
      .jian{background: url("../../static/img/index/jian-w.png") no-repeat}
    }
    .white-bg{background: #fff;
      p{color:#666}
      h3{color:#333!important;}
      .jian{background: url("../../static/img/index/jian.png") no-repeat}
    }
    .title{color:#fff;
      p{color:#fff;}
      .line{background: #fff;margin-bottom: 30px}
      span{font-size: 16px;padding-top: 32px;display: block}
    }
    .news-cont{
      li{width:20%;height:234px;float:left;
        h3{color:#fff;font-size: 20px;padding-bottom: 20px}
        p{
          span:last-child{float:right}
          span{width: 196px;height: 30px;overflow: hidden;display: block;line-height: 30px;cursor: pointer}
        }
      }
      li:nth-child(1){padding:52px 0 0 42px}
      li:nth-child(6){background: #ddd;font-size: 36px;color:#fff;line-height: 234px;text-align: center;}
      li:nth-child(5){font-size: 36px;color:#ddd;line-height: 234px;text-align: center;background: #fff}
      li:last-child{background: #9c221f;padding-top:98px;
        button{width:116px;line-height: 40px;display: block;margin:0 auto;border-radius: 10px;border:1px solid #fff;background: none;color:#fff;font-weight: bold;font-size: 20px}
      }
    }
  }
</style>
