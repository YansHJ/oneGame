<template>
  <div class="mainPage">
    <div class="localRole">
      <div class="title">
        <h3>本地角色</h3>
      </div>
      <div class="role">
        <v-expansion-panels focusable>
          <v-expansion-panel
            v-for="(item,i) in 1"
            :key="i"
          >
            <v-expansion-panel-header>{{ localRoleName }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <h4 style="width: 100%;margin: 1rem auto">职业：浪客</h4>
              <h4 style="width: 100%;margin: 1rem auto">历史最高层：{{ localMaxLayer }}</h4>
              <div class="btnGroup">
                <v-btn
                  elevation="1"
                  outlined
                  plain
                  style="margin: 0 0.5rem 0 0.5rem"
                  @click="jumpToBattle"
                >继续挑战</v-btn>
                <v-btn
                  elevation="1"
                  outlined
                  plain
                  style="margin: 0 0.5rem 0 0.5rem"
                  @click="deleteLocalRole"
                >删除角色</v-btn>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <div style="margin-bottom: 5rem">

      </div>
      <v-divider></v-divider>
    </div>
    <div class="onlineRole">
      <div class="title">
        <h3>线上角色</h3>
      </div>
    </div>
    <div class="role">
      <v-expansion-panels focusable>
        <v-expansion-panel
          v-for="(item,i) in 5"
          :key="i"
        >
          <v-expansion-panel-header>暂未开放</v-expansion-panel-header>
          <v-expansion-panel-content>
            暂未开放线上功能
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoleManagementPage",
  data (){
    return {
      localRoleName:'',
      localMaxLayer:0 ,
    }
  },
  created() {
    this.localRoleName = localStorage.getItem('roleName')
    this.localMaxLayer = localStorage.getItem('localMaxLayer')
  },
  methods:{
    jumpToBattle(){
      this.$router.push({
        path:'/battle',
        query:{
          monsterId:'10ac1904b1ca14b6',
          cardNum:2,
          layer:1
        }
      })
    },
    deleteLocalRole(){
      localStorage.removeItem('roleName')
      localStorage.removeItem('roleSex')
      localStorage.removeItem('localRoleId')
      localStorage.removeItem('localMaxLayer')
      this.$router.push({
        path:'/'
      })
    }
  }
}
</script>

<style scoped>
.mainPage {
  width: 100%;
  height: 100%;
}
.title {
  text-align: center;
  margin: 1.5rem auto 1.5rem auto;
}
.role {
  margin: 0 auto;
  width: 300px;
}
.btnGroup {
  display:flex;
  justify-content:center;
  align-items:center;
  margin: 1.5rem auto 0 auto;
}
</style>
