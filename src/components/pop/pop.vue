<template>
    <div class="setPop" v-show="isShow">
      <div class="pop">
        <div class="popCont">
          <div class="contentWrap">
            <a class="box-close" @click="close">x</a>
            <slot name="tit"></slot>
            <div class="list">
             <!-- <span class="error">{{error}}</span>-->
              <slot></slot>
            </div>
            <slot name="btn"></slot>

          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "pop",
      props:['isShow','error'],
      methods:{
        set(){
          this.$emit('setData')
        },
        close(){
          this.$emit('closePop')
        }
      }
    }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  //margin: -高/2 0 0 -宽/2;
  .pop {margin: 0px;padding: 0px;width: 100%;height: 100%;background: rgba(51, 51, 51,0.6);z-index: 10;position: fixed;top: 0px;left: 0px;display: block;}
  .popCont{padding: 15px;background: #fff;font-size: 12px;border: none;margin-top:-210px;
    z-index: 10000;position: fixed;top: 50%;left: 50%;display: block;margin-left:-210px;min-width:420px;min-height:220px;
    p{font-size: 18px;text-align: center;line-height:30px}
    .contentWrap{width:420px;margin: 0 30px;padding: 30px 0;text-align: left;position: relative;
      .box-close{    position: absolute;top: 20px;right: 0;color: #808080;
        font-size: 18px;height: 30px;width: 30px;text-align: center;display: block;line-height: 30px;}
      h3{    color: #556B96;border: none;margin-bottom: 10px;    font-size: 16px;font-weight: 700;padding-bottom: 20px}
    .popBtn{border: 0;background-color: #566B96;color: #FFF;text-align: center;font-size: 14px;
      height: 46px;width: 170px;padding: 0;margin: 20px auto 0;display: block;}
    }
    .list input,.list select{width:100%;height: 44px;line-height: 44px;border:1px solid #eee;padding-left:20px;color:#333;font-weight: bold;font-size: 14px;margin-bottom: 20px}
    .list .shortInp {position: relative;display: block;
      input.short{width:74%;}
      img{top:0;right: 0}
    }
    .error{color:red;display:block;margin-top:-20px;margin-bottom: 10px}
  }
</style>
