const axios = require('axios')

module.exports = class LastFM {
  async rpc (method, lifetime, filtering = true, ...data) {
    const a = await axios.get(`https://lastgramturbo-blueslimee.vercel.app/api/cache/?a=firmeza&m=fmco&l=${lifetime}&d=${method}&p=${encodeURIComponent(JSON.stringify(data))}`)
    return filtering ? await this.filter(method, a.data, data[0]) : a.data
  }
}