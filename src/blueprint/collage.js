const DPC = 300
const { loadImage, limitText } = require('../util')
const fm = require('../lastfm')

exports.render = async (ctx, { w, h, period = 'overall', type = 'album', username, flagsRaw = '' }) => {
  const flags = flagsRaw.toLowerCase().split(',')
  let cy = 0
  let dr = 0
  console.log(`${username} rpc call now`)
  const data = await fm.rpc(`userGetTop${type.split('').map((a, b) => b === 0 ? a.toUpperCase() : a).join('')}s`, 3600, username, w * h, period)
  console.log('done: ' + data[0].name)
  if (!data || data.error) return null
  let toDraw = data.map((a, i) => {
    const obj = { ...a, x: dr * DPC, y: cy }
    dr++
    if (dr === w) {
      cy += DPC
      dr = 0
    }
    return obj
  })
  
  if (type === 'artist') {
    const covers = await fm.getArtistsData(toDraw)
    toDraw = toDraw.map((z, i) => {
      z.url = fm.spotifyCachedLink(covers[i]['spotify_images'][1])
      return z
    })
  } else if (type === 'album') {
    toDraw = toDraw.map(a => {
      a.url = fm.fmCachedLink(a.url)
      return a
    })
  } else {
    const covers = await fm.getTracksData(toDraw.map(z => {
      return { name: z.name, artist: z.artist.name }
    }))
    
    toDraw = toDraw.map((z, i) => {
      z.url = fm.spotifyCachedLink(covers[i]['spotify_covers'][1])
      return z
    })
  }
  
  await Promise.allSettled(toDraw.map(async (item) => {
    const img = await loadImage(item.url, DPC, DPC)
    ctx.drawImage(img, item.x, item.y)
    if (!flags.includes('nolabels')) {
      const nn = limitText(ctx, item.name, 'San Francisco Display Bold', 23, 20, 280)
      if (nn) item.name = nn
      ctx.strokeStyle = 'black'
      ctx.lineWidth = 4
      ctx.strokeText(item.name, item.x + 10, item.y + 25)
      ctx.fillStyle = 'white'
      ctx.fillText(item.name, item.x + 10, item.y + 25)

      ctx.font = '22px San Francisco Display Medium'
      ctx.strokeStyle = 'black'
      ctx.lineWidth = 4
      ctx.strokeText(`${item.scrobbles} scrobbles`, item.x + 10, item.y + 50)
      ctx.fillStyle = 'white'
      ctx.fillText(`${item.scrobbles} scrobbles`, item.x + 10, item.y + 50)
    }
  }))
}

exports.info = {
  dimensions: ({ w, h, type }) => [w * DPC, h * DPC]
}
