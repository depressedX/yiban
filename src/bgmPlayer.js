import {musicOn, musicOff} from './assets/image'
import {Howl} from 'howler';
import bgm1 from './assets/audio/bgm1.mp3'
import bgm2 from './assets/audio/bgm2.mp3'
import bgm3 from './assets/audio/bgm3.mp3'
import bgm4 from './assets/audio/bgm4.mp3'


// createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashAudioPlugin]);

let sounds = [
    new Howl({
        src: [bgm1],
        loop: true
    }),
    new Howl({
        src: [bgm2],
        loop: true
    }),
    new Howl({
        src: [bgm3],
        loop: true
    }),
    new Howl({
        src: [bgm4],
        loop: true
    })
]
let curSoundIndex = null
let muted = false

let dom = document.getElementById('bgm-control'),
    bgmIcon = document.querySelector('#bgm-control img')
bgmIcon.src = musicOn

dom.addEventListener('click', () => {
    setMuted(!muted)
    if (muted) {
        bgmIcon.classList.remove('music--on')
        bgmIcon.classList.add('music--off')
        bgmIcon.src = musicOff
    } else {
        bgmIcon.classList.add('music--on')
        bgmIcon.classList.remove('music--off')
        bgmIcon.src = musicOn
    }
})

export function play(index = 0) {
    if (curSoundIndex === index) return
    stop()
    sounds[index].play()
    sounds[index].fade(0, 1, 500)
    curSoundIndex = index
}

export function stop() {
    if (curSoundIndex !== null) {
        let preSoundIndex = curSoundIndex
        sounds[preSoundIndex].fade(1, 0, 500)
        sounds[preSoundIndex].once('fade', () => {
            sounds[preSoundIndex].stop()
        })
    }
}

export function setMuted(f) {
    muted = f
    sounds.forEach(sound => {
        sound.mute(f)
    })
}
