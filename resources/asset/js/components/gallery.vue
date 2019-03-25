<template>
  <div class="container">
    <swiper :options="topSwiperOption" ref="mySwiper" >
      <!-- slides -->
      <swiper-slide style="width: 100%;" v-for="(image, index) in links" :key="index"><img :src="image" /></swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
      <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
    </swiper>
  </div>
  
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
    name: 'gallery',
    components: {
      swiper,
      swiperSlide
    },
    props: {
      photos: String
    },
    data() {
      return {
        topSwiperOption: {
          spaceBetween: 10,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          thumbs: {
            swiper: galleryThumbs
          }
        },
        bottomSwiperOption: {
          spaceBetween: 10,
          slidesPerView: 4,
          freeMode: true,
          watchSlidesVisibility: true,
          watchSlidesProgress: true,
        },
      }
    },
    computed: {
      links() {
        return JSON.parse(this.photos).map(item => {
          return item.dataURL
        })
      },
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
  }
</script>

<style scoped>

</style>