<template>
  <div class="top">
    <button type="button" value="1" :class="{ active: selectedTab === '正在熱映' }" @click="selectTab('正在熱映')">
      正在熱映
    </button>
    <span>/</span>
    <button type="button" value="2" :class="{ active: selectedTab === '即將上映' }" @click="selectTab('即將上映')">
      即將上映
    </button>
  </div>

  <div class="sortMoive">
    <div class="moviePic">
      <button type="button" @click="nowPlaying()">正在上映</button>
      <button type="button" @click="nowPlayingTest()">正在上映</button>
    </div>
  </div>

  <table class="table">
    <thead>
      <tr class="index">
        <th>順序</th>
        <th>編號</th>
        <th>封面</th>
        <th>名稱</th>
        <th>介紹</th>
        <th>開始時間</th>
        <th>結束時間</th>
        <th>結果</th>
      </tr>
      <tr v-for="(item, index) in playingMovie" :key="index">
        <td>{{ index+1 }}</td>
        <td>{{ item.id}}</td>
        <td><img :src="'https://image.tmdb.org/t/p/w154'+item.poster_path" alt="" ></td>
        <td>{{ item.original_title }}</td>
        <td>{{ item.overview }}</td>
        <td>{{ item.startDate }}</td>
        <td>{{ item.endDate }}</td>
        <td>{{ this.view }}</td>
      </tr>
    </thead>
  </table>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      selectedTab: "正在熱映",
      playingMovie: []
    };
  },
  methods: {
    selectTab(tab) {
      this.selectedTab = tab;
    },
    nowPlayingTest() {
      axios({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/now_playing',
        params: { language: 'zh-tw', page: '1' },
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTFmNDFjYjUxYWI2NmIzMjJkMGM1OGZkMDY1Y2I1YSIsInN1YiI6IjY1NThmNzFmMDgxNmM3MDBhYmJlNWQ3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RtMbqdUQUCfdqaLD5SoZ18e4PlSq9Ap4ShtGhmUMm10'
        }
      }).then(res => {
        console.log(res);
        console.log(res.data.results);
        this.playingMovie = res.data.results
      })
    },
    nowPlaying() {
      const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/now_playing',
        params: { language: 'en-US', page: '1' },
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTFmNDFjYjUxYWI2NmIzMjJkMGM1OGZkMDY1Y2I1YSIsInN1YiI6IjY1NThmNzFmMDgxNmM3MDBhYmJlNWQ3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RtMbqdUQUCfdqaLD5SoZ18e4PlSq9Ap4ShtGhmUMm10'
        }
      };
      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.top {
  display: flex;
  margin-top: 5vh;
  margin-left: 5vw;
  font-size: 20pt;

  button {
    border: none;
    background-color: white;

    &.active {
      color: black; // 正在熱映時的顏色
    }

    &:not(.active) {
      color: gray; // 即將上映時的顏色
    }
  }
}
</style>