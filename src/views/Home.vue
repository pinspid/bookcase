<template>
  <div class="home">
    <Loader />
    <div class="text-position">
      <h1 class="subheading display-1 grey--text">
        Welcome To Your BooKCase App
      </h1>
    </div>
    </div>
</template>

<script>
import Loader from '../components/Loader'
export default {
  name: 'Home',
  components: {
    Loader
  },
  data: () => ({
    loader: false
  }),
  mounted () {
    this.$store.dispatch('getAuth')
  }
}
</script>

<style scoped>
.text-position { margin-top: 250px; text-align: center }
</style>
