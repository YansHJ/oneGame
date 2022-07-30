<template>
  <div class="mainPage">
    <div class="tips" style="text-align: center;width: 70%;margin: 20px auto" v-show="tipsInfoFlag">
      <v-alert
        outlined
      >{{tipsInfo}}</v-alert>
    </div>
    <!--    介绍界面-->
    <div class="introduce" v-show="introducePageShow">
      <div class="introduceInfo">
        <span style="font-size: 20px;padding: 0 30px 0 30px">{{introduceInfo}}</span>
      </div>
      <div class="changeSex" v-show="changeSexPageShow">
        <div class="sex" style="width: 200px;margin: 0 auto;padding: 0 0 0 5%">
          <v-radio-group
            v-model="roleSex"
            row>
            <v-radio
              color="secondary"
              label="猛男"
              value="man"
            ></v-radio>
            <v-radio
              color="secondary"
              label="少女"
              value="woman"
            ></v-radio>
          </v-radio-group>
        </div>
        <div class="startButton">
          <v-btn
            elevation="2"
            outlined
            @click="printIntroduce2"
            x-large
          >确定</v-btn>
        </div>
      </div>
      <div class="startButton" v-show="startButtonShow">
        <v-btn
          elevation="2"
          outlined
          @click="jumpToStart"
        >开始冒险</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      introducePageShow:true,
      braveName:'',
      tipsInfo:'',
      tipsInfoFlag:false,
      introduceInfo:'',
      startButtonShow: false,
      changeSexPageShow:false,
      roleSex:''
    }
  },
  created() {
    this.printIntroduce()
  },
  methods :{
    printIntroduce(){
      const str = '你终于醒了,你已经重生并且穿越到这个新的世界了,快看看你现在的身体';
      let i = 0;
      this.typing(i,str,true)
    },
    printIntroduce2(){
      this.changeSexPageShow = false
      const str = '可以的';
      let i = 0;
      this.typing(i,str,false)
    },
    typing(i,str,sex){
      if(i<= str.length){
        this.introduceInfo = str.slice(0,i++) + "_";
        setTimeout(() =>{this.typing(i,str,sex);},200)
      }else{
        this.introduceInfo = str;
        console.log(sex)
        if (sex === true){
          this.changeSexPageShow = !this.changeSexPageShow
        }
      }
    },
    jumpToStart(){
      this.tipsInfoFlag = true
      this.tipsInfo = 'tips:开发中，敬请期待(v50加快进度)'
      setTimeout(() =>{
        this.tipsInfo = ''
        this.tipsInfoFlag = false
      },3000)
    }
  }
}
</script>

<style scoped>
.introduce {
  margin: 8rem auto;
  text-align: center;
}
.changeSex {
  margin: 5rem auto;
  text-align: center;
}
</style>
