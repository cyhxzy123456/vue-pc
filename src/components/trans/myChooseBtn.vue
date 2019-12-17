<template>
    <div class="add"><button v-text="word" @click="choose"></button></div>
</template>

<script>
  import {GetMychoose} from '../../assets/js/myTrade/myTrade'//添加自选
  import {AddMychoose} from '../../assets/js/myTrade/myTrade'//添加自选
  import {DeleteMychoose} from '../../assets/js/myTrade/myTrade'//删除自选
    export default {
      name: "myChooseBtn",
      props:['stockCodeBuy','stockNameBuy'],
      data(){
        return{
          word:'+ 自选',//自选按钮，
          myChooseList:[],
          pageSize:10,
          currentPage:1
        }
      },
      methods:{
        //自选数据获取
        myChoose(){
          let that=this
          let result = GetMychoose(that.pageSize,that.currentPage)
          result.then(res => {
            that.myChooseList = res.Data.Data
            let item = that.myChooseList.find(val => {
              return val.stockCode == that.stockCodeBuy;
            });
            if(item==undefined){
              that.word = '+ 自选'
            }else{
              that.word = '- 自选'
            }
          })
        },
        //判断股票是否在自选里面
        choose(){
          let that = this
          if(that.myChooseList.length==0){
            that.addChoose()
            return
          }else{
            let item = that.myChooseList.find(val => {
              return val.stockCode == that.stockCodeBuy;
            });
            if(item==undefined){
              that.addChoose()
            }else{
              that.deleteChoose(item.id)
            }
          }
        },
        //添加自选
        addChoose(){
          if(this.stockCodeBuy!==''){
            let result = AddMychoose(this.stockCodeBuy,this.stockNameBuy)
            result.then(res => {
              this.$alert('添加自选成功')
              this.myChoose()
              this.word = '- 自选'
            })
          }else{
            return
          }

        },
        //删除自选deleteMychoose
        deleteChoose(id){
          let result = DeleteMychoose(id)
          result.then(res => {
            this.myChoose()
            this.$alert('删除自选成功！')
            this.word = '+ 自选'
          })
        },
      },
      mounted() {
        this.myChoose()
      }
    }
</script>

<style scoped>
.add{display: inline-block;float:right}
button {
  color: #4d98e5;
  background: none;
  font-size: 16px;
  border: 1px solid #4d98e5;
  border-radius: 5px;
  line-height: 18px;
  width: 60px;
  text-align: center;
  float: right;
}
</style>
