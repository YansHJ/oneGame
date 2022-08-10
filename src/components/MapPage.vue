<template>
  <div class="mainPage">

    <div class="introduce" v-show="true">
      <div class="introduceInfo">
        <span style="font-size: 20px;padding: 0 30px 0 30px">{{introduceInfo}}</span>
      </div>
    </div>
    <v-snackbar
      v-model="snackbar"
      :timeout="2000">
      {{ noticeInfo }}
    </v-snackbar>
    <div class="Map">
      <div class="mapList" v-for="(item,index) in List" :key="index">
        <div class="maps" v-for="(innerItem,index) in item" :key="index" >
          <v-card
            class="ma-4"
            height="6rem"
            width="100"
            @click="selectLevel(innerItem)"
            outlined
            elevation="12"
            shaped
          >
            <h4>{{ innerItem.number }}</h4>
            <h6>{{ innerItem.describe }}</h6>
            <h6 style="color: red" v-if="innerItem.layer === role.layer"> 当前在这里 </h6>
            <img src="../assets/iconPng/battle.png" style="width: 2rem;height: 2rem" v-if="innerItem.type === 0">
            <img src="../assets/iconPng/clover.png" style="width: 2rem;height: 2rem" v-if="innerItem.type === 2">
            <img src="../assets/iconPng/ghost.png" style="width: 2rem;height: 2rem" v-if="innerItem.type === 1">
          </v-card>
        </div>
      </div>
      <!--      <Map :list="List"></Map>-->
    </div>

  </div>
</template>

<script>
import {initRole} from "../api/post";
import {getRole} from "../api/get";
import {getMap} from "../api/get";
import Map from "./temp/Map";

export default {
  components: {Map},
  data () {
    return {
      List: [] ,
      monsters:[],
      introduceInfo:'',
      noticeInfo:'',
      snackbar:'',
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
    }
  },
  created() {
    this.printIntroduce()
    this.initRoleMethods()
    this.initMap('0d07')
  },
  methods :{
    initMap(mapId){
      getMap(mapId).then(res =>{
        this.List = res.data.data
      })
    },
    //初始化角色
    initRoleMethods(){
      setTimeout(()=>{
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
      },800)
    },
    //文字
    printIntroduce(){
      let str = '_选择关卡_'
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
    //选择关卡
    selectLevel(item){
      if (item.layer !== this.role.layer + 1){
        this.noticeInfo = '不可以跳关哦'
        this.snackbar = true
      }else if (item.type === 0 || item.type === 1){
        this.$router.push({
          path:'/battle',
          query:{
            monsterId:item.monsterIds,
            cardNum:item.cardNum,
            layer:item.layer
          }
        })
      }else if (item.type === 2){
        this.$router.push({
          path:'/drawCard',
          query:{
            layer:item.layer
          }
        })
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
  margin: 0.5rem auto;
  text-align: center;
}
.mainPage {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.Map {
  width: 100%;
  height: 100%;
}
.mapList {
  display:flex;
  align-items: center;
  justify-content:center;
  width:100%;
  height:auto;
}
.maps {
  width:10rem;
  height:7rem;
  text-align: center;
}
</style>
