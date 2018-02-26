<template>
<v-container fluid>
      <v-layout justify-center align-center>
        <v-flex xs12 sm8 md6>
          <h1>Dashboard</h1>
          <my-bar-chart></my-bar-chart>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import MyBarChart from '@/components/BarChart'

export default {
  components: {
    MyBarChart
  }
}
</script>
