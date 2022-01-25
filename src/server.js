const handler = require('./handler')
const express = require('express')
const port = 3000

module.exports = () => {
  const app = express()
  app.use(express.json())

  app.post('/render', async (req, res) => {
    req.params = req.query
    await handler.render(req, res)
  })
  
  app.listen(port, () => console.log('🎇 darkseid is running at port '+ port.toString()))
}