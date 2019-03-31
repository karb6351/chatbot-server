<template>
  <div class="icon-wrapper">
    <i :class="iconType"></i>
  </div>
</template>

<script>
  export default {
    name: 'route-item',
    props: {
      event: Object
    },
    computed: {
      iconType(){
        return this.event.type === 'general_local_knowledge' ? 'fas fa-book' : 'fas fa-utensils'
      }
    }
  }
</script>

<style lang="scss" scoped>
.icon-wrapper{
  padding: 10px;
  border-radius: 50%;
  border: 4px solid #555555;
  
}
</style>