import L from 'leaflet'
import TclCountriesBiomesPasData from '../tcl_countries_biomes_pas'

const getTclCountriesBiomesPasLayer = () => {
  return L.geoJSON(TclCountriesBiomesPasData, {
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
}

const MapLayers = {
  getTclCountriesBiomesPasLayer,
}

export default MapLayers
