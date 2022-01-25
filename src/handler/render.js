const render = require('../render')

module.exports = async (req, res) => {
  if (!req.query.a || req.query.a !== 'lgrocks') return res.status(400).send('no')
  const a = await render(req.query.i || 'hello', {
    w: parseInt(req.query.d?.split?.('x')?.[0]),
    h: parseInt(req.query.d?.split?.('x')?.[1]),
    username: req.query.u,
    type: req.query.t,
    period: req.query.p,
    flagsRaw: req.query.f,
    ...req.query
  })
  res.setHeader('Content-Type', 'image/png')
  if (a?.cache) {
    res.setHeader('Cache-Control', 's-maxage=' + a.cache)
    res.status(200).send(a.data)
  } else {
    res.setHeader('Cache-Control', 's-maxage=3630')
    res.status(200).send(a)
  }
}
