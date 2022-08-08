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
    <!--    卡牌-->
    <div class="introduce" v-show="true">
      <div class="introduceInfo">
        <span style="font-size: 20px;padding: 0 30px 0 30px">{{introduceInfo}}</span>
      </div>
    </div>
    <div class="cardArea" v-show="cardAreaShow">
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
              @click="addCard(item)"
            ><h4 style="color: darkorange ;margin: 0 1rem 0 70%;width: 2rem;">${{ item.price }}</h4>
              <v-img
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
    <div style="text-align: center" v-show="cardAreaShow">
      <h2>我的卡牌</h2>
      <v-divider></v-divider>
      <v-divider></v-divider>
    </div>
    <h3 v-show="cardAreaShow" style="margin: 0 0 0 1rem;">$ :{{ role.balance }}</h3>
    <h3 v-show="cardAreaShow" style="margin: 0 0 0 1rem;">卡牌数量：{{ myCardList.length }}</h3>
    <div class="myCard" v-show="cardAreaShow">
      <div class="card" v-for="(item) in myCardList">
        <v-card
          class="ma-4"
          height="9rem"
          width="100"
          @click=""
        ><v-img
          height="30px"
          src="https://s4.ax1x.com/2021/12/14/ovKMzd.jpg"
        />
          <h5 v-bind:style="item.color">{{ item.name }}</h5>
          <h3 style="color: red">{{ item.value }}</h3>
          <h6>{{ item.describe }}</h6>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import {drawCard, getMyCard} from "../api/get";
import {initRole} from "../api/post";
import {getRole} from "../api/get";
import {roleAddCard} from "../api/get";
import {updateLayer} from "../api/get";

export default {
  data () {
    return {
      tipsInfo:'',
      tipsInfoFlag:false,
      snackbar:false,
      noticeInfo:'',
      introduceInfo:'',
      list:[],
      myCardList:[],
      role:{
        id:'',
        name:'',
        type:'',
        attributeId:'',
        userId:'',
        createTime:'',
        sex:'',
        balance:'',
      },
      cardAreaShow:false,
    }
  },
  created() {
    this.initRoleMethods()
    this.getCardByNum(6)
    this.printIntroduce()
    this.myCard()
  },
  methods :{
    myCard(){
      setTimeout(()=>{
        getMyCard(this.role.id).then(res => {
          this.myCardList = res.data.data
        })
      },800)
    },
    addCard(item){
      if (this.role.balance - item.price < 0){
        this.noticeInfo = '资金不足'
        this.snackbar = true
        return
      }
      roleAddCard(this.role.id,item.identifier)
      updateLayer(this.role.id)
      this.$router.push({
        path:'/map'
      })
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
        drawCard(2).then(res => {
          this.list = res.data.data
        })
      },500)
    },
    //回合初抽牌
    getCardByNum(num){
      setTimeout(()=>{
        drawCard(num).then(res => {
          this.list = this.list.concat(res.data.data)
        })
      },500)
    },
    //文字
    printIntroduce(){
      this.weaponShow = false
      let str = '呼！还好打败了...快看看有什么战利品'
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
          this.introduceInfo = '做出选择(现版本只能买一个，下个版本更新)'
          this.cardAreaShow = true
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
.cardArea {
  margin: 0 auto ;
  width: 90%;
  height: 17rem;
  display: flex;
  text-align: center;
}
.card {
  display: flex;
  margin: 0 auto 0 auto;
}

.myCard {
  margin: 0 auto 0 auto;
  width: 90%;
  height: 17rem;
  display: flex;
  text-align: center;
}
</style>
