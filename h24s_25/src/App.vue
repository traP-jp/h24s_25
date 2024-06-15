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
  game.data.load("test").then((data) => {
    game.edit()
  })
}
</script>

<template>
  <div class="container">
    <div class="title left">
      <h1>welcome</h1>
    </div>
    <div>
      <button @click="edit()">edit</button>
      <button @click="play()">play</button>
      <button @click="save()">testにsave</button>
      <button @click="load()">testからload</button>
    </div>
    <div class="gamespace" id="screen">
    </div>
    <div class="control-panel left">
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
      <div class="start-stop-container">
        <button id="start-button">Start</button>
        <button id="stop-button">Stop</button>
      </div>
      <div class="save-load-container">
        <button id="save-button">Save</button>
        <button id="load-button">Load</button>
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
  border:2px solid #000;
}

.control-panel {
  width: 30%;
  height: auto;
  margin: 20px;
  border: 2px solid #000;
}

.slider-container {
  padding: 3%;
}

.checkbox-container{
  padding: 3%;
}

button {
  padding: 6% 10%;
  margin: 5%;
}

.slider {
  width: 90%;
  margin: 5%;
}


</style>
