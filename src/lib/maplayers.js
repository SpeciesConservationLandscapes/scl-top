import L from 'leaflet'
import SecureTileLayer from './leaflet-secure-tilelayer'
import { API_ROOT } from '../api-config'
import SecureApi from './api'
import TokenUtil from './token'

class MapLayers {
  constructor() {
    this.api = new SecureApi()
    this.tokenUtil = new TokenUtil()
  }

  get token() {
    return this.tokenUtil.token
  }

  getTclLayer(country) {
    const date = '2006-01-01'
    const species = 1
    const url = `${API_ROOT}/sclstats/?country=${country}&date=${date}&scl__species=${species}`
    const tclLayer = L.geoJSON(null, {
      style: {
        color: '#EB5424',
        weight: 1,
        strokeOpacity: 0.8,
        fillColor: '#EB5424',
        fillOpacity: 0.2,
      },
    }).bindPopup(layer => {
      const name = layer.feature.properties.scl_name
      const area = parseInt(layer.feature.properties.scl_total_area, 10)
      const msg = `
        <div>
          Name: ${name}
        </div>
        <div>
          Total Area: ${area}km<sup>2</sup>
        </div>
      `

      return msg
    })

    this.api = new SecureApi()
    this.api.getData(url).then((resp) => {
      tclLayer.addData(resp.data)
    })

    return tclLayer
  }

  getBiomeLayer() {
    const url = `${API_ROOT}/tiles/biomes/{z}/{x}/{y}/`

    return new SecureTileLayer(url, {
      attribution: '&copy; WCS',
      token: this.token,
    })
  }

  getProtectedAreaLayer() {
    const url = `${API_ROOT}/tiles/pas/{z}/{x}/{y}/`

    return new SecureTileLayer(url, {
      attribution: '&copy; WCS',
      token: this.token,
    })
  }

  geHiiLayer() {
    const url = `${API_ROOT}/tiles/hii/{z}/{x}/{y}/`

    return new SecureTileLayer(url, {
      attribution: '&copy; WCS',
      token: this.token,
    })
  }

  getTigerHistoricalRangeLayer() {
    const url = `${API_ROOT}/tiles/species/${this.species}/{z}/{x}/{y}/`

    return new SecureTileLayer(url, {
      attribution: '&copy; WCS',
      token: this.token,
    })
  }
}

// const getTclCountriesBiomesPasLayer = () => {
//   return L.geoJSON(TclCountriesBiomesPasData, {
//     style: {
//       color: '#EB5424',
//       weight: 1,
//       strokeOpacity: 0.8,
//       fillColor: '#EB5424',
//       fillOpacity: 0.2,
//     },
//   }).bindPopup(layer => {
//     const name = layer.feature.properties.scl_name
//     const area = parseInt(layer.feature.properties.scl_total_area, 10)
//     const msg = `
//       <div>
//         Name: ${name}
//       </div>
//       <div>
//         Total Area: ${area}km<sup>2</sup>
//       </div>
//     `

//     return msg
//   })
// }

// const MapLayers = {
//   getTclCountriesBiomesPasLayer,
// }

export default MapLayers
