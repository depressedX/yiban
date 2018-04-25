import ee from 'event-emitter'
import {resolution} from "../metaInfo"
import {startup} from '../assets/image'
import {getSuggestedSize, COVER} from "../utils";
import {createPointer} from "./common";
import {play} from "../bgmPlayer";

let stage
export let eventEmitter = ee({})

let bitmap = new createjs.Bitmap(startup)
let bitmapSize = getSuggestedSize({width: resolution.width, height: resolution.height}, 1280/720, COVER)
bitmap.scaleX = bitmap.scaleY = bitmapSize.width / 720
bitmap.x = resolution.width / 2 - bitmapSize.width / 2
bitmap.y = resolution.height / 2 - bitmapSize.height / 2


let pointer = createPointer()
pointer.x = resolution.width/2
pointer.y = resolution.height/2-pointer.getBounds().height/2

export function load(s) {


    stage = s

    stage.addChild(bitmap)

    // 2s后可以跳转到下一场景
    setTimeout(()=>{
        stage.addChild(pointer)
        stage.addEventListener('click',()=>{
            eventEmitter.emit('next')
        })
    },2000)

    pointer.play()
}

export function unload() {
    pointer.stop()
}