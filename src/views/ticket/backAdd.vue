<template>
    <div class="view">
        <h1>電影名稱</h1>
        <div class="createMovieInfo">

            <select class="form-select form-select mb-3" v-model="this.movieName">
                <option selected>選擇影院</option>
                <option value="1">紹仁戲院</option>
                <option value="2">裕峰影城</option>
                <option value="3">梓宏影院</option>
                <option value="4">暐衡劇院</option>
            </select>

            <select class="form-select form-select mb-3" v-model="this.movieCinema">
                <option selected>選擇影廳</option>
                <option value="1">1號影廳</option>
                <option value="2">2號影廳</option>
                <option value="3">3號影廳</option>
                <option value="4">4號影廳</option>
            </select>

            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingPrice" placeholder="票價" v-model="this.moviePrice">
                <label for="floatingPrice">票價</label>
            </div>
            <div class="form-floating mb-3">
                <input type="date" class="form-control" id="floatingTime" placeholder="撥放日期" v-model="this.movieDate">
                <label for="floatingTime">撥放日期</label>
            </div>
            <div class="form-floating mb-3">
                <input type="time" class="form-control" id="floatingTime" placeholder="撥放時間" v-model="this.movieTime">
                <label for="floatingTime">撥放時間</label>
            </div>
        </div>
        <button type="button">送出</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            movieName: "選擇影院",
            movieCinema: "選擇影廳",
            moviePrice: "",
            movieDate:"",
            movieTime: ""
        }
    },
    methods: {

    },
    mounted() {
    },
}
</script>


<style scoped lang="scss">
.view {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .createMovieInfo {
        // height: 80vh;
        width: 50vw;
        
        .form-select{
            height: 10vh;
            font-size: 14pt;
            border: 1px solid;
        }
        .form-control{
            height: 10vh;
            font-size: 14pt;
            border: 1px solid;
        }
    }
}
</style>