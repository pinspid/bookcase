<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr class="text-center">
            <th>
              First Name
            </th>
            <th>
              Last Name
            </th>
            <th>
              Email
            </th>
            <th>
              Phone
            </th>
            <th>
              Adress
            </th>
            <th class="text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <BorrowerComponent
            v-for="borrower in borrowers"
            :borrower="borrower"
            :key="borrower.id"
            @borrowerDeleted="$emit('showMsg', 'Borrower Deleted')"
          />
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import BorrowerComponent from './BorrowerComponent'
export default {
  name: 'Borrowers',
  data () {
    return {
      loader: false
    }
  },
  computed: {
    borrowers () {
      return this.$store.state.borrowers
    }
  },
  components: { BorrowerComponent },
  methods: {}
}
</script>
