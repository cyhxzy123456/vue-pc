<template>
  <div class="slide">
    <div class="slideshow">
      <el-carousel  height='500px' :interval="4000" trigger="click">
        <el-carousel-item v-for="(img, index) in slides" :key="index">
          <a :href="img.linkUrl">
              <img :src="img.imgUrl">
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
  export default {
    props:['slides'],
    data () {
      return{
        timer: null, //定时器
        mark: 0, //比对图片索引的变量
      }
    },
  }
</script>
<style  lang="less" scoped>
  .slide {
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
  }
  .slideshow {
    width: 100%;
    height: 500px;
    .el-carousel{height: 100%;
        a{display:block;
          img{height: 500px;width: 100%;}
        }
    }
  }

</style>
