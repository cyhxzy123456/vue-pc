<template>
    <div class="hot">
      <div class="news-r">
        <h3>主编推荐</h3>
        <div class="box">
        <ul id="roll-ul">
            <router-link @mouseover.native="clear1" @mouseout.native="start1"  :to="{name:'newsDetail',params:{id:item.Id}}" tag="li" v-for="(item,index) in hotList" :key="index"  :class="{anim:animate==true}">
               <span>{{item.sketch}}</span>
            </router-link>
            </ul>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import {getList} from '../assets/js/newApi/news'
    export default {
      data(){
        return{
          hotId:33,
          typeHot:1,
          newId:36,
          typeNew:2,
          hotList:[],
          newList:[],
          currentPage:1,
          pageSize:10,
          pageCount:0,
          animate:false,
          timer1:null,
          timer2:null,
          callIndexNow:'news',
        }
      },
      methods: {
        clear1(){
          clearInterval(this.timer1)
        },
       /* clear2(){
          clearInterval(this.timer2)
        },*/
        start1(){
          this.timer1=setInterval(this.scroll,2000)
        },
        /*start2(){
          this.timer2=setInterval(this.scroll2,2000)
        },*/
        recommend() {
          let result = getList(this.pageSize,this.currentPage,this.callIndexNow)
          result.then(res => {
            this.hotList = res.Data.Data
          })
        },
       /* newNotice() {
          let result = getNotice(this.newId, this.pageSize, this.currentPage, this.typeNew);
          result.then(res => {
            this.newList = res.data
          })
        },*/
        scroll(){
          this.animate = true
          setTimeout(() => {
            this.hotList.push(this.hotList[0]);
            this.hotList.shift();
            this.animate= false;  // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
          },1500)
        },
       /* scroll2(){
          this.animate = true
          setTimeout(() => {
            this.newList.push(this.newList[0]);
            this.newList.shift();
            this.animate= false;  // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
          },1500)
        }*/
      },
      created() {
        this.recommend()
        //this.newNotice()
        this.timer1=setInterval(this.scroll,2000)
       /* this.timer2=setInterval(this.scroll2,2000)*/
      },
      beforeDestroy() {
        clearInterval(this.timer1)
       /* clearInterval(this.timer2)*/
      }
    }
</script>

<style  lang="less" scoped>
  .hot{
    .box {overflow: hidden;transition: all 0.5s;}
    .anim{transition: all 0.5s;}
    h3{background: #31b0d5!important;color: #fff!important;height: 36px;line-height: 36px;padding-left:10px}
    ul{max-height: 216px;overflow: hidden;min-height:20px}
    .news-r-tit{height: 40px;line-height: 40px;background-color: #be0000;color: white;text-align: center;border-radius: 5px 5px 0 0;}
    li{cursor: pointer;line-height:36px;height:36px;color: #808080;margin:0 10px;font-size: 14px;border-bottom: 1px solid #eee;overflow: hidden;white-space: nowrap;
      -ms-text-overflow: ellipsis;text-overflow: ellipsis;}
  }

</style>
