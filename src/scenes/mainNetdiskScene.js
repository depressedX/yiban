import ee from 'event-emitter'
import {Camera, createFullWidthBitmap, createPartWidthBitmap, executeDefaultPlayAction, SceneQueue} from "./common";
import {
    netdisk_1, netdisk_2, netdisk_3, netdisk_4_1, netdisk_4_2, netdisk_5, netdisk_6_1, netdisk_6_2, netdisk_7,netdisk_8
} from '../assets/image'
import {resolution} from "../metaInfo";
import {play} from "../bgmPlayer";

let stage
export let eventEmitter = ee({})

// 网盘、抢票。社交
let mainSceneIndex = 0


let pic1 = createFullWidthBitmap(netdisk_1, 618, 353),
    pic2 = createFullWidthBitmap(netdisk_2, 615, 291),
    pic3 = createFullWidthBitmap(netdisk_3,618,57),
    pic4_1 = createPartWidthBitmap(netdisk_4_1, 217, 230, 217 / (217 + 397)),
    pic4_2 = createPartWidthBitmap(netdisk_4_2, 397, 230, 397 / (217 + 397)),
    pic5 = createFullWidthBitmap(netdisk_5, 610, 365),
    pic6_1 = createPartWidthBitmap(netdisk_6_1, 286, 313, 286 / (286 + 328)),
    pic6_2 = createPartWidthBitmap(netdisk_6_2, 328, 313, 328 / (286 + 328)),
    pic7 = createFullWidthBitmap(netdisk_7, 614, 430),
    pic8 = createFullWidthBitmap(netdisk_8, 614, 508)


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
    animationQueue = animationQueue.then(()=>Promise.all([
        sceneQueue.load({
            bitmap:pic3,
            duration:1000,
            offset:resolution.height/2,
            dir:SceneQueue.VERTICAL,
            ease:createjs.Ease.cubicInOut,
            wait:1000
        }),
        camera.focus({
            x:resolution.width/2,
            y:pic1.getBounds().height + pic2.getBounds().height + pic3.getBounds().height/2,
            duration:1000,
            ease: createjs.Ease.getPowOut(3),
            wait: 1000,
        })
    ]))

    // 4.
    animationQueue = animationQueue.then(() => Promise.all([
            sceneQueue.load({
                bitmap: pic4_1,
                duration: 1000,
                offset: resolution.height / 2,
                dir: SceneQueue.VERTICAL,
                ease: createjs.Ease.cubicInOut,
                wait: 1000,
            }).then(() => sceneQueue.load({
                    bitmap: pic4_2,
                    duration: 1000,
                    offset: resolution.width,
                    dir: SceneQueue.HORIZONTAL,
                    ease: createjs.Ease.cubicInOut,
                    wait: 1000,
                    inline: true
                })
            ),
            camera.focus({
                x: pic4_1.getBounds().width / 2,
                y: pic1.getBounds().height + pic2.getBounds().height + pic3.getBounds().height + pic4_1.getBounds().height / 2,
                duration: 1000,
                ease: createjs.Ease.getPowOut(3),
                wait: 1000,
                scale: 3
            }).then(() => camera.focus({
                    x: pic4_1.getBounds().width + pic4_2.getBounds().width / 2,
                    y: pic1.getBounds().height + pic2.getBounds().height + pic3.getBounds().height + pic4_1.getBounds().height / 2,
                    duration: 1000,
                    ease: createjs.Ease.getPowOut(3),
                    wait: 1000,
                    scale: 1.5
                })
            )
        ])
    )

    // 5.
    animationQueue = animationQueue.then(() => Promise.all([
            sceneQueue.load({
                bitmap: pic5,
                duration: 1000,
                offset: -resolution.width,
                dir: SceneQueue.HORIZONTAL,
                ease: createjs.Ease.cubicInOut,
                wait: 1000
            }),
            camera.focus({
                x: resolution.width / 2,
                y: pic1.getBounds().height + pic2.getBounds().height + pic3.getBounds().height + pic4_1.getBounds().height + pic5.getBounds().height / 2,
                duration: 1000,
                ease: createjs.Ease.getPowOut(3),
                wait: 1000
            })
        ])
    )

    // 6.
    animationQueue = animationQueue.then(() => Promise.all([
            sceneQueue.load({
                bitmap: pic6_1,
                duration: 1000,
                offset: resolution.height / 2,
                dir: SceneQueue.VERTICAL,
                ease: createjs.Ease.cubicInOut,
                wait: 1000,
            }).then(() => sceneQueue.load({
                    bitmap: pic6_2,
                    inline: true
                })
            ),
            camera.focus({
                x: resolution.width / 2,
                y: pic1.getBounds().height + pic2.getBounds().height + pic3.getBounds().height + pic4_1.getBounds().height + pic5.getBounds().height,
                duration: 1000,
                ease: createjs.Ease.getPowOut(3),
                wait: 1000,
            }).then(() => camera.focus({
                    x: resolution.width / 2,
                    y: pic1.getBounds().height + pic2.getBounds().height + pic3.getBounds().height + pic4_1.getBounds().height + pic5.getBounds().height,
                    duration: 1000,
                    ease: createjs.Ease.getPowOut(3),
                    wait: 1000,
                })
            )
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
                y: pic1.getBounds().height + pic2.getBounds().height + pic3.getBounds().height + pic4_1.getBounds().height
                + pic5.getBounds().height + pic6_2.getBounds().height + pic7.getBounds().height / 2,
                duration: 1000,
                ease: createjs.Ease.getPowOut(3),
                wait: 1000
            })
        ])
    )

    // 8.
    animationQueue = animationQueue.then(() => Promise.all([
            sceneQueue.load({
                bitmap: pic8,
                duration: 1000,
                offset: resolution.height / 2,
                dir: SceneQueue.VERTICAL,
                ease: createjs.Ease.cubicInOut,
                wait: 1000
            }),
            camera.focus({
                x: resolution.width / 2,
                y: pic1.getBounds().height + pic2.getBounds().height + pic3.getBounds().height + pic4_1.getBounds().height + pic5.getBounds().height
                + pic6_2.getBounds().height + pic7.getBounds().height / 2 + pic8.getBounds().height,
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

    play(1)

    executeDefaultPlayAction(stage, mainSceneIndex, eventEmitter, animationFunc)

}

export function unlaod() {

}