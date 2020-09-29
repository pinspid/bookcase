<template>
  <div class="loan mt-8">
    <h2 class="subheading grey--text">Loan</h2>
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
    </v-layout>
  </v-container>
  </div>
</template>

<script>
import apiClient from '../services/api'
export default {
  name: 'Loan',
  data: () => ({

  }),
  mounted: () => {
    this.getLoan()
  },
  methods: {
    getLoan: async () => {
      try {
        const response = apiClient.get('/api/loan')
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
