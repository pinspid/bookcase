<template>
  <tr>
    <td>{{ loan.borrower.last_name }}</td>
    <td>{{ loan.book.title }}</td>
    <td>{{ loan.type }}</td>
    <td>{{ loan.date }}</td>
    <td>{{ loan.back_date }}</td>
    <td>{{ loan.back }}</td>
    <td class="text-right">
      <v-row>
        <v-col>
            <v-tooltip top>
              <template v-slot:activator="{on}">
                <v-btn
                  class="mr-2"
                  v-on="on"
                  :disabled="loan.back !== '-'"
                  :loading="loader1"
                  small
                  color="primary"
                  @click="loanBack(loan.id)"
                >
                  <v-icon>mdi-login</v-icon>
                </v-btn>
              </template>
              <span>Signal Return</span>
            </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{on}">
              <v-btn small v-on="on" color="error" :loading="loader" @click="deleteLoan(loan.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
            </template>
            <span>delete this loan</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </td>
  </tr>
</template>

<script>
import apiClient from '../../services/api'
export default {
  name: 'Loan',
  props: ['loan'],
  data: () => ({
    loader: false,
    loader1: false
  }),
  methods: {
    deleteLoan (id) {
      this.loader = true
      apiClient.delete('/api/loan/' + id).then(response => {
        if (response.data.success) {
          this.loader = false
          this.$store.dispatch('loans')
          this.$emit('loanDeleted')
        }
      }).catch(e => {
        console.log(e)
      })
    },
    loanBack (id) {
      this.loader1 = true
      apiClient.get('/sanctum/csrf-cookie').then(res => {
        apiClient.put('/api/loan/' + id).then(response => {
          if (response.data.success) {
            this.loader1 = false
            this.$store.dispatch('loans')
          } else {
            if (response.data.error) {
              console.log(response)
            }
          }
        })
      })
    },
    formatedDate (d) {
      return d.substr(0, 10)
    }
  }
}
</script>
