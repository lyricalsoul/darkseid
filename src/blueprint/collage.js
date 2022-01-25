const DPC = 300
const { loadImage, limitText, chunk } = require('../util')
const fm = require('../lastfm')

exports.render = async (ctx, { w, h, period = 'overall', type = 'album', username, flagsRaw = '' }) => {
  const flags = flagsRaw.toLowerCase().split(',')
  let cy = 0
  let dr = 0
  console.log(`${username} rpc call now`)
  let data = await fm.rpc(`userGetTop${type.split('').map((a, b) => b === 0 ? a.toUpperCase() : a).join('')}s`, 3600, username, w * h, period)
  console.log('done: '+ data[0].name)
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
  
  await Promise.allSettled(toDraw.map(async (item) => {
      console.log(`drawing image for ${item.name}`)
      const img = await loadImage(fm.fmCachedLink(item.url), DPC, DPC)
      console.log(`done for ${item.name}`)
      ctx.drawImage(img, item.x, item.y)
      if (flags.includes('nolabels')) return
      const nn = limitText(ctx, item.name, 'San Francisco Display Bold', 19, 17, 280)
      if (nn) item.name = nn
      ctx.strokeStyle = 'black'
      ctx.lineWidth = 7
      ctx.strokeText(item.name, item.x + 10, item.y + 20)
      ctx.fillStyle = 'white'
      ctx.fillText(item.name, item.x + 10, item.y + 20)
    
      ctx.font = '17px San Francisco Display Medium'
      ctx.strokeStyle = 'black'
      ctx.lineWidth = 7
      ctx.strokeText(`${item.scrobbles} scrobbles`, item.x + 10, item.y + 40)
      ctx.fillStyle = 'white'
      ctx.fillText(`${item.scrobbles} scrobbles`, item.x + 10, item.y + 40)
  }))
}

exports.info = {
  dimensions: ({ w, h }) => [w*DPC, h*DPC]
}