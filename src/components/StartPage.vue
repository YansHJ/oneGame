<template>
  <div class="mainPage">
    <div class="tips" style="text-align: center;width: 70%;margin: 20px auto" v-show="tipsInfoFlag">
      <v-alert
        outlined
      >{{tipsInfo}}</v-alert>
    </div>
<!--    开始界面-->
    <div class="startPage" v-show="startPageShow">
    <div class="gameName">
      <span style="font-size: 30px">《One Game》</span>
      <span style="font-size: 14px">V 0.6.1 Alpha测试版</span>
    </div>
    <div class="startButton">
      <v-btn
        elevation="2"
        outlined
        @click="startPageShow = false;changeNamePageShow = true;nameInput = true"
      >开始游戏</v-btn>
      <v-btn
        elevation="2"
        outlined
        @click="jumpToBattle"
        v-show="continueBtnShow"
      >继续挑战</v-btn>
      <v-btn
        elevation="2"
        outlined
        @click="jumpToUpdate"
        v-show="continueBtnShow"
      >更新日志</v-btn>
    </div>
<!--      <span style="font-size: 18px;text-align: center">Powered By Yans</span>-->
    </div>
<!--    命名界面-->
    <div class="changeName" v-show="changeNamePageShow">
      <div class="gameName">
        <span style="font-size: 30px">转生之人,你的名字是...</span>
      </div>
      <div class="nameInput">
        <input
          v-show="nameInput"
          v-model="braveName"
          style="border-radius: 15px;
          width: 300px;
          height: 35px;
          text-align: center;
          outline: none;
          border: 1px solid #46494C">
      </div>
      <div class="startButton" v-show="changeNameButton">
        <v-btn
          elevation="2"
          outlined
          @click="changeName"
        >决定了</v-btn>
      </div>
    </div>
<!--    介绍界面-->
    <div class="introduce" v-show="introducePageShow">
      <div class="introduceInfo">
        <span style="font-size: 20px;padding: 0 30px 0 30px">{{introduceInfo}}</span>
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
      startPageShow : true,
      changeNamePageShow:false,
      introducePageShow:false,
      braveName:'',
      continueBtnShow:false,
      tipsInfo:'',
      tipsInfoFlag:false,
      introduceInfo:'',
      startButtonShow:false,
      changeNameButton:true,
      nameInput: false
    }
  },
  created() {
    this.continueBtnChange()
  },
  methods :{
    changeName(){
      this.changeNameButton = false
      this.nameInput = false
      if (this.braveName === ''){
        this.tipsInfoFlag = true
        this.tipsInfo = '获得新成就：无名英雄'
        setTimeout(() =>{
          this.tipsInfo = ''
          this.tipsInfoFlag = false
          this.changeNamePageShow = false
          this.introducePageShow = true
          this.braveName = '王二狗'
          this.printIntroduce()
        },3000)
      }else {
        this.changeNamePageShow = false
        this.introducePageShow = true
        this.printIntroduce()
      }
    },
    printIntroduce(){
      const str = '机械声音:欢迎你,重生者' + this.braveName + ',这是一个没有想好世界观的世界,你的到来肯定会为我们带来希望,没有公主需要拯救,你的目标就是打败魔王,不断变强,称霸世界(成为魔王)';
      let i = 0;
      this.typing(i,str)
    },
    typing(i,str){
      if(i<= str.length){
        this.introduceInfo = str.slice(0,i++) + "_";
        setTimeout(() =>{this.typing(i,str);},150)
      }else{
        this.introduceInfo = str;
        this.startButtonShow = true
      }
    },
    jumpToStart(){
      this.$router.push({
        path:'/guidance'
      })
      localStorage.setItem("roleName",this.braveName)
    },
    jumpToBattle(){
      this.$router.push({
        path:'/battle',
        query:{
          monsterId:'10ac1904b1ca14b6',
          cardNum:2,
          layer:1
        }
      })
    },
    jumpToUpdate(){
      this.$router.push({
        path:'/update'
      })
    },
    continueBtnChange(){
      if (localStorage.getItem('roleName')){
        this.continueBtnShow = true
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mainPage {
  width: 100%;
  height: 100%;
}
.gameName {
  text-align: center;
  margin: 10rem auto;
}
.startButton {
  padding: 10%;
  text-align: center;
}
.changeName {
  margin: 0 auto;
  text-align: center;
}
.introduce {
  margin: 5rem auto;
  text-align: center;
}
.startPage {
  width: 100%;
  height: 100%;
}
</style>
