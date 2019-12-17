<template>
    <div class="content_main">
      <div class="about-banner"></div>
     <div class="wrap">
      <div class="nav ">
        <ul class="clearfix">
          <li><router-link to="/about/aboutUs" active-class="active">公司简介</router-link></li>
          <li><router-link to="/about/newsList" active-class="active">新闻资讯</router-link></li>
        </ul>
      </div>
     </div>
      <div class="cont">
        <router-view/>
      </div>
    </div>
</template>

<script>
    export default {
        name: "about"
    }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .about-banner {background: url("../../../static/img/about/about-bg.png") center top no-repeat;height: 400px;color: #fff;}
  .nav{margin:60px 0;border-bottom: 1px solid #9c221f;
    ul{width:400px;margin:0 auto;display: block;margin-bottom: -1px;background: #f4f4f4;}
    li{line-height: 60px;width:200px;float:left;
    a{display: block;line-height: 60px;text-align: center;border: 1px solid #9c221f;border-bottom: 0;font-size: 30px;color:#333}
    }
    li a.active{background: #9c221f;color:#fff;}
  }
</style>
