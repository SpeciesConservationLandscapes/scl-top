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
    }
  }

  get token() {
    return this.tokenUtil.token
  }

  getTclLayer(country, date, species) {
    const species_id = species["id"]
    const url = `${API_ROOT}/sclstats/?country=${country}&scl__date=${date}&scl__species=${species_id}`
    const tclLayer = L.geoJSON(null, {
      style: {
        color: '#EB5424',
        weight: 1,
        strokeOpacity: 0.8,
        fillColor: '#EB5424',
        fillOpacity: 0.2,
      },
    }).bindPopup(layer => {
      const name = layer.feature.properties.scl.name
      const area = parseInt(layer.feature.properties.area, 10)
      const msg = `
        <div>
          Name: ${name}
        </div>
        <div>
          Total country area: ${area} km<sup>2</sup>
        </div>
      `

      return msg
    })

    this.api.getData(url).then((resp) => {
      tclLayer.addData(resp.data)
    })

    return tclLayer
  }

  getRestorationLayer(country, date, species) {
    const species_id = species["id"]
    const url = `${API_ROOT}/restorationls_stats/?country=${country}&restoration_landscape__date=${date}&restoration_landscape__species=${species_id}`
    const restorationLayer = L.geoJSON(null, {
      style: {
        color: '#eb8b2a',
        weight: 1,
        strokeOpacity: 0.8,
        fillColor: '#eb8b2a',
        fillOpacity: 0.2,
      },
    })

    this.api.getData(url).then((resp) => {
      restorationLayer.addData(resp.data)
    })

    return restorationLayer
  }

  getSurveyLayer(country, date, species) {
    const species_id = species["id"]
    const url = `${API_ROOT}/surveyls_stats/?country=${country}&survey_landscape__date=${date}&survey_landscape__species=${species_id}`
    const surveyLayer = L.geoJSON(null, {
      style: {
        color: '#ebb732',
        weight: 1,
        strokeOpacity: 0.8,
        fillColor: '#ebb732',
        fillOpacity: 0.2,
      },
    })

    this.api.getData(url).then((resp) => {
      surveyLayer.addData(resp.data)
    })

    return surveyLayer
  }

  getFragmentLayer(country, date, species) {
    const species_id = species["id"]
    const url = `${API_ROOT}/fragmentstats/?country=${country}&fragment__date=${date}&fragment__species=${species_id}`
    const fragmentLayer = L.geoJSON(null, {
      style: {
        color: '#ebe36a',
        weight: 1,
        strokeOpacity: 0.8,
        fillColor: '#ebe36a',
        fillOpacity: 0.2,
      },
    })

    this.api.getData(url).then((resp) => {
      fragmentLayer.addData(resp.data)
    })

    return fragmentLayer
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

  getTigerHistoricalRangeLayer(species) {
    const species_slug = species["name"].replace(" ", "_")
    const url = `${TILE_API_ROOT}/tiles/species/${species_slug}/{z}/{x}/{y}/`

    return new SecureTileLayer(url, this.defaultTileLayerConfig)
  }
}

export default MapLayers
