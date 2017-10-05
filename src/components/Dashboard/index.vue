<template lang="html">
  <div>
    <h5 class="title text-xs-center">Laporan masuk per hari </h5>
    <line-report-chart :chart-data="reportsPerDay" :chart-labels="chartLabels"></line-report-chart>
    <v-progress-circular
      v-bind:size="100"
      v-bind:width="15"
      v-bind:rotate="360"
      v-bind:value="value"
      class="teal--text"
    >
      {{ value }}
    </v-progress-circular>

    <v-progress-circular
      v-bind:size="100"
      v-bind:width="15"
      v-bind:rotate="-90"
      v-bind:value="value"
      class="primary--text"
    >
      {{ value }}
    </v-progress-circular>

    <v-progress-circular
      v-bind:size="100"
      v-bind:width="15"
      v-bind:rotate="90"
      v-bind:value="value"
      class="red--text"
    >
      {{ value }}
    </v-progress-circular>

    <v-progress-circular
      v-bind:size="100"
      v-bind:width="15"
      v-bind:rotate="180"
      v-bind:value="value"
      class="pink--text"
    >
      {{ value }}

    </v-progress-circular>
  </div>
</template>

<script>
import LineReportChart from './LineReportChart'
  export default {
    data () {
      return {
        interval: {},
        value: 0,
        reportsPerDay: [
          {day: "2017-09-14", reports: 1},
          {day: "2017-09-15", reports: 3},
          {day: "2017-09-16", reports: 1},
          {day: "2017-09-17", reports: 1},
          {day: "2017-09-18", reports: 3},
          {day: "2017-09-19", reports: 2},
          {day: "2017-09-20", reports: 1}
        ],
        chartLabels: ['Laporan Masuk']
      }
    },
    beforeDestroy () {
      clearInterval(this.interval)
    },
    mounted () {
      this.interval = setInterval(() => {
        if (this.value === 100) {
          return (this.value = 0)
        }
        this.value += 10
      }, 1000)
    },
    components : {
      'line-report-chart': LineReportChart
    }
  }
</script>

<style lang="stylus" scoped>
  div
    text-align: center

  .progress-circular
    margin: 1rem
</style>
