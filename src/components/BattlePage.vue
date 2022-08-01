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
      <v-progress-linear v-model="monsterAbsoluteHp" color="red"></v-progress-linear>
      <span style="margin-left: 2rem">{{ monsterName }}</span>
      <span style="margin-left: 2rem">HP:{{ monsterHP }}/{{ totalHp }}</span>
      <span style="margin-left: 2rem">护甲:{{ armor }}</span>
    </div>
    <v-btn
      elevation="2"
      outlined
      @click="refresh"
    >洗牌</v-btn>
<!--    战斗-->
    <div class="battlePage">
      <div class="battleInfo">
<!--        <span style="margin: 3rem auto;color: red">{{ battleInfo }}</span>-->
        <v-textarea
          outlined
          name="input-7-4"
          label="战斗信息"
          value=""
          v-model="battleInfo"
          style="height: 500px"
        ></v-textarea>
      </div>
    </div>
<!--    卡牌-->
    <div class="cardArea">
        <v-slide-group
          v-model="battleInfo"
          class="pa-4"
          center-active
          style="text-align: center"
        >
          <v-slide-item
            v-for="(item,n) in list"
            :key="n"
          >
            <v-card
              class="ma-4"
              height="9rem"
              width="100"
              @click="attack(item)"
            ><v-img
              height="30px"
              src="https://s4.ax1x.com/2021/12/14/ovKMzd.jpg"
            />
              <p>{{ item.name }}</p>
              <p>数值:{{ item.value }}</p>
              <p>概率:{{ item.probability }}</p>
            </v-card>
          </v-slide-item>
        </v-slide-group>
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
import {getCard} from "../api/get";

export default {
  data () {
    return {
      tipsInfo:'',
      tipsInfoFlag:false,
      snackbar:false,
      noticeInfo:'',
      HP:'276',
      armor:'345',
      totalHp:'300',
      absoluteHp:'85',
      monsterName:'哥布林',
      monsterHP:'300',
      monsterAbsoluteHp:'100',
      list:[],
      battleInfo:''

    }
  },
  created() {
    this.getCardByNum()
  },
  methods :{
    refresh(){
      getCard(7).then(res => {
        this.list = res.data.data
      })
    },
    attack(item){
      this.battleInfo = this.battleInfo + localStorage.getItem('roleName') + "使用了" + item.name + '--\n'
      if (item.type === 1){
        this.monsterHP = this.monsterHP - item.value
        if (this.monsterHP <= 0){
          this.monsterHP = this.totalHp
        }
        this.monsterAbsoluteHp = this.monsterHP / (this.totalHp / 100)
      }
    },
    getCardByNum(){
      getCard(7).then(res => {
        this.list = res.data.data
      })
    },
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
  /*border: 1px solid black;*/
  margin-top: 10%;
  height: 18rem;
}
.battleInfo {
  /*border: 1px solid black;*/
  width: 70%;
  height: 10rem;
  margin: 0 auto;
}
.cardArea {
  margin: 2rem auto;
  width: 90%;
  height: 17rem;
  /*display: flex;*/
}
</style>
