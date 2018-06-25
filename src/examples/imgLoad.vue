<template>
  <div>
    <img class="img" v-img-load='imgurl'>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        imgurl: ''
      }
    },
    mounted() {
      setTimeout(() => {
        this.imgurl =
          'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2380019127.webp'
      }, 1000)
    }
  }
</script>

<style>
  .img {
    display: inline-block;
    width: 100px;
    height: 100px;
  }
</style>