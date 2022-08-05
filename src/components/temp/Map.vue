<template>
    <div>


        <div class="mapList" v-for="(item,index) in List" :key="index">
          <v-stepper
            v-model="ee"
            vertical
          >
            <v-stepper-step
              :complete="ee > 1"
              step="1"
            >
              {{ item.number }}
              <small>Summarize if needed</small>
            </v-stepper-step>
            <v-stepper-content step="1">
              <v-card
                color="grey lighten-1"
                class="mb-12"
                height="50px"
              ></v-card>
              <v-btn
                color="primary"
                @click="ee = ee+1"
              >
                Continue
              </v-btn>
            </v-stepper-content>
          </v-stepper>

          <Map :list="item.nextGameLevel"></Map>
        </div>
    </div>
</template>

<script>
export default {
  name: "Map",
  props: {
    List: Array,
    ee:1,
  }
}
</script>

<style scoped>
.mapList {
  margin: 0 auto;
  height: 100%;
  width: 100%;
}
</style>
