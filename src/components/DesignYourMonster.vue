<template>
  <div class="mainPage">

    <div class="introduce" v-show="true">
      <div class="introduceInfo">
        <span style="font-size: 20px;padding: 0 30px 0 30px">{{introduceInfo}}</span>
      </div>
    </div>
    <div class="designMonster">

    </div>
  </div>
</template>

<script>
import {drawCard} from "../api/get";
import {initRole} from "../api/post";
import {getRole} from "../api/get";
import {roleAddCard} from "../api/get";

export default {
  data () {
    return {
      introduceInfo:'',
    }
  },
  created() {
    this.printIntroduce()
  },
  methods :{
    //文字
    printIntroduce(){
      let str = '设计自己的Monster，有机会加入到游戏中'
      let i = 0;
      this.typing(i,str)
    },
    typing(i,str){
      if(i<= str.length){
        this.introduceInfo = str.slice(0,i++) + "_";
        setTimeout(() =>{this.typing(i,str);},150)
      }else{
        this.introduceInfo = str;
        setTimeout(()=>{
        },1500)
      }
    },
    //跳转
    jumpToStart(){
      this.tipsInfoFlag = true
      this.tipsInfo = 'tips:开发中，敬请期待(v50加快进度)'
      setTimeout(() =>{
        this.tipsInfo = ''
        this.tipsInfoFlag = false
      },3000)
    },
    //GG
    fail(){
      this.$router.push({
        path:'/fail'
      })
    }
  }
}
</script>

<style scoped>
.introduce {
  margin: 8rem auto;
  text-align: center;
}
</style>
