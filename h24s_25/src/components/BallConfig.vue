<script setup lang="ts">
  import Screen from "@/ts/screen/Screen";
  import {BallTypeEnum, getBallTypeDisplayName} from "@/ts/balltypes";
  import {ref} from "vue";
  const ballId = ref("")
  const ballData = ref(Screen.getInstance().data.balls.get(ballId.value))
  const functionType = ref("0")
  const value = ref("")
  const removeSelf = ref(false)
  const mass = ref(false)
</script>

<template>
<div>
  ボールのid
  <input type="text" v-model="ballId" @change="ballData = Screen.getInstance().data.balls.get(ballId);functionType = ballData!.data.get('functionType')!">
</div>
<div v-if="ballData !== undefined">
  <div>a</div>
  <div>ballType: {{getBallTypeDisplayName(ballData.ballType)}}</div>
  <div>
    初期位置:(<input type="number" v-model="ballData.initialPosition.x" @change="Screen.getInstance().edit()">,<input type="number" v-model="ballData.initialPosition.y" @change="Screen.getInstance().edit()">)
  </div>
  <div>
    初速度:(<input type="number" v-model="ballData.initialVelocity.x" @change="Screen.getInstance().edit()">,<input type="number" v-model="ballData.initialVelocity.y" @change="Screen.getInstance().edit()">)
  </div>
  <div>
    静的: <input type="checkbox" v-model="ballData.isStatic">
  </div>
  <div v-if="ballData.ballType == BallTypeEnum.FUNCTION">
    関数の種類:
    <select name="function" id="functiontype" v-model="functionType" @change="console.log(functionType);ballData.data.set('functionType', functionType);Screen.getInstance().edit()">
      <option value="0">-</option>
      <option value="1">+</option>
      <option value="2">*</option>
      <option value="3">/</option>
      <option value="4">==</option>
      <option value="5">!=</option>
      <option value="6">&gt;</option>
      <option value="7">&gt;=</option>
      <option value="8">&lt;</option>
      <option value="9">&lt;=</option>
      <option value="10">?:</option>
      <option value="11">%</option>
      <option value="12">delete if true</option>
      <option value="13">delete if false</option>
      <option value="14">duplicate</option>
    </select>
  </div>
  <div v-if="ballData.ballType == BallTypeEnum.FUNCTION">
    実行後に自分自身を削除するかどうか
    <input type="checkbox" v-model="removeSelf" @change="ballData.data.set('removeSelf', removeSelf.toString())">
  </div>
  <div v-if="ballData.ballType == BallTypeEnum.NUMBER">
    数値: <input type="number" v-model="value" @change="ballData.data.set('value',value);Screen.getInstance().edit()">
  </div>
</div>
  <div v-if="ballData === undefined"></div>
</template>

<style scoped>

</style>