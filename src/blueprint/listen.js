const DPC = 300
const { loadImage, limitText, pSBC, invertColor } = require('../util')
const fm = require('../lastfm')

exports.render = async (ctx, { cover, track, album, artist, scrobbles, loved }) => {
  const [img, color] = await loadImage(fm.fmCachedLink(cover, true), DPC, DPC, true)
  
  /* GRADIENT */
  {
    const gradient = ctx.createLinearGradient(0, 0, 800, 0)
    gradient.addColorStop(0, pSBC(0.1, color))
    gradient.addColorStop(1, pSBC(-0.45, color))
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 800, 400)
  }
  /* IMAGE DRAWING */
  {
    ctx.drawImage(img, 15, 15)
  }
  ctx.fillStyle = invertColor(pSBC(0.1, color), true)
  /* TEXT DRAWING */
  {
    const sbl = 30
    let yOffset = 190
    let xOffset = 335
    let name

    if (loved) {
      ctx.font = '23px Apple Emoji'
      ctx.fillText('♥️', xOffset - 4, yOffset - 35)
    }

    name = limitText(ctx, track, 'San Francisco Display Bold', 30, 25, 800-335) || track
    ctx.fillText(name, xOffset, yOffset)
    yOffset += sbl // 230 > 260

    name = limitText(ctx, album, 'San Francisco Display Regular', 27, 25, 800-335) || album
    ctx.fillText(name, xOffset, yOffset)
    yOffset += sbl // 260 > 290

    name = limitText(ctx, artist, 'San Francisco Display Regular', 27, 25, 800-335) || artist
    ctx.fillText(name, xOffset, yOffset)
    yOffset += sbl + 20

    ctx.font = '23px Apple Emoji'
    ctx.fillText(`📊`, xOffset, yOffset - 2)
    ctx.font = '23px San Francisco Display Regular'
    ctx.fillText(`${scrobbles} scrobbles`, xOffset + 33, yOffset)
    yOffset += sbl
  }
  
  return { cache: 31 * 24 * 60 * 60 }
}

exports.info = {
  dimensions: [800, 330]
}