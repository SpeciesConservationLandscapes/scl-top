import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const mapStyle = makeStyles(() => ({
  mapcontainer: {
    width: '100vw',
    height: '100vh',
    paddingTop: '50px',
    paddingBottom: '35px',
    background: 'black',
  },
  mapcanvas: {
    width: '100%',
    height: '100%',
  },
}))

const LeafletMap = () => {
  const classes = mapStyle()
  const worldImageryMapLayer = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    {
      attribution: 'Tiles &copy; Esri'
    }
  )
  const mapProperty = {
    center: [-20, 100],
    zoom: 3,
    minZoom: 3,
    maxZoom: 16,
    zoomControl: true,
    layers: [worldImageryMapLayer]
  }

  React.useEffect(() => {
    const map = L.map('map', mapProperty)

    map.addLayer(worldImageryMapLayer)
  }, [])

  return (
    <div className={classes.mapcontainer}>
      <div className={classes.mapcanvas} id="map"/>
    </div>
  )
}

export default LeafletMap
