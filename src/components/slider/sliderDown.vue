<template>
  <div class="box">
    <ul id="roll-ul">
      <router-link @mouseover.native="clear" @mouseout.native="start"  :to="{name:'newsDetail',params:{id:item.id}}" tag="li" v-for="(item,index) in list" :key="index"  :class="{anim:animate==true}">
         <span>{{item.title}}</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
    export default {
      name: "sliderDown",
      props:['list'],
      data(){
        return{
          animate:false,
          timer:null,
        }
      },
      methods:{
        clear(){
          clearInterval(this.timer)
        },
        start(){
          this.timer=setInterval(this.scroll,2000)
        },
        scroll(){
          this.animate = true
          setTimeout(() => {
            this.list.push(this.list[0]);
            this.list.shift();
            this.animate= false;  // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
          },1500)
        },
      },
      beforeDestroy() {
        clearInterval(this.timer)
      },
      created() {
        this.timer=setInterval(this.scroll,2000)
      },
    }
</script>

<style  lang="less" scoped>
  .box {overflow: hidden;transition: all 0.5s;display: inline-block;width:60%;}
  .anim{transition: all 0.5s;}
  ul{height:40px;overflow: hidden;line-height: 40px;}
  li{cursor: pointer;
  span{display: block;line-height: 40px}
  }
</style>
