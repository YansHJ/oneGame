<template>
  <div class="mainPage">

    <div class="introduce" v-show="true">
      <div class="introduceInfo">
        <span style="font-size: 20px;padding: 0 30px 0 30px">{{introduceInfo}}</span>
      </div>
    </div>
    <div class="Map">

      <Map :list="List" :ee="ee"></Map>

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
      ee:1
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
    //文字
    printIntroduce(){
      let str = ''
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
  margin: 0.5rem auto;
  text-align: center;
}
.mainPage {
  width: 100%;
  height: 100%;
}
.Map {
  width: 100%;
  height: 100%;
}
</style>
