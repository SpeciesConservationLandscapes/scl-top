import React, { useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
// import styled from 'styled-components/macro'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import '../../lib/leaflet-tilelayer-subpixel-fix'
import MapLayerList from '../MapLayerList'

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
  const map = useRef(null)

  const classes = mapStyle()
  const drawerClasses = {
    root: classes.lmContainerRoot,
    paper: classes.drawerPaper,
  }

  useEffect(() => {
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
        <MapLayerList map={map}/>
      </Drawer>
    </div>
  )
}

export default LeafletMap
