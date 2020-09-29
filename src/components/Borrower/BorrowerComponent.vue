<template>
    <tr>
      <td>{{ borrower.first_name }}</td>
      <td>{{ borrower.last_name }}</td>
      <td>{{ borrower.email }}</td>
      <td>{{ borrower.phone }}</td>
      <td>{{ borrower.adresse }}</td>
      <td class="text-right">
        <v-row>
          <v-col>
            <router-link :to="{name: 'showBorrower', params: {id: borrower.id}}">
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
                <v-btn small v-on="on" color="error" :loading="loader" @click="deleteBorrower(borrower.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
              </template>
              <span>delete this borrower</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </td>
    </tr>
</template>

<script>
import apiClient from '../../services/api'
export default {
  name: 'BorrowerComponent',
  props: ['borrower'],
  data: () => ({
    loader: false
  }),
  methods: {
    deleteBorrower (id) {
      this.loader = true
      apiClient.delete('/api/borrower/' + id).then(response => {
        if (response.data.success) {
          this.loader = false
          this.$store.dispatch('borrowers')
          this.$emit('borrowerDeleted')
        }
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>
