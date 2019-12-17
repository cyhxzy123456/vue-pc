<template>
    <div class="moneyDetail">
      <div class="content">
     <!--   <h3>资金明细</h3>-->
        <div class="time">
          <span>时间：</span>
          <ul>
            <li v-for="(item,index) in timeNav" :key="index" @click="selectTime(item.time)" :class="{active:timeNow === item.time}">{{item.name}}</li>
          </ul>
        </div>
        <div class="type">
          <span>类型：</span>
          <ul>
            <li v-for="(item,index) in typeNav" :key="index" @click="selectNow(item.type)" :class="{active:typeNow === item.type}">{{item.name}}</li>
          </ul>
        </div>

        <table class="list_table">
          <tbody>
          <tr><th>时间</th><th>类型</th><th>交易号</th><th>收入</th><th>支出</th><th>余额</th><th>备注</th></tr>
          <tr v-for="(item ,index) in tableData" :key="index">
            <td v-text="item.timeUpdate"></td>
            <td v-text="item.serviceTypeName"></td>
            <td v-text="item.serviceId"></td>
            <td v-text="item.moneyGet"></td>
            <td v-text="item.moneyPay"></td>
            <td v-text="item.moneyTotal"></td>
            <td  width="200px">
              <p class="remark" v-text="item.remark"></p>
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
    </div>
</template>
<script>
  import {GetMoneyList} from '../../assets/js/personCenterApi/personCenter'
    export default {
      name: "assets",
      layout:'left',
      data(){
        return{
          timeNow:10000,
          typeNow:0,
          timeNav:[{name:'全部',time:10000},{name:'一星期',time:7},{name:'一个月',time:30},{name:'三个月',time:90},{name:'一年',time:365},],
          typeNav:[{name:'全部',type:0},{name:'充值提现',type:"30,31,32,102,103,104,105,110,131"},{name:'策略往来',type:"40,41,50,51,60,61,62,63,64,65,66,67,72,98"},{name:'费用明细',type:"20,21,22,66,72,302"},{name:'利润提取',type:"60,68"},],
          tableData: [],
          currentPage:1, //初始页
          pageSize:10,    //    每页的数据
          pageCount:0
        }
      },
      methods:{
        handleSizeChange: function (size) {
          this.pageSize = size;
          this.changeData()
        },
        handleCurrentChange: function(currentPage){
          this.currentPage = currentPage;
          this.changeData()
        },
        selectNow(type){
          this.typeNow = type
          this.changeData()
        },
        selectTime(time){
          this.timeNow = time
          this.changeData()
        },
        changeData(){
          let result = GetMoneyList(this.pageSize,this.currentPage,this.timeNow,this.typeNow)
          result.then((res)=>{
            this.pageCount = res.Data.PageCount
            this.tableData = res.Data.Data
          })
        }
      },
      created() {
        this.changeData()
      }
    }
</script>
<style   lang="less" >
  p.remark{line-height: 20px!important;}
  .list_table{    width: 100%;font-size: 14px;line-height: 40px;text-align: center;}
  .list_table th,.list_table td{border-bottom: 1px solid #ddd;line-height: 60px}
  .list_table th{ color:#fff;line-height: 60px;background: #666}
  .moneyDetail{
    .title{border-bottom: 1px solid #2f7ca8;height: 35px;
      span{display: inline-block;width: 100px;font-size: 14px;line-height: 14px;color: #2f7ca8;padding-bottom: 15px;border-bottom: 2px solid #2f7ca8;margin-left: 10px;text-align: center;}
    }
    .content{    width: initial;border: 1px solid #ccc;padding: 40px 40px 20px;
      h3{font-size: 16px;padding-bottom: 20px;border-bottom: 1px solid #eee;margin-bottom: 20px;color:#000;font-weight: bold}
      .time,.type{margin-bottom: 20px;
        ul{display: inline-block}
        li{border-radius: 10px;cursor: pointer;display: inline-block;width:100px;background: #fff;color:#333;border:1px solid #ccc;margin-right:30px;line-height: 30px;text-align: center}
        li.active{color: #fff;background-color: #9c221f;border-color: #9c221f;}
      }
      .el-table__header td,.el-table__header th{text-align: center;color:#333;font-weight: bold;}
    }
    .el-table td{text-align:center;line-height: 60px}
  }

</style>
