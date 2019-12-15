import React, { useState } from 'react'
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
    // width: '200px',
    // flexShrink: 0

    // position: 'absolute',
    // top: '0',
    // right: '0',
    // backgroundColor: '#ffffff',
    // zIndex: 5000,
    // borderBottomLeftRadius: '4px',
  },
  lmContainerRoot: {
    height: '600px',
  },
  drawerPaper: {
    height: '310px',
    marginTop: '49px',
    marginBottom: '32px',
    overflow: 'hidden',
  }
}))

const LeafletMap = () => {
  const [layerState] = useState({})

  let map

  const classes = mapStyle()
  const drawerClasses = {
    root: classes.lmContainerRoot,
    paper: classes.drawerPaper
  }

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

  const mapLayers = new MapLayers()
  const layers = {
    tcl: mapLayers.getTclLayer('IN'),
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

    if (map.hasLayer(layers[layerIndex])) {
      map.removeLayer(layers[layerIndex])
    } else {
      map.addLayer(layers[layerIndex])
    }
  }

  React.useEffect(() => {
    map = L.map('map', mapProperty)
    map.addLayer(worldImageryMapLayer)
  }, [])

  return (
    <div className={classes.mapcontainer}>
      <div className={classes.mapcanvas} id="map" />
      <Drawer className={classes.lmContainer} anchor="right" variant="persistent" classes={drawerClasses} open>
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
      </Drawer>
    </div>
  )
}

export default LeafletMap
