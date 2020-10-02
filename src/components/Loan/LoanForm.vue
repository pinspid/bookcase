<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{on, attrs}">
      <v-btn small color="success" v-bind="attrs" v-on="on">New Loan</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h4 class="subheading">New Loan</h4>
      </v-card-title>
      <v-card-text>
        <v-form lazy-validation ref="form">
          <v-row>
            <v-col>
              <v-select
                outlined
                dense
                :items="booksOnly"
                :rules="rules"
                v-model="book"
                label="Book Name"
                prepend-icon="mdi-book"
              />
            </v-col>
              <v-col>
                <v-select
                  outlined
                  dense
                  :items="borrowersOnly"
                  :rules="rules"
                  v-model="borrower"
                  label="Borrower Name"
                  prepend-icon="mdi-clipboard-list"
                />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select
                outlined
                dense
                :items="types"
                :rules="rules"
                v-model="formData.borrow_type"
                label="Loan Type"
                prepend-icon="mdi-shape"
              />
            </v-col>
            <v-col>
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="formData.back_date"
                    label="Back Date"
                    prepend-icon="mdi-calendar-range"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    dense
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="formData.back_date"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
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
  name: 'LoanForm',
  data: () => ({
    dialog: false,
    loader: false,
    formData: {
      book_id: null,
      borrower_id: null,
      borrow_type: '',
      back_date: new Date().toISOString().substr(0, 10)
    },
    book: '',
    borrower: '',
    types: ['long time loan', 'short time loan', 'education loan'],
    rules: [
      v => !!v || 'this field is required'
    ],
    menu: false
  }),
  computed: {
    books () {
      return this.$store.state.books
    },
    borrowers () {
      return this.$store.state.borrowers
    },
    booksOnly () {
      const only = []
      this.books.forEach(book => {
        only.push(book.title)
      })
      return only
    },
    borrowersOnly () {
      const only = []
      this.borrowers.forEach(b => {
        only.push(b.first_name + ' ' + b.last_name)
      })
      return only
    }
  },
  watch: {
    book (val) {
      this.books.forEach(book => {
        if (val === book.title) {
          this.formData.book_id = book.id
        }
      })
    },
    borrower (val) {
      this.borrowers.forEach(b => {
        if (val.split(' ')[0] === b.first_name && val.split(' ')[1] === b.last_name) {
          this.formData.borrower_id = b.id
        }
      })
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.loader = true
        apiClient.get('/sanctum/csrf-cookie').then(res => {
          apiClient.post('/api/loan', this.formData).then(response => {
            if (response.data.success) {
              this.loader = false
              this.dialog = false
              this.$store.dispatch('loans')
              this.resetInput()
              this.$emit('loanRegister')
            }
          }).catch(err => console.log(err))
        }).catch(err => {
          console.log(err)
        })
      }
    },
    resetInput () {
      this.formData.book_id = null
      this.formData.borrower_id = null
      this.formData.borrow_type = ''
      this.formData.back_date = new Date().toISOString().substr(0, 10)
    }
  }
}
</script>
