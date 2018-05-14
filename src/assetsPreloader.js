import ee from 'event-emitter'
import * as images from './assets/image'


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

// let audios = [
//     {
//         src: bgm1,
//         id: 'bgm1'
//     },
//     {
//         src: bgm2,
//         id: 'bgm2'
//     },
//     {
//         src: bgm3,
//         id: 'bgm3'
//     },
//     {
//         src: bgm4,
//         id: 'bgm4'
//     },
// ]

let exports = {
    startPreload: function () {
        preloader.loadManifest(imageManifest,false)

        // 音频暂时不放在预加载内容中
        // preloader.loadFile({src: imageManifest[0], id: 'test'});

        preloader.load()
    }
}
ee(exports)



// createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashAudioPlugin]);


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
