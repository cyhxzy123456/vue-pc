<template>
  <div class="province-city">
   <el-form>
     <el-form-item class="page-form-item" label="" prop="status" >
       <el-select v-model="province" placeholder="请选择" @change="provinceChanged(province)">
         <el-option
           :key="''"
           :label="'请选择省'"
           :value="''">
         </el-option>
         <el-option
           v-for="(item,index) in provinces"
           :key="index"
           :value="item">
         </el-option>
       </el-select>
     </el-form-item>
   </el-form>
    <el-form>
      <el-form-item class="page-form-item" label="" prop="status" style=";margin-right: 0px">
        <el-select v-model="city"
                   :loading="loadingCity"
                   @change="cityChanged"
                   placeholder="请选择">
          <el-option
            :key="''"
            :label="'请选择市'"
            :value="''">
          </el-option>
          <el-option
            v-for="(item,index) in cities"
            :key="index"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/javascript" >
  import city from '../assets/js/city'
  export default {
    name: 'provinceCity',
    props: {
      provinceCode: {
        type: String,
        default: ''
      },
      cityCode: {
        type: String,
        default: ''
      }
    },

    computed: {

    },
    mounted() {
      this.province = this.provinceCode
      this.provinceChanged(this.provinceCode)
      this.city = this.cityCode
    },
    data() {
      return {
        loadingCity: false,
        province: '',
        city: '',
        provinces: city.provinceArr,
        cities:[]
      }
    },
    methods: {
      provinceChanged(value) {
        if (value !== '') {
          this.cities = city.cityArr[value]
          this.city = city.cityArr[value][0]
        } else {
          this.cities = []
          this.city = ''
        }
        this.$emit('selectChange', this.province, this.city)
      },
      cityChanged(value) {
        this.$emit('selectChange', this.province, this.city)
      },
    }
  }
</script>

<style  lang="less" scoped>
  province-city{
    .el-form{width:258px;height:58px;display: inline-block}
    .el-form-item{    width: calc(100%);height:100%}
    .el-form-item__content{height:58px;line-height: 58px}
    .el-select{width:100%;height:100%}
    .el-input__inner{height:58px;line-height: 58px;border:1px solid #ccc!important;}
  }
</style>
