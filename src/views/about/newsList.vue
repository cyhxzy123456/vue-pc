<template>
    <div class=" news-list">
        <div class="sub-nav">
          <div class="main-wrap wrap">
            <div class="line"></div>
            <ul>
              <li @click="change(item.callIndex)" :class="{active:callIndexNow==item.callIndex}"  v-for="(item,index) in nav" :key="index">{{item.title}}</li>
            </ul>
          </div>
        </div>
      <div class="wrap">
        <div class="content" >
          <ul class="news-list clearfix">
            <li v-for="(item,index) in list" :key="index">
              <router-link :to="{name:'newsDetail',params:{id:item.id}}">
                <div class="fl img"><img :src="item.imgUrl==''?newsImg:item.imgUrl"  alt=""></div>
                <div class="fl txt">
                  <h3>{{item.title}}</h3>
                  <p>{{item.sketch}}</p>
                  <span>{{item.timeAdd }}</span>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <el-pagination style="padding-top:30px;text-align: right"
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
</template>
<script>
  import {getList} from '../../assets/js/newApi/news'
  import {GetChild} from '../../assets/js/newApi/news'
  export default {
    name: "newsList",
    data(){
      return{
        list:[],
        firstList:[],
        nav:[],
        callIndexNow:'',
        currentPage:1,
        pageSize:10,
        newsImg:this.$store.getters.allInfo.logo,
        pageCount:''
      }
    },
    methods:{
      handleSizeChange: function (size) {
        this.pageSize = size;
        this.getNewsList()
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        this.getNewsList()
      },
      //获取子类
      getNav(){
        let array=[]
        let result = GetChild('InfomationCenter')
        result.then((res)=>{
          res.Data.forEach(val=>{
            if(val.isLock==0){
              array.push(val)
            }
          })
          this.nav=array
          this.callIndexNow=this.nav[0].callIndex
          this.getNewsList()
        })
      },
      //获取栏目标题
      /* getClass(){
         let result = GetClass()
         result.then(res => {
           this.nav = res.Data
         })
       },*/
      //获取新闻列表
      getNewsList(){
        let result = getList(this.pageSize,this.currentPage,this.callIndexNow)
        result.then(res => {
          this.list = res.Data.Data
          this.firstList=res.Data.Data.slice(0,1)
          this.pageCount=res.Data.PageCount
        })
      },
      //改变callindex
      change(callIndex){
        this.callIndexNow=callIndex
        this.getNewsList()
      }
    },
    mounted() {
      this.getNav()
      //this.getNewsList()
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .news-list{
    .news-banner {background: url(../../../static/img/news/news-banner.jpg) center no-repeat;height: 400px;width: 100%;}
    .sub-nav {padding-top:58px;
      .line{width:60px;background: #666;height:3px;margin-bottom: 36px}
      li {display: inline-block;margin-right:10px;line-height: 50px;cursor: pointer;font-size: 30px}
      li.active {color:#9c221f}
      li:last-child{margin:0}
    }
    .content{font-size: 18px;padding-bottom: 58px;
      .sub-class-title {font-size: 18px;margin-bottom: 20px;line-height: 1.4;}
      .news-list {
        li {background: #fff;padding:20px;margin-top:40px;border:1px solid #eee;overflow: hidden;position: relative;
          .img{width:272px;height:220px;margin-right:25px;border:1px solid #eee;
            img{width:100%}
          }
          .txt{overflow: hidden;width:74%;
            p{line-height: 36px;max-height: 100px}
            h3{padding-bottom: 27px;font-size: 20px;font-weight: bold}
            span{position: absolute;bottom: 42px;right:20px}
          }
        }
      }
    }
  }
</style>
