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
                <ul v-for="item in postionList" :key="item.id">
                    <span>{{ item.perfix }}</span>
                    <li class="active">A1</li>
                    <li>A2</li>
                    <li>A3</li>
                    <li>A4</li>
                    <li>A5</li>
                </ul>
            </div>

        </div>
        <div class="ticketInfo">
            <h1>電影名稱</h1>
            <ul>
                <li>影院:</li>
                <li>影廳:</li>
                <li>票價:</li>
                <li>場次:</li>
                <li>座位:</li>
            </ul>
            <br />
            <h2>總共價格</h2>
            <button type="button">立即購票</button>
        </div>






    </div>
</template>

<script>
export default {
    data() {
        return {
            postionList:[
                {
                    id:1,
                    perfix:"A"
                },
                {
                    id:2,
                    perfix:"B"
                },
                {
                    id:3,
                    perfix:"C"
                },
            ],
            letters:[
                "A","B","C"
                ],
                row:12,
                col:5,
        };
    },
    methods: {
        //初始化座位
        intPosition(){
            const list = []
            for(let i =0; i < this.row; i++){
                const obj = {
                    id: i + 1,
                    perfix: this.letters[i]
                }
                list.push(obj)
            }
        }
    }
}
</script>


<style scoped lang="scss">
.movieSeat {
    width: 100vw;
    height: 100vh;
    display: flex;

    .seat {

        width: 70vw;
        border: 1px solid;

        .screen {
            display: flex;
            justify-content: center;

            width: 70vw;
            height: 10vh;
            .movieScreen {
                width: 50vw;
                height: 10vh;
                height: auto;
                
                overflow: hidden;
                .circle{
                    width: 700px;
                    height: 300px;
                    border-radius: 100%;
                    border: 10px solid;
                }
            }
        }

        .postion {
            padding: 30px 0;

            ul {
                display: flex;
                justify-content: center;
                padding: 0;

                li:first-child {
                    border: none;
                }
            }

            li {
                width: 40px;
                height: 40px;
                border: 1px solid;
                border-radius: 8px;
                text-align: center;
                list-style: none;
                line-height: 40px;
                font-size: 12px;
                color: #333333;
                cursor: pointer;
                margin-left: 12px;

                &:hover {
                    background-color: #F7AD1A;
                    ;
                    border-color: #F7AD1A;
                    font-weight: bold;
                    color: #333333;
                }

                &.active {
                    border-color: #333333;
                    color: white;
                    font-weight: bold;
                    background-color: #333333;
                }
            }
        }
    }

    .ticketInfo {
        width: 30vw;
        border: 1px solid;

        li {
            list-style: none;
            text-align: left;
        }
    }
}
</style>