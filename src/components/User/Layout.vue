<template lang="html">
  <div class="">
    <v-btn v-if="!isIndexLayout" outline :to="{name: 'UserIndex'}" class="mb-3"><v-icon>arrow_back</v-icon> Kembali</v-btn>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
computed: {
  isIndexLayout() {
    return this.$route.name == 'UserIndex'
    }
  }
}
</script>

<style lang="css">
</style>
