<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{on, attrs}">
      <v-btn class="mr-2" small color="primary" v-bind="attrs" v-on="on">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h4 class="subheading">Edit Category</h4>
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
                @click="updateCategory"
                class="mr-3"
              >
                Upadate
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
  name: 'CategoryEdit',
  props: {
    category: Object
  },
  data: () => ({
    dialog: false,
    loader: false,
    wording: '',
    id: null,
    rules: [
      v => !!v || 'this field is required'
    ]
  }),
  mounted () {
    this.wording = this.category.wording
    this.id = this.category.id
  },
  methods: {
    updateCategory () {
      this.loader = true
      apiClient.get('/sanctum/csrf-cookie').then(res => {
        apiClient.put('/api/category/' + this.id, { wording: this.wording }).then(response => {
          if (response.data.success) {
            this.loader = false
            this.dialog = false
            this.$emit('updateCategory', response.data)
            this.$store.dispatch('getCategory')
          }
        }).catch(e => {
          console.log(e)
        })
      }).catch(e => console.log(e))
    }
  }
}
</script>
