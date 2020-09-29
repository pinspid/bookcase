<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr class="text-center">
            <th class="text-left">
              Title
            </th>
            <th class="text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <CategoryComponent v-for="category in categories" :key="category.id" :category="category" @categoryDeleted="$emit('catDeleted')"/>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import CategoryComponent from './Category'
export default {
  name: 'Categories',
  data () {
    return {
      search: '',
      loader: false
    }
  },
  props: ['categories'],
  components: { CategoryComponent },
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
