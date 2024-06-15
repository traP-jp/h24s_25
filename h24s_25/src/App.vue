<script setup lang="ts">
</script>

<template>
  <div class="container">
    <div class="title left">
      <h1>welcome</h1>
    </div>
    <div class="gamespace left" id="screen">
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
    </div>
  </div>
</template>

<style scoped>
.left {
 float: left;
}


.title {
  background-color: aqua;
  width: 66%;

}

.container {
  height: 80vh;
  width: 100%;
}

.gamespace {
  height: 70vh;
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
  
}

.slider {
  width: 90%;
  margin: 5%;
}


</style>
