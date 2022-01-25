const DPC = 300
const { loadImage } = require('../util')
const fm = require('../lastfm')

exports.render = async (ctx, { w, h, period = 'overall', username }) => {
  let cy = 0
  let dr = 0
  let data = await fm.userGetTopAlbums(username, w * h, period)
  if (!data || data.error) return null
  let toDraw = data.map((a, i) => {
    let obj = { ...a, x: dr*DPC, y: cy }
    dr++
    if (dr === w) {
      cy += DPC
      dr = 0
    }
    return obj
  })

  await Promise.all(toDraw.map(async (item) => {
    const img = await loadImage(item.url, DPC, DPC)
    await ctx.drawImage(img, item.x, item.y)
    ctx.font = '17px San Francisco Display Bold'
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 5
    ctx.strokeText(item.name, item.x + 10, item.y + 20)
    
    ctx.fillStyle = 'white'
    ctx.fillText(item.name, item.x + 10, item.y + 20)
    
    ctx.font = '15px San Francisco Display Medium'
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 5
    ctx.strokeText(`${item.scrobbles} scrobbles`, item.x + 10, item.y + 40)
    ctx.fillStyle = 'white'
    ctx.fillText(`${item.scrobbles} scrobbles`, item.x + 10, item.y + 40)
  }))
}

exports.info = {
  dimensions: ({ w, h }) => [w*DPC, h*DPC]
}