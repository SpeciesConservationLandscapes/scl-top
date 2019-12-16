import L from 'leaflet'
import SecureTileLayer from './leaflet-secure-tilelayer'
import { API_ROOT, TILE_API_ROOT } from '../api-config'
import SecureApi from './api'
import TokenUtil from './token'

class MapLayers {
  constructor() {
    this.api = new SecureApi()
    this.tokenUtil = new TokenUtil()
    this.defaultTileLayerConfig = {
      attribution: '&copy; WCS',
      subdomains: ['tilea', 'tileb', 'tilec', 'tiled'],
      token: this.tokenUtil.token,
      opacity: 0.5,
    }
  }

  get token() {
    return this.tokenUtil.token
  }

  getTclLayer(country, date, species) {
    const url = `${API_ROOT}/sclstats/?country=${country}&date=${date}&scl__species=${species}`
    const tclLayer = L.geoJSON(null, {
      style: {
        color: '#EB5424',
        weight: 1,
        strokeOpacity: 0.8,
        fillColor: '#EB5424',
        fillOpacity: 0.5,
      },
    }).bindPopup(layer => {
      const name = layer.feature.properties.scl_name
      const area = parseInt(layer.feature.properties.scl_total_area, 10)
      const msg = `
        <div>
          Name: ${name}
        </div>
        <div>
          Total country area: ${area}km<sup>2</sup>
        </div>
      `

      return msg
    })

    this.api.getData(url).then((resp) => {
      tclLayer.addData(resp.data)
    })

    return tclLayer
  }

  getBiomeLayer() {
    const url = `${TILE_API_ROOT}/tiles/biomes/{z}/{x}/{y}/`

    return new SecureTileLayer(url, this.defaultTileLayerConfig)
  }

  getProtectedAreaLayer() {
    const url = `${TILE_API_ROOT}/tiles/pas/{z}/{x}/{y}/`

    return new SecureTileLayer(url, this.defaultTileLayerConfig)
  }

  geHiiLayer() {
    const url = `${TILE_API_ROOT}/tiles/hii/{z}/{x}/{y}/`

    return new SecureTileLayer(url, this.defaultTileLayerConfig)
  }

  getTigerHistoricalRangeLayer() {
    const url = `${TILE_API_ROOT}/tiles/species/${this.species}/{z}/{x}/{y}/`

    return new SecureTileLayer(url, this.defaultTileLayerConfig)
  }
}

export default MapLayers
