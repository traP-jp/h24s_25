import './assets/main.css'
import Matter, {Events, Mouse, MouseConstraint, Vector} from 'matter-js'

import { createApp } from 'vue'
import App from './App.vue'
import Screen from "@/ts/screen/Screen";



createApp(App).mount('#app')

export const game = new Screen(true);
game.init();