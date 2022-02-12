const axios = require('axios')

module.exports = class LastFM {
  static get apiURL() {
    return process.env.LASTGRAM_CACHE_SERVICE_URL
  }
  
  static async rpc (method, lifetime, ...data) {
    const a = await axios.get(`${this.apiURL}&m=fmco&l=${lifetime}&d=${method}&p=${encodeURIComponent(JSON.stringify(data))}`)
    return a.data
  }

  static async getArtistsData(data) {
    const z = await axios.post(`https://resource.musicorumapp.com/find/artists`, { artists: data.map(z => z.name ? z.name : z) })
    return z.data
  }
  
  static async getTracksData(tracks) {
    const z = await axios.post(`https://resource.musicorumapp.com/find/tracks`, { tracks })
    return z.data
  }

  static fmCachedLink (url, id) {
    return `${this.apiURL}&m=fmcc&d=${id ? url : url.split('/')[6].split('.')[0]}`
  }
  
  static spotifyCachedLink (url, id) {
    return `${this.apiURL}&m=spcc&d=${id ? url : url.split('/')[url.split('/').length - 1].replace('/', '')}`
  }
}
