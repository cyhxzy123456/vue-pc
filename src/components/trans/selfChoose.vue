<template>
    <div>
      <div class="">
        <div class="chooseList">
          <table class="myChoose">
            <tbody>
            <tr>
              <th>股票代码</th><th>股票名称</th><th>股票现价</th><th>涨跌</th><th>涨幅</th><th>操作</th>
            </tr>
            <tr v-for="(item,index) in myChooseList" :key="index">
             <!-- <td @click="buyChoose(item.stockCode)">查看</td> <td @click="deleteChoose(item.id)">×</td>-->
             <td v-text="item.stockCode"></td><td v-text="item.stockName"></td><td v-text="item.PriceCurrent"></td>
              <td :class="item.PriceRise>=0?'color-red':'color-green'" v-text="item.PriceRise"></td>
              <td >
                <span class="percent" :class="item.PriceRise>=0?'bg-red':'bg-green'" v-text="parseFloat(item.PriceRisePercent).toFixed(2)+'%'"></span>
              </td>
              <td class="pointer" ><span class="buy" @click="buy(item.stockCode)">委托买入</span><span @click="deleteChoose(item.id)">×</span></td>
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
    </div>
</template>

<script>
  import {DeleteMychoose} from '../../assets/js/myTrade/myTrade'//删除自选
  import {AddMychoose} from '../../assets/js/myTrade/myTrade'//添加自选
  import {GetMychoose} from '../../assets/js/myTrade/myTrade'//自选股池
  import {SearchStock} from '../../assets/js/myTrade/myTrade'//搜索
  import {Market} from '../../assets/js/myTrade/myTrade'//买5卖5
    export default {
        name: "selfChoose",
      props:['stockCodeBuy','id','stockid'],
      data(){
          return{
            myChooseCode:'',//自选代码
            myChooseName:'',//自选名称
            showChooseName:false,//自选名称是否显示
            myChooseList:[],//自选股池获取的数据
            nameList:[],//根据code获取名称，
            searchList:[],//搜索列表
            showSearch:false,//是否显示搜索
            currentPage:1,
            pageSize:10,
            pageCount:0,
          }
      },
      methods:{
        buy(code){
          this.$emit('buyBtn',code)
        },
        handleSizeChange: function (size) {
          this.pageSize = size;
          this.myChoose()
        },
        handleCurrentChange: function(currentPage){
          this.currentPage = currentPage;
          this.myChoose()
        },
        //搜索下拉表
        search(){
          let result = SearchStock(this.myChooseCode)
          result.then(res => {
            this.showSearch = true
            this.searchList = res.Data
          })
        },
        //搜索后选中
        searchChoose(val){
          this.showSearch = false
          this.myChooseCode = val
        },
        //显示自选股名称
        showName(){
          let result = Market(this.myChooseCode)
          result.then(res => {
            this.myChooseName=res.Data.StockName
            this.nameList = res.Data
            this.showChooseName = true
          })
        },

        //点自选股的查看
        buyChoose(val){
          this.$emit('click',val)
        },

        //自选数据获取
        myChoose(){
          let result = GetMychoose(this.pageSize,this.currentPage)
          result.then(res => {
            this.myChooseList = res.Data.Data
            this.pageCount=res.Data.PageCount
          })
        },
        //删除自选deleteMychoose
        deleteChoose(id){
          let result = DeleteMychoose(id)
          result.then(res => {
            this.$alert('删除自选成功！')
            this.myChoose()
          })
        },
      },
      watch:{
        myChooseCode:function(val){
          if(val.length<6){
            return
          }
          if(val.length === 6){
           this.showName()
          }
        }
      },
      created() {
        this.myChoose()
      }
    }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .buy{padding:3px 10px;border:1px solid red;font-size: 15px;border-radius: 10px;margin-right:10px}
.chooseList{
  table{width:100%;}
  th{background: #666;color:#fff;}
  th,td{height: 60px;line-height: 60px;border-bottom: 1px solid #ddd}
  span.percent{width:90px;border-radius: 10px;padding:0 15px;color:#fff}
}
</style>
