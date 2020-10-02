<template>
  <div class="loan mt-8">
    <h2 class="subheading grey--text">Loan</h2>
    <v-snackbar v-model="snackbar" small :timeout="4000" top color="success">
      <span>Loan added !</span>
      <v-btn text color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-snackbar v-model="snackbar2" small :timeout="4000" bottom color="error">
      <span>Loan added !</span>
      <v-btn text color="white" @click="snackbar2 = false">Close</v-btn>
    </v-snackbar>
    <v-container class="my-3">
      <v-layout row class="mb-3">
      <v-tooltip top>
        <template v-slot:activator="{on}">
        <v-btn small text color="grey" v-on="on">
          <v-icon left small>mdi-folder</v-icon>
          <span class="grey--text text-lowercase">By loan date</span>
        </v-btn>
        </template>
        <span>sort by day of loan</span>
      </v-tooltip>
      <v-tooltip top>
        <template v-slot:activator="{on}">
        <v-btn small text color="grey" v-on="on">
          <v-icon left small>mdi-calendar-range</v-icon>
          <span class="grey--text text-lowercase">By borrower</span>
        </v-btn>
        </template>
        <span>sort by borrower</span>
      </v-tooltip>
      <v-spacer></v-spacer>
      <LoanForm @loanRegister="snackbar = true"/>
      </v-layout>
    </v-container>
    <v-row>
      <v-col>
        <Loans @deleteMsg="snackbar2 = true"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Loans from '../components/Loan/Loans'
import LoanForm from '../components/Loan/LoanForm'
export default {
  name: 'Loan',
  data: () => ({
    snackbar: false,
    snackbar2: false
  }),
  components: {
    Loans, LoanForm
  },
  mounted () {
    this.$store.dispatch('loans')
  },
  methods: {

  }
}
</script>
