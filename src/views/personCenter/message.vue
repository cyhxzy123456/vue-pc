<template>
  <div class="message">
    <div class="content">
      <h3>消息中心</h3>
      <el-table ref="table"  :data="noticeList">
        <el-table-column  prop="categoryName" >
        </el-table-column>
        <el-table-column  prop="title">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <span>{{ scope.row.timeAdd}}</span>
          </template>
        </el-table-column>
        <el-table-column width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="toogleExpand(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
        <el-table-column type="expand" width="1">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="">
                <p v-html="props.row.content"></p>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
      </el-table>
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
  import {getList} from '../../assets/js/newApi/news'
  export default {
    name: "message",
    layout:'left',
    data(){
      return{
        noticeList: [],
        currentPage:1, //初始页
        pageSize:10,    //    每页的数据
        pageCount:0,    //    每页的数据
        type:0,
        category_id:36
      }
    },
    methods:{
      handleSizeChange: function (size) {
        this.pageSize = size;
        this.getNoticeList()
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        this.getNoticeList()
      },
      toogleExpand(row) {
        let $table = this.$refs.table;
        this.noticeList.map((item) => {
          $table.toggleRowExpansion(item, false)
        })
        $table.toggleRowExpansion(row)
      },

      getNoticeList(){
        let result = getList(this.pageSize,this.currentPage,'notice')
        result.then((res)=>{
          this.noticeList = res.Data.Data
          this.pageCount = res.Data.PageCount
        })
      }
    },
    created() {
      this.getNoticeList()
    }
  }
</script>
<style   lang="less" >
  .el-form-item__content{height:auto!important;}
  .message{
    .el-table thead{display: none!important;}
    /*  .el-form{width:100%}
      .el-form--inline .el-form-item{display: block!important;}
         .el-form--inline .el-form-item__content{display: block!important;}*/
    .title{border-bottom: 1px solid #2f7ca8;height: 35px;
      span{display: inline-block;width: 100px;font-size: 14px;line-height: 14px;color: #2f7ca8;padding-bottom: 15px;border-bottom: 2px solid #2f7ca8;margin-left: 10px;text-align: center;}
    }
    .content{    width: initial;border: 1px solid #ccc;margin-top: 20px;padding: 30px 20px;
      h3{font-size: 24px;padding-bottom: 20px;border-bottom: 1px solid #eee;margin-bottom: 20px;color:#333}
      .el-table__header td,.el-table__header th{text-align: center;color:#333;font-weight: bold;}
      .el-table__header th{display: none}
    }
    .el-table td{padding:8px 0;}
  }
</style>
