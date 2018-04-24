// 根据理想宽高比计算最佳尺寸
export const CONTAIN = 0
export const COVER = 1

export function getSuggestedSize(wrapperSize, ratio, flag) {
    let {width, height} = wrapperSize
    let wrapperRaio = height / width

    if (flag === CONTAIN) {
        if (wrapperRaio < ratio)
            return {
                width: height / ratio,
                height: height
            }
        else
            return {
                width: width,
                height: width * ratio
            }
    } else if (flag === COVER) {
        if (wrapperRaio < ratio)
            return {
                width: width,
                height: width * ratio
            }
        else
            return {
                width: height / ratio,
                height: height
            }
    } else {
        throw new Error(`wrong flag ${flag}`)
    }
}
export function getTimeoutPromise(time) {
    return new Promise(resolve => {
        setTimeout(()=>{
            resolve()
        },time)
    })
}