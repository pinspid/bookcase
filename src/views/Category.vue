<template>
  <div class="category mt-8">
    <v-snackbar
      v-model="snackbar"
      rounded="pill"
      :timeout="4000"
      bottom
      color="success"
    >
      <span>{{message.success}}</span>
      <v-btn text color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <h2 class="subheading grey--text">Categories</h2>
    <v-container class="my-3">
      <v-layout row class="mb-3">
        <v-tooltip top>
          <template v-slot:activator="{on}">
            <v-btn small text color="grey" v-on="on">
              <v-icon left small>mdi-folder</v-icon>
              <span class="grey--text text-lowercase">By category name</span>
            </v-btn>
          </template>
          <span>sort by category name</span>
        </v-tooltip>
        <v-spacer></v-spacer>
        <CategoryForm @categoryAdded="notify"/>
      </v-layout>
      <v-row>
        <v-col>
          <Categories
            :categories="categories"
            @categoryDeleted="notify"
            @categoryUpdated="notify"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Categories from '../components/Categories/Categories'
import CategoryForm from '../components/Categories/CategoryForm'
export default {
  name: 'Category',
  data: () => {
    return {
      snackbar: false,
      snackbar2: false,
      message: {}
    }
  },
  components: { Categories, CategoryForm },
  computed: {
    categories () {
      return this.$store.state.categories
    }
  },
  mounted () {
    this.$store.dispatch('getCategory')
  },
  methods: {
    notify (e) {
      this.message = e
      this.snackbar = true
    }
  }
}
</script>
