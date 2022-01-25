const axios = require('axios')

module.exports = class LastFM {
  static async rpc (method, lifetime, ...data) {
    const a = await axios.get(`https://lastgramturbo-blueslimee.vercel.app/api/cache/?a=firmeza&m=fmco&l=${lifetime}&d=${method}&p=${encodeURIComponent(JSON.stringify(data))}`)
    return a.data
  }
  
  static fmCachedLink (url) {
    return `https://lastgramturbo-blueslimee.vercel.app/api/cache/?a=firmeza&m=fmcc&d=${url.split('/')[6].split('.')[0]}`
  }
}