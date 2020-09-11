/* eslint-disable object-shorthand */
/* eslint-disable func-names */
import L from 'leaflet'

const SecureTileLayer = L.TileLayer.extend({
  token: null,
  initialize: function(url, options) {
    L.TileLayer.prototype.initialize.call(this, url, options)
    this.token = options.token
    this.date = options.date && options.date
  },
  getTileUrl: function(coords) {
    const params = this.date
      ? { date: this.date, access_token: this.token }
      : { access_token: this.token }
    const url = L.TileLayer.prototype.getTileUrl.call(this, coords)

    const qp = L.Util.getParamString(params, url)

    return `${url.split('?')[0]}${qp}`
  },
})

export default SecureTileLayer
