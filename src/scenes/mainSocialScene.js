import ee from 'event-emitter'
import {Camera, createFullWidthBitmap, createPartWidthBitmap, executeDefaultPlayAction, SceneQueue} from "./common";
import {
    social_1, social_9, social_8, social_7, social_6, social_5, social_4, social_3, social_2
} from '../assets/image'
import {resolution} from "../metaInfo";

let stage
export let eventEmitter = ee({})

// 网盘、抢票。社交
let mainSceneIndex = 2


let pic1 = createFullWidthBitmap(social_1, 443, 420),
    pic2 = createFullWidthBitmap(social_2, 443, 214),
    pic3 = createFullWidthBitmap(social_3, 443, 391),
    pic4 = createFullWidthBitmap(social_4, 443, 318),
    pic5 = createFullWidthBitmap(social_5, 443, 293),
    pic6 = createFullWidthBitmap(social_6, 443, 414),
    pic7 = createFullWidthBitmap(social_7, 640, 494),
    pic8 = createFullWidthBitmap(social_8, 640, 436),
    pic9 = createFullWidthBitmap(social_9, 640, 551)


/***
 * 设置动画的函数
 * @param sceneQueue 空的SceneQueue对象,在此基础上操作
 * @return Object {primise,object}
 */
function animationFunc() {
    let pics = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9]

    let picsHeight = pics.map(pic => pic.getBounds().height)
    // 在第X张漫画之前的高度总和
    let picHeightsStack = [0]
    for (let i = 1; i < pics.length; i++) {
        picHeightsStack[i] = picHeightsStack[i - 1] + picsHeight[i - 1]
    }

    let sceneQueue = new SceneQueue()
    let camera = new Camera(sceneQueue, resolution)


    // 第一张图片出现时，可能不够长，所以焦点放在此处
    let firstFocusD = resolution.height / 2

    let animationQueue = Promise.all([
        sceneQueue.load({
            bitmap: pics[0],
            duration: 1000,
            offset: resolution.height / 2,
            dir: SceneQueue.VERTICAL,
            ease: createjs.Ease.cubicInOut,
            wait: 1000
        }),
        camera.moveVertically({
            d: firstFocusD,
            duration: 1000,
            ease: createjs.Ease.getPowOut(3),
            wait: 1000
        })
    ])


    for (let i = 1; i < pics.length; i++) {
        animationQueue = animationQueue.then(() => {

                // 镜头移动距离
                let d = picHeightsStack[i] + picsHeight[i] / 2

                // 图片出现
                return Promise.all([
                    sceneQueue.load({
                        bitmap: pics[i],
                        duration: 1000,
                        offset: -resolution.width,
                        dir: SceneQueue.HORIZONTAL,
                        ease: createjs.Ease.cubicInOut,
                        wait: 1000
                    }),
                    d > firstFocusD ? camera.moveVertically({
                        d,
                        duration: 1000,
                        ease: createjs.Ease.getPowOut(3),
                        wait: 1000
                    }) : null
                ])
            }
        )
    }


    return {object: sceneQueue, promise: animationQueue}
}

export function load(s) {
    stage = s

    executeDefaultPlayAction(stage, mainSceneIndex, eventEmitter, animationFunc)

}

export function unlaod() {

}