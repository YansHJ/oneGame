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
          v-model="temp"
          class="pa-4"
          center-active
          style="text-align: center"
        >
          <v-slide-item
            v-for="(item,n) in list"
            :key="n"
          >
            <div>
              <v-card
                class="ma-4"
                height="11rem"
                width="115"
                @click="trade(item,n)"
              >
                <v-img
                  height="30px"
                  src="https://s4.ax1x.com/2021/12/14/ovKMzd.jpg"
                />
                <h5 v-bind:style="item.color">{{ item.name }}</h5>
                <h3 style="color: red">{{ item.value }}</h3>
                <h6>{{ item.describe }}</h6>
              </v-card>

              <h3 style="color: darkorange ;text-align: center;">${{ item.price }}</h3>
            </div>
          </v-slide-item>
        </v-slide-group>
    </div>
    <div style="width: 100%;display: flex">
      <v-btn
        elevation="6"
        outlined
        style="margin: 0 auto 1rem auto"
        v-show="cardAreaShow"
        @click="refreshShop(2)"
      >
        刷新($2)</v-btn>
      <v-btn
        elevation="6"
        outlined
        style="margin: 0 auto 1rem auto"
        v-show="cardAreaShow"
        @click="endBuy"
      >
        结束购买</v-btn>
    </div>
    <div style="" v-show="cardAreaShow">
      <h3 style="margin: 0 0 0 2px">背包</h3>
      <v-divider></v-divider>
      <v-divider></v-divider>
    </div>
    <h4 v-show="cardAreaShow" style="margin: 0 0 0 1rem;">资金 : {{ role.balance }}$</h4>
    <h4 v-show="cardAreaShow" style="margin: 0 0 0 1rem;">牌库：{{ myCardList.length }}</h4>
    <div class="myCard" v-show="cardAreaShow">
      <v-slide-group
        v-model="temp"
        class="pa-4"
        center-active
        style="text-align: center"
      >
        <v-slide-item
          v-for="(item) in myCardList"
          :key="n"
        >
          <div>
            <v-card
              class="ma-4"
              height="11rem"
              width="115"
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
        </v-slide-item>
      </v-slide-group>
    </div>
  </div>
</template>

<script>
import {drawCard, getMyCard} from "../api/get";
import {initRole} from "../api/post";
import {getRole} from "../api/get";
import {roleAddCard} from "../api/get";
import {updateLayer} from "../api/get";
import {buy} from "../api/get";

export default {
  data () {
    return {
      temp:'',
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
      layer:999
    }
  },
  created() {
    this.initRoleMethods()
    this.checkLayer(this.layer)
    this.getCardByNum(6)
    this.printIntroduce()
    this.myCard()
    this.layer = this.$route.query.layer
    this.checkLayer(this.layer)
  },
  methods :{
    myCard(){
      setTimeout(()=>{
        getMyCard(this.role.id).then(res => {
          this.myCardList = res.data.data
        })
      },800)
    },
    checkLayer(layer){
      console.log(this.layer)
      console.log(layer)
      console.log(this.role)
      setTimeout(()=>{
        if (layer === 999){
          console.log(123)
          this.$router.push({
            path:'/map'
          })
        }else if (layer != (this.role.layer + 1)){
          console.log(456)
          this.$router.push({
            path:'/map'
          })
        }
      },1000)
    },
    refreshShop(price){
      buy(this.role.id,price).then(res=>{
        if (res.data.code === 400){
          this.noticeInfo = res.data.msg
          this.snackbar = true
          return
        }
        if (res.data.code === 200){
          this.noticeInfo = '刷新成功'
          this.snackbar = true
          this.list = []
          this.role.balance = res.data.data.balance
          this.getCardByNum(6)
        }
      })
    },
    trade(item,n){
      buy(this.role.id,item.price).then(res=>{
        if (res.data.code === 400){
          this.noticeInfo = res.data.msg
          this.snackbar = true
          return
        }
        if (res.data.code === 200){
          this.noticeInfo = '购买成功'
          this.snackbar = true
          this.role.balance = res.data.data.balance
          //删牌
          this.list.splice(n,1)
          this.addCard(item)
          setTimeout(()=>{
            this.myCardList = []
            this.myCard()
          },700)
        }
      })
    },
    endBuy(){
      updateLayer(this.role.id)
      setTimeout(()=>{
        this.$router.push({
          path:'/map'
        })
      },500)
    },
    addCard(item){
      roleAddCard(this.role.id,item.identifier)
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
          this.introduceInfo = '购买(为什么战利品需要花钱!)'
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
  margin: 2rem auto;
  text-align: center;
}
.cardArea {
  margin: 0 auto ;
  width: 90%;
  height: 15rem;
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
