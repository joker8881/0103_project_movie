<template>
  <button type="button" @click="goIntroduce()">introduce</button>
  <button type="button" @click="goSeat()">Seat</button>
</template>


<script>
import { RouterLink, RouterView } from 'vue-router'
export default {
  data() {
    return 
  },
  methods: {
    goIntroduce(){
      this.$router.push('/introduce')
    },
    goSeat(){
      this.$router.push('/seat')
    }
  },
  mounted() {
  }
}


</script>


<style scoped lang="scss"></style>
