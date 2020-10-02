<template>
  <div class="books mt-8">
    <v-row>
      <v-col align="start">
        <h2 class="subheading grey--text">Books</h2>
      </v-col>
      <v-col align="end">
        <BookForm @bookAdded="snackbar = true"/>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbar"
      :timeout="4000"
      rounded="pill"
      color="success"
    >
      Book added
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbar2" small :timeout="4000" bottom color="error">
      <span>Book added !</span>
      <v-btn text color="white" @click="snackbar2 = false">Close</v-btn>
    </v-snackbar>
    <v-container class="my-3">
      <v-layout row class="mb-3">
        <v-card>
          <v-tabs
            dark
            background-color="pink"
            show-arrows
          >
            <v-tabs-slider color="pink lighten-3"></v-tabs-slider>

            <v-tab
              v-for="category in categories"
              :key="category.id"
              :href="'#' + category.wording"
            >
              {{ category.wording }}
            </v-tab>
          </v-tabs>
        </v-card>
      </v-layout>
      <v-row>
        <v-col>
          <Books @deleteMsg="snackbar2 = true" :search="search"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import BookForm from '../components/Books/BookForm'
import Books from '../components/Books/Books'

export default {
  name: 'Book',
  components: { BookForm, Books },
  data: () => ({
    search: '',
    snackbar: false,
    snackbar2: false,
    sort: ''
  }),
  computed: {
    categories () {
      return this.$store.state.categories
    }
  },
  mounted () {
    this.$store.dispatch('getBooks')
    this.$store.dispatch('getCategory')
  },
  methods: {
    filterOnlyCapsText (value, search, item) {
      return value != null &&
        search != null &&
        typeof value === 'string' &&
        value.toString().toLocaleUpperCase().indexOf(search) !== -1
    }
  }
}
</script>
