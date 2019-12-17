<template>
    <div class="about">
       <div class="introduction">
         <div class="wrap">
         <div class="product-head clearfix">
           <div class="clearfix">
             <div class="title fl">
               <p class="line"></p>
               <p class="txt">公司简介</p>
             </div>
            <!-- <div class="en-title fr">Product description +</div>-->
           </div>
           <div class="introduction-cont">
             <div class="inner clearfix">
               <div class="fl img"> <img src="" alt=""></div>
               <div class="fr txt">
                 <p>
                   {{this.$store.getters.allInfo.webName}}平台提供证券信息的撮合服务、风控技术服务、客服服务，为策略建议人与资产委托人提供一个优质的中介平台，上线至今为客户提供了全面的服务，体现了{{this.$store.getters.allInfo.webName}}平台的专业水准，获得了客户的一致好评{{this.$store.getters.allInfo.webName}}汇集了优秀的金融界精英，创始团队成员均具有多年的金融公司高经验，在金融专业知识上给客户提供策略支持，整合优化上下游服务，吸纳行业优秀人才，坚持诚信经营的理念，为更多的客户群体提供优质服务。
                 </p>
               </div>
             </div>
           </div>
         </div>
         </div>
      </div>
      <div class="do">
        <div class="wrap">
         <div class="inner">
           <p>      为资产委托人和策略建议人的合作提供信息撮合居间服务，风控技术服务、客服服务。</p>
         </div>
        </div>
      </div>
      <div class="youshi">
       <div class="wrap">
         <ul>
           <li>
             <h3>资金优势 </h3>
             <p>资产委托人合法拥有投资资金，把投资资金存放在证券账户中作为委托资产。系统自动风控技术，保障资金安全。</p>
           </li>
           <li>
             <h3>服务优势</h3>
             <p> 专业运营与客服团队，有任何问题及时在线解决，全程解答，问题无虑。</p>
           </li>
           <li>
             <h3>技术优势 </h3>
             <p>依托多年开发经验，不断优化系统，紧随行业发展，让您不错过行业红利，操作更加自如。</p>
           </li>
         </ul>
       </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "aboutUs",
      data(){
          return{

          }
      },
      methods:{

      },
    }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .title{margin-bottom: 60px;padding-top:58px;
    .line{width:60px;background: #666;height:3px;margin-bottom: 40px}
    .txt{font-size: 30px;}
  }
  .en-title{margin-top:58px;padding:20px 18px;font-size:16px;font-weight: bold;color:#999;border:1px solid #999;letter-spacing: 2px;line-height: 16px;}
.introduction{background: #fff;padding-bottom: 80px;
  .introduction-cont{padding:150px 86px 0;border:1px solid #eee;background: url("../../../static/img/about/about-bg1.png") no-repeat;
    .inner{padding:47px 32px;background: #fff;
      .img{width:200px;height:200px;background: #9c221f;border-radius: 10px;}
      .txt{width:75%;
        p{font-size: 18px;line-height: 40px;text-indent: 2em}
      }
    }
  }
}
.do{padding:80px 0;
  .inner{background: url("../../../static/img/about/do.png") no-repeat; padding:224px 0 180px 30px;}
  p{color:#fff;font-size: 18px;width:438px;line-height: 40px;}
}
.youshi{font-size: 18px;padding:80px 0;background: #fff;overflow: hidden;
  li{float:left;width:31.6%;margin-right:30px;border:1px solid #eee;padding:260px 35px 42px;height:498px;
  p{line-height: 40px;}
  h3{font-size: 24px;padding-bottom: 48px;font-weight: bold}
  }
  li:last-child{margin-right:0;}
  li:hover{background-color:#9c221f;
    p,h3{color:#fff}
  }
  li:nth-child(1){background: url("../../../static/img/about/about1.png") no-repeat 116px 62px;}
  li:nth-child(2){background: url("../../../static/img/about/about2.png") no-repeat 116px 62px;}
  li:nth-child(3){background: url("../../../static/img/about/about3.png") no-repeat 116px 62px;}
  li:nth-child(1):hover{background: url("../../../static/img/about/about1-h.png") no-repeat 116px 62px #9c221f;}
  li:nth-child(2):hover{background: url("../../../static/img/about/about2-h.png") no-repeat 116px 62px #9c221f;}
  li:nth-child(3):hover{background: url("../../../static/img/about/about3-h.png") no-repeat 116px 62px #9c221f;}
}
</style>
