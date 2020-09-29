<template>
  <div class="books mt-8">
    <h2 class="subheading grey--text">Books</h2>
    <v-snackbar v-model="snackbar" small :timeout="4000" bottom color="success">
      <span>Book added !</span>
      <v-btn text color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-snackbar v-model="snackbar2" small :timeout="4000" bottom color="error">
      <span>Book added !</span>
      <v-btn text color="white" @click="snackbar2 = false">Close</v-btn>
    </v-snackbar>
    <v-container class="my-3">
      <v-layout row class="mb-3">
        <v-tooltip top>
          <template v-slot:activator="{on}">
            <v-btn small text color="grey" v-on="on">
              <v-icon left small>mdi-folder</v-icon>
              <span class="grey--text text-lowercase">By book name</span>
            </v-btn>
          </template>
          <span>sort by book name</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{on}">
            <v-btn small text color="grey" v-on="on">
              <v-icon left small>mdi-calendar-range</v-icon>
              <span class="grey--text text-lowercase">By year publisher</span>
            </v-btn>
          </template>
          <span>sort by year of publish</span>
        </v-tooltip>
        <v-spacer></v-spacer>
        <BookForm @bookAdded="snackbar = true"/>
      </v-layout>
      <v-row>
        <v-col>
          <v-text-field
            label="search"
            v-model="search"
            :append-icon="'mdi-search'"
          />
        </v-col>
      </v-row>
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
    snackbar2: false
  }),
  mounted () {
    this.$store.dispatch('getBooks')
  }
}
</script>
