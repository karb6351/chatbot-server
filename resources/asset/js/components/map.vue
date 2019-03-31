<template>
  <div style="position: relative;">
    <div class="loading" v-show="isLoading"><div class="loading-item"></div></div>
    <input type="hidden" :name="name" :value="tempValue">
    <GmapAutocomplete class="input" @place_changed="handlePlaceUpdate"></GmapAutocomplete>
    <!-- <GmapMap @center_changed="updateCenter" ref="mapRef" :center="center" :zoom="16" style="width: 100%; height: 400px" :options="options">
      <GmapMarker
        :position="center"
        @click="this.shiftToLoction(center)"
      />
    </GmapMap> -->
  </div>
</template>

<script>
  export default {
    props:{
      name: String,
      gps: {
        type: String,
        default: '{"lat":0, "lng":0}'
      }
    },
    data() {
      return {
        tempValue: null,
        center: null,
        userLocation: null,
        currentLocation: null,
        isLoading: false,
        options: {
          zoomControl: true,
          mapTypeControl: true,
          scaleControl: true,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: true,
          disableDefaultUi: false
        }
      }
    },
    methods: {
      handlePlaceUpdate(event){
        this.tempValue = JSON.stringify({
          lat: event.geometry.location.lat(),
          lng: event.geometry.location.lng()
        });
      },
      updateCenter(){
        const vm = this; 
        this.$refs.mapRef.$mapPromise.then((map) => {
          const latlng = map.getCenter();
          vm.currentLocation = {
            lat: latlng.lat(), 
            lng: latlng.lng()
          };
        })
      },
      getUserLocation() {
        if (navigator.geolocation) {
          this.isLoading = true;
          new Promise((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject)
            })
            .then(position => {
              this.userLocation = {lat:position.coords.latitude, lng:position.coords.longitude};
              if (this.center.lat === 0 && this.center.lng === 0){
                this.center = this.userLocation;
              }
              this.shiftToCenter();
            })
            .catch(error => {
              let message = "";
              switch(error.code) {
                case error.PERMISSION_DENIED:
                  message = "User denied the request for Geolocation."
                  break;
                case error.POSITION_UNAVAILABLE:
                  message = "Location information is unavailable."
                  break;
                case error.TIMEOUT:
                  message = "The request to get user location timed out."
                  break;
                case error.UNKNOWN_ERROR:
                  message = "An unknown error occurred."
                  break;
                console.warn(message);
              }
              });
            this.isLoading = false;
        } else {
          let message = "Geolocation is not supported by this browser.";
          console.error(message);
        }
      },
      initCenter(){
        let obj = JSON.parse(this.gps);
        this.center = obj;
      },
      shiftToLoction(coords){
        this.$refs.mapRef.$mapPromise.then((map) => {
          map.panTo(coords);
        })
      },
      shiftToUserLocation(){
        if (this.userLocation){
          this.shiftToLoction(this.userLocation);
        } 
      },
      shiftToCenter(){
        if (this.center){
          this.shiftToLoction(this.center);
        } 
      }
    },
    created(){
      this.initCenter();
    },
    mounted () {
      this.getUserLocation();
    }
  }
</script>

<style lang="scss" scoped>

</style>