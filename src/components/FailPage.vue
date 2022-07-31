<template>
  <div class="mainPage">
    <!--    选择武器-->
    <div class="changeWeaponPage">
      <div class="introduceInfo">
        <span style="font-size: 70px;padding: 0 30px 0 30px">{{introduceInfo}}</span>
      </div>
      <div class="startButton" style="margin: 20rem auto">
        <v-btn
          elevation="2"
          outlined
          @click="jumpToStart"
        >确定</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      introduceInfo:'',
    }
  },
  created() {
    this.introduceInfo = '游戏结束'
  },
  methods :{
    jumpToStart(){
      this.$router.push({
        path:'/'
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
