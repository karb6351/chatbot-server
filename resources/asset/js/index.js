import jquery from 'jquery';
import Vue from 'vue/dist/vue';

import initDropzone from './modules/dropzone';
import initDeleteButton from './modules/delete_button';
import test from './components/test.vue';

import VModal from 'vue-js-modal'

initDropzone();
initDeleteButton();

Vue.use(VModal)

new Vue({
  el: '#app',
  components: {
    test: test
  }
})