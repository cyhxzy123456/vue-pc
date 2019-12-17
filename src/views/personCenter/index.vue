<template>
    <div class="clearfix wrap content_main">
     <div class="cont">
       <div class="left fl">
         <personNav></personNav>
       </div>
       <div class="fr right">
         <router-view></router-view>
       </div>
     </div>
     <!-- <judgePop></judgePop>//判断冻结-->
    </div>
</template>
<script>
import personNav from '../../components/personCenter/personNav'
export default {
  components: {personNav}
}
</script>
<style   lang="less" scoped>
  .cont{overflow: hidden;margin: 60px auto 60px!important;background: #fff;border: 1px solid #eee;border-top: 5px solid #9c221f;padding: 40px;}
.right{width:854px;}
  .tit{line-height: 50px;padding-left:25px;color:#fff;font-size: 20px;background: #999}
.assets{overflow: hidden;}
  .account-table {padding: 40px 60px 40px 45px;border:1px solid #ddd;border-radius: 3px;position: relative;
    .left{width:408px;padding:32px 45px 15px 0;overflow: hidden;
      img{padding-left:22px;}
      li{position: relative;float:left;width:25%;    margin-top: 15px;
      span{border-radius: 5px;position: absolute;top:-152px;left:0;color:#fff;font-size: 14px;min-width:76px;height: 30px;line-height: 30px; background: #586995;text-align: center}
      }
      li:nth-child(2){
        span{top:-207px;background: #9C221F}
      }
      li:nth-child(3){text-align: center;
      span{top:-223px;left:13px;background: #9F3ED5}
      }
      li:nth-child(4){text-align: center;
      span{top:-242px;right:0;background: #009999}
      }
    }
    .right-cont{padding-left:50px;border-left:1px dashed #ddd;
      .head{margin-right: 24px;
        img{width:96px;height:96px;}
      }
      .num{padding-top:24px;}
      .middle{ padding:30px 0 18px;
       p{line-height:26px}
        span:last-child{color:#9c221f}
      }
      .bot{
        a{height:40px;line-height:40px;width:120px;border-radius: 5px;border:1px solid #384184;text-align: center;color:#384184;margin-right:22px;display: inline-block}
      a:last-child{background: #9c221f;color:#fff;border-color:#9c221f;margin:0}
      }
    }
  }
  .account {padding: 40px;border: 1px solid #DDD;background-color: #FFF;margin-top: 18px;
    .account-title {font-weight: 600;font-size: 20px;color: #333;}
    .my-trade-nodata {margin: 30px;padding: 20px;border-bottom: 2px solid #ECECEC;}
    .my-trade-nodata a {display: inline-block;background: #FF4400;color: #FFF;padding: 10px;border-radius: 5px;box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.2);}
  }
</style>
