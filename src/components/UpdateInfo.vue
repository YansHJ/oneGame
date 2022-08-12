<template>
  <div class="mainPage">
    <div style="text-align: center;margin: 1rem">
      <a style="float: left" @click="backToStart">< 返回</a>
      <span>更新日志</span>
    </div>
    <v-divider></v-divider>
    <div class="timeline">
      <v-card-text class="py-0">
        <!--V 0.6.1-->
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
        <!--V 0.6.2-->
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
                <strong>V 0.6.2 Alpha</strong>
                <div class="text-caption">
                  1.优化战斗逻辑
                </div>
                <div class="text-caption" style="color: red">
                  2.新增特殊卡"血祭"
                </div>
              </v-col>
            </v-row>
          </v-timeline-item>

        </v-timeline>
        <!--V 0.6.3-->
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
                <strong>2022-08-12</strong>
              </v-col>
              <v-col>
                <strong>V 0.6.3 Alpha</strong>
                <div class="text-caption">
                  1.优化服务端
                </div>
                <div class="text-caption">
                  2.移除普通卡"炎龙"
                </div>
                <div class="text-caption">
                  3.调整普通卡"炼狱"伤害:16->14
                </div>
                <div class="text-caption">
                  4.调整普通卡"神之握"伤害:32->20
                </div>
                <div class="text-caption">
                  5.主线关卡除了"哥布林",所有怪物整体削弱
                </div>
              </v-col>
            </v-row>
          </v-timeline-item>

        </v-timeline>


        <!--未来-->
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
                <strong>未来计划(画饼)</strong>
              </v-col>
              <v-col>
                <strong>future</strong>
                <div class="text-caption">
                  1.新模式,无尽挑战,随机生成地图,地图可分享给好友挑战
                </div>
                <div class="text-caption">
                  2.增加更多卡牌种类
                </div>
                <div class="text-caption">
                  3.重构UI
                </div>
                <div class="text-caption">
                  4.优化交互,优化战斗
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
.mainPage {
  width: 100%;
  height: 80%;
}
.timeline {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
