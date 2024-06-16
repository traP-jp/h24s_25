<script setup lang="ts">
import BallData from "@/ts/data/BallData";
import BallConfig from "@/components/BallConfig.vue";
import Screen from "@/ts/screen/Screen";
import {ref} from "vue";

const game = Screen.getInstance()
let savedata: string = "init"
let ballType = ref("0")
let ballId: string = ""
const input = ref("")
function edit() {
  game.edit();
}
function play() {
  game.play()
}
function save() {
  game.data.save(savedata)
}
function load() {
  game.data.load(savedata).then(() => {
    game.edit()
  })
}
function generateBall() {
  if(ballId.length == 0) return;
  game.data.balls.set(ballId, new BallData(
      Number(ballType.value),
      {x: 0, y: 0},
      {x: 0, y: 0},
      new Map()
  ))
  game.edit()
}
</script>

<template>
  <div class="container">
    <div class="title left">
      <h1>Welcome</h1>
    </div>
    <div class="gamespace left">
      <div class="">
      <div class="screen" id="screen">
      </div>
      </div>
    </div>
    <div class="control-panel">
      <div class="play-edit-container" style="display: flex; justify-content: space-around;">
        <button id="play-button" @click="play()">Play</button>
        <button id="edit-button" @click="edit()">Edit</button>
      </div>
      <div class="save-load-container" style="display: flex; justify-content: space-around;">
        <button id="save-button" @click="save()">Save</button>
        <button id="load-button" @click="load()">Load</button>
      </div>
      <div>
        savedata:
        <input type="text" v-model="savedata" placeholder="セーブデータ名">
      </div>
      <div>
        <input type="text" v-model="ballId" placeholder="玉のidを入力してください">
        <select name="ballType" id="ballTypeSelector" v-model="ballType">
          <option value="0">出力</option>
<!--          <option value="1">入力</option>-->
          <option value="2">数</option>
          <option value="3">関数</option>
          <option value="4">高階関数</option>
        </select>
        <button @click="generateBall()">玉を追加</button>
      </div>
      <div class="log-container">
        <p style="position: relative; left: 20px;">Log id:value</p>
        <div class="log-box">
          <p>id1 : value1</p>
          <p>id2 : value2</p>
          <p>id3 : value3</p>
          <p>id4 : value4</p>
        </div>
      </div>
      <div>
        <BallConfig></BallConfig>
      </div>
<!--      <div class="slider-container">-->
<!--        <p>スライダ1</p>-->
<!--        <input class="slider" type="range" id="slider1" min="0" max="100" step="5">-->
<!--      </div>-->
<!--      <div class="slider-container">-->
<!--        <p>スライダ2</p>-->
<!--        <input class="slider" type="range" id="slider2" min="0" max="100" step="5">-->
<!--      </div>-->
<!--      <div class="checkbox-container">-->
<!--        <input class="ckeckbox" type="checkbox" id="checkbox1" /> <label for="checkbox1">チェックボックス1</label>-->
<!--      </div>-->
<!--      <div class="checkbox-container">-->
<!--        <input class="ckeckbox" type="checkbox" id="checkbox2" /> <label for="checkbox2">チェックボックス2</label>-->
<!--      </div>-->
    </div>
  </div>
</template>

<style scoped>
.left {
 float: left;
}

.container {
  height: 80vh;
  width: 100%;
}

.title {
  width: 60%;
  margin-left: 20px;
  border: 2px solid black;
}

h1 {
  margin-left: 5%;
  font-size: 35px;
}

.gamespace {
  height: 600px;
  margin: 20px;
  width: 800px;
  overflow: scroll;
  border:2px solid red;
}

.scroll-listener {
  height: 10000px;
  width: 10000px;
}

.screen {
  position: relative;
}

.control-panel {
  height: 80vh;
  margin: 20px;
  border: 2px solid #000;
}

@media screen and (min-width: 1201px) {
  .control-panel {
    position: absolute;
    right: 20px;
    width: 25%;
  }
}

@media screen and (max-width: 1200px) {
  .control-panel{
    float: left;
    width: 800px;
    height: auto;
  }
}

.log-box {
  padding: 3%;
  overflow: visible;
  overflow: scroll;
  margin: 2%;
  width: auto;
  height: 10vh;
  border: 2px solid #000;
}

.slider-container {
  padding: 3%;
}

.checkbox-container{
  padding: 3%;
}

button {
  width: 30%;
  padding: 6% 0%;
  margin: 5%;
}

.slider {
  width: 90%;
  margin: 5%;
}


</style>
