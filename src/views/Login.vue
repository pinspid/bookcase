<template>
  <v-container>
    <v-layout row justify-center align-center>
      <v-flex xs12 md5 sm6>
        <v-card class="py-6 mt-12">
          <v-card-title>
            <div style="margin: auto; text-align: center">
              <h3>Login</h3>
              <span class="pink--text">BookCase</span>
            </div>
          </v-card-title>
          <v-card-text>
            <v-form class="px-3" v-model="valid" ref="loginForm" lazy-validation>
              <v-text-field
                label="Your Email"
                v-model="formData.email"
                :rules="emailRules"
                validate-on-blur
                outlined
                dense
                required
                :append-icon="'mdi-email'"
              />
              <v-text-field
                label="Your Password"
                v-model="formData.password"
                validate-on-blur
                :rules="[rules.required, rules.min]"
                :type=" show ? 'text' : 'password'"
                required
                outlined
                dense
                :append-icon=" show ? 'mdi-eye-off' : 'mdi-eye'"
              />
              <v-checkbox
                label="Remember me"
                v-model="formData.remember"
                color="primary"
              >
              </v-checkbox>
              <v-btn
                class="mx-0 mt-3"
                color="primary"
                :loading="loader"
                @click="submit"
              >Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import apiClient from '../services/api'
export default {
  name: 'Login',
  data () {
    return {
      loader: false,
      valid: true,
      show: false,
      formData: {
        email: '',
        password: '',
        remember: true
      },
      emailRules: [
        (v) => !!v || 'Required',
        (v) => /.+@.+\..+/.test(v) || 'invalid email format'
      ],
      rules: {
        required: (value) => !!value || 'required',
        min: (v) => (v && v.length >= 8) || 'a password must be than 8 caractères'
      }
    }
  },
  methods: {
    async submit () {
      if (this.$refs.loginForm.validate()) {
        this.loader = true
        await this.$store.dispatch('login', this.formData)
        this.loader = false
      }
    }
  }
}
</script>

<style scoped>
</style>
