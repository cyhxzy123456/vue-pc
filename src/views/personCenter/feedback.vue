<template>
  <div class="feedback center-right">
    <ul class="nav">
      <li @click="cont=1" :class="{active:cont== 1}">意见反馈</li>
      <li @click="cont=2" :class="{active:cont== 2}">我的意见</li>
    </ul>
    <div class="cont1" v-show="cont==1">
      <!--  <h3>欢迎你留下对我们网站或产品的宝贵建议：</h3>-->
      <div class=" backBox">
        <p class="tit">意见主题</p>
        <input maxLength="100" type="text" v-model="title">
      </div>
      <div class="backBox">
        <p class="tit">意见描述</p>
        <textarea maxLength="100" name="back" id=""rows="10" placeholder="请输入反馈内容，我们会更好的为你服务！" v-model="content" ></textarea>
        <span class="num">{{content.length}}/100</span>
      </div>
      <div class="shortInp">
        <div class="vertify-short"><el-input  class=" short" v-model.trim="code" type="number" placeholder="请输入阿拉伯数字答案" ></el-input></div>
        <span class="code"><ImgVCode ref="code"></ImgVCode></span>
      </div>
      <p class="button"><button @click="commit" class="btn">提交反馈</button></p>
    </div>
    <div class="cont2" v-show="cont==2">
      <ul>
        <li v-for="(item,index) in backList" :key="index">
          <div>
            <span v-text="item.statusName" class="status">状态</span>
            <p class="fr"><span >{{item.addtime}}</span>
              <router-link tag="button" :to="{name:'feedbackDetail',params:{id:item.id}}">查看详情</router-link>
            </p>
          </div>
          <div>
            <p><span>主题:</span> <span  v-text="item.title"></span></p>
            <p><span>内容:</span> <span v-text="item.content"></span></p>
          </div>
          <button class="over" v-show="item.statusName!='已完成'" @click="overPop(item.id)">结束</button>
        </li>
      </ul>
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

    <Pop :isShow="showOverPop"  @closePop="close('showOverPop')" >
      <div class="overBox">
        <h3 slot="tit">结束工单</h3>
        <div>
          <div class="xingList">
            <div class="fl" >请您为此次体验评分</div>
            <div class="fr xing"><span v-for="(item,index) in star" :key="index" @click="chooseGrade(item.id)" :class="{active:grade>=item.id}">{{item.txt}}</span></div>
          </div>
          <p>评论</p>
          <div style="position: relative">
            <textarea  rows="10" maxLength="100" placeholder="请填写评论内容" v-model="comment"></textarea>
            <span class="num">{{comment.length}}/100</span>
          </div>
        </div>
        <button slot="btn" type="button" class="popBtn" @click="over">结束工单</button>
      </div>
    </Pop>
  </div>
</template>

<script>
  import {CommitFeedBack} from '../../assets/js/personCenterApi/personCenter'
  import {GetFeedBack} from '../../assets/js/personCenterApi/personCenter'
  import {OverFeedBack} from '../../assets/js/personCenterApi/personCenter'
  import Pop from '../../components/pop/pop'
  import ImgVCode from '../../components/code/ImgVCode'
  export default {
    name: "feedback",
    layout:'left',
    components:{Pop,ImgVCode},
    data(){
      return{
        code:'',
        title:'',
        content:'',
        cont:'1',
        paramCont:this.$route.params.cont,
        pageSize:10,
        currentPage:1,
        pageCount:0,
        status:-1,
        backList:[],//意见列表
        statusName:'',
        showOverPop:false,
        grade:'',
        comment:'',
        id:'',
        star:[
          {id:1,txt:'★'},
          {id:2,txt:'★'},
          {id:3,txt:'★'},
          {id:4,txt:'★'},
          {id:5,txt:'★'}
        ]
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
        this.getList()
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        this.getList()
      },
      //关闭弹窗
      close(attr){
        this[attr] = false
      },
      commit(){
        if(this.title == ''){
          this.$alert('请输入意见主题','消息提示')
          return
        }
        if(this.title.length<4){
          this.$alert('主题长度至少4个字')
          return
        }
        if(this.content == ''){
          this.$alert('请输入意见内容')
          return;
        }
        if(this.content.length<12){
          this.$alert('内容长度至少12个字')
          return
        }
        if(this.code==''){
          this.$alert('请输入图形验证码')
          return
        }
        let obj={"title":this.title,"content":this.content,"path":"",verifyCode:this.code}
        let result = CommitFeedBack(obj)
        result.then((res)=>{
          this.clear()
          this.$alert('感谢你的反馈与支持！', '提交成功', {
            cancelButtonText: '关闭',
            center: true
          })
          this.cont= 2
          this.getList()
        }).catch((err)=>{
          this.$refs.code.toggleVerifyCode()
        })
      },
      getList(){
        let result = GetFeedBack(this.pageSize,this.currentPage,this.status)
        result.then((res)=>{
          this.pageCount= res.Data.PageCount
          this.backList = res.Data.Data
        })
      },
      //选等级
      chooseGrade(id){
        this.grade = id
      },
      overPop(id){
        this.id = id
        this.showOverPop = true
      },
      //结束工单
      over(){
        if(this.grade ==''){
          this.$alert('请评分！')
          return
        }
        let result = OverFeedBack(this.id,this.grade,this.comment)
        result.then((res)=>{
          this.$alert('感谢您的宝贵意见！')
          this.showOverPop = false
          this.grade =''
          this.comment=''
          this.getList()
        })
      }
    },
    created() {
      if(this.paramCont==2){
        this.cont = 2
      }
      this.getList()
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .shortInp{width:50%;position: relative;    margin-left: 18%;margin-top: 20px;}
  .num{position: absolute;bottom: 10px;right:10px;}
  .xingList{font-size: 16px;margin-bottom: 20px;height: 30px;line-height: 30px}
  .overBox{
    textarea{width:100%;padding:20px}
    .xing{font-size: 30px;color:#999;margin-top:-10px}
    .xing span{padding:0 5px;cursor: pointer}
    .xing span.active{color:rgb(255, 204, 102)}
  }
  .feedback{width:100%;padding:35px;
    .nav{padding-bottom: 20px;
      li{display: inline-block;width:100px;line-height: 30px;text-align: center;cursor: pointer}
      li.active{color:#f24856;border-bottom:1px solid #f24856 }
    }
    h3{color:#222;font-size: 18px;padding-bottom: 25px;text-align: center}
    .backBox{ position: relative;
      textarea{width:100%;border-radius: 10px;min-height: 190px;padding:20px;border:1px solid #ccc;}
      span{position: absolute;bottom: 10px;right:10px;}
      input{width:100%;border-radius: 5px;line-height: 20px;border:1px solid #ccc;padding:10px 20px}
      .tit{line-height: 30px}
    }
    .button{margin-top:20px;}
    button{margin:0 auto}
    .cont2{
      li{overflow: hidden;padding:20px 0;border-bottom: 1px solid #eee;position: relative;
        button{margin-left:30px}
        .status{background: orange;color:#fff;padding:5px 20px;    margin-bottom: 10px;display: inline-block;}
        p{line-height: 28px;}
        span{word-break:break-all}
        .over{position: absolute;right:0;bottom: 0}
      }
    }
  }
</style>
