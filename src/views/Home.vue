<template>
  <button type="button" @click="goIntroduce()">introduce</button>
  <button type="button" @click="goSeat()">Seat</button>


  <div>
    <iframe width="560" height="315" :src="youtubeVideoUrl" frameborder="0" allowfullscreen></iframe>
  </div>
</template>


<script>
import { RouterLink, RouterView } from 'vue-router'
export default {
  data() {
    return {
      youtubeVideoKey: "pDak4qLyF4Q", // 將影片的鏈接（key）替換為實際的值
    };
  },
  computed: {
    youtubeVideoUrl() {
      return `https://www.youtube.com/embed/${this.youtubeVideoKey}`;
    },
  },
  methods: {
    goIntroduce() {
      this.$router.push('/introduce')
    },
    goSeat() {
      this.$router.push('/seat')
    }
  },
  mounted() {
  }
}


</script>


<style scoped lang="scss"></style>
