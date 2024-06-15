<script setup lang="ts">
import {game} from "@/main";

function edit() {
  game.edit();
}
function play() {
  game.play()
}
</script>

<template>
  <div class="container">
    <div class="title">
      <h1>welcome</h1>
    </div>
    <div>
      <button @click="edit()">edit</button>
      <button @click="play()">play</button>
    </div>
    <div class="gamespace" id="screen">
    </div>
    <div class="control-panel">
      <div class="slider"></div>
      <div class="tggle"></div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  
}

.title {
  background-color: aqua;
}

.container {
  height: auto;
}

.gamespace {
  display: flex;
  height: 100vh;
  padding: 20px;
  display: flex;
  background-color: red;
}

.control-panel {
  flex: 1;
  border: 1px solid #000;
  margin-right: 20px;
  display: flex;
  background-color: antiquewhite;
}


@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
