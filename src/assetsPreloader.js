import ee from 'event-emitter'
import * as images from './assets/image'
import bgm1 from './assets/audio/bgm1.mp3'
import bgm2 from './assets/audio/bgm2.mp3'
import bgm3 from './assets/audio/bgm3.mp3'
import bgm4 from './assets/audio/bgm4.mp3'

/**
 * 触发事件 progress complete error
 */


let imageManifest = []
for (let key in images) {
    imageManifest.push({
        src: images[key],
        id: key
    })
}

let audios = [
    {
        src:bgm1,
        id:'bgm1'
    },
    {
        src:bgm2,
        id:'bgm2'
    },
    {
        src:bgm3,
        id:'bgm3'
    },
    {
        src:bgm4,
        id:'bgm4'
    },
]

let exports = {
    startPreload: function () {
        preloader.loadManifest(imageManifest)
        audios.forEach(audio => {
            preloader.loadFile(audio)
        })
    }
}
ee(exports)

let preloader = new createjs.LoadQueue(true)
preloader.installPlugin(createjs.Sound)
preloader.on("progress", handleProgress.bind(exports))
preloader.on("complete", handleComplete.bind(exports))
preloader.on("error", handleError.bind(exports))

function handleProgress() {
    this.emit('progress', preloader.progress)
}

function handleComplete() {
    this.emit('complete')
}

function handleError(e) {
    this.emit('error', e)
}


export default exports
