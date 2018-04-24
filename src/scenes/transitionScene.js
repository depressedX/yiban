/*
网盘抢票社交之间的过渡场景
 */
import {resolution} from "../metaInfo";
import {loading, transition} from '../assets/image'
import {COVER, getSuggestedSize} from "../utils";
import {Camera} from './common'
import {clearStage} from "./common";


let focusPoints = [
    {
        x: resolution.width*0.235,
        y: resolution.height * 0.7
    },
    {
        x: resolution.width*0.765,
        y: resolution.height * 0.7
    },
    {
        x: resolution.width / 2,
        y: resolution.height*0.3
    },
]

/***
 *
 * @param s stage
 * @param code 过渡到哪个场景 0网盘 1抢票 2社交
 */
export function transit(s, code) {
    let stage = s


    let stagePic = new createjs.Bitmap(transition)
    stagePic.scaleX = stagePic.scaleY = getSuggestedSize(resolution, 1280 / 720, COVER).width / 720

    let stageCamera = new Camera(stagePic, resolution)


    stage.addChild(stagePic)

    if (![0, 1, 2].includes(code)) {
        throw new Error(`wrong scene code ${code}`)
    }

    return stageCamera.focus({
        x: focusPoints[code].x,
        y: focusPoints[code].y,
        scale: 2.5,
        duration: 800,
        delay: 1000,
        ease:createjs.Ease.getPowOut(3)
    })
        .then(() => new Promise((resolve, reject) => {
                setTimeout(() => {
                    // 保存一张canvas快照
                    let canvas = document.getElementById('main-stage'),
                        image = new Image()
                    image.src = canvas.toDataURL('image/png')

                    clearStage(stage)
                    resolve(image)
                }, 2000)
            })
        )

}