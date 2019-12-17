<template>
  <div class="footer">
    <div class="wrap">
      <div class="footer-top">
        <ul class="fl">
          <li>
            <h3>首页</h3>
            <router-link to="/myTrade/myTrade">> 最新策略</router-link>
            <router-link to="/about/newsList">> 新闻资讯</router-link>
          </li>
          <li v-show="day!=''">
            <h3>短期策略</h3>
            <router-link :to="{path:'/myTrade/myTrade',query:{type:11}}">> 我的策略</router-link>
            <router-link to="/trade/trade" >> 短期策略</router-link>
          </li>
          <li v-show="month!=''">
            <h3>长期策略</h3>
            <router-link :to="{path:'/myTrade/myTrade',query:{type:12}}">> 我的策略</router-link>
            <router-link :to="{path:'/trade/trade',query:{type:12}}" > > 长期策略</router-link>
          </li>
          <li v-show="mom!=''">
            <h3>微策略</h3>
            <router-link :to="{path:'/myTrade/myTrade',query:{type:31}}">> 我的策略</router-link>
            <router-link :to="{path:'/trade/trade',query:{type:31}}">> 微策略</router-link>
          </li>
          <li>
            <h3>关于我们</h3>
            <router-link to="/about/newsList">> 新闻资讯</router-link>
            <router-link to="/about/aboutUs">> 平台优势</router-link>
          </li>
          <li>
            <h3>帮助中心</h3>
            <router-link to="/help" >帮助中心</router-link>
          </li>
        </ul>
        <ul class="code fr">
          <li>
            <h3>APP下载</h3>
            <router-link to="/">
              <img :src="app" alt="公众号" /><br />
            </router-link>
          </li>
          <li>
            <h3>客服</h3>
            <router-link to="/">
              <img :src="wxkf" alt="公众号" /><br />
            </router-link>
          </li>
          <li>
            <h3>微信公众号</h3>
            <router-link to="/">
              <img :src="wxCode" alt="公众号" /><br />
            </router-link>
          </li>
        </ul>
      </div>

     <!-- <div class="link">
        <span>友情链接：</span>
      <a v-for="(item,index) in frendLink" :key="index" :href="item.linkUrl" target="_blank">{{item.title}}</a>
      </div>-->
    </div>
    <div class="copyright">
     <div class="wrap"> {{this.$store.getters.allInfo.webCopyright}}{{this.$store.getters.allInfo.webCrod}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getBanner} from '../assets/js/globalApi/global'
  import {getList} from '../assets/js/newApi/news'
  import {GetAll} from '../assets/js/globalApi/global'
  export default {
    name: 'Footer',
    data () {
      return {
        frendLink:[],
        timer:null,
        help:[],
        day:'',
        month:'',
        mom:'',
        app:'',
        wxCode:'',
        wxkf:''
      }
    },
    methods:{
      //获取基本配置信息
      getConfig(){
        let result = GetAll()
        result.then((res)=>{
          this.app=res.appByAndroid
          this.wxCode=res.wechatQrCode
          this.wxkf=res.wechatServiceQrCode
        })
      },
      /*getType(){
        let result = ProductType()
        result.then((res)=>{
          res.Data.forEach((val)=>{
            if(val.productType==11){
              this.day=val.productName
            }else if(val.productType==12){
              this.month=val.productName
            }else if(val.productType==31){
              this.mom=val.productName
              this.remark=val.remark.split('；')
            }
          })
        })
      },*/
      getBanner(){
        let result = getBanner(4);
        result.then(res => {
          this.frendLink = res.Data
        })
      },
      //获取帮助中心标题
      getNewsList(){
        let result = getList(10,1,'help')
        result.then(res => {
          this.help = res.Data.Data
        })
      },
    },
    mounted(){
      this.getConfig()
      //this.getType()
        //this.$store.dispatch('getType')
      //this.$store.dispatch('getConfig')
      //this.$store.dispatch('getConfigOpen')
      //检测平台
      /*let p = navigator.platform;
      system.win = p.indexOf("Win") == 0;
      system.mac = p.indexOf("Mac") == 0;
      system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
      system.ipad = (navigator.userAgent.match(/iPad/i) != null) ? true : false;
      //跳转语句，如果是手机访问就自动跳转到wap.baidu.com页面
      if (system.win || system.mac || system.xll || system.ipad) {
      } else {
        window.location.href = "http://139.224.113.43:8002";
      }*/
    },

    created() {
      this.getBanner()
      this.getNewsList()
    },
    beforeDestroy() {
      clearInterval(this.timer)
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .footer{color: #666;background: #111;font-size: 16px;padding:80px 0 24px;
    .footer-top{padding-bottom: 40px;    border-bottom: 1px solid #9c221f;overflow: hidden;
  ul{}
  li{float:left;margin-left:58px;max-width:100px;
  h3{color: #fff;font-size: 18px;padding-bottom: 20px;border-bottom: 1px solid #9c221f;margin-bottom: 6px;text-align: center}
    p{padding-left: 2px;color:#999;padding-top:10px}
    a{padding-top:10px;padding-left: 2px;color:#999;display: block;}
    img{width:95px;height:95px;display: block}
  }
  li:first-child{margin:0}
}
    .code li{margin-left:20px}
    .link{line-height: 42px;background: #f5f5f5;    margin: 18px 0 30px;padding-left:10px;
      a{padding:0 6px;color:#999}
    }
    .copyright{height:40px;line-height: 40px;color:#fff;text-align: center;padding-top:15px}
  }
</style>
