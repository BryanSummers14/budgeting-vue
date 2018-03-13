<template>
<v-container fluid>
  <loading v-if="appState === state.Loading"></loading>
  <v-alert type="error" transition="scale-transition" dismissible v-model="alertAlreadySet">
      Budget for this month has already been set
    </v-alert>
    <v-alert type="success" dismissible v-model="alertSuccesfulSet">
      Budget set
    </v-alert>
      <v-layout justify-center align-center>
        <v-flex v-if="appState === state.Loaded && !alreadySet || updating" xs12 sm8 md6>
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
        <v-jumbotron v-if="alreadySet && !updating" color="grey lighten-2">
    <v-container fill-height>
      <v-layout align-center>
        <v-flex>
          <h3 class="display-3">Monthly Budget</h3>
          <h4>Recurring: {{ monthlyBudget.recurring }}</h4>
          <h4>Necessary: {{ monthlyBudget.necessary }}</h4>
          <h4>Recreational: {{ monthlyBudget.recreational }}</h4>
          <v-divider class="my-3"></v-divider>
          <v-btn large color="primary" class="mx-0" @click="toggleUpdating">Update Budget</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
      </v-layout>
  </v-container>
</template>


<script>
import Loading from '@/components/Loading'

export default {
  data () {
    return {
      state: {Loading: 0, Loaded: 1},
      appState: 0,
      e1: 0,
      recurringAmount: 0,
      necessaryAmount: 0,
      recreationalAmount: 0,
      amountRules: [
        v => !!v || 'Amount is required',
        v => /^\d+$/.test(v) || 'Must be a valid dollar amount'
      ],
      valid: false,
      alreadySet: false,
      monthlyBudget: null,
      updating: false,
      alertAlreadySet: false,
      alertSuccesfulSet: false
    }
  },
  components: {
    Loading
  },
  created () {
    this.$http.get('http://localhost:3000/api/budget/get-monthly-budget', { headers: { 'Authorization': this.$store.state.authToken } })
      .then(_res => {
        if (_res.status === 200 && _res.body.monthlyBudget) {
          this.alreadySet = true
          this.alertAlreadySet = true
          this.monthlyBudget = { ..._res.body.monthlyBudget }
        }
        this.appState = this.state.Loaded
      })
  },
  methods: {
    submit () {
      this.appState = this.state.Loading
      const expenseItem = { recurring: this.recurringAmount, necessary: this.necessaryAmount, recreational: this.recreationalAmount }
      if (!this.updating) {
        this.$http.post('http://localhost:3000/api/budget/set-monthly-budget', expenseItem, { headers: { 'Authorization': this.$store.state.authToken } })
          .then(_res => {
            this.alertSuccesfulSet = true
            this.appState = this.state.Loaded
          })
      } else {
        expenseItem.budgetId = this.monthlyBudget._id
        this.$http.put('http://localhost:3000/api/budget/set-monthly-budget', expenseItem, { headers: { 'Authorization': this.$store.state.authToken } })
          .then(_res => {
            this.monthlyBudget = { ..._res.body.monthlyBudget }
            this.updating = false
            this.alertSuccesfulSet = true
            this.appState = this.state.Loaded
          })
      }
    },
    clear () {
      this.$refs.form.reset()
    },
    onBudgetCancel () {
      if (this.updating) {
        this.updating = false
      } else {
        this.$router.push({ path: '/dashboard' })
      }
    },
    toggleUpdating () {
      this.recurringAmount = this.monthlyBudget.recurring
      this.recreationalAmount = this.monthlyBudget.recreational
      this.necessaryAmount = this.monthlyBudget.necessary
      this.updating = true
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