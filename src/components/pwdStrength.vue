<template>
    <div class="strength">
      <ul class="pass_set">
        <li id="strength_L" :style="{backgroundColor:this.Lcolor}">弱</li>
        <li id="strength_M" :style="{backgroundColor:this.Mcolor}">中</li>
        <li id="strength_H" :style="{backgroundColor:this.Hcolor}">强</li>
      </ul>
    </div>
</template>

<script>
    export default {
      name: "pwStrength",
      data(){
        return{
          O_color:'#eeeeee',
          L_color:'#ffd8b4',
          M_color:'#ffaf56',
          H_color:'#e85959',
          Lcolor:'',
          Mcolor:'',
          Hcolor:'',
          modes:0,
          Modes:0,
        }
      },
      methods:{
        //显示颜色
        pwdStrength(pwd) {
       let self=this
      if (pwd == null || pwd == '') {
        self.Lcolor = self.Mcolor = self.Hcolor = self.O_color;
      } else {
        let S_level = self.checkStrong(pwd);
        switch (S_level) {
          case 0:
            self.Lcolor = self.Mcolor = self.Hcolor = self.O_color;
          case 1:
            self.Lcolor = self.L_color;
            self.Mcolor = self.Hcolor = self.O_color;
            break;
          case 2:
            self.Lcolor = self.L_color;
            self.Mcolor = self.M_color;
            self.Hcolor = self.O_color;
            break;
          default:
            self.Lcolor = self.L_color;
            self.Mcolor = self.M_color;
            self.Hcolor = self.H_color;
        }
      }
    },
    //判断输入密码的类型
    CharMode(iN) {
      if (iN >= 48 && iN <= 57) //数字
        return 1;
      if (iN >= 65 && iN <= 90) //大写
        return 2;
      if (iN >= 97 && iN <= 122) //小写
        return 4;
      else return 8;
    },
    //bitTotal函数
    //计算密码模式
    bitTotal(num) {
       let that = this
      that.modes = 0;
      for (let i = 0; i < 4; i++) {
        if (num & 1) that.modes++;
        num >>>= 1;
      }
      return that.modes;
    },
    //返回强度级别
    checkStrong(sPW) {
       let my = this
      if (sPW.length <= 4) return 0; //密码太短
      my.Modes = 0;
      for (let i = 0; i < sPW.length; i++) {
        //密码模式
        my.Modes |= my.CharMode(sPW.charCodeAt(i));
      }
      return my.bitTotal(my.Modes);
    }
      }
    }
</script>

<style  lang="less">
  .pass_set {clear: both;height: 18px;line-height: 18px;overflow: hidden;width: 156px;overflow: hidden;
    li{float: left;text-align: center;width: 50px;border-right: 2px solid #fff;background: #ffd8b4;color: #fff;list-style-type: none;}
  }
</style>
