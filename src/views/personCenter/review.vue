<template>
  <div class="content_main review">
   <div class="wrap" >
     <p class="tip">股市有风险，投资需谨慎。本卷旨在了解您的可承受风险程度情况，对于您在本卷中所提供的一切信息，本公司将严格按照法律法规的要求承担保密义务。</p>
     <div>
       <div class="chooseList" v-for="(item,idx) in reviewList" :key="idx" >
         <h3 v-text="item.id+'、'+item.question"></h3>
         <p class="chooseItem" v-for="(anser,index) in item.last" :key="index">
           <input type="radio" :id="anser.key" :name="item.id" :value="anser.key" @click="putCheck(anser.key,idx)"><label  :for="idx+anser.key" v-text="anser.key+'、'+anser.value"></label>
         </p>
       </div>
       <button @click="test" class="commitRevie" :disabled="abled">提交</button>
     </div>
     <div class="describle">
      <p class="bold"> A/E得2分，B得5分，C得8分，D得10分</p><br>
       资方合作方拟与客户合作投资时提供资金额度为当前总额度。统计10道题，根据总分判断区间，客户当前总额度对应保证金<br>
       <p class="indent">1、得分30分及以下：保守型投资者，保证金为当前总额度的1/3;</p>
       <p class="indent">2、得分31~46分：谨慎型投资者，保证金为当前总额度的1/4;</p>　
       <p class="indent">3、得分47~63分：稳健型投资者，保证金为当前总额度的1/5</p>　
       <p class="indent">4、得分64~83分：积极型投资者，保证金为当前总额度的1/6;</p>　
       <p class="indent">5、得分84分及以上：激进型投资者，保证金为申当前总额度的1/7。</p>　
      <p> 注意事项：</p>
       <p>1. 当前总额度最低为5万元，最高200万元，百的整数倍，根据客户的得分情况向资金合作方如实介绍客户的投资偏好。（金额可设置）</p>
      <p> 2.输入当前总额度后根据客户等级判断应支付的保证金，保证金也是百的整数倍。例如，5万当前总额度，客户需支付1/7保证金，5万/7=7142.86，则保证金为7200。</p>
     </div>
   </div>
    <RealNamePop></RealNamePop>
  </div>
</template>
<script>
  import {GetReview} from '../../assets/js/personCenterApi/personCenter'
  import {CommitReview} from '../../assets/js/personCenterApi/personCenter'
  import RealNamePop from '../../components/pop/realNamePop'
  import Close from '../../components/pop/close'
  export default {
    name: "review",
    components:{RealNamePop,Close},
    data() {
      return {
        name:'评测',
        reviewList: [],
        answerList: [],
        checkList:[],
        //select:{},
        grade:this.$store.getters.userInfo.Grade,
        array:[],
        abled:false
      }
    },
    methods: {
      putCheck(val,id){
        let select = {}
        select.SelectAnswer = val
        select.Id = id//push(this.select)
        this.checkList.push(select)
      },
      test(){
        if(this.checkList.length < 10){
          this.$alert('每个选项必选，请检查没有选择的项！')
        }else{
          this.abled=true
          let result = CommitReview(this.checkList)
          result.then((res)=>{
          if(this.grade== 0){
            this.$alert('恭喜您，完成评估！')
            this.$router.push('/personCenter/setting')
            this.abled=false
          }else{
            let msg='重新评测结果已生成，需提交管理员审核确认';
            this.$confirm(msg, '重新评测', { cancelButtonText: '取消',confirmButtonText: '确认提交', })
              .then(()=>{
                this.$store.dispatch('userAction')
                this.$router.push('/personCenter/setting')
              })
          }
          })
        }
      },
      getReviewList() {
        let result = GetReview()
        result.then((res) => {
          res.reverse().map(val => {
            const ansList = []
            for (const i in val.answers) {
              let o = {};
              o[i] = val.answers[i];
              ansList.push({
                'key': i,
                'value': val.answers[i],
              })
            }
            val.last = ansList
          })
          this.reviewList = res
      })
      }
    },
    created() {
      this.getReviewList()
    }
  }
</script>

<style   lang="less" scoped>
.review{

.commitRevie{width: 200px;margin: 0 auto;display: block;height: 40px;line-height: 40px;border: 0;border-radius: 10px;color: #fff;background: #FF0000;font-size: 18px;}
  p{font-size: 16px;line-height: 30px}
  h3{line-height: 60px;color:#333;font-size: 18px;font-weight: bold}
  p.tip{padding-top:50px}
  p.chooseItem{line-height: 40px;}
  p.indent{text-indent: 2em}
  p.bold{font-weight: bold;color:#000}
  input{width: 20px;height: 20px;margin-right: 20px;}
}
</style>
