<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{on, attrs}">
      <v-btn small color="success" v-bind="attrs" v-on="on">New Book</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h4 class="subheading">New Book</h4>
      </v-card-title>
      <v-card-text>
        <v-form lazy-validation ref="form">
          <v-row>
            <v-col>
              <v-text-field
                outlined
                dense
                :rules="rules"
                v-model="formData.title"
                label="title"
                prepend-icon="mdi-book-open"
              />
            </v-col>
            <v-col>
              <v-text-field
                outlined
                dense
                :rules="rules"
                v-model="formData.author"
                label="author"
                prepend-icon="mdi-account"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                outlined
                dense
                :rules="rules"
                v-model="formData.edition"
                label="edition"
                prepend-icon="mdi-file-document-edit"
              />
            </v-col>
            <v-col>
              <v-text-field
                outlined
                dense
                :rules="rules"
                v-model="formData.publisher"
                label="publisher"
                prepend-icon="mdi-pencil"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select
                outlined
                dense
                :items="categories"
                label="category"
                :rules="rules"
                v-model="category"
                prepend-icon="mdi-shape"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="year of publish"
                    prepend-icon="mdi-calendar-range"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    dense
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col>
              <v-text-field
                outlined
                dense
                v-model="formData.num_copy"
                :rules="rules"
                label="number of copy"
                prepend-icon="mdi-counter"
              />
            </v-col>
          </v-row>
          <v-btn color="success" class="mr-3" :loading="loader" @click="submit">Add New Book</v-btn>
          <v-btn color="error" @click="dialog = false">Cancel</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import apiClient from '../../services/api'

export default {
  name: 'BookForm',
  data: () => ({
    dialog: false,
    loader: false,
    formData: {
      title: '',
      edition: '',
      category_id: null,
      author: '',
      publisher: '',
      year_publish: null,
      num_copy: null
    },
    category: '',
    date: new Date().toISOString().substr(0, 10),
    menu2: false,
    rules: [
      v => !!v || 'this field is required'
    ]
  }),
  mounted () {

  },
  computed: {
    categories () {
      return this.$store.state.onlyCategories
    },
    cats () {
      return this.$store.state.categories
    }
  },
  watch: {
    category (val) {
      this.cats.forEach(cat => {
        if (val === cat.wording) {
          this.formData.category_id = cat.id
        }
      })
    },
    date (newVal, oldVal) {
      this.formData.year_publish = parseInt(newVal.substr(0, 4))
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.loader = true
        apiClient.get('/sanctum/csrf-cookie').then(res => {
          apiClient.post('/api/book', this.formData).then(response => {
            if (response.data.success) {
              this.loader = false
              this.dialog = false
              this.$store.dispatch('getBooks')
              this.$emit('bookAdded')
            }
          }).catch(err => console.log(err))
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
}
</script>
