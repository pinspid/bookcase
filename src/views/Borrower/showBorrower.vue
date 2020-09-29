<template>
  <div class="show mt-8">
    <v-row>
      <v-col>
        <h2 class="subheading grey--text">Borrower Information</h2>
      </v-col>
      <v-col align="end">
        <v-btn small color="success">
          <span>Edit</span>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-container class="my-3">
      <v-card text class="pa-3">
        <v-layout row wrap class="pa-3 projet-ongoing">
          <v-flex x12 md4>
            <div class="grey--text caption">Name</div>
            <div>
              {{ borrower.first_name }} {{ borrower.last_name }}
            </div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="grey--text caption">Adress</div>
            <div>{{ borrower.adresse }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="grey--text caption">Phone</div>
            <div>{{ borrower.phone }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="grey--text caption">Subcribe At</div>
            <div>{{ formatDate(borrower.created_at) }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="grey--text caption">
                Number Of Books loan
            </div>
            <div class="text-center">
              {{ loan_num }}
            </div>
          </v-flex>
        </v-layout>
      </v-card>
      <v-row class="mt-5">
        <v-col>
          <h2 class="subheading grey--text">
            List Books Loan
          </h2>
          <v-simple-table v-if="loan_num >= 1" class="mt-3">
            <template v-slot:default>
              <thead>
                <tr class="text-center">
                  <th>
                    #ID
                  </th>
                  <th>
                    Title
                  </th>
                  <th>
                    Author
                  </th>
                  <th>
                    Edition
                  </th>
                  <th>
                    Year Publish
                  </th>
                  <th>
                    Loan At
                  </th>
                  <th class="text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(book, i) in borrower.books" :key="book.id">
                  <td>{{ i }}</td>
                  <td>{{ book.title }}</td>
                  <td>{{ book.author }}</td>
                  <td>{{ book.edition }}</td>
                  <td>{{ book.year_publish }}</td>
                  <td>{{ formatDate(book.created_at) }}</td>
                  <td class="text-right">
                    <v-row>
                      <v-col>
                        <v-btn small color="error" @click="back(book.id)">
                          Signal Back
                        </v-btn>
                      </v-col>
                    </v-row>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <div class="nothing text-center mt-10" v-else>
            <h3 class="subheading grey--text display-1">Nothing :)</h3>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import apiClient from '../../services/api'
export default {
  name: 'showBorrower',
  data: () => ({
    borrower: {},
    loan_num: null
  }),
  mounted () {
    this.getBorrower()
  },
  methods: {
    async getBorrower () {
      const response = await apiClient.get('/api/borrower/show/' + this.$route.params.id)
      this.borrower = response.data.borrower
      this.loan_num = response.data.loan_number
    },
    formatDate (date) {
      return new Date(date).toLocaleDateString()
    }
  }
}
</script>
