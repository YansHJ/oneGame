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
    <h4>倒计时：{{ countDown }}</h4>
<!--    战斗-->
    <div class="battlePage">
      <div class="battleInfo">
<!--        <span style="margin: 3rem auto;color: red">{{ battleInfo }}</span>-->
        <v-textarea
          outlined
          name="input-7-4"
          label="战斗信息"
          value=""
          disabled
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
              @click="attack(item,n)"
            ><v-img
              height="30px"
              src="https://s4.ax1x.com/2021/12/14/ovKMzd.jpg"
            />
              <h5 v-bind:style="item.color">{{ item.name }}</h5>
              <h3 style="color: red">{{ item.value }}</h3>
              <h6>{{ item.describe }}</h6>
            </v-card>
          </v-slide-item>
        </v-slide-group>
    </div>
    <div class="roleState">
      <div>
        <span style="margin-left: 2rem">{{ role.name }}</span>
        <span style="margin-left: 2rem">HP:{{ attribute.baseHealth }}/{{ attribute.maxHealth }}</span>
        <span style="margin-left: 2rem">护甲:{{ attribute.baseArmor }}</span>
      </div>
      <v-progress-linear v-model="roleAbsoluteHp" color="red"></v-progress-linear>
    </div>
  </div>
</template>

<script>
import {getCard} from "../api/get";
import {initRole} from "../api/post";
import {getRole} from "../api/get";

export default {
  data () {
    return {
      tipsInfo:'',
      tipsInfoFlag:false,
      snackbar:false,
      noticeInfo:'',
      roleAbsoluteHp:'',
      monsterName:'哥布林',
      monsterHP:'400',
      totalHp:'400',
      monsterAbsoluteHp:'100',
      list:[],
      battleInfo:'',
      role:{
        id:'',
        name:'',
        type:'',
        attributeId:'',
        userId:'',
        createTime:'',
        sex:''
      },
      attribute:{
        id:'',
        baseAttack:'',
        baseHealth:'',
        maxHealth:'',
        baseArmor:'',
      },
      countDown:10
    }
  },
  created() {
    this.getCardByNum(8)
    this.initRoleMethods()
    this.roundCountdown()
  },
  methods :{
    roundCountdown(){
      let b = true
      setInterval(() =>{
        this.countDown = 10
        if (b){
          if (this.list.length < 8){
            this.getCardByNum(2)
          }
          this.snackbar = true
          this.noticeInfo = '你的回合'
          setInterval(() =>{
            this.countDown = this.countDown - 1
          },1000)
          b = !b
        }else {
          this.snackbar = true
          this.noticeInfo = '你受到了未知力量的攻击'
          this.attribute.baseHealth = this.attribute.baseHealth -2
          b = !b
        }
      },10000)
    },
    initRoleMethods(){
      //本地无角色
      if (!localStorage.getItem("localRoleId")){
        this.role.sex = localStorage.getItem('roleSex')
        this.role.name = localStorage.getItem('roleName')
        initRole(this.role).then(res =>{
          if (res.data.code !== 200){
            this.noticeInfo = '网络异常'
            this.snackbar = true
          }else {
            this.role = res.data.data
            this.attribute = res.data.data.attribute
            this.roleAbsoluteHp = this.attribute.baseHealth / (this.attribute.maxHealth/100)
            localStorage.setItem("localRoleId",this.role.id)
          }
        })
      }else {
        getRole(localStorage.getItem("localRoleId")).then(res =>{
          if (res.data.code !== 200){
            this.noticeInfo = '网络异常'
            this.snackbar = true
          }else {
            this.role = res.data.data
            this.attribute = res.data.data.attribute
            this.roleAbsoluteHp = this.attribute.baseHealth / (this.attribute.maxHealth/100)
          }
        })
      }
    },
    //洗牌
    refresh(){
      getCard(8).then(res => {
        this.list = res.data.data
      })
    },
    //出牌
    attack(item,n){
      this.battleInfo = this.battleInfo + localStorage.getItem('roleName') + "使用了" + item.name + '--\n'
      if (item.type === 1){
        this.monsterHP = this.monsterHP - item.value
        if (this.monsterHP <= 0){
          this.monsterHP = this.totalHp
        }
        this.monsterAbsoluteHp = this.monsterHP / (this.totalHp / 100)
      }else if (item.type === 2){
        this.attribute.baseHealth = this.attribute.baseHealth + item.value
        if (this.attribute.baseHealth > this.attribute.maxHealth){
          this.attribute.baseHealth = this.attribute.maxHealth
        }
        this.roleAbsoluteHp = this.attribute.baseHealth / (this.attribute.maxHealth/100)
      }else if (item.type === 3){
        this.attribute.baseArmor = this.attribute.baseArmor + item.value
      }
      //删牌
      this.list.splice(n,1)
    },
    //抽牌
    getCardByNum(num){
      getCard(num).then(res => {
        this.list = this.list.concat(res.data.data)
      })
    },
    //文字
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
