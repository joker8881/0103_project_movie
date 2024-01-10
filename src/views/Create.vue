<script>
export default {

  data() {
    return {
      searchMode: 'original',   // 搜尋模式：original（原始）或 result（結果）
      searchText: '',           // 搜尋文字
      searchResults: '',         // 搜尋結果
      abc: false,

      canvasWidth: 763, // 畫板的寬度
      canvasHeight: 450, // 畫板的高度
      canvasContext: null,
      backgroundColor: 'rgba(40, 40, 40)',
      colors: [
        { name: 'white', code: 'white' },
        { name: 'black', code: 'black' },
        { name: 'red', code: '#FF0000' },
        { name: 'blue', code: '#0000FF' },
        { name: 'green', code: '#00FF00' },
        { name: 'yallow', code: '#FFFF00' },
        { name: 'Orange', code: '#FFA500' },
        { name: 'Purple', code: '#800080' },
        { name: 'Pink', code: '#FFC0CB' },
        { name: 'Cyan', code: '#00FFFF' },
        { name: 'Chocolate', code: '#D2691E' },
        { name: 'Gold', code: '#FFD700' },
        { name: 'Pomegranate', code: '#C0392B' },
        { name: 'Rose', code: '#FF007F' },
        { name: 'Vermilion', code: '#E34234' },
        { name: 'Alizarin Crimson', code: '#E32636' },
        { name: 'Violet', code: '#8B00FF' },
        { name: 'Alice-Blue', code: '#F0F8FF' },
      ],
      currentColor: null,
      currentSize: '20',
      isSizing: false,
      isCanvasMouseDown: false,
      hideToolBar: false,
      hideNavBar: false,
      tools: [
        {
          preClass: 'fas',
          name: 'paint-brush'
        }, {
          preClass: 'fas',
          name: 'eraser'
        }, {
          preClass: 'far',
          name: 'square'
        }],
      currentTool: 'paint-brush',
      tempPosition: null,
      tempCanvas: null,
      count: 0
    }
  },
  methods: {
    PerformSearch() {
      // 執行搜尋邏輯
      this.searchResults = this.searchText;
      this.searchMode = 'result';
      this.abc = true;
    },
    ResetSearch() {
      // 重置搜尋相關資料
      this.searchText = '';
      this.searchResults = '';
      this.searchMode = 'original';
      this.abc = false;
    },

    onCanvasMouseDown() {
      this.isCanvasMouseDown = true
      this.setTempCanvas()

    },
    onCanvasMouseUp() {
      this.saveCanvasToHistory()
      this.resetToolState()
    },
    onSizeMouseDown() { this.isSizing = true },
    canvasToImage() {
      let url = this.$refs['sketchpad'].toDataURL("image/png", 1.0)
      const link = document.createElement('a')
      link.innerText = 'Download'
      link.href = url
      link.download = `circl${this.count}`
      this.count++
      link.click()
    },
    setWindowEvent() {
      window.addEventListener('mousemove', (event) => {

        let currentPos = this.getCanvasMousePosition(event.clientX, event.clientY)

        if (this.isSizing && this.tempPosition) {
          let dragValue = currentPos.y - this.tempPosition.y
          this.checkSizeDrag(dragValue)
        }

        if (this.isCanvasMouseDown && this.tempPosition) {
          let pos = this.getCanvasMousePosition(event.clientX, event.clientY)
          switch (this.currentTool) {
            case 'paint-brush':
              this.draw((ctx) => {
                ctx.strokeStyle = this.currentColor.code
                ctx.moveTo(this.tempPosition.x, this.tempPosition.y)
                ctx.lineTo(pos.x, pos.y)
              })
              break;
            case 'eraser':
              this.draw((ctx) => {
                ctx.strokeStyle = this.backgroundColor
                ctx.moveTo(this.tempPosition.x, this.tempPosition.y)
                ctx.lineTo(pos.x, pos.y)
              })
              break;
            case 'square':
              this.draw((ctx) => {
                // ctx.moveTo(this.tempPosition.x,this.tempPosition.y)
                // ctx.lineTo(pos.x,pos.y)
                let currentPos = this.getCanvasMousePosition(event.clientX, event.clientY)

                ctx.strokeStyle = this.currentColor.code
                let tempx = this.tempPosition.x
                let tempy = this.tempPosition.y
                let width = currentPos.x - tempx
                let height = currentPos.y - tempy

                ctx.putImageData(this.tempCanvas, 0, 0)
                ctx.rect(tempx, tempy, width, height);
              })

              break;
          }
        }
        if (this.currentTool == 'square' && this.isCanvasMouseDown) return
        this.setCanvasTempPosition(currentPos.x, currentPos.y)


      })
      window.addEventListener('popstate', (e) => {
        this.canvasContext.putImageData(e.state, 0, 0);
      })
    },
    checkSizeDrag(dragValue) {
      if (dragValue < 0) {
        this.currentSize = parseInt(this.currentSize) + 1
      } else if (dragValue > 0 && this.currentSize >= 1) {
        this.currentSize = parseInt(this.currentSize) - 1
      }
    },
    draw(action) {
      let canvasContext = this.canvasContext
      canvasContext.beginPath()
      canvasContext.lineWidth = this.currentSize * 2;
      action(canvasContext)
      canvasContext.stroke()
    },
    resetToolState() {
      this.isSizing = false
      this.tempPosition = null
      this.isCanvasMouseDown = false
    },
    setColor(selectedColor) {
      this.currentColor = selectedColor;
    },
    isColorActive(color) {
      return this.currentColor && color == this.currentColor.name
        ? 'active' : ''
    },
    isToolActive(tool) {
      return tool == this.currentTool ? 'active' : ''
    },
    resetCanvas() {
      let canvas = this.canvasContext.canvas
      this.canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      this.saveCanvasToHistory()
    },
    setCanvas() {
      let canvas = this.$refs['sketchpad']
      canvas.width = this.canvasWidth;
      canvas.height = this.canvasHeight;
      let ctx = canvas.getContext('2d')
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      this.canvasContext = ctx
    },
    setTempCanvas() {
      let ctx = this.canvasContext
      let canvas = ctx.canvas
      let tempCanvas = ctx.getImageData(0, 0, canvas.width, canvas.height);
      this.tempCanvas = tempCanvas
    },
    saveCanvasToHistory() {
      let ctx = this.canvasContext
      let canvas = ctx.canvas
      let tempCanvas = ctx.getImageData(0, 0, canvas.width, canvas.height);
      window.history.pushState(tempCanvas, null);
    },
    getCanvasMousePosition(clientX, clientY) {
      let canvasPosition = this.canvasContext.canvas.getBoundingClientRect()
      let x = clientX - canvasPosition.x
      let y = clientY - canvasPosition.y
      return { x, y }
    },
    setCanvasTempPosition(x, y) {
      this.tempPosition = { x, y }
    },
    back() {
      window.history.back()
    },
    forward() {
      window.history.forward()
    }

  },
  mounted() {
    this.setCanvas()
    this.currentColor = this.colors[0]
    this.setWindowEvent()
  },


};
</script>

<template lang="">

<!-- Search First -->
      <div class="First" v-if="searchMode === 'original'">
    <input class="searchMovie1" type="text" v-model="searchText" placeholder="搜尋電影...">
    <button @click="PerformSearch">進入區域</button>
    
  </div>

  <!-- Search First Result -->
  <div class="First2" v-if="searchMode === 'result'">
    <button @click="ResetSearch">重新搜尋</button>
    <p>電影名稱: {{ searchResults }}</p>
    
  </div>
    

    <div class="bord" v-show="abc"  >
      <p>電影名稱: {{ searchResults }}</p>
 <ul class="navbar " 
     :class="{hideNavBar}"
     >

   <li @click="canvasToImage">
     <i class="fa fa-save imageColor"></i>
     儲存
   </li>
   <li  @click="resetCanvas"> 
     <i class="fa fa-chalkboard imageColor"></i>
     清空
    </li>
   <li @click="back()">
      <i class="fa fa-undo imageColor"></i>
      返回
   </li>

   <li  @click="forward()"  >
      <i class="fas fa-redo imageColor"></i>
      取消
   </li>
   <div class="btn up " @click="hideNavBar = !hideNavBar"></div>
 </ul>
 
 <canvas ref="sketchpad" 
   @mousedown="onCanvasMouseDown"
   @mouseup="onCanvasMouseUp"
   :style="`background-color:${backgroundColor}; border: 2px solid #000; `"
   ></canvas>

 <ul class="toolbar" :class="{hideToolBar}">
   <div class="btn btn-toolbar down" @click="hideToolBar = !hideToolBar"></div>
   <li class="toolbar__tool">
    <i v-for="(tool,index) in tools "
       :key="index"
       
       :class="`${tool.preClass } fa-${tool.name} `+ isToolActive(tool.name)" 
       @click="currentTool=tool.name"
       ></i>
  </li>
  <li class="toolbar__size">
    <span>畫筆:</span>
    <input type="text" 
     @mousedown="onSizeMouseDown"
     @mouseup="resetToolState"
     v-model="currentSize"
     class="size-controller">
    <!-- <span class="textColor">px</span> -->
  </li>

  <span>顏色:</span>
  <li class="toolbar__color">
    
    <div
      v-for="(color, index) in colors"
      :key="index"
      :class="{ 'color': true, 'active': isColorActive(color) }"
      :style="{ backgroundColor: color.code }"
      @click="setColor(color)"
    ></div>
    
  </li>
 </ul>
</div>

  <div class="Second" v-show="abc">
    <p>電影名稱: {{ searchResults }}</p>
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="../picture/circle.png" class="d-block w-100 imgsrc" alt="...">
      <img src="../picture/circle.png" class="d-block w-100 imgsrc" alt="...">

    </div>
    <div class="carousel-item">
      <img src="../picture/circle.png" class="d-block w-100" alt="...">
      <img src="../picture/circle.png" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="../picture/circle.png" class="d-block w-100" alt="...">
      <img src="../picture/circle.png" class="d-block w-100" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
</div>
</template>

<style scoped lang="scss">
.First {
  width: 100vw;
  height: 90vh;
  border: 1px solid black;

  .searchMovie1{
    margin-top: 280px;
  }
}

.First2 {
  width: 100vw;
  height: 100vh;
  border: 1px solid black;
}

.bord {
  height: 120vh;
  margin-top: 150px;
}

.Second {
  width: 100vw;
  height: 100vh;
  border: 1px solid black;

  .slide{
    width:380.1px;
    height: 500px;
    border: 1px solid black;
    display: flex;
  flex-wrap: wrap;

    .imgsrc{
    border: 1px solid black;

    }
    
  }

}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.navbar {
  text-align: center;
  line-height: 60px;
  height: 75px;
  margin-left: 315px;
  margin-top: 30px;
  // border: 2px solid #000;

  // left: 50%; 
  // top: 0;
  // transform: translateX(-50%);
  width: 54.9%;
  background-color: #535353;
  transition: all 0.1s;

  li {
    font-size: 15px;
    margin: 0 40px;
    padding: 0px 30px;
    display: inline-block;
    list-style: none;
    border-radius: 50px;
    color: pink;

    &:hover{
                background-color: pink;
                color:#535353;
                transform:scale(1.1,1.1);
                cursor: pointer;
                transition: 0.5s;
                border-radius: 30px;
            }
  }

}

.toolbar {
  display: flex;
  flex-wrap: nowrap;
  // justify-content: start;
  align-items: center;
  // bottom: 100px; 
  // left: 50%; 
  // transform: translateX(-50%);
  width: 54.9%;
  margin-left: 315px;
  margin-top: -5.8px; // 往上推
  background-color: #535353;
  height: 80px;
  // border: 2px solid #000;

  // border-radius: 50px;
  li {
    line-height: 35px;
    margin: 0;
    padding: 0 22px;
    list-style: none;

    i {
      // font-size: 50%;
      padding: 5px;
      border-radius: 50px;
      margin-right: 1px;
      cursor: pointer; //變手指選擇

      &:hover {
        background-color: #d8d8d8;
      }
    }

  }
}

.toolbar__size {

  span {
    font-size: 100%;
    margin: 0 20px;
    color: pink;
    
  }

  input {
    text-align: center;
    background-color: #d8d8d8;
    padding: 10px;
    width: 20%;
    font-size: 100%;
    border-radius: 50px;
    border: none;

    &:focus {
      outline: none;
    }
  }
}

span {
  font-size: 100%;
  
  // margin-right: 5px;
  // position: a;
  color: pink;
}

.toolbar__color {
  width: 267px;
  height: 52px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;

  .color {
    width: 5%;
    height: 5%;
    // margin-top: 38px;
    margin-top: 6px;
    margin-right: 1.5%;
    padding: 10px;
    border-radius: 50px;
    cursor: pointer; //變手指選擇

    &:hover {
      background-color: #d8d8d8;
    }
  }
}

.imageColor{
  color:red;
}

.toolbar__tool {

  // margin-left: 10px;
  // margin-bottom: 100px;
  .active {
    background-color: #d8d8d8;
  }
}</style>