const handler = require('./handler')
const express = require('express')
const port = 3000

module.exports = () => {
  const app = express()
  app.use(express.json())

  app.get('/render', async (req, res) => {
    req.params = req.query
    if (req.query.i) requireUncached(`./blueprint/${req.query.i}`)
    await handler.render(req, res)
  })

  app.listen(port, () => console.log('🎇 darkseid is running at port ' + port.toString()))
}

function requireUncached (module) {
  delete require.cache[require.resolve(module)]
  return require(module)
}
