const { createCanvas, GlobalFonts } = require('@napi-rs/canvas')
const path = require('path')
global.__fontRegs = false

module.exports = async function render (id, data = {}) {
  if (!global.__fontRegs) {
    global.__fontRegs = true
    // Main fonts: San Francisco family
    GlobalFonts.registerFromPath(path.join(__dirname, '/../assets/vendor/Apple/SF/SF-Pro-Display-Regular.otf'), 'San Francisco Display Regular')
    GlobalFonts.registerFromPath(path.join(__dirname, '/../assets/vendor/Apple/SF/SF-Pro-Display-Medium.otf'), 'San Francisco Display Medium')
    GlobalFonts.registerFromPath(path.join(__dirname, '/../assets/vendor/Apple/SF/SF-Pro-Display-Bold.otf'), 'San Francisco Display Bold')
    // Emoji support
    GlobalFonts.registerFromPath(path.join(__dirname, '/../assets/vendor/Google/NotoColorEmoji.ttf'), 'Apple Emoji')
    // Fallback font (Google Noto merged)
    GlobalFonts.registerFromPath(path.join(__dirname, '/../assets/vendor/Google/NotoCurrent.ttf'), 'Google Noto')
  }

  try {
    const a = require(`./blueprint/${id}`)
    const [w, h] = typeof (a.info.dimensions) === 'function' ? a.info.dimensions(data) : a.info.dimensions
    const canvas = createCanvas(w, h)
    const ctx = canvas.getContext('2d')
    const c = await a.render(ctx, data)
    if (c) return { ...c, data: canvas.toBuffer('image/jpeg', 100) }
    else return canvas.toBuffer('image/jpeg', 100)
  } catch (e) {
    console.log(e.stack)
    return null
  }
}
