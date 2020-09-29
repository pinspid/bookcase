<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{on, attrs}">
      <v-btn small color="success" v-bind="attrs" v-on="on">New Borrower</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h4 class="subheading">New Borrower</h4>
      </v-card-title>
      <v-card-text>
        <v-form lazy-validation ref="form">
          <v-row>
            <v-col>
              <v-text-field
                outlined
                dense
                :rules="rules"
                v-model="formData.first_name"
                label="First Name"
                prepend-icon="mdi-pencil"
              />
            </v-col>
            <v-col>
              <v-text-field
                outlined
                dense
                :rules="rules"
                v-model="formData.last_name"
                label="Last Name"
                prepend-icon="mdi-pencil"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                outlined
                dense
                :rules="emailRules"
                v-model="formData.email"
                label="Your email"
                prepend-icon="mdi-email"
              />
            </v-col>
            <v-col>
              <v-text-field
                outlined
                dense
                :rules="numberRules"
                v-model="formData.phone"
                label="phone number"
                prepend-icon="mdi-phone"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                outlined
                dense
                label="address"
                :rules="rules"
                v-model="formData.adresse"
                prepend-icon="mdi-adress"
              />
            </v-col>
          </v-row>
          <v-btn color="success" class="mr-3" :loading="loader" @click="submit">Add New Borrower</v-btn>
          <v-btn color="error" @click="dialog = false">Cancel</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import apiClient from '../../services/api'
export default {
  name: 'BorrowerForm',
  data: () => ({
    dialog: false,
    loader: false,
    formData: {
      last_name: '',
      first_name: '',
      email: '',
      phone: '',
      adresse: ''
    },
    rules: [
      v => !!v || 'this field is required'
    ],
    emailRules: [
      (v) => !!v || 'this field is required',
      (v) => /.+@.+\..+/.test(v) || 'invalid email format'
    ],
    numberRules: [
      v => !!v || 'this field is required',
      v => /^([26]{1})([2356789]{1})([0-9]{7})$/.test(v) || 'invalid phone number'
    ]
  }),
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.loader = true
        apiClient.get('/sanctum/csrf-cookie').then(res => {
          apiClient.post('/api/borrower', this.formData).then(response => {
            if (response.data.success) {
              this.loader = false
              this.dialog = false
              this.resetInput()
              this.$store.dispatch('borrowers')
              this.$emit('borrowerAdded', 'New Borrower Added')
            }
          }).catch(err => console.log(err))
        }).catch(err => {
          console.log(err)
        })
      }
    },
    resetInput () {
      this.formData.last_name = ''
      this.formData.first_name = ''
      this.formData.email = ''
      this.formData.phone = ''
      this.formData.adresse = ''
    }
  }
}
</script>
