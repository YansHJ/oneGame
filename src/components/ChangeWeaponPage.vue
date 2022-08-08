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
      攻击+10
    </v-snackbar>
    <!--    选择武器-->
    <div class="changeWeaponPage" v-show="changeWeaponShow">
      <div class="introduceInfo">
        <span style="font-size: 20px;padding: 0 30px 0 30px">{{introduceInfo}}</span>
      </div>
      <div class="weaponList" v-show="weaponShow">
        <div class="sex" style="width: 300px;margin: 0 auto;padding: 0 0 0 5rem">
          <v-radio-group
            v-model="roleSex"
            row>
            <v-radio
              color="secondary"
              label="看起来不是很锋利的刀"
              value="1"
            ></v-radio>
            <v-radio
              color="secondary"
              label="生锈的手枪"
              value="2"
            ></v-radio>
            <v-radio
              color="secondary"
              label="魔法棒"
              value="3"
            ></v-radio>
          </v-radio-group>
        </div>
        <div class="startButton" style="margin: 5rem">
          <v-btn
            elevation="2"
            outlined
            @click="printIntroduce"
            x-large
          >选择</v-btn>
        </div>
      </div>
      <div class="startButton" v-show="startButtonShow" style="margin: 20rem auto">
        <v-btn
          elevation="2"
          outlined
          @click="jumpToStart"
        >开始战斗</v-btn>
        <v-btn
          elevation="2"
          outlined
          @click="fail"
        >快速逃离</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      changeWeaponShow:true,
      weaponShow:true,
      tipsInfo:'',
      tipsInfoFlag:false,
      introduceInfo:'',
      startButtonShow: false,
      roleSex:'',
      snackbar:false

    }
  },
  created() {
    this.introduceInfo = '选择一把武器'
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
      this.$router.push({
        path:'/battle',
        query:{
          monsterId:'10ac1904b1ca14b6',
          cardNum:2
        }
      })
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
.changeWeaponPage {
  margin: 8rem auto;
  text-align: center;
}
.weaponList {
  margin: 5rem auto;
  text-align: center;
}
</style>
