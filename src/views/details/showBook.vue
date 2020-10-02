<template>
  <div class="show mt-8">
    <v-row>
      <v-col>
        <h2 class="subheading grey--text">Book Information</h2>
      </v-col>
      <v-col align="end">
        <v-btn small color="success">
          <span>Edit</span>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-container class="my-3">
      <v-row>
        <v-col>
          <h2 class="subheading grey--text">
            Books Description
          </h2>
          <v-card text class="pa-3">
            <v-layout row wrap class="pa-3 projet-ongoing">
              <v-flex x12 sm4 md4>
                <div class="grey--text caption">Title</div>
                <div>
                  {{ book.title}}
                </div>
              </v-flex>
              <v-flex xs6 sm4 md4>
                <div class="grey--text caption">Author</div>
                <div>{{ book.author }}</div>
              </v-flex>
              <v-flex xs6 sm4 md2>
                <div class="grey--text caption">Edition</div>
                <div>{{ book.edition }}</div>
              </v-flex>
              <v-flex xs6 sm4 md2>
                <div class="grey--text caption">Publisher</div>
                <div>{{ book.publisher }}</div>
              </v-flex>
            </v-layout>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-col>
          <h2 class="subheading grey--text">
            Books Stock
          </h2>
          <v-card text class="pa-3">
            <v-layout row wrap class="pa-3 projet-ongoing">
              <v-flex x12 sm12 md4>
                <div class="grey--text caption">Copies</div>
                <div>
                  {{ book.num_copy}}
                </div>
              </v-flex>
              <v-flex xs6 sm6 md4>
                <div class="grey--text caption">Available</div>
                <div>{{ book.available_copy }}</div>
              </v-flex>
              <v-flex xs6 sm6 md4>
                <div class="grey--text caption">Loan copies</div>
                <div>{{ book.borrow_copy }}</div>
              </v-flex>
            </v-layout>
          </v-card>
        </v-col>
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
    book: {}
  }),
  mounted () {
    this.getBorrower()
  },
  methods: {
    async getBorrower () {
      const response = await apiClient.get('/api/book/getByTitle/' + this.$route.params.title)
      this.book = response.data.data[0]
    }
  }
}
</script>
