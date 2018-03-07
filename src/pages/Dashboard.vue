<template>
<v-container fluid>
            <v-layout row wrap>
            <v-flex xs12 sm4>
              <h3>Recurring</h3>
              <v-card color="blue-grey darken-2" class="white--text">
              <v-card-title primary-title>
                <div class="headline text-xs-center" style="width: 100%;">{{ recurringPercent }}%</div>
                  <v-progress-linear v-if="monthlyBudget" :value="recurringPercent" height="20" :color="recurringProgressColor">{{ recurringPercent }}</v-progress-linear>
              </v-card-title>
            </v-card>
            </v-flex>
            <v-flex xs12 sm4>
              <h3>Necessary</h3>
              <v-card color="blue-grey darken-2" class="white--text">
              <v-card-title primary-title>
                <div class="headline text-xs-center" style="width: 100%">{{ necessaryPercent }}%</div>
                <v-progress-linear v-if="monthlyBudget" :value="necessaryPercent" height="20" :color="necessaryProgressColor">{{ necessaryPercent }}</v-progress-linear>
              </v-card-title>
            </v-card>
            </v-flex>
            <v-flex xs12 sm4>
              <h3>Recreational</h3>
              <v-card color="blue-grey darken-2" class="white--text">
              <v-card-title primary-title>
                <div class="headline text-xs-center" style="width: 100%">{{ recreationalPercent }}%</div>
                <v-progress-linear v-if="monthlyBudget" :value="recreationalPercent" height="20" :color="recreationalProgressColor">{{ recreationalPercent }}</v-progress-linear>
              </v-card-title>
            </v-card>
            </v-flex>
          </v-layout>
      <v-layout>
        <v-flex xs12 sm4>
          <h2>Monthly Summary - ${{ monthlyTotal }}</h2>
          <br/>
          <v-data-table
            :headers="expenseHeaders"
            :items="expenses"
            hide-actions
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.type }}</td>
              <td class="text-xs-right">{{ props.item.description }}</td>
              <td class="text-xs-right">{{ props.item.amount }}</td>
            </template>
          </v-data-table>
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
      recurringTotal: 0,
      necessaryTotal: 0,
      recreationalTotal: 0,
      expenses: [],
      monthlyBudget: null,
      recurringPercent: 0,
      necessaryPercent: 0,
      recreationalPercent: 0,
      recurringProgressColor: '',
      necessaryProgressColor: '',
      recreationalProgressColor: '',
      expenseHeaders: [
        { text: 'Type', sortable: true, value: 'type' },
        { text: 'Description', value: 'description' },
        { text: 'Amount', sortable: true, value: 'amount' }
      ]
    }
  },
  components: {
    MyBarChart
  },
  methods: {
    determineProgressColor: function (_percent) {
      if (_percent > 75) {
        return 'error'
      } else if (_percent > 50) {
        return 'warning'
      } else {
        return 'success'
      }
    }
  },
  created () {
    this.$http.get('http://localhost:3000/api/budget/monthly-total', { headers: { 'Authorization': this.$store.state.authToken } })
      .then(_res => {
        this.expenses = _res.body.expenses
        this.monthlyBudget = _res.body.monthlyBudget
        this.expenses.forEach(_exp => {
          switch (_exp.type) {
            case 'Recurring':
              this.recurringTotal += (+_exp.amount)
              break
            case 'Necessary':
              this.necessaryTotal += (+_exp.amount)
              break
            case 'Recreational':
              this.recreationalTotal += (+_exp.amount)
          }
        })
        this.recurringPercent = Math.floor((this.recurringTotal / this.monthlyBudget.recurring) * 100)
        this.necessaryPercent = Math.floor((this.necessaryTotal / this.monthlyBudget.necessary) * 100)
        this.recreationalPercent = Math.floor((this.recreationalTotal / this.monthlyBudget.recreational) * 100)
        this.recurringProgressColor = this.determineProgressColor(this.recurringPercent)
        this.necessaryProgressColor = this.determineProgressColor(this.necessaryPercent)
        this.recreationalProgressColor = this.determineProgressColor(this.recreationalPercent)
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