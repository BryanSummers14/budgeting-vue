<template>
<v-container fluid>
      <v-layout justify-center align-center>
        <v-flex xs12 sm8 md6>
          <h1>Add an expense item</h1>
          <v-form v-model="valid" ref="form" lazy-validation>
              <v-select
                :items="expenseTypes"
                v-model="type"
                label="Expense Type"
                single-line
                bottom
              ></v-select>
              <v-text-field
                label="Brief Description"
                v-model="description"
                required
                ></v-text-field>
                <v-text-field
                label="Amount"
                type="number"
                v-model="amount"
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
      description: '',
      amount: 0,
      valid: false
    }
  },
  methods: {
    submit () {
      // TODO: validate inputs
      const expenseItem = Object.assign({}, { type: this.type }, { description: this.description }, { amount: this.amount })
      console.dir(expenseItem)
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