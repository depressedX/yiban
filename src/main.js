import './lib/createjs.min'
import {load as loadPreloadScene, eventEmitter as preloadSceneEvent} from "./scenes/preloadScene";
import {load as loadStartupScene, eventEmitter as startupSceneEvent} from "./scenes/startupScene";
import {load as loadMainTicketScene, eventEmitter as mainTicketSceneEvent} from "./scenes/mainTicketScene";
import {load as loadMainNetDiskScene, eventEmitter as mainNetDiskSceneEvent} from "./scenes/mainNetdiskScene";
import {load as loadMainSocialScene, eventEmitter as mainSocialSceneEvent} from "./scenes/mainSocialScene";
import {load as loadEndScene, eventEmitter as endSceneEvent} from "./scenes/endScene";
import {resolution} from "./metaInfo"
import {CONTAIN, getSuggestedSize} from "./utils";
import {clearStage} from "./scenes/common";
import bgm from './assets/audio/demo.mp3'


let canvasDom = document.getElementById("main-stage"),
    stage = new createjs.Stage(canvasDom)


// 帧率控制
function tick() {
    stage.update()
}

createjs.Ticker.framerate = 60
createjs.Ticker.addEventListener("tick", tick)



// 监听窗口resize
window.addEventListener("resize", resizeCanvas, false);

function resizeCanvas() {
    let computedSize = getSuggestedSize({
        width: window.innerWidth,
        height: window.innerHeight
    }, resolution.height / resolution.width, CONTAIN)

    canvasDom.style.width = computedSize.width + 'px'
    canvasDom.style.height = computedSize.height + 'px'
}

resizeCanvas()

// var loader = new createjs.LoadQueue(true);
// loader.installPlugin(createjs.Sound);
// loader.on("complete", readytoplayAudio);
// loader.loadFile({id:"mysound", src:"http://www.gbtags.com/tutorials/html5-tutorial/html5-demos/assets/song.ogg"});
//
//
// function readytoplayAudio() {
//     createjs.Sound.play("mysound");
// }

loadPreloadScene(stage)
preloadSceneEvent.on('next', () => {
    clearStage(stage)
    loadStartupScene(stage)
})
startupSceneEvent.on('next', () => {
    clearStage(stage)
    loadMainNetDiskScene(stage)
})
mainNetDiskSceneEvent.on('next', () => {
    clearStage(stage)
    loadMainTicketScene(stage)
})
mainTicketSceneEvent.on('next', () => {
    clearStage(stage)
    loadMainSocialScene(stage)
})
mainSocialSceneEvent.on('next', () => {
    clearStage(stage)
    loadEndScene(stage)
})

endSceneEvent.on('back', () => {
    clearStage(stage)
    loadPreloadScene(stage)
})
endSceneEvent.on('link', () => {
    alert('链接到易班')
})