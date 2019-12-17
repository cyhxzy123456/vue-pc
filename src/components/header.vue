<template>
  <div class="header">
    <div class="wrap">
      <div class="nav">
        <ul class="fl nav-list">
          <li> <img class="logo" :src="logo" alt=""></li>
          <li><router-link to="/" exact-active-class="active">网站首页</router-link></li>
          <li class="shu">丨</li>
          <li ><router-link to="/trade" exact-active-class="active">申请策略</router-link></li>
          <li class="shu">丨</li>
          <li><router-link  to="/myTrade/myTrade" exact-active-class="active">我的策略</router-link></li>
          <li class="shu">丨</li>
          <li><router-link to="/about/aboutUs" exact-active-class="active">关于我们</router-link></li>
          <li class="shu">丨</li>
          <li><router-link to="/help" exact-active-class="active">帮助中心</router-link></li>
        </ul>
        <div class="head-btn fr">
          <ul class="btn-list">
            <li v-show="this.$store.getters.token == ''"><router-link to="/login">登录</router-link></li>
            <li v-show="this.$store.getters.token == ''"><a @click="register">注册</a></li>
            <li style="border:0" v-show="!this.$store.getters.token == ''"><span v-show="!this.$store.getters.token == ''">{{this.$store.getters.userInfo.phoneNumber}}</span></li>
            <li class="center" v-show="!this.$store.getters.token == ''"><router-link to="/personCenter/user">个人中心</router-link></li>
            <li v-show="!this.$store.getters.token == ''" @click="logOut"><router-link to="/login">退出登录</router-link></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {GetAll} from '../assets/js/globalApi/global'
  import {GetConfig} from '../assets/js/globalApi/global'
  export default{
    data(){
      return{
        showList:false,
        WorkOrderIsLock:false,
        token:'',
        isOpen:this.$store.getters.isOpenFree,
        day:'',
        month:'',
        mom:'',
        logo:'',
        validReg:'',
      }
    },
    methods:{
      getConfigOpen(){
        let result = GetConfig()
        result.then((res)=>{
          this.validReg=res.validReg
        })
      },
      register(){
        if(this.validReg==0){
          this.$router.push('/login/register')
        }else{
          this.$alert('会员注册通道已关闭，详情请联系客服:'+this.$store.getters.allInfo.tel)
        }
      },
      //获取基本配置信息
      getConfig(){
        let result = GetAll()
        result.then((res)=>{
          this.logo=res.logoWhite
        })
      },
      logOut(){
        localStorage.clear()
      this.$store.commit('logout')
        this.$router.push('/login')
      },
      show(){
        //debugger
        if(this.token!=''){
          this.showList = true
        }else{
          this.showList = false
        }
      },
    },
    mounted() {
      this.getConfigOpen()
      this.getConfig()
      this.$store.dispatch('getConfig')
      this.$store.dispatch('getConfigOpen')
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .header{height:88px;font-size: 17px;text-align: center;color:#fff;position: fixed;top:0;width:100%;z-index: 1000;background: #111;overflow: hidden;
  .wrap{position: relative}
   .logo{height:60px;margin-top:14px}
    .nav{
      .nav-list{overflow: hidden;
        li{float: left;;height:88px;line-height: 88px;
          padding:0 22px;
          a{display: block;color:#fff;line-height: 88px}
        }
        li a.active{color:#b61d22;border-bottom:2px solid #b61d22;font-weight: bold}
        li.shu{width:10px;padding:0}
        li:first-child{padding-left:0}
      }
      .head-btn{margin-top:26px}
      .btn-list{
        li{width:100px;height: 36px;line-height:36px;border:1px solid #fff;border-radius: 10px;color:#fff;float:left;margin-left:10px}
        li.active{border:1px solid #b61d22;color:#b61d22}
        li.center{background: #9c221f;color:#fff;border-color:#9c221f}
        a{color:#fff}
      }
    }
  }
</style>

