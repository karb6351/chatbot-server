import jquery from 'jquery';
import Vue from 'vue/dist/vue';

import initDropzone from './modules/dropzone';
import initDeleteButton from './modules/delete_button';
import color from './components/color.vue';
import gallery from './components/gallery.vue';
import multiselect from './components/multiselect.vue';
import map from './components/map.vue';
import type from './components/type.vue';

import VModal from 'vue-js-modal'
import * as VueGoogleMaps from 'vue2-google-maps'

initDropzone();
initDeleteButton();

Vue.use(VModal);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB6p0nvit_q-oiHdeP6WxmUjvcLjohsoH8',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
 
    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
 
  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,
 
  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
});

new Vue({
  el: '#app',
  components: {
    color: color,
    gallery: gallery,
    multiselect: multiselect,
    googleMap:  map,
    type: type
  }
})