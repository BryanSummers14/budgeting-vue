<template>
  <v-container fluid>
      <v-layout justify-center align-center>
        <v-flex xs12 sm8 md6>
            <v-form v-model="valid" ref="form" lazy-validation>
                <v-text-field
                    label="Name"
                    v-model="name"
                    :rules="nameRules"
                    :counter="10"
                    required
                ></v-text-field>
    <v-text-field
      label="E-mail"
      v-model="email"
      :rules="emailRules"
      required
    ></v-text-field>
    <v-text-field
      label="Password"
      v-model="password"
      type="password"
      required
    ></v-text-field>
    <v-checkbox
      label="Do you agree?"
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      required
    ></v-checkbox>

    <v-btn
      @click="submit"
      color="primary"
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
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      checkbox: false
    }),

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          this.$http.post('http://localhost:3000/api/auth/register', {
            username: this.name,
            email: this.email,
            password: this.password
          }).then(_res => {
              this.clear()
              localStorage.setItem('budget', _res.data.token)
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