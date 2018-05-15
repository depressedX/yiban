import {loading} from '../assets/image'
import preloader from '../assetsPreloader'
import {resolution} from "../metaInfo"
import ee from 'event-emitter'
import {getSuggestedSize,COVER} from "../utils";
import {play} from "../bgmPlayer";

let stage

export let eventEmitter = ee({})


let progressText = new createjs.Text("", "28px Arial", "white")
preloader.on('progress', x => {
    progressText.text = `Loading ${Math.floor(x * 100)}%`
    progressText.x = resolution.width / 2 - progressText.getMeasuredWidth() / 2
    progressText.y = resolution.height -300
})
preloader.on('complete',()=>{
    stage.addEventListener('click',()=>{
        eventEmitter.emit('next')
    })
})

let hintText = new createjs.Text("打开声音效果更佳", "30px Arial", "white")
hintText.x = resolution.width / 2 - hintText.getMeasuredWidth() / 2
hintText.y = resolution.height-150

let tianpingPic = new createjs.Bitmap(loading)
tianpingPic.scaleX = tianpingPic.scaleY = getSuggestedSize(resolution,1280/720,COVER).width/720


export function load(stageOn) {
    stage = stageOn

    // 预加载页面
    preloader.startPreload()



    stage.addChild(tianpingPic)
    stage.addChild(progressText)
    stage.addChild(hintText)

    play(0)

}

export function unload() {
}
