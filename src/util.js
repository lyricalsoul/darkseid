const { Image } = require('@napi-rs/canvas')
const axios = require('axios')

exports.chunk = (array, size) =>
  array.reduce((acc, _, i) => {
    if (i % size === 0) acc.push(array.slice(i, i + size))
    return acc
  }, [])
  
exports.loadImage = async (url, w, h) => {
  const d = await axios({ url, method: 'get', responseType: 'arraybuffer' })
  const img = new Image()
  img.src = d.data
  img.weight = w
  img.height = h
  return img
}

function limitText (ctx, text, font, size, minSize, maxSize) {
  ctx.font = `${size}px ${font}`
  let textSize = ctx.measureText(text).width
  if (textSize <= maxSize) return
  else if (textSize > maxSize && minSize) {
    return limitText(ctx, text, font, minSize, null, maxSize)
  } else {
    do {
      text = text.substring(0, text.length - 1)
    } while (ctx.measureText(text).width > maxSize)
    return text.substring(0, text.length - 3) + '...'
  }
}

exports.limitText = limitText