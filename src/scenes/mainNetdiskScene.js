import ee from 'event-emitter'
import {Camera, createFullWidthBitmap, createPartWidthBitmap, executeDefaultPlayAction, SceneQueue} from "./common";
import {
    netdisk_1, netdisk_2, netdisk_3_1, netdisk_3_2, netdisk_4, netdisk_5_1, netdisk_5_2, netdisk_6, netdisk_7
} from '../assets/image'
import {resolution} from "../metaInfo";

let stage
export let eventEmitter = ee({})

// 网盘、抢票。社交
let mainSceneIndex = 0


let pic1 = createFullWidthBitmap(netdisk_1, 618, 349),
    pic2 = createFullWidthBitmap(netdisk_2, 615, 298),
    pic3_1 = createPartWidthBitmap(netdisk_3_1, 200, 221, 200 / (200 + 387)),
    pic3_2 = createPartWidthBitmap(netdisk_3_2, 387, 221, 387 / (200 + 387)),
    pic4 = createFullWidthBitmap(netdisk_4, 602, 347),
    pic5_1 = createPartWidthBitmap(netdisk_5_1, 278, 289, 278 / (278 + 309)),
    pic5_2 = createPartWidthBitmap(netdisk_5_2, 309, 289, 309 / (278 + 309)),
    pic6 = createFullWidthBitmap(netdisk_6, 601, 412),
    pic7 = createFullWidthBitmap(netdisk_7, 602, 477)


/***
 * 设置动画的函数
 * @param sceneQueue 空的SceneQueue对象,在此基础上操作
 * @return Object {primise,object}
 */
function animationFunc() {

    let sceneQueue = new SceneQueue()
    let camera = new Camera(sceneQueue, resolution)

    // 1.
    let animationQueue = Promise.all([
        sceneQueue.load({
            bitmap: pic1,
            duration: 1000,
            offset: resolution.height / 2,
            dir: SceneQueue.VERTICAL,
            ease: createjs.Ease.cubicInOut,
            wait: 1000
        }),
        camera.moveVertically({
            d: resolution.height / 2,
            duration: 1000,
            ease: createjs.Ease.getPowOut(3),
            wait: 1000
        })
    ])

    // 2.
    animationQueue = animationQueue.then(() => Promise.all([
            sceneQueue.load({
                bitmap: pic2,
                duration: 1000,
                offset: -resolution.width,
                dir: SceneQueue.HORIZONTAL,
                ease: createjs.Ease.cubicInOut,
                wait: 1000
            }),
            camera.focus({
                x: resolution.width / 2,
                y: pic1.getBounds().height + pic2.getBounds().height,
                duration: 1000,
                ease: createjs.Ease.getPowOut(3),
                wait: 1000,
                scale: 1.5,
                delay: 1500
            })
        ])
    )

    // 3.
    animationQueue = animationQueue.then(() => Promise.all([
            sceneQueue.load({
                bitmap: pic3_1,
                duration: 1000,
                offset: resolution.height / 2,
                dir: SceneQueue.VERTICAL,
                ease: createjs.Ease.cubicInOut,
                wait: 1000,
            }).then(() => sceneQueue.load({
                    bitmap: pic3_2,
                    duration: 1000,
                    offset: resolution.width,
                    dir: SceneQueue.HORIZONTAL,
                    ease: createjs.Ease.cubicInOut,
                    wait: 1000,
                    inline: true
                })
            ),
            camera.focus({
                x: pic3_1.getBounds().width / 2,
                y: pic1.getBounds().height + pic2.getBounds().height + pic3_1.getBounds().height / 2,
                duration: 1000,
                ease: createjs.Ease.getPowOut(3),
                wait: 1000,
                scale: 3
            }).then(() => camera.focus({
                    x: pic3_1.getBounds().width + pic3_2.getBounds().width / 2,
                    y: pic1.getBounds().height + pic2.getBounds().height + pic3_1.getBounds().height / 2,
                    duration: 1000,
                    ease: createjs.Ease.getPowOut(3),
                    wait: 1000,
                    scale: 1.5
                })
            )
        ])
    )

    // 4.
    animationQueue = animationQueue.then(() => Promise.all([
            sceneQueue.load({
                bitmap: pic4,
                duration: 1000,
                offset: -resolution.width,
                dir: SceneQueue.HORIZONTAL,
                ease: createjs.Ease.cubicInOut,
                wait: 1000
            }),
            camera.focus({
                x: resolution.width / 2,
                y: pic1.getBounds().height + pic2.getBounds().height + pic3_1.getBounds().height + pic4.getBounds().height / 2,
                duration: 1000,
                ease: createjs.Ease.getPowOut(3),
                wait: 1000
            })
        ])
    )

    // 5.
    animationQueue = animationQueue.then(() => Promise.all([
            sceneQueue.load({
                bitmap: pic5_1,
                duration: 1000,
                offset: resolution.height / 2,
                dir: SceneQueue.VERTICAL,
                ease: createjs.Ease.cubicInOut,
                wait: 1000,
            }).then(() => sceneQueue.load({
                    bitmap: pic5_2,
                    inline: true
                })
            ),
            camera.focus({
                x: resolution.width / 2,
                y: pic1.getBounds().height + pic2.getBounds().height + pic3_1.getBounds().height + pic4.getBounds().height,
                duration: 1000,
                ease: createjs.Ease.getPowOut(3),
                wait: 1000,
            }).then(() => camera.focus({
                    x: resolution.width / 2,
                    y: pic1.getBounds().height + pic2.getBounds().height + pic3_1.getBounds().height + pic4.getBounds().height,
                    duration: 1000,
                    ease: createjs.Ease.getPowOut(3),
                    wait: 1000,
                })
            )
        ])
    )


    // 6.
    animationQueue = animationQueue.then(() => Promise.all([
            sceneQueue.load({
                bitmap: pic6,
                duration: 1000,
                offset: resolution.height / 2,
                dir: SceneQueue.VERTICAL,
                ease: createjs.Ease.cubicInOut,
                wait: 1000
            }),
            camera.focus({
                x: resolution.width / 2,
                y: pic1.getBounds().height + pic2.getBounds().height + pic3_1.getBounds().height
                + pic4.getBounds().height + pic5_2.getBounds().height + pic6.getBounds().height / 2,
                duration: 1000,
                ease: createjs.Ease.getPowOut(3),
                wait: 1000
            })
        ])
    )

    // 7.
    animationQueue = animationQueue.then(() => Promise.all([
            sceneQueue.load({
                bitmap: pic7,
                duration: 1000,
                offset: resolution.height / 2,
                dir: SceneQueue.VERTICAL,
                ease: createjs.Ease.cubicInOut,
                wait: 1000
            }),
            camera.focus({
                x: resolution.width / 2,
                y: pic1.getBounds().height + pic2.getBounds().height + pic3_1.getBounds().height + pic4.getBounds().height
                + pic5_2.getBounds().height + pic6.getBounds().height / 2 + pic7.getBounds().height,
                duration: 1000,
                ease: createjs.Ease.getPowOut(3),
                wait: 1000
            })
        ])
    )


    return {object: sceneQueue, promise: animationQueue}
}

export function load(s) {
    stage = s

    executeDefaultPlayAction(stage, mainSceneIndex, eventEmitter, animationFunc)

}

export function unlaod() {

}