<template>
  <div>
    <input type="hidden" :name="name" :value="valueId">
    <multiselect v-model="rawValue" :options="options" :multiple="true" label="name" track-by="name"></multiselect>
  </div>
</template>

<script>
  import Multiselect from 'vue-multiselect'
  export default {
    components: {
      multiselect: Multiselect
    },
    props: {
      propsValue: String,
      propsOptions: String,
      name: String,
    },
    data() {
      return {
        rawValue: JSON.parse(this.propsValue),
        options: JSON.parse(this.propsOptions)
      }
    },
    computed: {
      valueId() {
        return this.rawValue ? this.rawValue.map(item => item.id).toString() : ''
      }
    },
  }
</script>

<style scoped>

</style>