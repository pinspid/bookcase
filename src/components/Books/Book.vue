<template>
    <tr>
      <td>{{ book.title }}</td>
      <td>{{ book.author }}</td>
      <td>{{ book.category }}</td>
      <td class="text-right">
        <v-row>
          <v-col>
            <router-link :to="{name: 'showBook', params: {title: book.title}}">
              <v-tooltip top>
                <template v-slot:activator="{on}">
                  <v-btn class="mr-2" v-on="on" small color="primary">
                    <v-icon>mdi-eye</v-icon>
                  </v-btn>
                </template>
                <span>show more</span>
              </v-tooltip>
            </router-link>
            <v-tooltip top>
              <template v-slot:activator="{on}">
                <v-btn small v-on="on" color="error" :loading="loader" @click="deleteBook(book.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
              </template>
              <span>delete this book</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </td>
    </tr>
</template>

<script>
import apiClient from '../../services/api'
export default {
  name: 'Book.vue',
  props: ['book'],
  data: () => ({
    loader: false
  }),
  methods: {
    deleteBook (id) {
      this.loader = true
      apiClient.delete('/api/book/' + id).then(response => {
        if (response.data.success) {
          this.loader = false
          this.$store.dispatch('getBooks')
          this.$emit('bookDeleted')
        }
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>
