<template>
  <div class="books mt-8">
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr class="text-center">
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
            <th>Num Copy</th>
            <th>Available Copy</th>
            <th>Category</th>
            <th class="text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <Book
            v-for="book in books"
            :book="book"
            :key="book.id"
            @bookDeleted="$emit('deleteMsg')"
          />
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import Book from './Book'
export default {
  name: 'Books',
  data: () => ({}),
  computed: {
    books () {
      return this.$store.state.books
    }
  },
  props: ['search'],
  components: {
    Book
  },
  methods: {

  }
}
</script>
