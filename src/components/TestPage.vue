<template>
  <div class="">
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-card
          elevation="8"
          outlined
          @click=""
          v-bind="attrs"
          v-on="on"
        >
          <div style="width: 5rem;height: 5rem;">

          </div>
        </v-card>
      </template>
      <h2 style="text-align: center">xxxx</h2>
      <span>SSSSSSSSSSSSSSSSSS</span>
      <span>xxssssxx</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: "TestPage"
}
</script>

<style scoped>
.mainPage {

}
</style>
