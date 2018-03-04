<template>
<v-container fluid>
            <v-layout row wrap>
            <v-flex xs12 sm4>
              <h3>Recurring</h3>
              <v-card color="blue-grey darken-2" class="white--text">
              <v-card-title primary-title>
                <div class="headline">Unlimited music now</div>
                <div>Listen to your favorite artists and albums whenever and wherever, online and offline.</div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat dark>Listen now</v-btn>
              </v-card-actions>
            </v-card>
            </v-flex>
            <v-flex xs12 sm4>
              <h3>Necessary</h3>
              <v-card color="blue-grey darken-2" class="white--text">
              <v-card-title primary-title>
                <div class="headline">Unlimited music now</div>
                <div>Listen to your favorite artists and albums whenever and wherever, online and offline.</div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat dark>Listen now</v-btn>
              </v-card-actions>
            </v-card>
            </v-flex>
            <v-flex xs12 sm4>
              <h3>Recreational</h3>
              <v-card color="blue-grey darken-2" class="white--text">
              <v-card-title primary-title>
                <div class="headline">Unlimited music now</div>
                <div>Listen to your favorite artists and albums whenever and wherever, online and offline.</div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat dark>Listen now</v-btn>
              </v-card-actions>
            </v-card>
            </v-flex>
          </v-layout>
      <v-layout>
        <v-flex xs12 sm4>
          <h2>Monthly Summary</h2>
        </v-flex>
        <v-flex xs12 sm8>
          <h2>Yearly Spending</h2>
          <my-bar-chart></my-bar-chart>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import MyBarChart from '@/components/BarChart'

export default {
  data () {
    return {
      monthlyTotal: 0,
      expenses: []
    }
  },
  components: {
    MyBarChart
  },
  created () {
    this.$http.get('http://localhost:3000/api/monthly-total', { headers: { 'Authorization': this.$store.state.authToken } })
      .then(_res => {
        this.expenses = _res.body.expenses
        this.monthlyTotal = _res.body.total
      })
  }
}
</script>

<style scoped>
.card {
  margin: 12px;
}
</style>