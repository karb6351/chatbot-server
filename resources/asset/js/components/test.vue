<template>
  <div>
    <span @click="show">{{name}}</span>
    <modal name="hello-world">
      hello, world!
    </modal>
  </div>
</template>

<script>
  export default {
    name: 'test',
    data(){
      return {
        name:"david"
      }
    },
    methods: {
      show () {
        this.$modal.show('hello-world');
      },
      hide () {
        this.$modal.hide('hello-world');
      }
    }
  }
</script>

<style scoped>

</style>