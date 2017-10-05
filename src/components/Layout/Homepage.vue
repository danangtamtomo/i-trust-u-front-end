<template lang="html">
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <router-view></router-view>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
