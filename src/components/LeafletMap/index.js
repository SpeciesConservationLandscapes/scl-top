import React, { useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import MapLayers from '../../lib/maplayers'

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
  lmContainer: {
    position: 'absolute',
    top: '69px',
    right: '20px',
    backgroundColor: '#ffffff',
    zIndex: 5000,
  },
}))

const LeafletMap = () => {
  const [layerState] = useState({})
  const map = useRef(null)

  const country = 'IN'
  const date = '2006-01-01'
  const species = 1

  const classes = mapStyle()

  const mapLayers = new MapLayers()
  const layers = {
    tcl: mapLayers.getTclLayer(country, date, species),
    biome: mapLayers.getBiomeLayer(),
    protectedArea: mapLayers.getProtectedAreaLayer(),
    hii: mapLayers.geHiiLayer(),
    species: mapLayers.getTigerHistoricalRangeLayer(),
  }

  const handleChange = e => {
    const layerIndex = e.target.value

    if (layers[layerIndex] === undefined) {
      return
    }

    if (map.current.hasLayer(layers[layerIndex])) {
      map.current.removeLayer(layers[layerIndex])
    } else {
      map.current.addLayer(layers[layerIndex])
    }
  }

  React.useEffect(() => {

    const worldImageryMapLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Tiles &copy; Esri',
      },
    )
    const mapProperty = {
      center: [31.821628051276857, 103.62284012465541],
      zoom: 3,
      minZoom: 3,
      maxZoom: 16,
      zoomControl: true,
      layers: [worldImageryMapLayer],
    }

    map.current = L.map('map', mapProperty)
  }, [])

  return (
    <div className={classes.mapcontainer}>
      <div className={classes.mapcanvas} id="map" />
      <div className={classes.lmContainer}>
        <List>
          <ListItem>
            <FormControlLabel
              control={
                <Checkbox
                  checked={layerState.tcl}
                  onChange={handleChange}
                  value="tcl"
                  color="primary"
                />
              }
              label="Tiger Conservation Landscape"
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              control={
                <Checkbox
                  checked={layerState.biome}
                  onChange={handleChange}
                  value="biome"
                  color="primary"
                />
              }
              label="Biome"
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              control={
                <Checkbox
                  checked={layerState.protectedArea}
                  onChange={handleChange}
                  value="protectedArea"
                  color="primary"
                />
              }
              label="Protected Area"
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              control={
                <Checkbox
                  checked={layerState.hii}
                  onChange={handleChange}
                  value="hii"
                  color="primary"
                />
              }
              label="Human Influence Index"
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              control={
                <Checkbox
                  checked={layerState.species}
                  onChange={handleChange}
                  value="species"
                  color="primary"
                />
              }
              label="Tiger Historical Range"
            />
          </ListItem>
        </List>
      </div>
    </div>
  )
}

export default LeafletMap
