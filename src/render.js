const { createCanvas, GlobalFonts } = require('@napi-rs/canvas')
global.__fontRegs = false

module.exports = async function render(id, data = {}) {
  if (!__fontRegs) {
    global.__fontRegs = true
    GlobalFonts.registerFromPath(`${__dirname}/../assets/vendor/Apple/AppleColorEmoji.ttf`, 'Apple Emoji')
    GlobalFonts.registerFromPath(`${__dirname}/../assets/vendor/Apple/SF/SF-Pro-Display-Regular.otf`, 'San Francisco Display Regular')
    //lobalFonts.registerFromPath(`${__dirname}/../assets/vendor/Apple/SF/SF-Pro-Display-RegularItalic.otf`, 'San Francisco Display Regular Italic')
    GlobalFonts.registerFromPath(`${__dirname}/../assets/vendor/Apple/SF/SF-Pro-Display-Medium.otf`, 'San Francisco Display Medium')
    GlobalFonts.registerFromPath(`${__dirname}/../assets/vendor/Apple/SF/SF-Pro-Display-Bold.otf`, 'San Francisco Display Bold')
 }
 
  try {
    const a = require(`./blueprint/${id}`)
    const [w, h] = typeof(a.info.dimensions) === 'function' ? a.info.dimensions(data) : a.info.dimensions
    const canvas = createCanvas(w, h)
    const ctx = canvas.getContext('2d')
    const c = await a.render(ctx, data)
    if (c) return { ...c, data: canvas.toBuffer('image/png') }
    else return canvas.toBuffer('image/png')
  } catch (e) {
    console.log(e.stack)
    return null
  }
}
