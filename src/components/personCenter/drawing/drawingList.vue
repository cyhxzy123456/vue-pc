<template>
    <div class="drawingList">
      <table>
        <tbody>
        <tr><th>日期时间</th><th>提现银行卡</th><th>手续费</th><th>申请金额</th><th>提现状态</th><th>操作</th></tr>
        <tr v-for="(item,index) in drawList" :key="index">
          <td >{{item.timeApply}}</td><td v-text="item.accountInfo.split('#')[0]"></td>
          <td ><span>￥</span><span class="bold"  v-text="item.moneyLost"></span></td>
          <td ><span>￥</span><span class="bold"  v-text="item.moneyApply"></span></td>
          <td v-text="item.statusName"></td>
          <td >
            <span class="cancel"  v-text="item.status == 1?'撤回':'--'" @click="cancle(item.id,item.status)"></span>
          </td>
        </tr>
        </tbody>
      </table>
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
</template>

<script>
  import {GetDrawList} from '../../../assets/js/personCenterApi/personCenter'//提现列表
  import {CancleDraw} from '../../../assets/js/personCenterApi/personCenter'//撤回

  export default {
      name: "drawingList",
      components:{},
      data(){
        return{
          pageSize:10,
          currentPage:1,
          pageCount:0,
          drawList:[]
        }
      },
      methods:{
        handleSizeChange: function (size) {
          this.pageSize = size;
          this.drawingList()
        },
        handleCurrentChange: function(currentPage){
          this.currentPage = currentPage;
          this.drawingList()
        },
        //获取提现记录列表
        drawingList(){
          let result = GetDrawList(this.pageSize,this.currentPage)
          result.then((res)=>{
            this.drawList = res.Data.Data
            this.pageCount = res.Data.PageCount
            this.statusChoose()
          })
        },
        //撤回
        cancle(id){
          let result = CancleDraw(id)
          result.then((res)=>{
            this.$alert('撤回提现成功！')
            this.drawingList()
          })
        }
      },
    }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .cancel{cursor:pointer;margin:0 auto;line-height: 25px;display: block;background: #3182ad ;color:#fff;    width: 50px;height: 25px;line-height: 25px;text-align: center;border-radius: 5px;}
  .bold{color: #FF7F00;;font-weight: bold}
  table{width:100%;border:1px solid #eee;
    th{background: #999!important;color: #FFF;height: 50px;border: 0;line-height: 50px;}
    td{line-height: 36px;text-align: center;border-right:1px solid #eee;border-bottom:1px solid #eee}
  }
</style>
