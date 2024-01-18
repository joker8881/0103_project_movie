<template>
    <div class="movieSeat">
        <div class="seat">
            <div class="screen">
                <div class="movieScreen">
                    <div class="circle">
                        螢幕
                    </div>
                </div>
            </div>
            <div class="postion">
                <div class="rowTitle">
                    <ul v-for=" i in row" :key="i">
                        <ol>{{ String.fromCharCode(65 + i - 1) }}</ol>
                    </ul>
                </div>
                <div class="choseSeat">
                    <label v-for="i in row" :key="i" class="row-label">
                        <label v-for="j in col" :key="j" class="col-label">
                            <input class="forCheckbox" type="checkbox" :id="'seat_' + i + '_' + j" v-model="selectedSeats"
                                :value="{ row: i, col: j }" :disabled="isSeatLocked(i, j)">
                            <img :src="getCheckboxImage(i, j)" alt="Checkbox Image" class="picCheckbox">
                            <!-- <img v-if="!isSeatLocked(i, j)" :src="getCheckboxImage(i, j)" alt="Checkbox Image"
                                class="picCheckbox"> -->
                        </label>
                    </label>
                    <div class="colTitle">
                        <ul v-for=" j in col" :key="j">
                            <ol>{{ j }}</ol>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        {{ this.selectedSeats }}
        <div class="ticketInfo">
            <h1>{{ this.movieInfo.movieTitle }}</h1>
            <ul>
                <li>影院:{{ }}</li>
                <li>影廳:</li>
                <li>票價:</li>
                <li>場次:</li>
                <li>座位:</li>
            </ul>
            <hr class="separator">
            <h2>總共價格</h2>
            <button type="button" @click="gointroduce()">返回</button>
            <button type="button">立即購票</button>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {

            row: 5,
            col: 8,
            selectedSeats: [],
            movieInfo:{},
            lockedSeats: [
                // { row: 2, col: 3 },
                // { row: 4, col: 6 },
                // { row: 3, col: 2 }
            ] // 鎖定的座位
        };
    },
    methods: {
        isSeatLocked(row, col) {
            return this.lockedSeats.some(seat => seat.row === row && seat.col === col);
        },
        getCheckboxImage(row, col) {
            // 根据座位是否锁定和是否被选中返回不同的图像路径
            if (this.isSeatLocked(row, col)) {
                return 'src/views/ticket/picture/已售出.png' // 锁定状态的图像路径
            } else if (this.selectedSeats.some(seat => seat.row === row && seat.col === col)) {
                return 'src/views/ticket/picture/以勾選.png' // 选中状态的图像路径
            } else {
                return 'src/views/ticket/picture/沒勾選.png' // 默认图像路径
            }
        },
        gointroduce() {
            this.$router.push('/introduce')
        },
    },
    async mounted() {
        this.movieInfo = this.$route.query;
        console.log("Movie Details:", this.movieInfo);
    },
    watch: {
        selectedSeats() {
            // 当 selectedSeats 数组发生变化时，强制组件重新渲染
            this.$forceUpdate();
        },
    },
}
</script>


<style scoped lang="scss">
.forCheckbox {
    opacity: 0;
}

.picCheckbox {
    /* 根據需要設定圖片的樣式，例如寬度、高度等 */
    width: 40px;
    height: 40px;
    /* 可以隱藏原生 checkbox，但保留其功能 */
    opacity: 1;
    // position: absolute;
    z-index: 20;
    /* 調整 z-index 以確保 img 覆蓋在 input 上面 */
}

.movieSeat {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center; // 使内容水平居中
    align-items: center; // 使内容垂直居中

    .seat {
        width: 70vw;
        height: 100vh;
        border-right: 2px solid;
        display: flex;
        flex-direction: column;
        align-items: center;

        // overflow-y: auto;
        // overflow-x: hidden;
        .screen {
            display: flex;
            justify-content: center;
            width: 70vw;
            height: 14vh;

            .movieScreen {
                width: 80vw;
                height: 10vh;
                height: auto;
                overflow: hidden;

                .circle {
                    width: 70vw;
                    height: 200px;
                    border-radius: 100%;
                    border: 10px solid;
                    font-size: 24pt;
                }
            }
        }

        .postion {
            display: flex;
            margin-top: 50px;

            .rowTitle {
                ol {
                    width: 40px;
                    height: 40px;
                    margin-top: 10px;
                    margin-bottom: 30px;
                }
            }
            .choseSeat {
                margin-right: 70px;

                .colTitle {
                    display: flex;

                    ul {
                        width: 50px;
                        height: 40px;
                        padding: 0;

                        ol {
                            margin-left: 15px;
                            padding: 0;
                        }
                    }
                }

                .row-label {
                    //row是向右(排)
                    display: flex;
                    // flex-direction: column;
                    align-items: center;
                    margin-bottom: 30px;
                    /* 設定行之間的底部間距 */
                }

                .col-label {
                    //col是向下(欄)
                    display: flex;
                    margin-right: 10px;
                    /* 設定列之間的右側間距 */
                    width: 40px;
                    /* 根據你的需求設定寬度 */
                    height: 40px;
                    /* 根據你的需求設定高度 */
                }
            }
        }
    }

    .ticketInfo {
        width: 30vw;
        height: 100vh;
        // border: 1px solid;

        li {
            list-style: none;
            text-align: left;
            font-size: 16pt;
            margin-bottom: 30px;
        }

        .separator {
            border: 5px solid black;
            /* 分隔線的顏色和樣式，你可以根據需要更改 */
            margin-bottom: 50px;
            /* 調整分隔線上下的邊距，根據需要更改 */
        }
        button{
            margin-top: 80px;
        }
    }
}</style>