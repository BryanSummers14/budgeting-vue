<template>
<v-container fluid>
  <v-alert type="error" transition="scale-transition" :value="alreadySet">
      Budget for this month has already been set
    </v-alert>
      <v-layout justify-center align-center>
        <v-flex v-if="!alreadySet" xs12 sm8 md6>
          <h1>Set Budget for the month</h1>
          <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step step="1" :complete="e1 > 1">Recurring</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="2" :complete="e1 > 2">Necessary</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3">Recreational</v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class="mb-5" height="200px">
          <v-layout justify-center align-center>
            <v-text-field
                label="Amount"
                type="number"
                v-model="recurringAmount"
                :rules="amountRules"
                min="0.01"
                step="0.01"
                required
                ></v-text-field>
          </v-layout>
        </v-card>
        <v-btn color="primary" @click.native="e1 = 2">Next</v-btn>
        <v-btn flat @click.native="onBudgetCancel">Cancel</v-btn>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-card class="mb-5" height="200px">
          <v-layout justify-center align-center>
          <v-text-field
                label="Amount"
                type="number"
                v-model="necessaryAmount"
                :rules="amountRules"
                min="0.01"
                step="0.01"
                required
                ></v-text-field>
          </v-layout>
        </v-card>
        <v-btn color="primary" @click.native="e1 = 3">Next</v-btn>
        <v-btn flat @click.native="e1 = 1">Back</v-btn>
      </v-stepper-content>
      <v-stepper-content step="3">
        <v-card class="mb-5" height="200px">
          <v-layout justify-center align-center>
          <v-text-field
                label="Amount"
                type="number"
                v-model="recreationalAmount"
                :rules="amountRules"
                min="0.01"
                step="0.01"
                required
                ></v-text-field>
          </v-layout>
        </v-card>
        <v-btn color="primary" @click.native="submit">Submit</v-btn>
        <v-btn flat @click.native="e1 = 2">Back</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
        </v-flex>
      </v-layout>
  </v-container>
</template>


<script>
export default {
  data () {
    return {
      e1: 0,
      recurringAmount: 0,
      necessaryAmount: 0,
      recreationalAmount: 0,
      amountRules: [
        v => !!v || 'Amount is required',
        v => /^\d+(?:\.\d{0,2})$/.test(v) || 'Must be a valid dollar amount'
      ],
      valid: false,
      alreadySet: false
    }
  },
  created () {
    this.$http.get('http://localhost:3000/api/budget/get-monthly-budget', { headers: { 'Authorization': this.$store.state.authToken } })
      .then(_res => {
        if (_res.status === 200 && _res.body.monthlyBudget) {
          this.alreadySet = true
        }
      })
  },
  methods: {
    submit () {
      // TODO: validate inputs
      const expenseItem = { recurring: this.recurringAmount, necessary: this.necessaryAmount, recreational: this.recreationalAmount }
      this.$http.post('http://localhost:3000/api/budget/set-monthly-budget', expenseItem, { headers: { 'Authorization': this.$store.state.authToken } })
        .then(_res => {
          console.log(_res)
        })
    },
    clear () {
      this.$refs.form.reset()
    },
    onBudgetCancel () {
      this.$router.push({ path: '/dashboard' })
    }
  }
}
</script>

<style scoped>
.container {
  height: 100%
}
.layout {
  height: 100%;
}
.card {
  padding: 18px;
}
</style>