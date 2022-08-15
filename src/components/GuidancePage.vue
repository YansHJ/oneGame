<template>
  <div class="mainPage">
    <div class="tips" style="text-align: center;width: 70%;margin: 20px auto" v-show="tipsInfoFlag">
      <v-alert
        outlined
      >{{tipsInfo}}</v-alert>
    </div>
    <!--    介绍界面-->
    <div class="introduce" v-show="introducePageShow">
      <div class="introduceInfo">
        <span style="font-size: 20px;padding: 0 30px 0 30px">{{introduceInfo}}</span>
      </div>
      <div class="changeSex" v-show="changeSexPageShow">
        <div class="sex" style="width: 300px;margin: 0 auto;padding: 0 0 0 5rem">
          <v-radio-group
            v-model="roleSex"
            row>
            <v-radio
              color="secondary"
              label="猛男"
              value="man"
            ></v-radio>
            <v-radio
              color="secondary"
              label="少女"
              value="woman"
            ></v-radio>
          </v-radio-group>
        </div>
        <div class="startButton">
          <v-btn
            elevation="2"
            outlined
            @click="printIntroduce2"
            x-large
          >确定</v-btn>
        </div>
      </div>
      <div class="startButton" v-show="startButtonShow">
        <v-btn
          elevation="2"
          outlined
          @click="jumpToStart"
        >开始冒险</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      introducePageShow:true,
      braveName:'',
      tipsInfo:'',
      tipsInfoFlag:false,
      introduceInfo:'',
      startButtonShow: false,
      changeSexPageShow:false,
      roleSex:''
    }
  },
  created() {
    this.printIntroduce()
  },
  methods :{
    printIntroduce(){
      const str = '啊！你终于醒了,我看你一个人躺在这里昏迷好久了,对了,忘了自我介绍了,我是...这不重要，你快看看你现在的身体...';
      let i = 0;
      this.typing(i,str,true)
    },
    printIntroduce2(){
      this.changeSexPageShow = false
      let str = ''
      if (this.roleSex === 'man'){
        str = '你现在是一个肌肉猛男！战力肯定很高吧....或许一会...没事没事..对了,你还记得你之前是做什么的吗？'
      }else if (this.roleSex === 'woman'){
        str = '异世界的少女!或许,会有神奇的力量来应对接下来的....对了,你还记得你之前的职业嘛？'
      }
      let i = 0;
      this.typing(i,str,false)
    },
    typing(i,str,sex){
      if(i<= str.length){
        this.introduceInfo = str.slice(0,i++) + "_";
        setTimeout(() =>{this.typing(i,str,sex);},150)
      }else{
        this.introduceInfo = str;
        console.log(sex)
        if (sex === true){
          this.changeSexPageShow = !this.changeSexPageShow
        }
        if (this.roleSex !== ''){
          this.jumpToChangeWeapon()
        }
      }
    },
    jumpToChangeWeapon(){
      setTimeout(() =>{
       this.$router.push({
         path: '/ChangeWeapon'
       })
        if (this.roleSex === 'man'){
          localStorage.setItem("roleSex",'0')
        }else if (this.roleSex === 'woman'){
          localStorage.setItem("roleSex",'1')
        }

      },2500)
    }
  }
}
</script>

<style scoped>
.introduce {
  margin: 8rem auto;
  text-align: center;
}
.changeSex {
  margin: 5rem auto;
  text-align: center;
}
</style>
