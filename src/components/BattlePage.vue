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
    <v-snackbar
      v-model="underAttackSnackbar"
      color="red accent-2"
      :timeout="2000">
      {{ noticeInfo }}
    </v-snackbar>
<!--    怪物状态-->
    <div class="monsterState">
      <v-progress-linear v-model="monsterAbsoluteHp" color="red"></v-progress-linear>
      <span style="margin-left: 2rem">{{ monster.name }}</span>
      <span style="margin-left: 2rem">HP:{{ monster.baseHealth }}/{{ monster.maxHealth }}</span>
      <span style="margin-left: 2rem">护甲:{{ monster.baseArmor }}</span>
    </div>
    <v-btn
      elevation="2"
      outlined
      @click="refresh"
      v-show=false
    >洗牌</v-btn>
<!--    战斗-->
    <div class="battlePage">
      <span class="scale-down-center" style="float:right; color:red;font-size: 4rem;margin: 0 3rem 0 0" v-show="monsterDamageShow">-{{ monsterDamage }}</span>
<!--      战斗信息-->
<!--      <div class="battleInfo">-->
<!--&lt;!&ndash;        <span style="margin: 3rem auto;color: red">{{ battleInfo }}</span>&ndash;&gt;-->
<!--        <v-textarea-->
<!--          outlined-->
<!--          name="input-7-4"-->
<!--          label="战斗信息"-->
<!--          value=""-->
<!--          disabled-->
<!--          v-model="battleInfo"-->
<!--          style="height: 500px"-->
<!--        ></v-textarea>-->
<!--      </div>-->
    </div>

<!--    卡牌-->
    <div class="cardArea">
      <div style="height: 3rem;">
<!--        行动力-->
        <span style="margin: 0 0 0 1rem;color: limegreen;font-size: 2rem">{{ steps }}/3</span>
<!--        结束回合-->
        <div style="float: right;margin-bottom: 2rem">
          <v-btn
            elevation="2"
            outlined
            @click="finishRound(2)"
            v-show="endRound"
          >结束回合</v-btn>
        </div>
      </div>
      <h4 style="margin: 0 0 0 1rem;">手牌：{{ list.length }}</h4>
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
              height="11rem"
              width="115"
              @click="attack(item,n)"
            ><CardImg :consumes="item.consumes"></CardImg>
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
import {initMonster} from "../api/get";
import {attack} from "../api/get";
import {heal} from "../api/get";
import {increaseArmor} from "../api/get";
import {underAttack} from "../api/get";
import {updateLayer} from "../api/get";
import {refreshCardCache} from "../api/get";
import CardImg from "./temp/CardImg";

export default {
  components: {CardImg},
  data () {
    return {
      tipsInfo:'',
      tipsInfoFlag:false,
      snackbar:false,
      underAttackSnackbar:false,
      noticeInfo:'',
      roleAbsoluteHp:'',
      monsterAbsoluteHp:'100',
      list:[],
      battleInfo:'',
      initCardNum:'',
      monster:{
        id:'',
        name:'哥布林',
        baseHealth:'400',
        maxHealth:'400',
        baseArmor:'100',
        level:'',
        type:'',
      },
      monsterSkill:{
        name:'',
        value:'',
      },
      role:{
        id:'',
        name:'',
        type:'',
        attributeId:'',
        userId:'',
        createTime:'',
        sex:'',
        layer:'',
      },
      attribute:{
        id:'',
        baseAttack:'',
        baseHealth:'',
        maxHealth:'',
        baseArmor:'',
      },
      whoRound:'',
      endRound:true,
      steps:3,
      layer:999,
      localMaxLayer:0,
      monsterDamageShow:false,
      monsterDamage:0,
    }
  },
  created() {
      this.monster.id = this.$route.query.monsterId
      this.initCardNum = this.$route.query.cardNum
      this.layer = this.$route.query.layer
      this.initBattlePage(this.monster.id,this.initCardNum)
  },
  methods :{
    checkLayer(layer){
      setTimeout(()=>{
        if (layer === 999){
          this.$router.push({
            path:'/map'
          })
        }else if (layer != (this.role.layer)){
          this.$router.push({
            path:'/map'
          })
        }
      },1000)
    },
    initBattlePage(monsterId,initCardNum){
      this.initRoleMethods()
      this.checkLayer(this.layer)
      this.initMonsterMethods(monsterId)
      this.getCardByNum(initCardNum)
      this.yourRound()
    },
    //初始化怪物
    initMonsterMethods(id){
      setTimeout(()=>{
        initMonster(id,localStorage.getItem("localRoleId")).then(res =>{
          if (res.data.code === 200){
            this.monster = res.data.data
          }
        })
      },500)
    },
    yourRound(){
      this.noticeInfo = '你的回合'
      this.snackbar = true
      this.steps = 3
      this.getCardByNum(6)
    },
    monsterRound(){
      this.noticeInfo = this.monster.name + '要攻击了!'
      this.snackbar = true
      setTimeout(()=>{
        underAttack(this.monster.id,this.role.id).then(res =>{
          if (res.data.code === 200){
            this.attribute = res.data.data.role.attribute
            this.battleInfo = this.battleInfo + this.monster.name + "使用了" + res.data.data.monsterSkill.name +',造成了 ' + res.data.data.monsterSkill.value +  ' 伤害\n'
            this.underAttackSnackbar = true
            this.noticeInfo = this.monster.name + "使用了" + res.data.data.monsterSkill.name +',造成了 ' + res.data.data.monsterSkill.value +  ' 伤害'
            this.roleAbsoluteHp = this.attribute.baseHealth / (this.attribute.maxHealth/100)
            setTimeout(()=>{
              this.finishRound(1)
            },2500)
          }
          if (res.data.code === 999){
            this.defeated(res.data.msg)
          }
        })
      },4000)
    },
    finishRound(i){
      if (i === 2){
        this.list =[]
        this.endRound = false
        this.whoRound = 2
        this.monsterRound()
      } else if (i === 1){
        this.endRound = true
        this.whoRound = 1
        refreshCardCache(this.role.id)
        this.yourRound()
      }
    },
    defeated(msg){
      if (msg!=='' || msg != null){
        this.noticeInfo = msg
      }else {
        this.noticeInfo = '你被击败了！'
      }
      this.snackbar = true
      this.attribute.baseHealth = 0
      this.attribute.baseArmor = 0
      this.roleAbsoluteHp = this.attribute.baseHealth / (this.attribute.maxHealth/100)
      localStorage.removeItem("localRoleId")
      console.log(localStorage.getItem('localMaxLayer'))
      console.log(this.role.layer)
      if (localStorage.getItem('localMaxLayer') < this.role.layer){
        localStorage.setItem('localMaxLayer',this.role.layer)
      }
      setTimeout(()=>{
        this.$router.push({
          path:'/fail'
        })
      },4000)
    },
    victory(msg){
      if (msg!==''){
        this.noticeInfo = msg
      }else {
        this.noticeInfo = '胜利！'
      }
      this.snackbar = true
      updateLayer(this.role.id)
      setTimeout(()=>{
        this.$router.push({
          path:'/map'
        })
      },4000)
    },
    //初始化角色
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
          if (res.data.code === 400){
            localStorage.removeItem("localRoleId")
            this.initRoleMethods()
          }
        })
      }
    },
    //洗牌
    refresh(){
      setTimeout(()=>{
        getCard(8,localStorage.getItem("localRoleId")).then(res => {
          this.list = res.data.data
        })
      },500)

    },
    //出牌
    attack(item,n){
      if (this.whoRound === 2){
        this.noticeInfo = '不是你的回合！'
        this.snackbar = true
        return
      }
      if (this.steps === 0){
        this.noticeInfo = '行动力不足！'
        this.snackbar = true
        return
      }
      if ((this.steps - item.consumes) < 0){
        this.noticeInfo = '行动力不足！'
        this.snackbar = true
        return
      }
      this.steps = this.steps - item.consumes
      //物理攻击
      if (item.type === 1){
        attack(this.monster.id,this.role.id,item.identifier).then(res => {
          if (res.data.code === 200){
            //成功
            this.monster = res.data.data.monster
            this.role = res.data.data.role
            this.attribute = res.data.data.role.attribute
            this.monsterAbsoluteHp = this.monster.baseHealth / (this.monster.maxHealth/100)
            this.battleInfo = this.battleInfo + localStorage.getItem('roleName') + "使用了" + item.name +',造成了' + item.value +  '伤害--\n'
            this.monsterDamageShow = true
            this.monsterDamage = res.data.data.card.value
            setTimeout(()=>{
              this.monsterDamageShow = false
            },1000)
          }else if (res.data.code === 666){
            //击败胜利
            this.monster.baseHealth = 0
            this.list = []
            this.victory(res.data.data.msg)
          }else if (res.data.code === 999){
            //失败
            this.list = []
            this.defeated(res.data.data.msg)
          }
        })
      }
      //回血
      if (item.type === 2){
        heal(this.role.id,item.identifier).then(res => {
          this.role = res.data.data.role
          this.attribute = res.data.data.role.attribute
          this.battleInfo = this.battleInfo + localStorage.getItem('roleName') + "使用了" + item.name +',恢复了' + item.value +  '生命--\n'
          this.roleAbsoluteHp = this.attribute.baseHealth / (this.attribute.maxHealth/100)
        })

      }
      //叠甲
      if (item.type === 3){
        increaseArmor(this.role.id,item.identifier).then(res =>{
          this.role = res.data.data
          this.attribute = res.data.data.attribute
          this.battleInfo = this.battleInfo + localStorage.getItem('roleName') + "使用了" + item.name +',叠了' + item.value +  '点甲--\n'
        })
      }
      // //更新角色状态
      // this.initRoleMethods()
      //删牌
      this.list.splice(n,1)
    },
    //回合初抽牌
    getCardByNum(num){
      setTimeout(()=>{
        getCard(num,localStorage.getItem("localRoleId")).then(res => {
          // this.list = this.list.concat(res.data.data)
          this.list = res.data.data
        })
      },500)
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
  /*margin-top: 10%;*/
  height: 18rem;
}
.battleInfo {
  /*border: 1px solid black;*/
  width: 70%;
  height: 10rem;
  margin: 0 auto;
}
.cardArea {
  margin: 1rem auto;
  width: 90%;
  height: 17rem;
  /*display: flex;*/
}

/*动画*/

/*右上角滑动*/
.scale-down-center {
  -webkit-animation: scale-down-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) ;
  animation: scale-down-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) ;
}
/* ----------------------------------------------
 * Generated by Animista on 2022-8-20 18:58:54
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info.
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation scale-down-center
 * ----------------------------------------
 */
@-webkit-keyframes scale-down-center {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  100% {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
  }
}
@keyframes scale-down-center {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  100% {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
  }
}


</style>
