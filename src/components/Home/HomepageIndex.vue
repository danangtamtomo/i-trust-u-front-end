<template>
<!-- <div class="">
  <img src="/public/logo-si-slamet.png" alt="Vuetify.js" class="mb-5" />
  <h4>Selamat datang di Si Slamet</h4>
</div> -->
<section>
        <v-layout
          column
          wrap
          class="my-5"
          align-center
        >
          <v-flex xs12 sm4>
            <div class="text-xs-center">
              <img src="/public/logo-si-slamet.png" alt="Vuetify.js" class="mb-1" width="150px"/>

              <h2 class="headline">iTrustU</h2>
              <span class="subheading">
                Never
              </span>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="red--text text--lighten-2">flash_on</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Respon Cepat</div>
                    </v-card-title>
                    <v-card-text class="text-xs-center">
                      Mengimplementasikan teknologi terkini guna menunjang kecepatan bertukar informasi
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="red--text text--lighten-2">timer</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Realtime</div>
                    </v-card-title>
                    <v-card-text class="text-xs-center">
                      Laporan di respon kurang dari 3 menit
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="red--text text--lighten-2">directions_car</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Terpadu</div>
                    </v-card-title>
                    <v-card-text class="text-xs-center">
                      Terhubung dengan ambulan, petugas medis, rumah sakit menjadikan layanan Si Slamet terintegrasi
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
</section>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
