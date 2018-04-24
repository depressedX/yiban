import {homeclick} from "../assets/image";
import {resolution} from "../metaInfo";
import {transit} from "./transitionScene";
import {getTimeoutPromise} from "../utils";


let pointerSpriteSheet = new createjs.SpriteSheet({
    "images": [homeclick], //动画人物图片来自base64编码字符串
    "frames": {"height": 180, "width": 180, count: 13},
    "animations": {
        run: [0, 12, 'run', .2]
    }
})

export function createPointer() {
    let sprite = new createjs.Sprite(pointerSpriteSheet, "run")
    sprite.setBounds(0, 0, 180, 180)
    return sprite
}


/***
 * 创建与canvas等宽的bitmap
 * @param src
 * @param width 原图横向像素数
 * @param height 原图纵向像素数
 * @returns {*}
 */
export function createFullWidthBitmap(src, width, height) {
    return createPartWidthBitmap(src, width, height, 1)
}

// 创建宽度为canvas 的ratio倍的图片
export function createPartWidthBitmap(src, width, height, ratio) {
    let bitmap = new createjs.Bitmap(src)
    bitmap.setBounds(0, 0, width, height)
    bitmap.scaleX = bitmap.scaleY = resolution.width / bitmap.getBounds().width * ratio
    bitmap.setBounds(0, 0, resolution.width * ratio, height / width * resolution.width * ratio)
    return bitmap
}


// 竖向漫画队列
export class SceneQueue extends createjs.Container {
    constructor() {
        super()
        // 底线
        this.bottomY = 0
        // 行内插入点的坐标
        this.inlineInsertPointX = 0
        this.inlineInsertPointY = 0
    }

    /***
     * 从指定方向距离offset载入
     * @param bitmap
     * @param dir 方向
     * @param offset 与最终插入点的距离 左右方向的为x  上下方向的为y
     * @param ease createjs.Ease.x
     * @return Promise 完成fulfilled 出错 rejected
     */
    load({
             bitmap, duration = 0, offset = 0, dir = SceneQueue.VERTICAL,
             ease = createjs.Ease.linear, delay = 0, wait = 0, inline = false
         } = {}) {
        return new Promise((resolve, reject) => {
            // 检查dir参数
            if (!(dir === SceneQueue.HORIZONTAL || dir === SceneQueue.VERTICAL)) {
                reject(new Error('wrong direction ' + dir))
                return
            }

            this.addChild(bitmap)
            if (inline) {
                if (dir === SceneQueue.HORIZONTAL) {
                    bitmap.y = this.inlineInsertPointY
                    bitmap.x = offset + this.inlineInsertPointX
                } else if (dir === SceneQueue.VERTICAL) {
                    bitmap.y = this.inlineInsertPointY + offset
                    bitmap.x = this.inlineInsertPointX
                }
                createjs.Tween.get(bitmap)
                    .wait(delay)
                    .to({y: this.inlineInsertPointY, x: this.inlineInsertPointX}, duration, ease)
                    .wait(wait)
                    .call(resolve)
                this.inlineInsertPointX += bitmap.getBounds().width
                this.bottomY = Math.max(this.bottomY, this.inlineInsertPointY + bitmap.getBounds().height)
            }
            else {
                if (dir === SceneQueue.HORIZONTAL) {
                    bitmap.y = this.bottomY
                    bitmap.x = offset
                } else if (dir === SceneQueue.VERTICAL) {
                    bitmap.y = this.bottomY + offset
                    bitmap.x = 0
                }
                createjs.Tween.get(bitmap)
                    .wait(delay)
                    .to({y: this.bottomY, x: 0}, duration, ease)
                    .wait(wait)
                    .call(resolve)
                this.inlineInsertPointX = bitmap.getBounds().width
                this.inlineInsertPointY = this.bottomY
                this.bottomY += bitmap.getBounds().height
            }
        })
    }

}

SceneQueue.HORIZONTAL = 0
SceneQueue.VERTICAL = 1


/***
 * 实现平滑移动的镜头移动、缩放效果
 */
export class Camera {
    constructor(object, parentSize) {
        this.displayedObject = object
        this.parentSize = parentSize

        this.scaleX = object.scaleX
        this.scaleY = object.scaleY
    }

    /***
     * 聚焦到某一点
     * @param x, y 原图(已经过原始scale的计算)上的某一点 即时缩放也没关系！
     * @param m 缩放倍数
     */
    focus({x = 0, y = 0, scale = 1, duration = 0, delay = 0, ease = createjs.Ease.linear, wait = 0} = {}) {
        return new Promise((resolve, reject) => {

            let actualScaleX = scale * this.scaleX,
                actualScaleY = scale * this.scaleY

            createjs.Tween.get(this.displayedObject)
                .wait(delay)
                .to({
                    x: this.parentSize.width / 2 - x * scale,
                    y: this.parentSize.height / 2 - y * scale,
                    scaleX: actualScaleX,
                    scaleY: actualScaleY
                }, duration, ease)
                .wait(wait)
                .call(resolve)


        })
    }

    moveVertically({d = 0, duration = 0, delay = 0, ease = createjs.Ease.linear, wait = 0} = {}) {
        return this.focus({
            x: this.parentSize.width / 2,
            y: d,
            scale: 1,
            duration,
            delay,
            ease,
            wait
        })
    }

    moveHorizontally({d = 0, duration = 0, delay = 0, ease = createjs.Ease.linear, wait = 0} = {}) {
        return this.focus({
            x: d,
            y: this.parentSize.height / 2,
            scale: 1,
            duration,
            delay,
            ease,
            wait
        })
    }
}

export function clearStage(stage) {
    stage.removeAllChildren()
    stage.removeAllEventListeners()
}

// 添加背景
function addBackground(stage, color) {
    let background = new createjs.Shape()
    background.graphics.beginFill(color).drawRect(0, 0, resolution.width, resolution.height)
    stage.addChild(background)
}

function addPointerOnBottom(stage) {
    let pointer = createPointer()
    pointer.x = resolution.width / 2
    pointer.y = resolution.height - pointer.getBounds().height
    stage.addChild(pointer)
}

function moveTransitionImg(stage, time) {
    return img => {
        let transitionImg = new createjs.Bitmap(img)
        transitionImg.setBounds(0, 0, resolution.width, resolution.height)
        stage.addChild(transitionImg)

        createjs.Tween.get(transitionImg)
            .to({
                y: -resolution.height
            }, time)
    }
}

// 执行默认动画播放操作
// 防止PM瞎几把改需求的简单封装
export function executeDefaultPlayAction(stage, mainSceneIndex, eventEmitter, animationFunc) {



    // 过渡页面完成  播放每一格漫画
    transit(stage, mainSceneIndex)
        .then(img => {
            addBackground(stage, '#fff')
            return img
        })
        .then(moveTransitionImg(stage, 1000))
        .then(() => {

            let res = animationFunc(),
                animationPromise = res.promise,
                sceneQueue = res.object

            stage.addChild(sceneQueue)
            sceneQueue.y = resolution.height


            createjs.Tween.get(sceneQueue)
                .to({
                    y: 0
                }, 1000)

            return animationPromise
        })
        .then(() => getTimeoutPromise(2000))
        .then(() => {
            addPointerOnBottom(stage)
            stage.addEventListener('click', () => {
                eventEmitter.emit('next')
            })
        })

}