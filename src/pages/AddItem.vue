<template>
<v-container fluid>
  <v-alert
      type="success"
      :value="itemAdded"
      transition="scale-transition"
    >
      Added item to expenses
    </v-alert>
      <v-layout justify-center align-center>
        <v-flex xs12 sm8 md6>
          <h1>Add a new expense</h1>
          <v-form v-model="valid" ref="form" lazy-validation>
              <v-select
                :items="expenseTypes"
                v-model="type"
                label="Expense Type"
                :rules="typeRules"
                single-line
                bottom
                required
              ></v-select>
              <v-text-field
                label="Brief Description"
                v-model="description"
                :rules="descriptionRules"
                required
                ></v-text-field>
                <v-text-field
                label="Amount"
                type="number"
                v-model="amount"
                :rules="amountRules"
                min="0.01"
                step="0.01"
                required
                ></v-text-field>
              <v-btn
                color="primary"
                @click="submit"
                :disabled="!valid"
              >
                submit
              </v-btn>
              <v-btn @click="clear" color="error">clear</v-btn>
          </v-form>
        </v-flex>
      </v-layout>
  </v-container>
</template>


<script>
export default {
  data () {
    return {
      expenseTypes: [
        'Necessary',
        'Recurring',
        'Recreational'
      ],
      type: '',
      typeRules: [
        v => !!v || 'Type of expense required'
      ],
      description: '',
      descriptionRules: [
        v => !!v || 'Description is required'
      ],
      amount: 0,
      amountRules: [
        v => !!v || 'Amount is required',
        v => /^\d+(?:\.\d{0,2})$/.test(v) || 'Must be a valid dollar amount'
      ],
      valid: false,
      itemAdded: false
    }
  },
  methods: {
    submit () {
      // TODO: validate inputs
      const expenseItem = Object.assign({}, { type: this.type }, { description: this.description }, { amount: this.amount })
      this.$http.post('http://localhost:3000/api/budget/line-item', expenseItem, { headers: { 'Authorization': this.$store.state.authToken } })
        .then(_res => {
          if (_res.status === 201) {
            this.clear()
            this.itemAdded = true
            setTimeout(_ => { this.itemAdded = false }, 5000)
          }
        })
    },
    clear () {
      this.$refs.form.reset()
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
</style>