import React, { useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Drawer from '@material-ui/core/Drawer'
// import styled from 'styled-components/macro'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import '../../lib/leaflet-tilelayer-subpixel-fix'
import MapLayers from '../../lib/maplayers'

const mapStyle = makeStyles(() => ({
  mapcontainer: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: '49px',
    bottom: '35px',
    background: 'black',

    // paddingRight: '${props => (props.sidePanelOpen ? '650px' : '0px')}';
    // @media (min-width: 0px) {
    //   padding-right: ${props => (props.sidePanelOpen ? '350px' : '0px')};
    // }
    // @media (min-width: 960px) {
    //   padding-right: ${props => (props.sidePanelOpen ? '500px' : '0px')};
    // }
    // @media (min-width: 1280px) {
    //   padding-right: ${props => (props.sidePanelOpen ? '650px' : '0px')};
    // }
  },
  mapcanvas: {
    width: '100%',
    height: '100%',
  },
  lmContainer: {
    marginTop: '49px',
    marginBottom: '32px',
  },
  lmContainerRoot: {
    height: '600px',
  },
  drawerPaper: {
    height: '480px',
    marginTop: '49px',
    marginBottom: '32px',
    overflow: 'hidden',
    borderBottomLeftRadius: '4px',
  },
}))

const LeafletMap = () => {
  const [layerState] = useState({})
  const map = useRef(null)

  const country = 'ID' // temporarily hardcoded to Indonesia
  const date = '2006-01-01'
  const species = { id: 1, name: 'Panthera tigris' }

  const classes = mapStyle()
  const drawerClasses = {
    root: classes.lmContainerRoot,
    paper: classes.drawerPaper,
  }

  const mapLayers = new MapLayers()
  const layers = {
    tcl: mapLayers.getTclLayer(country, date, species),
    restoration: mapLayers.getRestorationLayer(country, date, species),
    survey: mapLayers.getSurveyLayer(country, date, species),
    fragment: mapLayers.getFragmentLayer(country, date, species),
    biome: mapLayers.getBiomeLayer(),
    protectedArea: mapLayers.getProtectedAreaLayer(),
    hii: mapLayers.geHiiLayer(),
    species: mapLayers.getTigerHistoricalRangeLayer(species),
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
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
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
      <Drawer
        className={classes.lmContainer}
        anchor="right"
        variant="persistent"
        classes={drawerClasses}
        open
      >
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
                  checked={layerState.restoration}
                  onChange={handleChange}
                  value="restoration"
                  color="primary"
                />
              }
              label="Tiger Restoration Landscape"
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              control={
                <Checkbox
                  checked={layerState.survey}
                  onChange={handleChange}
                  value="survey"
                  color="primary"
                />
              }
              label="Tiger Survey Landscape"
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              control={
                <Checkbox
                  checked={layerState.fragment}
                  onChange={handleChange}
                  value="fragment"
                  color="primary"
                />
              }
              label="Tiger Fragment Landscape"
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
                  checked={layerState.hii}
                  onChange={handleChange}
                  value="hii"
                  color="primary"
                />
              }
              label="Human Influence Index"
            />
          </ListItem>
        </List>
      </Drawer>
    </div>
  )
}

export default LeafletMap
