import jquery from 'jquery';
import Vue from 'vue/dist/vue';

import initDropzone from './modules/dropzone';
import initDeleteButton from './modules/delete_button';
import color from './components/color.vue';
import gallery from './components/gallery.vue';

import VModal from 'vue-js-modal'

initDropzone();
initDeleteButton();

Vue.use(VModal)

new Vue({
  el: '#app',
  components: {
    color: color,
    gallery: gallery
  }
})