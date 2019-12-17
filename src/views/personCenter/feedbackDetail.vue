<template>
  <div class="feedbackDetail">
    <div>
      <router-link class="backList" tag="a" :to="{name:'feedback',params:{cont:2}}">我的意见</router-link>
      <p class="fr"><span >{{backList.addtime }}</span></p>
    </div>
    <ul >
      <li >
        <div>
          <p><span>主题:</span> <span  v-text="backList.title"></span></p>
          <p><span>内容:</span> <span v-html="backList.content"></span></p>
        </div>
      </li>
    </ul>
    <ul class="manager" >
      <li v-for="(item,index) in manageList" :key="index">
        <div>
          <p class="fr"><span >{{item.addtime}}</span></p>
        </div>
        <div>
          <p class="manageBack" v-show="item!=''"><span v-text="item.usertype == 1?'追加意见：':'管理员回复:'">管理员回复:</span> </p>
          <p><span>内容:</span> <span v-text="item.content"></span></p>
        </div>
      </li>
    </ul>
    <p class="none" v-show="manageList.length==0">暂无回复</p>
    <p class="zj" v-if="show" @click="showOverPop=true" v-cloak>追加意见</p>
    <el-pagination style="padding-top:30px;text-align: right"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[5, 10, 20, 40]"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="pageCount">
    </el-pagination>
    <Pop :isShow="showOverPop"  @closePop="close('showOverPop')" >
      <div class="overBox">
        <h3 slot="tit">意见描述</h3>
        <div class="zhuijia">
          <textarea  rows="10" placeholder="请输入您的宝贵意见" maxlength="100" v-model="content"></textarea>
          <span class="num">{{content.length}}/100</span>
        </div>
        <div class="shortInp">
          <div class="vertify-short"><el-input  class=" short" v-model.trim="code" type="number" placeholder="请输入阿拉伯数字答案" ></el-input></div>
          <span class="code"><ImgVCode ref="code"></ImgVCode></span>
        </div>
        <button slot="btn" type="button" class="popBtn" @click="commitZj">提交意见</button>
      </div>
    </Pop>
  </div>
</template>

<script>
  import {GetFeedBack} from '../../assets/js/personCenterApi/personCenter'
  import {GetManage} from '../../assets/js/personCenterApi/personCenter'//获取后台回复
  import {Add} from '../../assets/js/personCenterApi/personCenter'//追加
  import Pop from '../../components/pop/pop'
  import ImgVCode from '../../components/code/ImgVCode'
  export default {
    layout:'left',
    name: "feedbackDetail",
    components:{Pop,ImgVCode},
    data(){
      return{
        title:'',
        pageSize:1000,
        currentPage:1,
        pageCount:0,
        status:-1,
        backList:{},//意见列表
        id:this.$route.params.id,
        manageList:[],
        content:'',
        showOverPop:false,
        code:'',
        show:false
      }
    },
    methods:{
      clear(){
        this.code=''
        this.title=''
        this.content=''
      },
      handleSizeChange: function (size) {
        this.pageSize = size;
        this.manage()
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        this.manage()
      },
      //关闭弹窗
      close(attr){
        this[attr] = false
      },
      getList(){
        let result = GetFeedBack(this.pageSize,this.currentPage)
        result.then((res)=>{
          res.Data.Data.forEach(val=>{
            if(val.id == this.id){
              this.backList= val
              if(val.status!=3){
                this.show=true
              }
            }
          })
        })
      },
      manage(){
        let result = GetManage(this.pageSize,this.currentPage,this.id)
        result.then((res)=>{
          this.pageCount= res.Data.PageCount
          this.manageList=res.Data.Data
        })
      },
      //追加
      commitZj(){
        if(this.content == ''){
          this.$alert('请输入追加意见')
          return
        }
        if(this.content.length<12){
          this.$alert('内容长度至少为12个字')
          return
        }
        if(this.code==''){
          this.$alert('请输入图形验证码')
          return
        }
        let result = Add(this.id,this.content,this.code)
        result.then((res)=>{
          this.clear()
          this.$alert('提交成功，我们会尽快为您处理！')
          this.showOverPop = false
          this.manage()
        }).catch((err)=>{
          this.$refs.code.toggleVerifyCode()
        })
      }
    },
    created() {
      this.getList()
      this.manage()
    },
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .img{right:0!important;}
  .shortInp{margin-top: 20px}
  [v-cloak]{display: none}
  .backList{    color: #f24856;
    border-bottom: 1px solid #f24856;}
  .none{text-align: center}
  .zj{cursor: pointer;width:200px;height: 40px;line-height: 40px;margin:0 auto;border-radius: 5px;background: #F24856;text-align: center;color:#fff;font-size: 16px;
    position: absolute;bottom: 0;left:40%}
  .feedbackDetail{width:100%;min-height: 400px;position: relative;padding-bottom: 60px;}
  li{overflow: hidden;padding:20px 0;border-bottom: 1px solid #eee;
    .status{background: orange;color:#fff;padding:5px 20px;    margin-bottom: 10px;display: inline-block;}
    p{line-height: 28px;
      span{word-break:break-all}
    }
    .manageBack{color:#F24856;font-weight: bold}
  }
  .tip{color:#F24856;font-weight: bold;padding:10px 0;text-align: center}
  .zhuijia{position: relative;
    textarea{width:100%;padding:20px}
    span{position: absolute;bottom: 10px;right:10px;}
  }
</style>
