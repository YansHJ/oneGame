<template>
  <v-app>
    <div id="app">
      <router-view/>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}

</style>
