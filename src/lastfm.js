const axios = require('axios')

module.exports = class LastFM {
  static get fallback() {
    return 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png'
  }
  
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
    if (!tracks) return
    const z = await axios.post(`https://resource.musicorumapp.com/find/tracks`, { tracks })
    return z.data
  }

  static fmCachedLink (url, id) {
    if (!url) url = 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png'
    return `${this.apiURL}&m=fmcc&d=${id ? url : url.split('/')[6].split('.')[0]}`
  }
  
  static spotifyCachedLink (url, id) {
    if (!url) return
    return `${this.apiURL}&m=spcc&d=${id ? url : url.split('/')[url.split('/').length - 1].replace('/', '')}`
  }
}
