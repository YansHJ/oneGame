<template>
  <div class="mainPage">
    <div style="text-align: center;margin: 1rem">
      <a style="float: left" @click="backToStart">< 返回</a>
      <span>更新日志</span>
    </div>
    <v-divider></v-divider>
    <div class="timeline">
      <v-card-text class="py-0">
<!--        V 0.6.1-->
        <v-timeline
          align-top
          dense
        >
          <v-timeline-item
            color="pink"
            small
          >
            <v-row class="pt-1">
              <v-col cols="5">
                <strong>2022-08-10</strong>
              </v-col>
              <v-col>
                <strong>V 0.6.1 Alpha</strong>
                <div class="text-caption">
                  1.修复反复返回刷哥布林和商店问题
                </div>
                <div class="text-caption">
                  2.优化展示和布局
                </div>
                <div class="text-caption">
                  3.新增更新日志
                </div>
              </v-col>
            </v-row>
          </v-timeline-item>

        </v-timeline>
      </v-card-text>
    </div>
  </div>
</template>

<script>
export default {
  name: "UpdateInfo",
  methods:{
    backToStart(){
      this.$router.push({
        path: '/'
      })
    },
  }
}
</script>

<style scoped>

</style>
