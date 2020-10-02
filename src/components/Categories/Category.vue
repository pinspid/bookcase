<template>
  <tr>
    <td>{{ category.wording }}</td>
    <td class="text-right">
      <v-row>
        <v-col>
          <CategoryEdit
            @updateCategory="categoryUpdate"
            :category="category"
          />
          <v-btn small color="error" :loading="loader" @click="deleteCategory(category.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </td>
  </tr>
</template>

<script>
import apiClient from '../../services/api'
import CategoryEdit from './CategoryEdit'
export default {
  name: 'CategoryComponent',
  props: ['category'],
  data: () => ({
    loader: false
  }),
  components: {
    CategoryEdit
  },
  methods: {
    deleteCategory (id) {
      this.loader = true
      apiClient.delete('/api/category/' + id).then(response => {
        if (response.data.success) {
          this.loader = false
          this.dialog = false
          this.$emit('categoryDeleted', response.data)
          this.$store.dispatch('getCategory')
        }
      }).catch(e => {
        console.log(e)
      })
    },
    categoryUpdate (e) {
      this.$emit('notify', e)
    }
  }
}
</script>
