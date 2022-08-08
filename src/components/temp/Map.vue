<template>
    <div>
        <div class="mapList" v-for="(item,index) in List" :key="index">
            <v-card
              class="ma-4"
              height="5rem"
              width="100"
              @click=""
              outlined
            >
              <h5 v-bind:style="item.color">{{ item.number }}</h5>
            </v-card>
          <Map :list="item.nextGameLevel"></Map>
        </div>


    </div>
</template>

<script>
export default {
  name: "Map",
  props: {
    List: Array,
  }
}
</script>

<style scoped>
.mapList {
  border: 1px solid black;
  display: flex;

  margin: 1rem;
}
</style>
