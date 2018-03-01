<template>
  <v-container fluid>
      <v-layout justify-center align-center>
        <v-flex xs12 sm8 md6>
            <v-form v-model="valid" ref="form" lazy-validation>
                <v-text-field
                    label="E-mail"
                    v-model="email"
                    :rules="emailRules"
                    required
                ></v-text-field>
                <v-text-field
                    label="Password"
                    v-model="password"
                    :rules="passwordRules"
                    type="password"
                    required
                ></v-text-field>
                <v-checkbox
                    label="Remember me?"
                    v-model="checkbox"
                ></v-checkbox>
                <v-btn
                    color="primary"
                    @click="submit"
                    :disabled="!valid"
                >
                    submit
                </v-btn>
                <v-btn @click="clear" color="error">clear</v-btn>
                <v-btn color="success" to="/register">Register</v-btn>
            </v-form>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required'
    ],
    checkbox: false
  }),

  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        this.$http.post('http://localhost:3000/api/auth/login', {
          email: this.email,
          password: this.password,
          stayLoggedIn: this.checkbox
        }).then(_res => {
          this.clear()
          this.$store.dispatch('login', _res.data)
          this.$router.push({ path: '/dashboard' })
        }).catch(error => console.error(error))
      }
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
