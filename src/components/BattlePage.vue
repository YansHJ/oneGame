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
<!--    卡牌-->
    <div class="cardArea">
      <v-btn
          elevation="14"
          outlined
          x-large
          class="card1"
      >{{ list[0].name}}</v-btn>
      <v-btn
        elevation="14"
        outlined
        x-large
        class="card1"
    >{{ list[2].name}}</v-btn>
      <v-btn
        elevation="14"
        outlined
        x-large
        class="card1"
    >{{ list[3].name}}</v-btn>
      <v-btn
        elevation="14"
        outlined
        x-large
        class="card1"
    >{{ list[4].name}}</v-btn>
      <v-btn
        elevation="14"
        outlined
        x-large
        class="card1"
    >{{ list[5].name}}</v-btn>
      <v-btn
          elevation="14"
          outlined
          x-large
          class="card1"
      >{{ list[6].name}}</v-btn>
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
      monsterName:'1',
      list:[
        {id: 1,name: '普攻'},
        {id: 2,name: '盾击'},
        {id: 3,name: '治疗'},
        {id: 4,name: '大招'},
        {id: 5,name: '闪避'},
        {id: 6,name: '撞死'}
      ]

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
  margin-top: 10%;
  height: 18rem;
}
.battleInfo {
  border: 1px black;
  width: 70%;
  height: 15rem;
  background-color: black;
  margin: 0 auto;
}
.cardArea {
  margin: 4rem auto;
  width: 90%;
  height: 10rem;
  /*display: flex;*/
}
.card1 {
  height: 17rem;
  width: 10%;
  margin: 1rem 2% 1rem 2%;
}
</style>
