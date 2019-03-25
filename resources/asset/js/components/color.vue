<template>
  <div>
    <input type="hidden" :name="name" :value="color">
    <swatches v-model="color" colors="text-advanced" />
  </div>
</template>

<script>
  import Swatches from 'vue-swatches';
  export default {
    name: 'color',
    components: { Swatches }, // window.VueSwatches.default - from CDN
    props: {
      name: String,
      value: String
    },
    data () {
      return {
        color: this.value,
      }
    }
  }
</script>

<style scoped>

</style>