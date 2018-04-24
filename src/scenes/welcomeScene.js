import ee from 'event-emitter'
import {resolution} from "../metaInfo"

let stage
export let eventEmitter = ee({})


// 背景
let background = new createjs.Shape()
background.graphics.beginFill("#333").drawRect(0, 0, resolution.width, resolution.height)

let border = new createjs.Shape()
border.graphics.setStrokeStyle(5).beginStroke("rgb(238,59,36)").drawRect(20, resolution.height / 4, resolution.width - 40, resolution.height * 11 / 16)

let title = new createjs.Text('山东大学欢迎你', '38px Arial', 'rgb(238,59,36)')
title.x = resolution.width / 2 - title.getMeasuredWidth() / 2
title.y = resolution.height / 4 + title.getMeasuredHeight() * 1.5

let content = new createjs.Text('作为一所一流大学， 为了方便同学们\n的学习和生活， 现提供一份特别指南\n……', '30px Arial', 'rgb(238,59,36)')
content.maxWidth = resolution.width * .75
content.lineHeight = 40
content.x = resolution.width / 8
content.y = Math.ceil(resolution.height * 2 / 3)

function scrolloverHandler() {
    eventEmitter.emit('next')
}

export function load(s) {
    stage = s

    stage.addChild(background)
    stage.addChild(border)
    stage.addChild(title)
    stage.addChild(content)

    createjs.Tween.get(content)
        .wait(500)
        .to({y: Math.ceil(resolution.height / 2)}, 4000, createjs.Ease.linear)
        .wait(4000)
        .call(scrolloverHandler);
}

export function unload() {
}