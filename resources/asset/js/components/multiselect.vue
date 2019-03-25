<template>
  <div>
    <input type="hidden" :name="name" :value="value">
    <multiselect v-model="value" :options="options" :multiple="true"></multiselect>
  </div>
</template>

<script>
  import Multiselect from 'vue-multiselect'
  export default {
    props: {
      propsValue: String,
      propsOptions: String,
      name: String,
    },
    data() {
      return {
        value: this.propsValue,
        options: propsOptions
      }
    },
  }
</script>

<style scoped>

</style>