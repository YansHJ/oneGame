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
      <span style="font-size: 30px">《一个肉鸽游戏》</span>
    </div>
    <div class="startButton">
      <v-btn
        elevation="2"
        outlined
        @click="startPageShow = false;changeNamePageShow = true"
      >开始游戏</v-btn>
    </div>
    </div>
<!--    命名界面-->
    <div class="changeName" v-show="changeNamePageShow">
      <div class="gameName">
        <span style="font-size: 30px">勇者,你的名字是...</span>
      </div>
      <div class="nameInput">
        <input
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
      tipsInfo:'',
      tipsInfoFlag:false,
      introduceInfo:'',
      startButtonShow:false,
      changeNameButton:true
    }
  },
  created() {
  },
  methods :{
    changeName(){
      this.changeNameButton = false
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
      const str = '欢迎你,冒险者 ' + this.braveName + ' ,这是一个没有想好世界观的世界,你的到来肯定会为我们带来希望,没有公主需要拯救,你的目标就是打败魔王,不断变强,称霸世界(成为魔王)';
      let i = 0;
      this.typing(i,str)
    },
    typing(i,str){
      if(i<= str.length){
        this.introduceInfo = str.slice(0,i++) + "_";
        setTimeout(() =>{this.typing(i,str);},200)
      }else{
        this.introduceInfo = str;
        this.startButtonShow = true
      }
    },
    jumpToStart(){
      this.$router.push({
        path:'/guidance'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

}
</style>
