<template>
    <div class="top" id="first">
        <div class="post">
            <img :src="'https://image.tmdb.org/t/p/w342' + movieInfo.moviePoster" style="width: 100%; height: 100%;">
        </div>
        <div class="movieInfo">
            <h1>{{ this.movieInfo.movieTitle }}</h1>
            <p>{{ this.movieInfo.movieOriginaltitle }}</p>
            <p>評分: {{ this.movieInfo.movieVoteavg }}</p>
            <p>片長:</p>
            <p>上映日: {{ this.movieInfo.movieReleasedate }}</p>
            <p>類型</p>
            <p>演員</p>
            <p>導演</p>
            <p>簡介: {{ this.movieInfo.movieOverview }}</p>
        </div>
    </div>
    <div class="middleInfo">
        <div class="middle">
            <div class="mid">
                電影預告
            </div>
        </div>
        <div class="trailer">
            <!-- <iframe width="80%" height="500px" src="https://www.youtube.com/embed/pDak4qLyF4Q" title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen></iframe> -->
            <iframe width="80%" height="500px" :src="youtubeVideoUrl" frameborder="0" allowfullscreen></iframe>
        </div>

        <div class="down">
            <div class="turn">
                線上訂票
            </div>
        </div>
    </div>
    <div class="footer">
        <div class="selectTheater">
            選取影城
        </div>
        <div class="selectButton">
            <button type="button" @click="show()">紹仁戲院</button>
            <button type="button" @click="show()">裕峰影城</button>
            <button type="button" @click="show()">梓宏影院</button>
            <button type="button" @click="show()">暐衡劇院</button>
        </div>
        <div class="selectDate" v-show="isVisible" id="book">
            <h1>影院幾廳</h1>
            <h1>時段</h1>
            <button type="button" @click="gotoSeat(movieInfo)">選取位置</button>
        </div>
    </div>
    <div class="back" @click="scrollToTop()">
        <i class="fa-solid fa-up-long"></i>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            movieInfo: {},
<<<<<<< HEAD
            video: [],
=======
            video:[],
>>>>>>> 7f8d4575011d164ca46f46552a9fc86fd821fa49
            objPlayingMovie: [],
            isVisible: false,
            videoKey: "", // 將影片的鏈接（key）替換為實際的值
            videoId: "",
        }
    },
    computed: {
        youtubeVideoUrl() {
            return `https://www.youtube.com/embed/${this.videoKey}`;
        },
    },
    methods: {
        show() {
            this.isVisible = true
        },
        goSeat() {
            this.$router.push('/seat')
        },
        gotoSeat(movieInfo) {
            console.log(movieInfo)
            this.$router.push({
                name: 'seat',
                query: {
                    movieGenreid: movieInfo.movieGenreid,
                    movieId: movieInfo.movieId,
                    movieOriginaltitle: movieInfo.movieOriginaltitle,
                    movieTitle: movieInfo.movieTitle,
                    movieOverview: movieInfo.movieOverview,
                    moviePoster: movieInfo.moviePoster,
                    movieBack: movieInfo.movieBack,
                    movieReleasedate:movieInfo.movieReleasedate,
                    movieVoteavg: movieInfo.movieVoteavg,
                }
            });
        },
        destroyed() {
            // 在組件被銷毀時移除滾動事件監聽器，避免內存洩漏
            window.removeEventListener('scroll', this.handleScroll);
        },
        handleScroll() {
            // 檢查用戶是否已經滾動超過一定的位置
            this.showScrollToTop = window.scrollY > 200; // 這裡的200可以根據需要調整
        },
        scrollToTop() {
            // 獲取目標元素
            const first = document.getElementById('first');

            if (first) {
                // 使用scrollIntoView方法滾動到目標元素
                first.scrollIntoView({
                    behavior: 'smooth', // 可選，滾動過程中使用平滑的動畫效果
                    block: 'start', // 可選，滾動到目標元素的開始位置
                });
            }
        },
        catchTrailer() {
            axios({
                method: 'GET',
                url: `https://api.themoviedb.org/3/movie/${this.movieInfo.movieId}/videos`,
                params: { language: 'en-US', page: '1' },
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTFmNDFjYjUxYWI2NmIzMjJkMGM1OGZkMDY1Y2I1YSIsInN1YiI6IjY1NThmNzFmMDgxNmM3MDBhYmJlNWQ3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RtMbqdUQUCfdqaLD5SoZ18e4PlSq9Ap4ShtGhmUMm10'
                }
            }).then(res => {
                console.log(res.data.results);
                this.video = res.data.results
                this.video.forEach(item => {
                    if (item.type == "Trailer") {
                        this.videoKey = item.key
                    }
                }
                );
                console.log(this.videoKey);
            });
        },
    },
    async mounted() {
        this.movieInfo = this.$route.query;
        console.log("Movie Details:", this.movieInfo);
<<<<<<< HEAD
        window.addEventListener('scroll', this.handleScroll);
        this.catchTrailer()
    }
};
=======
        // console.log("Movie Details:", this.movieInfo);
        // setTimeout(() => {
        //     $(".loader").hide();
        // }, 2000);
            // this.nowPlaying()
            window.addEventListener('scroll', this.handleScroll);
        }
    };
>>>>>>> 7f8d4575011d164ca46f46552a9fc86fd821fa49
</script>

<style scoped lang="scss">
.top {
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 80vh;

    .post {
        width: 22.5vw;
        height: 70vh;

    }

    .movieInfo {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: start;
        padding: 20px;
        width: 72.5vw;
        height: 70vh;
        text-align: left;
    }

}

.middleInfo {
    .middle {
        display: flex;
        justify-content: start;
        width: 100vw;
        height: 4em;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top: 2px solid rgb(230, 230, 230);

        .mid {
            font-weight: 300;
            letter-spacing: 0.5em;
            color: rgb(51, 51, 51);
            height: 100%;
            margin-left: 5vw;
            font-size: 1.5em;
            padding: 0px 2em;
            display: flex;
            align-items: center;
            border-left: 1px solid rgb(230, 230, 230);
            border-right: 1px solid rgb(230, 230, 230);
            background: repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.067), rgba(0, 0, 0, 0.067) 2px, rgba(0, 0, 0, 0) 2px, rgba(0, 0, 0, 0) 4px);
        }
    }

    .trailer {
        width: 100vw;
        height: 500px;
        background-color: black;
    }

    .down {
        display: flex;
        justify-content: start;
        width: 100vw;
        height: 4em;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 2px solid rgb(230, 230, 230);

        .turn {
            font-weight: 300;
            letter-spacing: 0.5em;
            color: rgb(51, 51, 51);
            height: 100%;
            margin-left: 5vw;
            font-size: 1.5em;
            padding: 0px 2em;
            display: flex;
            align-items: center;
            border-left: 1px solid rgb(230, 230, 230);
            border-right: 1px solid rgb(230, 230, 230);
            background: repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.067), rgba(0, 0, 0, 0.067) 2px, rgba(0, 0, 0, 0) 2px, rgba(0, 0, 0, 0) 4px);
        }
    }

}

.footer {
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 15px;
    width: 100%;
    // height: 50%;
    margin-left: auto;
    margin-right: auto;
    font-size: 1.8em;
    letter-spacing: 0.2em;
    font-weight: 300;

    .selectTheater {
        margin-bottom: 1em;

    }

    .selectButton {
        width: 100vw;
        border-bottom: 3px solid rgb(238, 238, 238);

        button {
            margin-right: 1em;
            margin-bottom: 0.6em;
            padding: 5px;
        }
    }

    .selectDate {
        width: 100vw;
        display: flex;
        padding: 1em 0px;
        justify-content: space-around;
        align-items: center;
        border-bottom: 3px solid rgb(238, 238, 238);
        font-weight: 300;
    }
}

.back {
    position: fixed;
    right: 0.5em;
    bottom: 0.5em;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 1.5em;
    height: 1.5em;
    border-radius: 2em;
    background: rgba(255, 255, 255, 0.867);
    box-shadow: rgba(0, 0, 0, 0.2) 2px 2px 6px;
    font-size: 2em;
    line-height: 0.5em;
    color: rgb(168, 143, 111);
    transition: all 0.2s ease-in-out 0s;
    opacity: 1;
    cursor: pointer;
    z-index: 1000;
    transform: scale(1);
}
</style>