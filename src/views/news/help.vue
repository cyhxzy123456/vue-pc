<template>
  <div class="content_main">
    <div class="about-banner"></div>
    <div class="wrap">
      <div class="about-cont clearfix">
        <div class="nav fl">
          <ul>
            <li :class="{active:nowId==item.id}" @click="changeName(item.id)" v-for="(item,index) in aboutList" :key="index">{{item.title}}</li>
          </ul>
        </div>
        <div class="cont fr">
          <div class="content" v-html="content">
            股升网（https://www.gushengwang.com/ ）是广东同昇信息技术咨询有限公司全力打造的国内权威的实盘股票融资平台，注册资本10000万元。公司致力于为每一个投资人提供安全、便捷、灵活、可信赖的互联网股票信息服务。股升网由多位证券、金融、私募领域的资深专家，以及互联网精英团队共同组建而成。公司凭借多年金融行业投资经验，以客户为中心秉承专业、诚信、可靠、共赢的服务宗旨，以诚信共赢、高效专业的经营理念，不断加强创新能力，为广大股民、投资者轻松实现股票融资，财富增值，让您的融资操盘简单化，盈利放大化，实现长效共赢。在互联网+金融的浪潮下，股升网应时而生，凭借短线T+1免息的产品模式，赢得了良好的用户口碑和一大批忠实客户群体，股升网已成为短线股票爱好者心目中受欢迎的品牌。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getList} from '../../assets/js/newApi/news'
  export default {
    name: "aboutUs",
    data(){
      return{
        aboutList:[],
        typeNow:'',
        pageSize:10,
        currentPage:1,
        content:'',
        nowId:''
      }
    },
    methods:{
      changeName(id){
        this.nowId=id
        this.aboutList.forEach(val=>{
          if(this.nowId==val.id){
            this.content=val.content
          }
        })
      },
      getNewsList(){
        let result = getList(this.pageSize,this.currentPage,'help')
        result.then(res => {
          this.aboutList=res.Data.Data
          this.nowId=this.aboutList[0].id
          this.aboutList.forEach(val=>{
            if(this.nowId==val.id){
              this.content=val.content
            }
          })
        })
      },
    },
    mounted() {
      this.getNewsList()
    }
  }
</script>
<style  lang="less" scoped>
  .about-banner{height:390px;background: url("../../../static/img/about/help.jpg") no-repeat}
  .about-cont{padding:30px 0;
    .nav{width:180px;
      li{line-height: 46px;text-align: center;font-size: 16px;cursor: pointer}
      li:first-child{background: #f2f2f2;}
      li.active{background: #fa7e41;color:#fff}
    }
    .cont{width:980px;
      h3{    text-align: center;font-size: 18px;line-height: 2;font-weight: bold;color: #333;}
      .about-tit{text-align: center;

        img{display: block;margin: 14px auto 40px auto;}
      }
      .content{p{
        line-height: 34px;text-indent: 2em
      }}

    }
  }
</style>
