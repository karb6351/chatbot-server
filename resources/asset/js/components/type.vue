<template>
  <div>
    <input type="hidden" name="model_id" :value="model_id" />
    <input type="hidden" name="type" :value="type" />
    <div class="field" style="margin-bottom: 10px;">
      <label class="label">Type</label>
      <div class="control">
        <div class="select">
          <select v-model="type">
            <option :selected="item.name === 'restaurant'" :key="index" :value="item.name" v-for="(item, index) in types">{{ item.name }}</option>
          </select>
        </div>
    
        <span style="margin-left: 5px" class="select" v-if="this.type === 'restaurant'">
          <select @change="handleModel($event)">
            <option :selected="type == 'restaurant' && propsModelId == item.id" :key="index" :value="item.id" v-for="(item, index) in JSON.parse(propsRestaurant)">{{ item.name }}</option>
          </select>
        </span>
      
        <span class="select" v-else>
          <select @change="handleModel($event)">
            <option :selected="type == 'general_local_knowledge' && propsModelId == item.id" :key="index" :value="item.id" v-for="(item, index) in JSON.parse(propsGeneralLocalKnowledge)">{{ item.name }}</option>
          </select>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'type',
    props: {
      propsType: String,
      propsModelId: String,
      propsRestaurant: String,
      propsGeneralLocalKnowledge: String,
    },
    data(){
      return {
        types: [
          {
            id: 1,
            name: 'restaurant', 

          },
          {
            id: 2,
            name: 'general_local_knowledge'
          }
        ],
        type: this.propsType === '' ? 'restaurant' : this.propsType,
        model_id: this.propsModelId ? this.propsModelId : JSON.parse(this.propsRestaurant)[0].id
      }
    },
    methods: {
      handleModel(event) {
        this.model_id = event.target.value;
      },
      
    },
    watch: {
      type(newValue, oldValue) {
        if ('general_local_knowledge' == newValue){
          this.model_id = JSON.parse(this.propsGeneralLocalKnowledge)[0].id
        }else{
          this.model_id = JSON.parse(this.propsRestaurant)[0].id
        }
      }
    },
  }
</script>

<style scoped>

</style>