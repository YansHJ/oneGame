<template>
  <div class="mainPage">
    <div class="tips" style="text-align: center;width: 70%;margin: 20px auto" v-show="tipsInfoFlag">
      <v-alert
        outlined
      >{{tipsInfo}}</v-alert>
    </div>
    <v-snackbar
      v-model="snackbar"
      :timeout="2000">
      {{ noticeInfo }}
    </v-snackbar>
<!--    怪物状态-->
    <div class="monsterState">
      <v-progress-linear v-model="absoluteHp" color="red"></v-progress-linear>
      <span style="margin-left: 2rem">{{ monsterName }}</span>
      <span style="margin-left: 2rem">HP:{{ HP }}/{{ totalHp }}</span>
      <span style="margin-left: 2rem">护甲:{{ armor }}</span>
    </div>
    <div class="monsterState">
      <v-progress-linear v-model="absoluteHp" color="red"></v-progress-linear>
      <span style="margin-left: 2rem">{{ monsterName }}</span>
      <span style="margin-left: 2rem">HP:{{ HP }}/{{ totalHp }}</span>
      <span style="margin-left: 2rem">护甲:{{ armor }}</span>
    </div>
<!--    战斗-->
    <div class="battlePage">
      <div class="battleInfo">
        <span style="margin: 3rem auto;color: red">123</span>
      </div>
    </div>

    <div class="roleState">
      <div>
        <span style="margin-left: 2rem">HP:{{ HP }}/{{ totalHp }}</span>
        <span style="margin-left: 2rem">护甲:{{ armor }}</span>
      </div>
      <v-progress-linear v-model="absoluteHp" color="red"></v-progress-linear>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tipsInfo:'',
      tipsInfoFlag:false,
      snackbar:false,
      noticeInfo:'',
      HP:'123',
      armor:'345',
      totalHp:'300',
      absoluteHp:'12',
      monsterName:'哥布林'

    }
  },
  created() {

  },
  methods :{
    printIntroduce(){
      this.snackbar = true
      this.weaponShow = false
      let str = 'emmm..虽然武器不是很好,但是也还是能用嘛,现在我来给你介绍一....啊,糟了,是附近的哥布林,这下怎么办..'
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
          this.introduceInfo = '做出选择'
          this.startButtonShow = !this.startButtonShow
        },1500)
      }
    },
    jumpToStart(){
      this.tipsInfoFlag = true
      this.tipsInfo = 'tips:开发中，敬请期待(v50加快进度)'
      setTimeout(() =>{
        this.tipsInfo = ''
        this.tipsInfoFlag = false
      },3000)
    },
    fail(){
      this.$router.push({
        path:'/fail'
      })
    }
  }
}
</script>

<style scoped>
.roleState {
  position: absolute;
  height: 4rem;
  width: 100%;
  bottom: 0;
}
.battlePage {
  background-color: aquamarine;
  margin: 10%;
  height: 26rem;
}
.battleInfo {
  border: 1px black;
  width: 70%;
  height: 20rem;
  background-color: black;
  margin: 0 auto;
}
</style>
