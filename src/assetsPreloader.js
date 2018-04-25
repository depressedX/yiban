import ee from 'event-emitter'
import * as images from './assets/image'
import bgm from './assets/audio/demo.mp3'

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
        id: 'bgm',
        src: bgm
    }]

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
