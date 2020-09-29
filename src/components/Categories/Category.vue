<template>
    <tr>
      <td>{{ category.wording }}</td>
      <td class="text-right">
        <v-row>
          <v-col>
            <v-btn class="mr-2" small color="primary">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
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
export default {
  name: 'CategoryComponent',
  props: ['category'],
  data: () => ({
    loader: false
  }),
  methods: {
    deleteCategory (id) {
      this.loader = true
      apiClient.delete('/api/category/' + id).then(response => {
        if (response.data.success) {
          this.loader = false
          this.dialog = false
          this.$emit('categoryDeleted')
          this.$store.dispatch('getCategory')
        }
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>
