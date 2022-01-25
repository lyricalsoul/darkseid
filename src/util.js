const { Image } = require('@napi-rs/canvas')
const axios = require('axios')

exports.loadImage = async (url, w, h) => {
  const d = await axios({ url, method: 'get', responseType: 'arraybuffer' })
  const img = new Image()
  img.src = d.data
  img.weight = w
  img.height = h
  return img
}