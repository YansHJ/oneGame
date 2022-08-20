<template>
  <div>
    <v-img
      height="30px"
      src="https://s1.imagehub.cc/images/2022/08/20/wallhaven-z8dg9y.png"
    ><div class="imgBorder">
      <h4 class="hh">
      {{ consumes }}
      </h4>
    </div>
    </v-img>
  </div>
</template>

<script>
export default {
  name: "CardImg",
  props: {
    consumes:''
  }
}
</script>

<style scoped>
  .imgBorder {
    border: 1px solid slategray;
    border-radius: 60px;
    float: right;
    margin: 0.2rem 0.5rem 0 0;
    width: 1.3rem;
    height: 1.3rem;
    background-color: aliceblue;
  }
  .hh {
    color: limegreen;
  }
</style>
