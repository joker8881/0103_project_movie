<template>
    <div class="view">
        <div class="check">
            <div class="movieName">
                <p>電影名稱:</p>
                <input type="text" v-model="this.movieName">
            </div>
            <div class="cinema">
                <p>影院:</p>
                <input type="text" name="" id="" v-model="this.cinema">
            </div>
            <div class="onDate">
                <p>撥放日期:</p>
                <input type="date" name="" id="" v-model="this.onDate">
            </div>
            <button class="search" type="submit" @click="search()">搜尋</button>
        </div>
        <div class="icon">
            <button type="button" @click="create()"><i class="fa-solid fa-plus"></i></button>
        </div>
        <table class="table">
            <thead>
                <tr class="index">
                    <th>電影名稱</th>
                    <th>影院</th>
                    <th>影廳</th>
                    <th>價格</th>
                    <th>撥放日期</th>
                    <th>修改</th>
                </tr>
                <tr v-for="(item, index) in quizList" :key="index">
                    <td><input type="checkbox" v-model="num" :value="item.num" /></td>
                    <td>{{ item.num }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.published }}</td>
                    <td>{{ item.startDate }}</td>
                    <td>{{ item.endDate }}</td>
                    <td>{{ this.view }}</td>
                </tr>
            </thead>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            movieName: "",
            cinema: "",
            onDate: ""
        }
    },
    methods: {
        create() {
            this.$router.push('/backSearch')
        }
    },
    mounted() {
    },
}
</script>


<style scoped lang="scss">
.view {
    margin-top: 20px;
    margin-left: 8vw;

    .check {
        display: flex;
        flex-wrap: wrap;
        width: 80vw;
        height: 25vh;
        border: 1px solid black;

        .search {
            width: 8%;
            height: 5vh;
            margin-left: 16px;
            margin-top: 30px;
            color: white;
            background-color: salmon;
        }

        .movieName {
            width: 100vw;
            display: flex;
            justify-content: start;
            align-items: center;
            font-size: 16pt;
            margin-left: 50px;

            input {
                width: 85%;
                height: 5vh;
                margin-left: 3vw;
            }
        }

        .cinema {
            width: 40%;
            display: flex;
            justify-content: start;
            align-items: center;
            margin-left: 90px;
            font-size: 16pt;

            input {
                height: 5vh;
                width: 50%;
                margin-left: 3vw;
                font-size: 16pt;
            }
        }

        .onDate {
            width: 40%;
            display: flex;
            justify-content: start;
            align-items: center;
            font-size: 16pt;

            input {
                height: 5vh;
                width: 50%;
                margin-left: 3vw;
                font-size: 16pt;
            }

        }

        p {
            margin: 0;
        }
    }

    .table {
        width: 80vw;
        height: auto;

        // border: 1px solid black;
        .index {
            background-color: gray;
        }

        th {
            height: 5vh;
            border: 1px solid black;
        }

        td {
            height: 5vh;
            border: 1px solid black;
        }
    }

    .icon {
        display: flex;
        justify-content: start;
        align-items: center;
        margin-top: 3vh;
        margin-bottom: 3vh;

        button {
            background-color: white;
            border-width: 0;
            font-size: 32pt;
            width: 5vw;
            height: 5vh;
        }
    }

}
</style>