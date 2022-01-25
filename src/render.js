const { createCanvas, GlobalFonts } = require('@napi-rs/canvas')
global.__fontRegs = false

module.exports = async function render(id, data = {}) {
  if (!__fontRegs) {
    global.__fontRegs = true
    GlobalFonts.registerFromPath(`${__dirname}/../assets/vendor/Apple/SF/SF-Pro-Display-Regular.otf`, 'San Francisco Display Regular')
    GlobalFonts.registerFromPath(`${__dirname}/../assets/vendor/Apple/SF/SF-Pro-Display-Medium.otf`, 'San Francisco Display Medium')
    GlobalFonts.registerFromPath(`${__dirname}/../assets/vendor/Apple/SF/SF-Pro-Display-Bold.otf`, 'San Francisco Display Bold')
    GlobalFonts.registerFromPath(`${__dirname}/../assets/vendor/Apple/AppleColorEmoji.ttf`, 'Apple Emoji')
 }
 
  try {
    const a = require(`./blueprint/${id}`)
    const [w, h] = typeof(a.info.dimensions) === 'function' ? a.info.dimensions(data) : a.info.dimensions
    const canvas = createCanvas(w, h)
    const ctx = canvas.getContext('2d')
    await a.render(ctx, data)
    return canvas.toBuffer('image/png')
  } catch (e) {
    console.log(e.stack)
    return null
  }
}
