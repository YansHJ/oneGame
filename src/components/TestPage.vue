<template>
  <div class="mainPage">
    <div class="card">
      <v-slide-group
        v-model="battleInfo"
        class="pa-4"
        center-active
        style="text-align: center"
      >
        <v-slide-item
          :key="n"
        >
          <v-card
            class="ma-4"
            height="11rem"
            width="115"
            @click=""
          ><v-img
            height="30px"
            src="https://s4.ax1x.com/2021/12/14/ovKMzd.jpg"
          />
            <h5>快看看</h5>
            <h3 style="color: red">12</h3>
            <h6>消耗自己50%的血条,对敌方造成自己血量上限3倍的伤害,血量不足50%可是会死的哦</h6>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "TestPage"
}
</script>

<style scoped>
.mainPage {
  width: 100%;
  height: 100%;
}
.card {
  margin: 1rem auto;
  width: 90%;
  height: 17rem;
  /*display: flex;*/
}
</style>
