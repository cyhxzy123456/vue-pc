
import {GetAll} from '../assets/js/globalApi/global'
import {GetConfig} from '../assets/js/globalApi/global'
import {ProductType} from '../assets/js/trade/trade'
import {GetUserInfo} from '../assets/js/personCenterApi/personCenter'
import {GetUserMoney} from '../assets/js/personCenterApi/personCenter'
import {GetBankList} from '../assets/js/personCenterApi/personCenter'
import {IsOpenFree} from '../assets/js/trade/trade'
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);
const state = {
  mobile: '',
  //baseUrl:'https://www.gxw188.com',
  apiUrl:'http://47.99.159.70:8006/',
  userMoney:0,
  token:'',
  refreshToken:'',
  expires_in:'',
  allInfo:{},//网站基本配置信息
  userInfo:'',//个人信息
  bankList:[],//存绑定的银行卡
  config:'',//开关
  isOpenFree:false,
  day:'',
  month:'',
  mom:'',
}
const getters = {
  day(state){
    return state.day
  },
  month(state){
    return state.month
  },
  mom(state){
    return state.mom
  },
  mobile(state){
    return state.mobile
  },
  token(state){
    return state.token
  },
  refreshToken(state){
    return state.refreshToken
  },
  expires_in(state){
    return state.expires_in
  },
  allInfo:function(state){
    return state.allInfo
  },
  userMoney:function(state){
    return state.userMoney
  },
  userInfo(state){
    return state.userInfo
  },
  bankList(state){
    return state.bankList
  },
  config(state){
    return state.config
  },
  isOpenFree(state){
    return state.isOpenFree
  },
}
const mutations={
  //存天
  setDay(state,value){
    state.day = value
  },
  setMonth(state,value){
    state.month = value
  },
  setMom(state,value){
    state.mom = value
  },
  //存用户名
  setUser(state,value){
    state.mobile = value
  },
  //存token
  setStorage(state,value){
    state.token = value
  },
  //清除refreshToken
  clearToken(state){
    state.refreshToken=''
  },
  //存绑定的银行卡
  setBankList(state,value){
    state.bankList=value
  },
  //存刷新token
  setFresh(state,value){
    state.refreshToken = value
  },
  //存过期时间
  expires(state,value){
    state.expires_in = value
  },
  userMoney(state,val){
    //获取余额
    state.userMoney = val
  },
  getAllInfo(state,val){
    //存配置信息
    state.allInfo = val
  },
  setConfig(state,val){
    //存配置信息开关
    state.config = val
  },
  getToken(state){
    return state.token;
  },
  getUserInfo(state,val){
    //获取信息
    state.userInfo = val
  },
  setFree(state,val){
    state.isOpenFree = val
  },
  logout (state) {
    state.userMoney=0,
      state.token='',
      state.refreshToken='',
      state.expires_in='',
      state.allInfo={},//网站基本配置信息
      state.userInfo='',//个人信息
      state.bankList=[],//存绑定的银行卡
      state.config='',//开关
      state.day='',
      state.month='',
      state.mom=''
  }
}
const actions = {
  //获取产品
  getType({commit}){
    let result = ProductType()
    result.then((res)=>{
      res.Data.forEach((val)=>{
        if(val.productType==11){
          commit("setDay",val.productName)
        }else if(val.productType==12){
          commit("setMonth",val.productName)
        }else if(val.productType==31){
          commit("setMom",val.productName)
        }
      })
    })
  },
  money({commit}){
    let result = GetUserMoney()
    result.then((res)=>{
      commit("userMoney",res.Data)
    })
  },
  //获取基本配置信息
  getConfig({commit}){
    let result = GetAll()
    result.then((res)=>{
      commit("getAllInfo",res)
    })
  },
  //获取基本配置信息开关
  getConfigOpen({commit}){
    let result = GetConfig()
    result.then((res)=>{
      commit("setConfig",res)
    })
  },
  userAction({commit}){
    let result = GetUserInfo()
    result.then((res)=>{
      commit("getUserInfo",res)
    })
  },
  //免费体验
  openFree({commit}){
    let result=IsOpenFree()
    result.then((res)=>{
      commit("setFree",res.Data)
    })
  },
  BankList({commit}){
    let result = GetBankList()
    result.then((res)=>{
      let array=[]
      if(res.Data!=null){
        array.push(res.Data)
        commit("setBankList",array)
      }else{
        commit("setBankList",array)
      }
    })
  }
}
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: [createPersistedState()]
});
export default store;
