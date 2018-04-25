import bgm from './assets/audio/demo.mp3'
import {musicOn,musicOff} from './assets/image'

createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashAudioPlugin]);

let bgmInstance = null

let dom = document.getElementById('bgm-control'),
    bgmIcon = document.querySelector('#bgm-control img')
bgmIcon.src = musicOn

dom.addEventListener('click',()=>{
    setMuted(!bgmInstance.muted)
    if (bgmInstance.muted) {
        bgmIcon.classList.remove('music--on')
        bgmIcon.classList.add('music--off')
    }else {
        bgmIcon.classList.add('music--on')
        bgmIcon.classList.remove('music--off')
    }
})

export function play(){
    if (bgmInstance) return
    bgmInstance = createjs.Sound.play('bgm')
}

export function setMuted(muted) {
    bgmIcon.src = muted?musicOff:musicOn
    bgmInstance.muted = muted
}