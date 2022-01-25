const axios = require('axios')
const fm = require('../lastfm')

// a=firmeza&m=cache&d=6b2e60a3ff7c4986c98f90e69dc9f612
module.exports = async (req, res) => {
  if (!req.query.a || req.query.a != 'firmeza') return res.status(400).send("no")
  if (!req.query.m || !req.query.d) return res.status(404).send('?')
  switch (req.query.m) {
    case 'fmcc':
      const d = await axios({ url: `https://lastfm.freetls.fastly.net/i/u/300x300/${req.query.d}.png`, method: 'get', responseType: 'arraybuffer' })
      res.setHeader('Content-Type', 'image/png')
      res.setHeader('Cache-Control', 's-maxage=2678400')
      res.status(200).send(d)
      break
    case 'fmco':
      const d = fm[req.query.d]
      if (!d) return res.status(404).send('??')
      
  }
}