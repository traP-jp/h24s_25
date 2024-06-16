import './assets/main.css'

import {createApp, inject, ref} from 'vue'
import App from './App.vue'
import Screen from "@/ts/screen/Screen";


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


export const game = Screen.getInstance(false)

inject("selectedBall", ref(""))
export const vueApp = createApp(App).mount('#app')
//firebaseの初期化
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAtMlRW8g0EWicgKOhfxWJ9IA0nr_NgWY8",
    authDomain: "h24s-25.firebaseapp.com",
    projectId: "h24s-25",
    storageBucket: "h24s-25.appspot.com",
    messagingSenderId: "742360439207",
    appId: "1:742360439207:web:0799680ea375aec0a7be82"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp)


//画面の初期化
game.init();