/* eslint-disable object-shorthand */
/* eslint-disable func-names */
import L from 'leaflet'

const SecureTileLayer = L.TileLayer.extend({
  token: null,
  initialize: function(url, options) {
    L.TileLayer.prototype.initialize.call(this, url, options)
    this.token = options.token
  },
  getTileUrl: function(coords) {
    const url = L.TileLayer.prototype.getTileUrl.call(this, coords)
    const qp = L.Util.getParamString({ access_token: this.token }, url)

    return `${url.split('?')[0]}${qp}`
  },
})

export default SecureTileLayer
