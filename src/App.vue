<template>
<v-app>
  <Navbar />
  <v-main class="mx-10">
    <v-fade-transition mode="out-in">
      <router-view></router-view>
    </v-fade-transition>
  </v-main>
</v-app>
</template>

<script>
import Navbar from './components/Navbar'
// import apiClient from './services/api'
export default {
  name: 'App',
  components: {
    Navbar
  },
  data: () => ({
    //
  }),
  mounted () {
    // this.getAuth()
  },
  methods: {
    // getAuth: async () => {
    //   try {
    //     const response = await apiClient.get('/api/user')
    //     this.$store.commit('user', response.data)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
  }
}
</script>

<style lang="css">
  .fade-enter-active, .fade-leave-active {
    transition: 0.7s opacity ease;
  }
  .fade-enter, .fade-leave {
    opacity: 0;
  }
</style>
