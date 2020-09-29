<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{on, attrs}">
      <v-btn small color="success" v-bind="attrs" v-on="on">New Category</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h4 class="subheading">New Category</h4>
      </v-card-title>
      <v-card-text>
        <v-form lazy-validation ref="form">
          <v-row>
            <v-col>
              <v-text-field
                outlined
                dense
                :rules="rules"
                v-model="wording"
                label="wording"
                prepend-icon="mdi-pencil"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn
                color="success"
                small
                :loading="loader"
                @click="addCategory"
                class="mr-3"
              >
                Add New Category
              </v-btn>
              <v-btn
                color="error"
                small
                @click="dialog = false"
              >
                Cancel
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import apiClient from '../../services/api'
export default {
  name: 'CategoryForm',
  data: () => ({
    dialog: false,
    loader: false,
    wording: '',
    rules: [
      v => !!v || 'this field is required'
    ]
  }),
  methods: {
    addCategory () {
      this.loader = true
      apiClient.get('/sanctum/csrf-cookie').then(res => {
        apiClient.post('/api/category', { wording: this.wording }).then(response => {
          if (response.data.success) {
            this.loader = false
            this.dialog = false
            this.$emit('categoryAdded')
            this.$store.dispatch('getCategory')
          }
        }).catch(e => {
          console.log(e)
        })
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>
