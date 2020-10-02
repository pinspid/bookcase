<template>
  <div class="books mt-8">
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr class="text-center">
            <th>
              Borrower
            </th>
            <th>
              Book
            </th>
            <th>
              Type
            </th>
            <th>
              Loan Date
            </th>
            <th>Back Date</th>
            <th>Return</th>
            <th class="text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <Loan
            v-for="loan in loans"
            :loan="loan"
            :key="loan.id"
            @loanDeleted="$emit('deleteMsg')"
          />
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import Loan from './Loan'
export default {
  name: 'Loans',
  data: () => ({}),
  computed: {
    loans () {
      return this.$store.state.loans
    }
  },
  props: ['search'],
  components: {
    Loan
  },
  methods: {

  }
}
</script>
