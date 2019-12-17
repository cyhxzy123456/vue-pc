<template>
    <div>
      <setPop :isShow="ShowNickName" @closePop="close('ShowNickName')" @setData="setNickName" :error="nickTip" >
        <h3 slot="tit">修改昵称</h3>
        <input type="text" placeholder="请输入新昵称" v-model="nickName"/>
      </setPop>
    </div>
</template>

<script>
  import setPop from '../../../components/pop/setPop'
  import {updateNickName} from '../../../assets/js/personCenterApi/personCenter'

    export default {
      name: "realName",
      components:{setPop},
      data(){
        return{
          ShowNickName:false,//显示昵称弹窗
          nickTip:'',//修改昵称提示
          nickName:"",
        }
      },
      methods:{
        //关闭弹窗
        close(attr){
          this[attr] = false
          this.nickName=''
        },

        //修改昵称的‘确定’
        setNickName(){
          if(this.nickName == ''){
            this.$alert('请输入昵称')
          }else{
            let result = updateNickName(this.nickName)
            result.then((res)=>{
              this.$alert('修改昵称成功');
              this.ShowNickName = false
             this.$emit('nickNameClick')
            })
          }
        },
      }
    }
</script>

<style scoped>

</style>
