exports.render = async (ctx, { text }) => {
  ctx.font = '50px San Francisco Display Bold'
  ctx.fillText('Hello, world!', 0, 50)
  ctx.font = '20px San Francisco Display'
  ctx.fillText(text || 'bomb', 0, 100)
  ctx.font = '25px Apple Emoji'
  ctx.strokeText('🤢🧜‍♀️🤮💀😘😛💖🍦💣💌', 0, 150)
}

exports.info = {
  dimensions: [400, 400]
}