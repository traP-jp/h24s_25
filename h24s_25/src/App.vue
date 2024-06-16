<script setup lang="ts">
import {game} from "@/main";

function edit() {
  game.edit();
}
function play() {
  game.play()
}
function save() {
  game.data.save("test")
}
function load() {
  game.data.load("test").then(() => {
    game.edit()
  })
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
    <div class="control-panel left">
      <div class="play-edit-container">
        <button id="play-button" @click="play()">Play</button>
        <button id="edit-button" @click="edit()">Edit</button>
      </div>
      <div class="save-load-container">
        <button id="save-button" @click="save()">Save</button>
        <button id="load-button" @click="load()">Load</button>
      </div>
      <div class="log-container">
        <p class="log-titile">Log id:value</p>
        <div class="log-box">
          <p>id1 : value1</p>
          <p>id2 : value2</p>
          <p>id3 : value3</p>
          <p>id4 : value4</p>
        </div>
      </div>
      <div class="slider-container">
        <p>スライダ1</p>
        <input class="slider" type="range" id="slider1" min="0" max="100" step="5">
      </div>
      <div class="slider-container">
        <p>スライダ2</p>
        <input class="slider" type="range" id="slider2" min="0" max="100" step="5">
      </div>
      <div class="checkbox-container">
        <input class="ckeckbox" type="checkbox" id="checkbox1" /> <label for="checkbox1">チェックボックス1</label>
      </div>
      <div class="checkbox-container">
        <input class="ckeckbox" type="checkbox" id="checkbox2" /> <label for="checkbox2">チェックボックス2</label>
      </div>
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
  height: 80vh;
  margin: 20px;
  width: 60%;
  overflow: scroll;
  border:2px solid #000;
}

.scroll-listener {
  height: 10000px;
  width: 10000px;
}

.screen {
  position: relative;
  top: 400px;
}

.control-panel {
  width: 30%;
  height: 80vh;
  margin: 20px;
  border: 2px solid #000;
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
