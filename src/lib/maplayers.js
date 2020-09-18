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
      opacity: 1,
    }
  }

  get token() {
    return this.tokenUtil.token
  }

  getTclLayer(country, date, species, setLayer, map) {
    const speciesId = species.id
    const url = `${API_ROOT}/sclstats/?country=${country}&scl__date=${date}&scl__species=${speciesId}`
    const tclLayer = L.geoJSON(null, {
      style: {
        color: '#0b0deb',
        weight: 1,
        strokeOpacity: 1,
        fillColor: '#0b0deb',
        fillOpacity: 0.2,
      },
    }).bindPopup(layer => {
      const { name } = layer.feature.properties.scl
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

    this.api.getData(url).then(resp => {
      tclLayer.addData(resp.data)
      const bounds = tclLayer.getBounds()

      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [30, 30] })
      }
      setLayer(tclLayer)
    })

    return tclLayer
  }

  getRestorationLayer(country, date, species, setLayer) {
    const speciesId = species.id
    const url = `${API_ROOT}/restorationls_stats/?country=${country}&restoration_landscape__date=${date}&restoration_landscape__species=${speciesId}`
    const restorationLayer = L.geoJSON(null, {
      style: {
        color: '#2d9eeb',
        weight: 1,
        strokeOpacity: 1,
        fillColor: '#2d9eeb',
        fillOpacity: 0.2,
      },
    })

    this.api.getData(url).then(resp => {
      restorationLayer.addData(resp.data)
      setLayer(restorationLayer)
    })

    return restorationLayer
  }

  getSurveyLayer(country, date, species, setLayer) {
    const speciesId = species.id
    const url = `${API_ROOT}/surveyls_stats/?country=${country}&survey_landscape__date=${date}&survey_landscape__species=${speciesId}`
    const surveyLayer = L.geoJSON(null, {
      style: {
        color: '#9c1feb',
        weight: 1,
        strokeOpacity: 1,
        fillColor: '#9c1feb',
        fillOpacity: 0.2,
      },
    })

    this.api.getData(url).then(resp => {
      surveyLayer.addData(resp.data)
      setLayer(surveyLayer)
    })

    return surveyLayer
  }

  getFragmentLayer(country, date, species, setLayer) {
    const speciesId = species.id
    const url = `${API_ROOT}/fragmentstats/?country=${country}&fragment__date=${date}&fragment__species=${speciesId}`
    const fragmentLayer = L.geoJSON(null, {
      style: {
        color: '#EB5424',
        weight: 1,
        strokeOpacity: 1,
        fillColor: '#EB5424',
        fillOpacity: 0.2,
      },
    })

    this.api.getData(url).then(resp => {
      fragmentLayer.addData(resp.data)
      setLayer(fragmentLayer)
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

  geHiiLayer(date, setClosestDate) {
    const baseUrl = `${TILE_API_ROOT}/tiles/hii`
    const url = `${baseUrl}/{z}/{x}/{y}/`
    const closestDateUrl = `${baseUrl}/1/1/1/?date=${date}&get_date`
    const extraOptions = this.defaultTileLayerConfig

    extraOptions.date = date
    this.api.getData(closestDateUrl).then(resp => {
      setClosestDate(resp.data)
    })

    return new SecureTileLayer(url, extraOptions)
  }

  getTigerHistoricalRangeLayer(species) {
    const speciesSlug = species.name.replace(' ', '_')
    const url = `${TILE_API_ROOT}/tiles/species/${speciesSlug}/{z}/{x}/{y}/`

    return new SecureTileLayer(url, this.defaultTileLayerConfig)
  }

  getStructuralHabitat(species, date, setClosestDate) {
    const speciesSlug = species.name.replace(' ', '_')
    const baseUrl = `${TILE_API_ROOT}/tiles/species/${speciesSlug}/structural_habitat`
    const url = `${baseUrl}/{z}/{x}/{y}/`
    const closestDateUrl = `${baseUrl}/1/1/1/?date=${date}&get_date`
    const extraOptions = this.defaultTileLayerConfig

    extraOptions.date = date
    this.api.getData(closestDateUrl).then(resp => {
      setClosestDate(resp.data)
    })

    return new SecureTileLayer(url, extraOptions)
  }

  downloadReport(country, date) {
    const url = `${API_ROOT}/reports/species/?country=${country}&species=1&date=${date}`

    window.open(this.api.getLink(url))
  }
}

export default MapLayers
