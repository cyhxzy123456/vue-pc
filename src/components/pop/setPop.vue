<template>
    <div class="setPop" v-show="isShow">
      <div class="pop">
        <div class="popCont">
          <div class="content-wrap">
            <a class="box-close" @click="close">x</a>
            <slot name="tit"></slot>
            <div class="list">
              <span class="">{{error}}</span>
              <slot></slot>
            </div>
            <button type="button" class="popBtn" @click="set" :disabled="abled">确认</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "setPop",
      props:['isShow','error','abled'],
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

<style rel="stylesheet/less" lang="less">
  .el-form-item__content{height:40px}
  .pop {z-index: 2;margin: 0px;padding: 0px;width: 100%;height: 100%;background: rgba(51, 51, 51,0.6);position: fixed;top: 0px;left: 0px;display: block;}
  .popCont{position: relative;padding: 15px;background: #fff;font-size: 12px;margin-top: -118.5px;margin-left: -240px;padding: 0px;border: none;
    z-index: 10000;position: fixed;top: 30%;left: 50%;display: block;max-height: 600px;overflow-y: scroll;
    .content-wrap{width:420px;margin: 0 30px;padding: 30px 0;text-align: left;position: relative;
      .box-close{    position: absolute;top: 20px;right: 0;color: #808080;
        font-size: 18px;height: 30px;width: 30px;text-align: center;display: block;line-height: 30px;}
      h3{    color: #556B96;border: none;margin-bottom: 10px;    font-size: 16px;font-weight: 700;padding-bottom: 20px}
    .popBtn{border-radius: 5px;background-color: #9c221f;color: #FFF;text-align: center;font-size: 14px;height: 46px;width: 170px;padding: 0;margin: 20px auto 0;display: block;border: 1px solid #9c221f;box-shadow: 1px 1px 3px rgba(0,0,0,0.3);font-weight: 700;}
    }
    .list input,.list .select{width:100%;height: 44px;line-height: 44px;border:1px solid #eee;padding-left:20px;color:#333;font-weight: bold;font-size: 14px;}
    .list ｛
    label{height:44px;}
    .shortInp {position: relative;display: block;
      img{top:0;right: 0}
    }
    //.error{color:red;display:block;margin-top:-20px;margin-bottom: 10px}
  }
</style>
