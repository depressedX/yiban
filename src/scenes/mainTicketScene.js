import ee from 'event-emitter'
import {Camera, createFullWidthBitmap, executeDefaultPlayAction, SceneQueue} from "./common";
import {
    ticket_1_4, ticket_1_3, ticket_1_2, ticket_1_1,
    ticket_2_1, ticket_2_2, ticket_2_3,
    ticket_3_1, ticket_3_2, ticket_3_3, ticket_3_4, ticket_3_5,
    convertion
} from '../assets/image'
import {resolution} from "../metaInfo";
import {play} from "../bgmPlayer";

let stage
export let eventEmitter = ee({})

// 网盘、抢票。社交
let mainSceneIndex = 1


let pics = [
    createFullWidthBitmap(convertion, 720, 1280),
    createFullWidthBitmap(ticket_1_1, 1080, 606),
    createFullWidthBitmap(ticket_1_2, 1080, 486),
    createFullWidthBitmap(ticket_1_3, 1080, 557),
    createFullWidthBitmap(ticket_1_4, 1080, 845),
    createFullWidthBitmap(ticket_2_1, 1080, 627),
    createFullWidthBitmap(ticket_2_2, 1080, 543),
    createFullWidthBitmap(ticket_2_3, 1080, 1318),
    createFullWidthBitmap(ticket_3_1, 1080, 308),
    createFullWidthBitmap(ticket_3_2, 1080, 561),
    createFullWidthBitmap(ticket_3_3, 1080, 465),
    createFullWidthBitmap(ticket_3_4, 1080, 536),
    createFullWidthBitmap(ticket_3_5, 1080, 590)
]

/***
 * 设置动画的函数
 * @param sceneQueue 空的SceneQueue对象,在此基础上操作
 * @return Object 新的sceneQueue
 */
function animationFunc() {

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

    let picsHeight = pics.map(pic => pic.getBounds().height)
    // 在第X张漫画之前的高度总和
    let picHeightsStack = [0]
    for (let i = 1; i < pics.length; i++) {
        picHeightsStack[i] = picHeightsStack[i - 1] + picsHeight[i - 1]
    }

    play(2)

    executeDefaultPlayAction(stage, mainSceneIndex, eventEmitter, animationFunc)

}

export function unlaod() {

}