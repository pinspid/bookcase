<template>
  <div id="overlayer" v-if="show">
    <div class="loader">
      <v-progress-circular
        :rotate="360"
        :size="100"
        :width="15"
        :value="value"
        color="primary"
      >
        {{ value }}
      </v-progress-circular>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  data: () => ({
    interval: {},
    value: 0,
    show: true
  }),
  beforeDestroy () {
    clearInterval(this.interval)
  },
  mounted () {
    this.interval = setInterval(() => {
      if (this.value === 100) {
        return (this.value = 0)
      }
      this.value += 5
    }, 250)
  },
  watch: {
    value (val) {
      if (val === 100) {
        this.show = false
      }
    }
  },
  methods: {

  }
}
</script>

<style scoped>
#overlayer {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 7100;
  background: #ffffff;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.loader {
  z-index: 7700;
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
