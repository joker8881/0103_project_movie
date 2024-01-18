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
    </div>
  </div>

  <table v-if="selectedTab === '正在熱映'" style="width: 60vw; margin: 0 auto">
    <thead>
      <tr>
        <th>順序</th>
        <th>編號</th>
        <th>封面</th>
        <th>名稱</th>
        <th>介紹</th>
        <th>上映時間</th>
      </tr>
      <tr v-for="(item, index) in this.objPlayingMovie" :key="index" >
        <td>{{ index + 1 }}</td>
        <td>{{ item.id }}</td>
        <td><img :src="'https://image.tmdb.org/t/p/w154' + item.poster_path" alt="" @click="gotointroduce(item)" ></td>
        <td>{{ item.title }}</td>
        <td v-if="item.overview === ''">此電影無簡介</td>
        <td v-if="item.overview !== ''">{{ item.overview }}</td>
        <td>{{ item.release_date }}</td>
      </tr>
    </thead>
  </table>

  <table v-if="selectedTab === '即將上映'" style="width: 60vw; margin: 0 auto">
    <thead>
      <tr>
        <th>順序</th>
        <th>編號</th>
        <th>封面</th>
        <th>名稱</th>
        <th>介紹</th>
        <th>上映時間</th>
      </tr>
      <tr v-for="(item, index) in this.objUpComing" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ item.id }}</td>
        <td><img :src="'https://image.tmdb.org/t/p/w154' + item.poster_path" alt="" @click="gotointroduce(item)"></td>
        <td>{{ item.title }}</td>
        <td v-if="item.overview === ''">此電影無簡介</td>
        <td v-if="item.overview !== ''">{{ item.overview }}</td>
        <td>{{ item.release_date }}</td>
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
      objPlayingMovie: [],
      objUpComing: [],
      objTrailer: [],

    };
  },
  methods: {
    selectTab(tab) {
      this.selectedTab = tab;
    },
    nowPlaying() {
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
        // console.log(res.data.results);
        this.objPlayingMovie = res.data.results
      })
    },
    upComing() {
      axios({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/upcoming',
        params: { language: 'zh-tw', page: '1' },
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTFmNDFjYjUxYWI2NmIzMjJkMGM1OGZkMDY1Y2I1YSIsInN1YiI6IjY1NThmNzFmMDgxNmM3MDBhYmJlNWQ3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RtMbqdUQUCfdqaLD5SoZ18e4PlSq9Ap4ShtGhmUMm10'
        }
      }).then(res => {
        console.log(res);
        // console.log(res.data.results);
        this.objUpComing = res.data.results
      })
    },
    trailer() {
      axios({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/' + { movie_id } / videos,
        params: { language: 'en-US', page: '1' },
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTFmNDFjYjUxYWI2NmIzMjJkMGM1OGZkMDY1Y2I1YSIsInN1YiI6IjY1NThmNzFmMDgxNmM3MDBhYmJlNWQ3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RtMbqdUQUCfdqaLD5SoZ18e4PlSq9Ap4ShtGhmUMm10'
        }
      }).then(res => {
        console.log(res);
        // console.log(res.data.results);
        // this.objTrailer = res.data.results
      });
    },
    gotointroduce(item) {
      console.log(item)
      this.$router.push({
        name: 'introduce',
        query: {
          movieGenreid: item.genre_ids,
          movieId: item.id,
          movieOriginaltitle: item.original_title,
          movieTitle: item.title,
          movieOverview: item.overview,
          moviePoster: item.poster_path,
          movieBack: item.backdrop_path,
          movieReleasedate: item.release_date,
          movieVoteavg: item.vote_average,
        }
      });
    }
  },
  mounted() {
    this.nowPlaying()
    this.upComing()
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