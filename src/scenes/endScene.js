import ee from 'event-emitter'
import {resolution} from "../metaInfo"
import {endPage,endPageBack,endPageLink} from '../assets/image'
import {getSuggestedSize, CONTAIN} from "../utils";
import {createFullWidthBitmap} from "./common";

let stage
export let eventEmitter = ee({})

let pageContainer = new createjs.Container()
let pageSize = getSuggestedSize(resolution, 1280 / 720, CONTAIN)
pageContainer.x = resolution.width / 2 - pageSize.width / 2
pageContainer.y = resolution.height / 2 - pageSize.height / 2
pageContainer.setBounds(0, 0, pageSize.width, pageSize.height)

let scale = pageSize.width / 720

let pageBitmap = new createjs.Bitmap(endPage)
pageBitmap.scaleX = pageBitmap.scaleY = scale
pageContainer.addChild(pageBitmap)

// 没过过瘾再看一遍
let backBlock = new createjs.Bitmap(endPageBack)
backBlock.x = pageSize.width * .0441
backBlock.y = pageSize.height * .8915
backBlock.scaleY = backBlock.scaleX = scale
pageContainer.addChild(backBlock)
    // .drawRect(bitmapSize.width * .0441, bitmapSize.height * .8915, bitmapSize.width * 0.4311, bitmapSize.height * 0.0808)


// 我可爱我先用
let linkBlock = new createjs.Bitmap(endPageLink)
linkBlock.x = pageSize.width * .0441
linkBlock.y = pageSize.height * .8915
linkBlock.scaleY = linkBlock.scaleX = scale
pageContainer.addChild(linkBlock)

export function load(s) {
    stage = s

    stage.addChild(pageContainer)

    backBlock.addEventListener('click',(e)=>{
        eventEmitter.emit('back')
    })
    linkBlock.addEventListener('click',(e)=>{
        eventEmitter.emit('link')
    })

}