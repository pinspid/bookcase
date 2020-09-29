<template>
  <div class="borrower mt-8">
    <v-snackbar v-model="snackbar" small :timeout="4000" bottom color="success">
      <span>Borrower added !</span>
      <v-btn text color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-snackbar v-model="snackbar2" small :timeout="4000" bottom color="error">
      <span>Borrower added !</span>
      <v-btn text color="white" @click="snackbar2 = false">Close</v-btn>
    </v-snackbar>
    <h2 class="subheading grey--text">Borrower</h2>
    <v-container class="my-3">
      <v-layout row class="mb-3">
        <v-tooltip top>
          <template v-slot:activator="{on}">
            <v-btn small text color="grey" v-on="on">
              <v-icon left small>mdi-folder</v-icon>
              <span class="grey--text text-lowercase">By borrower name</span>
            </v-btn>
          </template>
          <span>sort by borrower name</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{on}">
            <v-btn small text color="grey" v-on="on">
              <v-icon left small>mdi-calendar-range</v-icon>
              <span class="grey--text text-lowercase">By created date</span>
            </v-btn>
          </template>
          <span>sort by created date</span>
        </v-tooltip>
        <v-spacer></v-spacer>
        <BorrowerForm @borrowerAdded="snackbar = true" />
      </v-layout>
      <v-row>
        <v-col>
          <Borrowers @showMsg="snackbar2 = true"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Borrowers from '../components/Borrower/Borrowers'
import BorrowerForm from '../components/Borrower/BorrowerForm'
export default {
  name: 'Borrower',
  data: () => ({
    snackbar: false,
    snackbar2: false,
    message: ''
  }),
  components: { BorrowerForm, Borrowers },
  mounted () {
    this.$store.dispatch('borrowers')
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
